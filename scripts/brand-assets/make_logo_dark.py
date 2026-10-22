"""Derive a transparent, dark-background variant of the original ARA logo (1.webp).
Only the white background is removed and the navy lettering is turned white;
the macaw artwork and the logo proportions are untouched."""
import sys
import numpy as np
from PIL import Image, ImageFilter
from collections import deque

src, out = sys.argv[1], sys.argv[2]
im = np.array(Image.open(src).convert("RGB")).astype(np.float64)
H, W, _ = im.shape

# 1. Background: near-white pixels connected to the border, plus large enclosed
#    white areas (letter counters) outside the macaw's face.
white = im.min(axis=2) > 238
labels = np.zeros((H, W), np.int32)
comp_info = []
lab = 0
for y0 in range(H):
    for x0 in range(W):
        if white[y0, x0] and labels[y0, x0] == 0:
            lab += 1
            q = deque([(y0, x0)]); labels[y0, x0] = lab
            xs = []; ys = []; border = False
            while q:
                y, x = q.popleft(); xs.append(x); ys.append(y)
                if y in (0, H - 1) or x in (0, W - 1): border = True
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < H and 0 <= nx < W and white[ny, nx] and labels[ny, nx] == 0:
                        labels[ny, nx] = lab; q.append((ny, nx))
            comp_info.append((lab, border, len(xs), min(xs), max(xs), min(ys), max(ys)))

FACE = (520, 40, 700, 250)  # x0, y0, x1, y1 — macaw's white face patch and eye
bg_labels = []
for lab_, border, area, x0, x1, y0, y1 in comp_info:
    in_face = x0 >= FACE[0] and x1 <= FACE[2] and y0 >= FACE[1] and y1 <= FACE[3]
    if border or not in_face:
        bg_labels.append(lab_)
bg = np.isin(labels, bg_labels)

# 2. Alpha: background transparent; colour-to-alpha (against white) on the
#    anti-aliased fringe next to the background.
fringe = np.array(Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))) > 0
alpha = np.ones((H, W))
f = fringe & ~bg
a = ((255 - im[f]) / 255).max(axis=1).clip(0.001, 1)
im[f] = ((im[f] - 255 * (1 - a[:, None])) / a[:, None]).clip(0, 255)
alpha[f] = a
alpha[bg] = 0

# 3. Recolour the navy lettering to white, never the macaw.
#    Dark-blue regions are found on the ORIGINAL pixels. A region is lettering
#    when it is mostly the exact navy of the type, or lies entirely below/right
#    of the area the bird can occupy. Feather shadows and the beak never qualify.
orig = np.array(Image.open(src).convert("RGB")).astype(np.float64)
Lo = 0.2126 * orig[..., 0] + 0.7152 * orig[..., 1] + 0.0722 * orig[..., 2]
dark = (Lo < 100) & (orig[..., 2] >= orig[..., 1]) & (orig[..., 2] > orig[..., 0] + 15)
near_navy = ((orig - np.array([2.0, 37.0, 85.0])) ** 2).sum(axis=2) < 25 ** 2
dlab = np.zeros((H, W), np.int32); n = 0; letter_ids = []
for y0 in range(H):
    for x0 in range(W):
        if dark[y0, x0] and not dlab[y0, x0]:
            n += 1; q = deque([(y0, x0)]); dlab[y0, x0] = n
            cnt = navy_cnt = 0; xmin = ymin = 10 ** 6
            while q:
                y, x = q.popleft(); cnt += 1; navy_cnt += near_navy[y, x]
                xmin = min(xmin, x); ymin = min(ymin, y)
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < H and 0 <= nx < W and dark[ny, nx] and not dlab[ny, nx]:
                        dlab[ny, nx] = n; q.append((ny, nx))
            if navy_cnt / cnt >= 0.3 or (ymin >= 300 and xmin >= 330) or (ymin >= 545 and xmin >= 268):
                letter_ids.append(n)
letters = np.isin(dlab, letter_ids)
letters = np.array(Image.fromarray(letters.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(5))) > 0
# Luminance-based: navy -> white, bright blue/cyan kept, smooth gradients in between.
L = 0.2126 * im[..., 0] + 0.7152 * im[..., 1] + 0.0722 * im[..., 2]
w = (np.clip((100 - L) / (100 - 45), 0, 1) * letters)[..., None]
im = im * (1 - w) + 255 * w

# 4. Crop to the logo lockup (macaw, ARA, INTELLIGENT SOLUTIONS, service line);
#    the separate tagline row below is not part of the mark.
rgba = np.dstack([im, alpha * 255]).clip(0, 255).astype(np.uint8)
ys, xs = np.where(alpha[:715] > 0.05)
pad = 10
box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad, W), min(ys.max() + pad, 715))
img = Image.fromarray(rgba, "RGBA").crop(box)
img.save(out, "WEBP", lossless=False, quality=92, alpha_quality=100, method=6)
print("box", box, "size", img.size)
