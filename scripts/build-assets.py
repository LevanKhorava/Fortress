#!/usr/bin/env python3
"""
Regenerates every processed image in src/assets from the club's source plates.

The source photography lives in the Anano-simonishvili project (the club's
existing brand material). Nothing in src/assets is hand-edited — run this script
to rebuild it all, so the derived art is reproducible rather than a pile of
one-off exports.

What it produces
----------------
howard-figure.webp  the #12 plate cropped away from its baked-in headline type
                    and feathered to transparent on all four edges, so it melts
                    into the page's black instead of sitting in a box.
player-howard.jpg   the same plate framed 760x1000 for the roster card.
arena-duotone.jpg   the empty-arena plate mapped onto the club's orange/black
crowd-duotone.jpg   ramp. The source lighting is teal/magenta, which is off
arena-deep.jpg      brand, so luminance is remapped through EMBER_RAMP.
grid-1..6.jpg       six distinct 760x1000 portrait crops used as roster-card
                    backdrops behind the numeral treatment.
grain.png           200x200 tileable noise for the film-grain overlay.
og-image.jpg        1200x630 social card.

Usage:  python3 scripts/build-assets.py
Requires Pillow and numpy (dev-machine only — none of this runs at build time).
"""

from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import os

SRC = os.environ.get(
    "FORTRESS_SRC", "/Users/user/Desktop/Anano-simonishvili/src/assets/"
)
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "assets") + "/"

# Black -> ember -> hot highlight. Everything on the page is graded to this.
EMBER_RAMP = [
    (0.00, (4, 3, 3)),
    (0.18, (20, 11, 6)),
    (0.38, (74, 30, 10)),
    (0.58, (158, 63, 16)),
    (0.76, (230, 101, 26)),
    (0.90, (255, 150, 62)),
    (1.00, (255, 216, 176)),
]


def _lut():
    xs = np.array([s[0] for s in EMBER_RAMP])
    cs = np.array([s[1] for s in EMBER_RAMP], dtype=float)
    t = np.linspace(0, 1, 256)
    return np.stack([np.interp(t, xs, cs[:, i]) for i in range(3)], axis=1)


LUT = _lut()


def duotone(img, gamma=1.0, lo=0.0, hi=1.0):
    """Map luminance through EMBER_RAMP. lo/hi stretch levels before the map."""
    a = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0
    l = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    l = np.clip((l - lo) / max(1e-6, (hi - lo)), 0, 1) ** gamma
    return Image.fromarray(np.clip(LUT[(l * 255).astype(np.uint8)], 0, 255).astype(np.uint8))


def fit_w(img, w):
    return img if img.width <= w else img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)


def feather(img, left=0.0, right=0.0, top=0.0, bottom=0.0, power=1.6):
    """Fade edges to transparent so a rectangular crop reads as a cut-out."""
    img = img.convert("RGBA")
    w, h = img.size
    a = np.ones((h, w), dtype=np.float32)
    for amount, axis, flip in ((left, 1, False), (right, 1, True), (top, 0, False), (bottom, 0, True)):
        if amount <= 0:
            continue
        span = max(1, int((w if axis else h) * amount))
        ramp = (np.linspace(1, 0, span) if flip else np.linspace(0, 1, span)) ** power
        if axis:
            a[:, w - span:] *= ramp[None, :] if flip else 1
            if not flip:
                a[:, :span] *= ramp[None, :]
        else:
            if flip:
                a[h - span:, :] *= ramp[:, None]
            else:
                a[:span, :] *= ramp[:, None]
    arr = np.asarray(img).copy()
    arr[..., 3] = (arr[..., 3].astype(np.float32) * a).astype(np.uint8)
    return Image.fromarray(arr)


def save_jpg(img, name, q=86):
    p = OUT + name
    img.convert("RGB").save(p, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"{name:24s} {img.size} {os.path.getsize(p) // 1024}KB")


