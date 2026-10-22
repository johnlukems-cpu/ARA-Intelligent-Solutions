"""Hero macaw image from the original brand cover (4.webp).
- Crop wide enough to include the complete bird (beak tip at x~655).
- Remove the baked-in brand text/swoosh fragments at the right edge by filling
  them from the surrounding dark sky (normalised convolution).
- Feather the edges into transparency (alpha), only where there is no bird, so
  the real hero background shows through. Output is an RGBA WebP."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
im = np.array(Image.open(src).convert("RGB")).astype(np.float64)[:, :690]
H, W, _ = im.shape
r, g, b = im[..., 0], im[..., 1], im[..., 2]
L = 0.2126 * r + 0.7152 * g + 0.0722 * b
yy, xx = np.mgrid[0:H, 0:W]
region = (xx >= 575) & (yy >= 320) & (yy <= 650)
greenish = (g > b) & (g > r)
foreign = region & (((L > 70) & ~greenish) | ((b > 120) & (b > g + 10)))
foreign |= (xx >= 590) & (yy >= 548) & (yy <= 562) & (L > 45) & (b > g + 15)  # divider line
mask = np.array(Image.fromarray((foreign * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))) > 0

# Normalised convolution fill: average of the surrounding valid pixels.
valid = (~mask).astype(np.float64)
def blur(a, radius):
    k = np.exp(-0.5 * (np.arange(-3 * radius, 3 * radius + 1) / radius) ** 2); k /= k.sum()
    a = np.apply_along_axis(lambda v: np.convolve(v, k, mode="same"), 0, a)
    return np.apply_along_axis(lambda v: np.convolve(v, k, mode="same"), 1, a)
fill = np.zeros_like(im)
den = blur(valid, 18) + 1e-6
for c in range(3):
    fill[..., c] = blur(im[..., c] * valid, 18) / den
rng = np.random.default_rng(7)
fill += rng.normal(0, 2.0, fill.shape)  # keep a little grain so the fill isn't plasticky
soft = blur(mask.astype(np.float64), 3).clip(0, 1)[..., None]
soft = np.maximum(soft, mask[..., None])
im = im * (1 - soft) + fill * soft

# Edge feathering into transparency, only where there is no bird:
# left edge above/below the wing tips (which touch the source's left border),
# the right edge beyond the beak tip (x~655), above the head and below the feet.
def ramp(n):  # 1 at the edge -> 0 inward, smooth
    t = np.linspace(1, 0, n); return t * t * (3 - 2 * t)
fade = np.zeros((H, W))
rows = np.ones(H)
rows[(np.arange(H) >= 0.44 * H) & (np.arange(H) <= 0.70 * H)] = 0
rows = np.convolve(rows, np.ones(41) / 41, mode="same")  # soften transitions around the wing
FL, FR, FT, FB = 120, 30, 45, 90  # head starts at y~55, feet end at y~750
fade[:, :FL] = np.maximum(fade[:, :FL], rows[:, None] * ramp(FL)[None, :])
fade[:, W - FR:] = np.maximum(fade[:, W - FR:], ramp(FR)[::-1][None, :])
fade[:FT, :] = np.maximum(fade[:FT, :], ramp(FT)[:, None])
fade[H - FB:, :] = np.maximum(fade[H - FB:, :], ramp(FB)[::-1][:, None])
alpha = 1 - fade

# Narrow left margin: a soft, semi-transparent blurred bleed next to the wing tips
# so the source's hard left border doesn't read as a cut.
LEFT = 60
base = Image.fromarray(im.clip(0, 255).astype(np.uint8))
bleed = np.array(base.crop((0, 0, LEFT, H)).transpose(Image.FLIP_LEFT_RIGHT).filter(ImageFilter.GaussianBlur(14))).astype(np.float64)
m_alpha = ((1 - rows)[:, None] * 0.55 * ramp(LEFT)[None, ::-1]) * (1 - fade[:, :1])
rgb = np.concatenate([bleed, im], axis=1)
a = np.concatenate([m_alpha, alpha], axis=1)
rgba = np.dstack([rgb.clip(0, 255), (a * 255).clip(0, 255)]).astype(np.uint8)
Image.fromarray(rgba, "RGBA").save(out, "WEBP", quality=88, alpha_quality=90, method=6)
print("size", rgba.shape[1], rgba.shape[0])
