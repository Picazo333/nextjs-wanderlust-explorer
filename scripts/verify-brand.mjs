import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const files = {
  "public/brand/lockups/signal-horizontal.svg":
    "85459232bf51e7bf7c94225fd4f2cd6b71a681b6d701cb4ffd6d2a142cf57a81",
  "public/brand/lockups/signal-stacked.svg":
    "11314b300284db342bc15a7c7695c23199f65f68178af45586b62d01e9ea133a",
  "brand/originals/4geeks.png":
    "dec507e33608f5988d1575f61b008c8ea6384273a2bdb5870f95f8df4608ca9d",
  "brand/originals/divinivid.svg":
    "1c6a1390cd0343e20747f132b008a6f795483899cc3e9700a78e8c3da6c3ae6d",
  "src/styles/signal/tokens.css":
    "9b1f68b4a44d79f0990778953c208af96c08e5bd8bd4f70b16697fbb24f51e52",
  "src/styles/signal/motion.css":
    "36b2f4d56439871d1ae46d4e2ad3e3d0d0b5da7a2700c503d4382247784b2f5c",
  "src/styles/signal/tokens.json":
    "aee1644faad9743f1fd6278453f7dc5fc7ddd31572a790ad068ec23afad202fa",
  "src/styles/signal/motion.json":
    "c13a8241b6a7c8d638fee1d5a4457b37da5141d2b563e58541297637a63aa5c5",
};

for (const [path, expected] of Object.entries(files)) {
  const digest = createHash("sha256").update(readFileSync(path)).digest("hex");
  if (digest !== expected) {
    throw new Error(`hash mismatch for ${path}: ${digest}`);
  }
  console.log(`PASS ${path}`);
}

function luminance(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  const channels = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map(
    (channel) => {
      const scaled = channel / 255;
      return scaled <= 0.03928
        ? scaled / 12.92
        : ((scaled + 0.055) / 1.055) ** 2.4;
    },
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

const textPairs = [
  ["#18202B", "#F7F8FA"],
  ["#18202B", "#FFFFFF"],
  ["#505E70", "#F7F8FA"],
  ["#505E70", "#FFFFFF"],
  ["#FFFFFF", "#B53A17"],
  ["#B53A17", "#F7F8FA"],
  ["#18202B", "#FCEDE6"],
];

for (const [foreground, background] of textPairs) {
  const ratio = contrast(foreground, background);
  if (ratio < 4.5) {
    throw new Error(
      `text contrast ${foreground} on ${background} is ${ratio.toFixed(2)}`,
    );
  }
}

const uiPairs = [
  ["#788598", "#FFFFFF"],
  ["#164DCC", "#FFFFFF"],
];

for (const [foreground, background] of uiPairs) {
  const ratio = contrast(foreground, background);
  if (ratio < 3) {
    throw new Error(
      `UI contrast ${foreground} on ${background} is ${ratio.toFixed(2)}`,
    );
  }
}

console.log("PASS contrast");
