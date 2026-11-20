// Crops every team headshot to the same framing as Arfan's, so heads and crossed-arm elbows sit at
// the same height on every card, with each person centered. Writes square crops to public/Headshots/cards/.
//
// Run with: node scripts/crop-headshots.mjs
//
// To add a new headshot, open it with a grid over it and note, as fractions of the original photo:
//   top   - top of the hair (fraction of height)
//   elbow - outer point of the crossed-arm elbow (fraction of height)
//   center - horizontal middle of the body: halfway between the outer edges of the shirt and sleeves
//            at chest-to-elbow height (fraction of width)
// then add a line below, point the member's `photo` in site.ts at "/Headshots/cards/<name>.jpg" and
// run the script; it writes the crop under a content-hashed name and updates site.ts to match.
//
// Optional per-photo tweak: zoom > 1 zooms out (person smaller), < 1 zooms in. The head top stays put
// and the elbow moves, for people who stood much closer to or farther from the camera. headAt
// overrides where the head top lands (default TARGET.top), to fit someone zoomed out a lot. wall
// is the width of clean wall at the photo's sides (fraction of width): side padding is then mirrored
// in steps no wider than that, for people who stood so close that one big mirror would reflect their
// own elbow back into the card.

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const SRC = "public/Headshots";
const OUT = "public/Headshots/cards";
const SITE = "src/content/site.ts";
const SIZE = 800;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
let site = fs.readFileSync(SITE, "utf8");

// Arfan's head and elbow heights, with everyone centered left to right.
const TARGET = { top: 0.04, elbow: 0.845, center: 0.5 };

const landmarks = {
  "arfan.jpg": { top: 0.04, elbow: 0.845, center: 0.496 },
  "aaron.jpg": { top: 0.086, elbow: 0.81, center: 0.514 },
  "abel.jpg": { top: 0.142, elbow: 0.79, center: 0.489 },
  "alex e.jpg": { top: 0.113, elbow: 0.8, center: 0.487 },
  "alex s.jpg": { top: 0.107, elbow: 0.75, center: 0.489 },
  "alex w.jpg": { top: 0.095, elbow: 0.74, center: 0.507 },
  "amalan.jpg": { top: 0.06, elbow: 0.87, center: 0.527 },
  "ben.jpg": { top: 0.033, elbow: 0.89, center: 0.487 },
  "cam.jpg": { top: 0.099, elbow: 0.629, center: 0.516 },
  "colby.jpg": { top: 0.098, elbow: 0.87, center: 0.495 },
  "emma.jpg": { top: 0.078, elbow: 0.82, center: 0.496 },
  "henry.jpg": { top: 0.082, elbow: 0.85, center: 0.49 },
  "jay.jpg": { top: 0.069, elbow: 0.806, center: 0.502 },
  "jb.jpg": { top: 0.1, elbow: 0.74, center: 0.498 },
  "joey.jpg": { top: 0.067, elbow: 0.84, center: 0.508 },
  "matt r.jpg": { top: 0.184, elbow: 0.571, center: 0.517, zoom: 1.385, headAt: 0.08 },
  "maya.jpg": { top: 0.057, elbow: 0.8, center: 0.522 },
  "nick.jpg": { top: 0.122, elbow: 0.72, center: 0.512, zoom: 1.345, headAt: 0.12 },
  "theo.jpg": { top: 0.045, elbow: 0.79, center: 0.485 },
  "yulin.jpg": { top: 0.032, elbow: 0.83, center: 0.471 },
  "zayd.jpg": { top: 0.055, elbow: 0.83, center: 0.506 },
  "aiden.jpg": { top: 0.1, elbow: 0.69, center: 0.5 },
  "amelie.jpg": { top: 0.09, elbow: 0.62, center: 0.5 },
  "bennet.jpg": { top: 0.095, elbow: 0.74, center: 0.5 },
  "charlie.jpg": { top: 0.135, elbow: 0.77, center: 0.55 },
  "gennaro.jpg": { top: 0.095, elbow: 0.74, center: 0.5 },
  "imran.jpg": { top: 0.075, elbow: 0.73, center: 0.52 },
  "kimmy.jpg": { top: 0.1, elbow: 0.64, center: 0.5 },
  "matt s.jpg": { top: 0.095, elbow: 0.83, center: 0.515, wall: 0.06 },
  "ryan.jpg": { top: 0.12, elbow: 0.86, center: 0.505, wall: 0.06 },
  "driver.jpg": { top: 0.035, elbow: 0.85, center: 0.47 },
};

for (const [file, mark] of Object.entries(landmarks)) {
  const input = sharp(path.join(SRC, file)).rotate();
  const { width: W, height: H } = await input.metadata();

  // Square crop size that puts head top and elbow at the target heights, then its top-left corner.
  const S = Math.round((((mark.elbow - mark.top) * H) / (TARGET.elbow - TARGET.top)) * (mark.zoom ?? 1));
  const x0 = Math.round(mark.center * W - TARGET.center * S);
  const y0 = Math.round(mark.top * H - (mark.headAt ?? TARGET.top) * S);

  // A zoomed-out crop can run past the photo's edges: mirror the wall at the top and sides, and
  // repeat the last row (shirt) at the bottom, so there are no blank bands.
  const pad = {
    left: Math.max(0, -x0),
    right: Math.max(0, x0 + S - W),
    top: Math.max(0, -y0),
    bottom: Math.max(0, y0 + S - H),
  };
  let img = await input.toBuffer();
  const mirror = { left: pad.left, right: pad.right };
  if (mark.wall) {
    const step = Math.floor(mark.wall * W);
    while (mirror.left > step || mirror.right > step) {
      const left = Math.min(mirror.left, step);
      const right = Math.min(mirror.right, step);
      img = await sharp(img).extend({ left, right, extendWith: "mirror" }).toBuffer();
      mirror.left -= left;
      mirror.right -= right;
    }
  }
  if (mirror.left || mirror.right || pad.top) {
    img = await sharp(img).extend({ left: mirror.left, right: mirror.right, top: pad.top, extendWith: "mirror" }).toBuffer();
  }
  if (pad.bottom) {
    img = await sharp(img).extend({ bottom: pad.bottom, extendWith: "copy" }).toBuffer();
  }

  const jpg = await sharp(img)
    .extract({ left: x0 + pad.left, top: y0 + pad.top, width: S, height: S })
    .resize(SIZE, SIZE)
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  // Name the file after its contents so a re-crop gets a new URL: browsers, the dev server and
  // Vercel all cache optimized images by URL and would otherwise keep showing the old crop.
  const base = path.parse(file).name;
  const hash = createHash("sha1").update(jpg).digest("hex").slice(0, 8);
  const name = `${base}-${hash}.jpg`;
  for (const old of fs.readdirSync(OUT)) {
    if (old !== name && new RegExp(`^${escapeRe(base)}(-[0-9a-f]{8})?\\.jpg$`).test(old)) fs.unlinkSync(path.join(OUT, old));
  }
  fs.writeFileSync(path.join(OUT, name), jpg);
  // Point every member using this photo at the new file.
  site = site.replace(new RegExp(`/Headshots/cards/${escapeRe(base)}(-[0-9a-f]{8})?\\.jpg`, "g"), `/Headshots/cards/${name}`);

  const padded = Object.entries(pad).filter(([, v]) => v > 0).map(([k, v]) => `${k} ${v}px`);
  console.log(`${name}: ${S}px crop${padded.length ? `, padded ${padded.join(", ")}` : ""}`);
}

fs.writeFileSync(SITE, site);
