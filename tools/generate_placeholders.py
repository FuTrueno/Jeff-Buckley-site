"""
Generates the four placeholder gallery images used by the redesign.

These stand in for photography you have not dropped in yet. Everything is
procedural, so the files are safe to delete. Re-run with:

    python tools/generate_placeholders.py

Requires Pillow + numpy (both ship with the harness runtime).
"""

from __future__ import annotations

import numpy as np
from PIL import Image, ImageFilter

OUT = "public/images"
W, H = 1400, 1050
rng = np.random.default_rng(7)


def radial(shape, cx, cy, rx, ry, power=2.0):
    """Normalised radial falloff field in [0, 1]."""
    h, w = shape
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xx - cx * w) / (rx * w)) ** 2 + ((yy - cy * h) / (ry * h)) ** 2)
    return np.clip(1.0 - d, 0.0, 1.0) ** power


def build(stops, blobs, seed, streak=None):
    global rng
    rng = np.random.default_rng(seed)
    h, w = H, W
    yy = np.linspace(0.0, 1.0, h)[:, None]
    xx = np.linspace(0.0, 1.0, w)[None, :]

    # Vertical base gradient between two colours
    (t0, c0), (t1, c1) = stops
    ramp = np.clip((yy - t0) / max(t1 - t0, 1e-6), 0, 1)
    img = np.stack(
        [c0[i] + (c1[i] - c0[i]) * ramp for i in range(3)], axis=-1
    ) * np.ones((1, w, 1))

    # Layered light
    for cx, cy, rx, ry, colour, gain, power in blobs:
        field = radial((h, w), cx, cy, rx, ry, power)[..., None]
        img += field * np.array(colour) * gain

    # Optional soft horizontal light streak
    if streak is not None:
        cy, thickness, colour, gain = streak
        band = np.exp(-((yy - cy) ** 2) / (2 * thickness**2))[..., None]
        img += band * np.array(colour) * gain

    # Gentle filmic lift and vignette
    vignette = 1.0 - 0.42 * radial((h, w), 0.5, 0.5, 0.95, 0.95, 2.4)
    img *= vignette[..., None]
    img = np.clip(img, 0, 1) ** 1.04

    # Downsample-then-upsample to get buttery gradients, then add grain
    small = Image.fromarray((img * 255).astype(np.uint8)).resize((w // 3, h // 3), Image.LANCZOS)
    img = np.asarray(small.resize((w, h), Image.BICUBIC)).astype(np.float32) / 255.0
    img = np.asarray(
        Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(0.6)
        )
    ).astype(np.float32) / 255.0

    noise = rng.normal(0, 0.022, (h, w, 1))
    img = np.clip(img + noise, 0, 1)

    # Slight warm/teal grade per image
    grade = np.array([1.04, 1.0, 0.94])
    img = np.clip(img * grade, 0, 1)
    return Image.fromarray((img * 255).astype(np.uint8))


INK = (0.020, 0.020, 0.026)
BROWN = (0.115, 0.092, 0.064)
STEEL = (0.048, 0.062, 0.088)
BRONZE = (0.78, 0.66, 0.42)
COOL = (0.32, 0.42, 0.58)

specs = [
    # 01 — warm orb, low horizon
    (
        "placeholder-01.jpg",
        ((0.0, INK), (1.0, BROWN)),
        [
            (0.30, 0.36, 0.42, 0.42, BRONZE, 1.20, 2.6),
            (0.78, 0.72, 0.34, 0.30, BRONZE, 0.55, 2.2),
        ],
        11,
        (0.63, 0.055, BRONZE, 0.48),
    ),
    # 02 — cool, vertical, dust
    (
        "placeholder-02.jpg",
        ((0.0, INK), (1.0, STEEL)),
        [
            (0.28, 0.24, 0.30, 0.44, COOL, 1.30, 2.2),
            (0.62, 0.70, 0.40, 0.34, BRONZE, 0.48, 3.0),
        ],
        23,
        None,
    ),
    # 03 — wide dusk horizon
    (
        "placeholder-03.jpg",
        ((0.0, INK), (1.0, (0.10, 0.075, 0.055))),
        [
            (0.58, 0.60, 0.60, 0.20, BRONZE, 1.05, 2.0),
            (0.22, 0.30, 0.34, 0.40, COOL, 0.55, 2.4),
        ],
        37,
        (0.52, 0.030, BRONZE, 0.72),
    ),
    # 04 — two quiet lights, square crop
    (
        "placeholder-04.jpg",
        ((0.0, INK), (1.0, (0.055, 0.05, 0.055))),
        [
            (0.36, 0.34, 0.22, 0.26, BRONZE, 1.05, 2.0),
            (0.70, 0.62, 0.20, 0.24, COOL, 0.80, 2.2),
        ],
        51,
        None,
    ),
]

if __name__ == "__main__":
    for name, stops, blobs, seed, streak in specs:
        build(stops, blobs, seed, streak).save(f"{OUT}/{name}", quality=88, optimize=True)
        print("wrote", f"{OUT}/{name}")
