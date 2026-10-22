"""Hero macaw image from the original brand cover (4.webp, 1600x900).

- Crop x 0..780: the complete bird (beak tip at x~650) plus clear sky to the
  right of the head, so the head never sits against the image edge.
- Remove the baked-in brand swoosh/text fragments that fall inside the crop by
  filling them from the surrounding dark sky (normalised convolution).
- Fade only bird-free edges into transparency (shows the hero's navy
  background): a short left fade (gentle beside the wing tips, which the source
  frame already touches), light top/bottom fades and a narrow right fade.

Usage: python3 make_hero.py <4.webp> <out.webp>
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
CROP_W = 780
im = np.array(Image.open(src).convert("RGB")).astype(np.float64)[:, :CROP_W]
H, W, _ = im.shape
r, g, b = im[..., 0], im[..., 1], im[..., 2]
L = 0.2126 * r + 0.7152 * g + 0.0722 * b
yy, xx = np.mgrid[0:H, 0:W]

# 1. Foreign (baked-in logo/text) pixels: bright or cyan/blue-saturated, not foliage.
region = ((xx >= 575) & (yy >= 290) & (yy <= 650)) | ((xx >= 680) & (yy >= 185) & (yy <= 650))
greenish = (g > b) & (g > r)
foreign = region & (((L > 60) & ~greenish) | ((b > 110) & (b > g + 10)))
# Right of the head there is only sky: rebuild that whole block for a clean result.
foreign |= (xx >= 690) & (yy >= 185) & (yy <= 655)
foreign |= (xx >= 600) & (yy >= 290) & (yy <= 555)  # sky between the bird's chest and the old logo
foreign |= (xx >= 585) & (yy >= 572) & (yy <= 638)  # old tagline row
foreign |= (xx >= 590) & (yy >= 548) & (yy <= 562) & (L > 45) & (b > g + 15)  # divider line
mask = np.array(Image.fromarray((foreign * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(11))) > 0


def blur(a, radius):
    k = np.exp(-0.5 * (np.arange(-3 * radius, 3 * radius + 1) / radius) ** 2)
    k /= k.sum()
    a = np.apply_along_axis(lambda v: np.convolve(v, k, mode="same"), 0, a)
    return np.apply_along_axis(lambda v: np.convolve(v, k, mode="same"), 1, a)


def sky_fill(img, mask):
    """Fill each vertical run of masked pixels with a smooth gradient between the
    valid colour just above and the colour just below (kept dark, so leaves below
    never tint the sky)."""
    out = img.copy()
    dark = np.array([10.0, 28.0, 58.0])
    for x in range(img.shape[1]):
        col = mask[:, x]
        y = 0
        while y < len(col):
            if not col[y]:
                y += 1
                continue
            y0 = y
            while y < len(col) and col[y]:
                y += 1
            y1 = y  # run is [y0, y1)
            top = img[max(y0 - 6, 0):y0, x].mean(axis=0) if y0 > 0 else dark
            bot = img[y1:y1 + 6, x].mean(axis=0) if y1 < len(col) else dark
            if 0.2126 * bot[0] + 0.7152 * bot[1] + 0.0722 * bot[2] > 45 or bot[1] > bot[2]:
                bot = dark
            t = np.linspace(0, 1, y1 - y0)[:, None]
            t = t * t * (3 - 2 * t)
            out[y0:y1, x] = top * (1 - t) + bot * t
    return out


fill = sky_fill(im, mask)
fill = np.stack([blur(fill[..., c], 10) for c in range(3)], axis=-1)  # remove column-to-column noise


def match_left_seam(fill, img, mask, span=80):
    """Carry each row's real sky colour across the left edge of a filled run,
    decaying over `span` px, so the rebuilt sky has no tonal step."""
    decay = np.linspace(1, 0, span)[:, None]
    for y in range(mask.shape[0]):
        row = mask[y]
        starts = np.where(row[1:] & ~row[:-1])[0] + 1
        for x0 in starts:
            ref = img[y, max(x0 - 4, 0):x0].mean(axis=0)
            if ref[1] > ref[2] or 0.2126 * ref[0] + 0.7152 * ref[1] + 0.0722 * ref[2] > 90:
                continue  # boundary is foliage or bird: don't pull that colour into the sky
            n = min(span, mask.shape[1] - x0)
            fill[y, x0:x0 + n] += (ref - fill[y, x0]) * decay[:n]
    return fill


fill = match_left_seam(fill, im, mask)
fill = np.stack([blur(fill[..., c], 3) for c in range(3)], axis=-1)
fill += np.random.default_rng(7).normal(0, 1.8, fill.shape)  # keep a little grain
soft = blur(mask.astype(np.float64), 10).clip(0, 1)
soft = np.maximum(soft, mask)[..., None]
im = im * (1 - soft) + fill * soft


# 2. Edge fades into transparency, only where there is no bird.
def ramp(n):  # 1 at the edge -> 0 inward (smoothstep)
    t = np.linspace(1, 0, n)
    return t * t * (3 - 2 * t)


wing = ((np.arange(H) >= 0.48 * H) & (np.arange(H) <= 0.64 * H)).astype(np.float64)
wing = np.convolve(wing, np.ones(41) / 41, mode="same")
fade = np.zeros((H, W))
FL, FL_WING = 110, 28
left_full = (1 - wing)[:, None] * ramp(FL)[None, :]
left_wing = np.zeros((H, FL))
left_wing[:, :FL_WING] = wing[:, None] * 0.6 * ramp(FL_WING)[None, :]
fade[:, :FL] = np.maximum(left_full, left_wing)
FR, FT, FB = 45, 40, 80  # head starts at y~55, feet end at y~750
fade[:, W - FR:] = np.maximum(fade[:, W - FR:], ramp(FR)[::-1][None, :])
fade[:FT, :] = np.maximum(fade[:FT, :], 0.8 * ramp(FT)[:, None])
fade[H - FB:, :] = np.maximum(fade[H - FB:, :], ramp(FB)[::-1][:, None])

rgba = np.dstack([im.clip(0, 255), ((1 - fade) * 255).clip(0, 255)]).astype(np.uint8)
Image.fromarray(rgba, "RGBA").save(out, "WEBP", quality=90, alpha_quality=90, method=6)
print("size", W, H)