def main():
    os.makedirs(OUT, exist_ok=True)
    howard = Image.open(SRC + "howard.png").convert("RGB")
    court = Image.open(SRC + "court.png").convert("RGB")
    crowd = Image.open(SRC + "crowd.png").convert("RGB")
    hw, hh = howard.size

    # The source plate has "DWIGHT HOWARD 12" and "WELCOME TO THE FORTRESS" burnt
    # into it. This window is the only region free of that type.
    fig = howard.crop((int(0.213 * hw), 0, int(0.508 * hw), hh))
    fig = feather(ImageEnhance.Contrast(fig).enhance(1.06), left=0.16, right=0.07, top=0.05, bottom=0.13, power=1.5)
    fig.save(OUT + "howard-figure.webp", "WEBP", quality=84, method=6)
    print(f"{'howard-figure.webp':24s} {fig.size} {os.path.getsize(OUT + 'howard-figure.webp') // 1024}KB")

    card = howard.crop((int(0.225 * hw), int(0.02 * hh), int(0.505 * hw), int(0.92 * hh)))
    card = card.resize((760, round(760 * card.height / card.width)), Image.LANCZOS).crop((0, 0, 760, 1000))
    save_jpg(ImageEnhance.Contrast(card).enhance(1.05), "player-howard.jpg", 88)

    save_jpg(duotone(fit_w(court, 2200), gamma=1.15, lo=0.02, hi=0.72), "arena-duotone.jpg", 84)
    save_jpg(duotone(fit_w(crowd, 2200), gamma=1.25, lo=0.02, hi=0.80), "crowd-duotone.jpg", 84)
    save_jpg(duotone(fit_w(court, 2000), gamma=1.90, lo=0.03, hi=0.95), "arena-deep.jpg", 82)

    def portrait(src, fx, fy, fw, gamma, name):
        w, h = src.size
        bw = int(fw * w)
        bh = int(bw * 1000 / 760)
        x = max(0, min(int(fx * w), w - bw))
        y = max(0, min(int(fy * h), h - bh))
        crop = src.crop((x, y, x + bw, y + bh)).resize((760, 1000), Image.LANCZOS)
        save_jpg(duotone(crop, gamma=gamma, lo=0.02, hi=0.78), name, 82)

    portrait(court, 0.06, 0.18, 0.20, 1.30, "grid-1.jpg")
    portrait(court, 0.40, 0.02, 0.18, 1.10, "grid-2.jpg")
    portrait(court, 0.33, 0.10, 0.19, 1.05, "grid-3.jpg")
    portrait(crowd, 0.10, 0.06, 0.20, 1.45, "grid-4.jpg")
    portrait(crowd, 0.62, 0.10, 0.20, 1.40, "grid-5.jpg")
    portrait(crowd, 0.34, 0.14, 0.20, 1.25, "grid-6.jpg")

    rng = np.random.default_rng(7)
    n = 200
    g = np.asarray(
        Image.fromarray(rng.normal(128, 26, (n, n)).clip(0, 255).astype(np.uint8), "L").filter(
            ImageFilter.GaussianBlur(0.4)
        )
    ).astype(np.float32)
    grain = np.zeros((n, n, 4), dtype=np.uint8)
    grain[..., 0] = grain[..., 1] = grain[..., 2] = np.where(g > 128, 255, 0)
    grain[..., 3] = (np.abs(g - 128) / 128 * 150).clip(0, 255).astype(np.uint8)
    Image.fromarray(grain, "RGBA").save(OUT + "grain.png", "PNG", optimize=True)
    print(f"{'grain.png':24s} (200, 200) {os.path.getsize(OUT + 'grain.png') // 1024}KB")

    og = fit_w(howard, 1200)
    top = max(0, (og.height - 630) // 2)
    save_jpg(og.crop((0, top, 1200, top + 630)), "og-image.jpg", 84)


if __name__ == "__main__":
    main()
