"""ARA wordmark without the macaw, derived from the dark logo variant.
The R and the last A are the original pixels; the first A (fused with the
macaw in the artwork) is a copy of the last A.
Usage: python3 make_wordmark.py src/assets/images/ara-logo-dark.webp out.png"""
import numpy as np
from PIL import Image
import sys
src = sys.argv[1]
im = np.array(Image.open(src)).astype(np.float64)
H, W, _ = im.shape
yy, xx = np.mgrid[0:H, 0:W]
band = (yy >= 215) & (yy < 520)
# R and last A stay exactly as in the original.
r_cut = np.maximum(615, 674 + 0.65 * (yy - 420) - 6)
keep_right = band & (xx >= r_cut)
# Last A, separated from the R leg by a line parallel to its left outer edge.
a3_cut = 1098 - 0.75 * (yy - 360) - 4
rr, gg, bb = im[..., 0], im[..., 1], im[..., 2]
r_leg_tip = (xx < 1110) & (yy > 440) & (gg > rr + 60) & (gg > bb - 40)
a3 = band & (xx >= a3_cut) & ~r_leg_tip
out = np.zeros_like(im)
out[keep_right] = im[keep_right]
# First A = copy of the last A, shifted so its right leg ends where the original first A ended.
DX = -810
ys, xs = np.nonzero(a3)
xt = xs + DX
ok = (xt >= 0) & (xt < W)
out[ys[ok], xt[ok]] = im[ys[ok], xs[ok]]
# Complete the straight outer edge of the copied A's left leg where the R leg was cut away.
import math
for y in range(400, 520):
    edge = 1098 - 0.75 * (y - 360) + DX
    row = out[y, :, 3]
    xs_op = np.nonzero(row[int(edge) - 2:int(edge) + 120] > 200)[0]
    if not len(xs_op):
        continue
    first = int(edge) - 2 + xs_op[0]
    for x in range(int(math.floor(edge)) + 1, first + 6):
        out[y, x] = [255, 255, 255, 255]
    for x in range(int(math.floor(edge)), int(math.floor(edge)) + 1):
        cov = min(1.0, max(0.0, x + 1 - edge))
        if out[y, x, 3] < cov * 255:
            out[y, x] = [255, 255, 255, cov * 255]
# Crop to the wordmark.
alpha = out[..., 3] > 10
ys2, xs2 = np.nonzero(alpha)
y0, y1, x0, x1 = ys2.min(), ys2.max() + 1, xs2.min(), xs2.max() + 1
print('bbox', x0, y0, x1, y1)
crop = Image.fromarray(out[y0:y1, x0:x1].astype(np.uint8))
crop.save(sys.argv[2])
