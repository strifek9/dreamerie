"""Prepare only referenced artwork; native RGBA/ICC-exact lossless legacy delivery."""
from pathlib import Path
from hashlib import sha256
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
import json, shutil
from PIL import Image
root=Path(__file__).resolve().parents[1]
inventory=json.loads((root/'.validation/cloudflare-sources.json').read_text(encoding='utf-8'))
out=root/'.validation/cloudflare-art'
def encode(row):
    source=row['source']; original=(root/'public'/source.lstrip('/')).read_bytes()
    if source.endswith('.png'):
        image=Image.open(BytesIO(original)); pixels=image.convert('RGBA').tobytes(); profile=image.info.get('icc_profile')
        cache=root/'.validation/cloudflare-legacy-cache'; cache.mkdir(exist_ok=True)
        cached=cache/(sha256(original).hexdigest()+'.webp')
        if cached.exists(): encoded=cached.read_bytes()
        else:
            buffer=BytesIO(); options={'lossless':True,'method':6,'exact':True}
            if profile: options['icc_profile']=profile
            image.save(buffer,format='WEBP',**options); encoded=buffer.getvalue(); cached.write_bytes(encoded)
        check=Image.open(BytesIO(encoded))
        if check.size!=image.size or check.convert('RGBA').tobytes()!=pixels or check.info.get('icc_profile')!=profile: raise ValueError('Native pixel/profile mismatch '+source)
    else: encoded=original
    name=sha256(encoded).hexdigest()+'.webp'
    target=out/name
    if not target.exists(): target.write_bytes(encoded)
    elif target.read_bytes()!=encoded: raise ValueError('Content hash mismatch')
    return {'source':source,'target':'/art/'+name,'sourceBytes':len(original),'bytes':len(encoded),'sha256':sha256(encoded).hexdigest(),'converted':source.endswith('.png')}
rows=[]
with ThreadPoolExecutor(max_workers=4) as pool:
    for row in pool.map(encode,inventory['files']):
        rows.append(row)
        if len(rows)%250==0: print(f'Native delivery audit {len(rows)}/{len(inventory["files"])}',flush=True)
manifest={'format':1,'cards':inventory['cards'],'current':inventory['current'],'files':rows}
(root/'.validation/cloudflare-assets.json').write_text(json.dumps(manifest,separators=(',',':')),encoding='utf-8')
print(json.dumps({'sources':len(rows),'uniqueDeliveryFiles':len(set(r['target'] for r in rows)),'sourceBytes':sum(r['sourceBytes'] for r in rows),'deliveryBytes':sum({r['target']:r['bytes'] for r in rows}.values()),'convertedNativePNGs':sum(r['converted'] for r in rows)}),flush=True)
