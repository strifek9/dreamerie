"""Pixel-exact WebP originals and padded clue-source crops (offline only).
Requires Pillow/WebP and Node 22.18+ or 24+. --check verifies without writing;
--sample tests card 5. No resizing, repainting, or changes to masters/gameplay.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
import math
from pathlib import Path
import subprocess
from PIL import Image, features

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
PREFIX = '/artwork/v3/delivery-lossless-v1/'
AUDIT = ROOT / 'docs/artwork/DELIVERY_LOSSLESS_V1.json'
MANIFEST = ROOT / 'src/v3/artworkDelivery.generated.ts'
PADDING = 32  # Neighboring pixels for browser interpolation at clip boundaries.


def digest(data):
    return sha256(data).hexdigest()


def encode(source, name, box, check):
    src = PUBLIC / source.lstrip('/')
    target = PREFIX + name + '.webp'
    dst = PUBLIC / target.lstrip('/')
    source_bytes = src.read_bytes()
    with Image.open(src) as original:
        original.load()
        if original.getexif().get(274, 1) != 1:
            raise ValueError(f'Unexpected orientation: {source}')
        width, height = original.size
        if box:
            left = max(0, math.floor(box['left'] * width) - PADDING)
            top = max(0, math.floor(box['top'] * height) - PADDING)
            right = min(width, math.ceil((box['left'] + box['width']) * width) + PADDING)
            bottom = min(height, math.ceil((box['top'] + box['height']) * height) + PADDING)
        else:
            left, top, right, bottom = 0, 0, width, height
        crop = original.crop((left, top, right, bottom))
        if not check and not dst.exists():
            dst.parent.mkdir(parents=True, exist_ok=True)
            crop.save(dst, format='WEBP', lossless=True, method=4,
                      icc_profile=original.info.get('icc_profile', b''))
        with Image.open(dst) as decoded:
            decoded.load()
            pixels = crop.convert('RGBA').tobytes()
            if crop.size != decoded.size or pixels != decoded.convert('RGBA').tobytes():
                raise ValueError(f'Delivery pixels changed: {target}')
            if original.info.get('icc_profile', b'') != decoded.info.get('icc_profile', b''):
                raise ValueError(f'Color profile changed: {target}')
        encoded = dst.read_bytes()
        if src.read_bytes() != source_bytes:
            raise ValueError(f'Master changed: {source}')
        rect = dict(src=target, x=left / width * 1672, y=top / height * 941,
                    width=(right-left) / width * 1672, height=(bottom-top) / height * 941)
        record = dict(source=source, delivery=target, sourceWidth=width, sourceHeight=height,
                      crop=[left, top, right-left, bottom-top], sourceBytes=len(source_bytes),
                      deliveryBytes=len(encoded), sourceSha256=digest(source_bytes),
                      deliverySha256=digest(encoded), rgbaSha256=digest(pixels))
        return rect, record


def process(card, check):
    original, record = encode(card['original'], card['id'] + '-original', None, check)
    records, edits = [record], {}
    for edit in card['edits']:
        rect, record = encode(edit.get('source', card['altered']),
                              card['id'] + '-' + edit['id'], edit['box'], check)
        edits[edit['id']] = rect
        records.append(record)
    sources = {card['original'], card['altered']} | {e['source'] for e in card['edits'] if 'source' in e}
    before = sum((PUBLIC / source.lstrip('/')).stat().st_size for source in sources)
    after = sum(r['deliveryBytes'] for r in records)
    if after >= before:
        raise ValueError(f'No size reduction: {card["id"]}')
    return card['id'], dict(original=original['src'], edits=edits), records, dict(
        id=card['id'], sourceBytes=before, deliveryBytes=after)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--sample', action='store_true')
    args = parser.parse_args()
    if not features.check('webp'):
        raise RuntimeError('This Pillow installation needs WebP support.')
    result = subprocess.run(['node', '--experimental-strip-types', '--input-type=module', '-e',
        "import { currentDreams } from './src/v3/dailyDream.ts'; console.log(JSON.stringify(currentDreams))"],
        cwd=ROOT, capture_output=True, text=True, encoding='utf-8', check=True)
    cards = json.loads(result.stdout)
    if args.sample:
        cards = [c for c in cards if c['id'] == 'painted-dream-005']
    manifest, records, totals = {}, [], []
    with ThreadPoolExecutor(max_workers=4) as pool:
        for id, delivery, assets, total in pool.map(lambda c: process(c, args.check), cards):
            manifest[id] = delivery
            records.extend(assets)
            totals.append(total)
            if len(totals) % 10 == 0:
                print(f'Pixel-exact originals and five crops: {len(totals)}/{len(cards)}', flush=True)
    report = dict(format='WebP lossless', resized=False, pixelEquality='RGBA exact',
                  paddingPixels=PADDING, sourceBytes=sum(t['sourceBytes'] for t in totals),
                  deliveryBytes=sum(t['deliveryBytes'] for t in totals), cards=totals, assets=records)
    generated = '// Generated by scripts/prepareArtworkDeliveryV1.py; do not edit.\nexport const artworkDelivery = ' + json.dumps(manifest, separators=(',', ':')) + ' as const\n'
    if not args.sample:
        if args.check:
            if json.loads(AUDIT.read_text(encoding='utf-8')) != report or MANIFEST.read_text(encoding='utf-8') != generated:
                raise ValueError('Audit/manifest do not match the verified delivery files.')
        else:
            AUDIT.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
            MANIFEST.write_text(generated, encoding='utf-8')
    print(json.dumps({k: v for k, v in report.items() if k not in ['assets', 'cards']}))
    print(f"{len(cards)} cards, {len(records)} files; {100 * (1 - report['deliveryBytes'] / report['sourceBytes']):.1f}% fewer image bytes", flush=True)


if __name__ == '__main__':
    main()
