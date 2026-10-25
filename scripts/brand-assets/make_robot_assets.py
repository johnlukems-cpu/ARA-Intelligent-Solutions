"""Generate the website's robot images from the ARA robot artwork.

The ARA logo (with the macaw) and the favicons are NOT generated here; they
stay unchanged (see make_logo_dark.py).

Inputs (the three supplied 1536x1024 artworks):
  9.webp   promo with the "ARA | INTELLIGENT SOLUTIONS" wordmark and robot
  10.webp  AI-medewerkers infographic (robot per specialisation)
  11.webp  robot at a laptop with service icons (no text)

Usage: python3 make_robot_assets.py <9.webp> <10.webp> <11.webp> <repo-root>
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

src9, src10, src11, root = sys.argv[1:5]
root = Path(root)
assets = root / "src/assets/images"
im9 = Image.open(src9).convert("RGB")
im10 = Image.open(src10).convert("RGB")
im11 = Image.open(src11).convert("RGB")


def feathered(img, edge_frac=0.06):
    """Keep the artwork's own background but fade its outer edges into transparency."""
    w, h = img.size
    m = Image.new("L", (w, h), 255)
    e = int(min(w, h) * edge_frac)
    mask = np.ones((h, w))
    ramp = np.linspace(0, 1, e)
    ramp = ramp * ramp * (3 - 2 * ramp)
    mask[:, :e] *= ramp[None, :]
    mask[:, w - e:] *= ramp[None, ::-1]
    mask[:e, :] *= ramp[:, None]
    mask[h - e:, :] *= ramp[::-1, None]
    out = img.convert("RGBA")
    out.putalpha(Image.fromarray((mask * 255).astype(np.uint8)))
    return out


# 2. Homepage hero: the full robot artwork with its own background, soft edges.
feathered(im11).save(assets / "robot-hero.webp", "WEBP", quality=88, alpha_quality=90, method=6)

# 3. Robot with service tiles (from the promo, without its headline text).
im9.crop((768, 70, 1536, 636)).save(assets / "robot-services.webp", "WEBP", quality=86, method=6)

# 4. AI-medewerkers: process robot (top of the infographic) and one robot per specialisation.
im10.crop((600, 0, 1240, 392)).save(assets / "robot-ai-process.webp", "WEBP", quality=86, method=6)
for name, (x0, x1) in {
    "administrative": (4, 304),
    "customer-service": (314, 609),
    "sales": (620, 918),
    "finance": (929, 1225),
    "operations": (1236, 1532),
}.items():
    im10.crop((x0, 400, x1, 556)).save(assets / f"robot-{name}.webp", "WEBP", quality=86, method=6)

# 5. Social preview image (the promo artwork).
im9.crop((0, 0, 1536, 803)).resize((1200, 628), Image.LANCZOS).save(root / "public/og/ara-og.jpg", "JPEG", quality=86)
print("done")
