from pathlib import Path
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parents[1]
p = root / 'public/artwork/v4/collection'
original = Image.open(p / 'dream-025-original-v4.png').convert('RGB')
source = Image.open(p / 'dream-025-altered-source-v4.png').convert('RGB')
o, a = np.asarray(original), np.asarray(source)
fixed = a.copy()
# Native source alignment only: preserve the inverted heart and map its three
# string trajectories onto Dream's strings. No generated pixels or resizing.
# Anchors measured on the exposed strings above and below the authored patch.
for y in range(263, 385):
    t = (y - 263) / 122
    dst = np.array([254, 294 - 2*t, 310 - t, 326 - t, 352])
    src = np.array([254, 293 - t, 309 - 3*t, 325 - 4*t, 352])
    xs = np.arange(254, 352)
    sx = np.interp(xs, dst, src)
    fixed[y, 254:352] = np.stack([np.interp(sx, np.arange(1672), a[y, :, channel]) for channel in range(3)], axis=1).round().astype(np.uint8)
    # Exact reference pixels at the clipping seam, outside either heart.
    if y < 268:
        fixed[y, 254:352] = o[y, 254:352]
    elif y >= 378:
        mix = (y - 378) / 6
        fixed[y, 254:352] = np.rint((1-mix)*fixed[y, 254:352] + mix*o[y, 254:352]).astype(np.uint8)
target = p / 'dream-025-heart-strings-source-v2.png'
Image.fromarray(fixed).save(target)
assert fixed.shape == a.shape == o.shape == (941, 1672, 3)
outside = np.ones(a.shape[:2], dtype=bool)
outside[263:385, 254:352] = False
assert np.array_equal(fixed[outside], a[outside])
# Native comparison for inspection, including enough string length to see seams.
proof = Image.new('RGB', (660, 500))
for i, img in enumerate([original, source, Image.fromarray(fixed)]):
    proof.paste(img.crop((245, 245, 355, 495)).resize((220, 500)), (220*i, 0))
proof.save(root / '.validation/violin-string-proof.png')
print(target)


