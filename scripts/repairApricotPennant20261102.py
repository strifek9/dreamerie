from pathlib import Path
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1]; p=root/'public/artwork/v4/collection'
original=Image.open(p/'dream-039-original-v4.png').convert('RGB'); source=Image.open(p/'dream-039-altered-source-v4.png').convert('RGB')
o=np.asarray(original); a=np.asarray(source); fixed=o.copy()
# Native recomposition only. Bring the pennant's edge back onto its original
# trajectory at the clipping seam; retain the full folded attachment and rope.
for x in range(299,361):
 for y in range(292,355):
  shift=6*max(0,1-(x-299)/28)*min(1,max(0,(y-299)/15))
  sy=y-shift; lo=int(sy); t=sy-lo
  pixel=(1-t)*a[lo,x]+t*a[lo+1,x]
  alpha=min(1,(x-299)/7,(361-x)/5,(y-292)/5,(355-y)/(7 if x<320 else 1))
  fixed[y,x]=np.rint(pixel*alpha+o[y,x]*(1-alpha))
assert fixed.shape==(941,1672,3)
outside=np.ones((941,1672),dtype=bool);outside[292:355,299:361]=False
assert np.array_equal(fixed[outside],o[outside])
Image.fromarray(fixed).save(p/'dream-039-pennant-connected-v2.png',icc_profile=original.info.get('icc_profile',b''))
proof=Image.new('RGB',(1000,500))
for i,img in enumerate([original,Image.fromarray(fixed)]):proof.paste(img.crop((275,280,375,380)).resize((500,500)),(i*500,0))
proof.save(root/'.validation/apricot-pennant-proof.png')
