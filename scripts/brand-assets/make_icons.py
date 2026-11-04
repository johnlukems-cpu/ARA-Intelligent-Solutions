"""Favicon, Apple touch icon and structured-data logo from the ARA wordmark
(no macaw). Usage: python3 scripts/brand-assets/make_icons.py  (from the repo root)"""
from PIL import Image, ImageDraw

wordmark = Image.open("src/assets/images/ara-wordmark.webp").convert("RGBA")
MIDNIGHT = (6, 23, 46, 255)


def icon(size, out, radius_ratio, width_ratio):
    scale = 4  # supersample for smooth edges
    S = size * scale
    canvas = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, S - 1, S - 1), radius=int(S * radius_ratio), fill=255)
    bg = Image.new("RGBA", (S, S), MIDNIGHT)
    canvas.paste(bg, (0, 0), mask)
    w = int(S * width_ratio)
    h = round(w * wordmark.height / wordmark.width)
    wm = wordmark.resize((w, h), Image.LANCZOS)
    canvas.alpha_composite(wm, ((S - w) // 2, (S - h) // 2))
    canvas.resize((size, size), Image.LANCZOS).save(out, optimize=True)


icon(64, "src/app/icon.png", 0.22, 0.86)
icon(180, "src/app/apple-icon.png", 0.0, 0.78)  # iOS rounds the corners itself
icon(192, "public/images/ara-emblem-192.png", 0.0, 0.8)
