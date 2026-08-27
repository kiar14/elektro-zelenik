/**
 * Generates the favicon set and the Open Graph cards.
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Everything here is derived from assets that already exist in the repository.
 * Nothing is invented and nothing is downloaded except the two typefaces the
 * site already uses, which are cached in .cache/fonts and never committed.
 *
 * FAVICON
 * The source is public/brand/zelenik-symbol.png, the genuine 3000x3000 identity
 * file. It was verified byte-identical to logo-doo-5.png on the live site, and
 * the live site's own favicon (cropped-logo-doo-5.png) is that same file scaled
 * to 512 with no re-crop: the mark's bounding box sits at x 0.149, y 0.272,
 * w 0.699, h 0.457 of the frame in both. The framing here is therefore the live
 * site's framing, unmodified. The background is rgb(12, 169, 45), which is
 * --color-brand exactly.
 *
 * OPEN GRAPH
 * Two cards, both 1200x630. The homepage card uses the approved architectural
 * hero frame under the same left scrim the homepage itself uses. Every other
 * page uses one branded card on the site's own ground surface. Both carry the
 * real horizontal logo, unmodified and in brand green, which is the treatment
 * the footer already uses on a dark surface.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const p = (...parts) => path.join(ROOT, ...parts);

/* --- Tokens, lifted from src/app/globals.css ---------------------------- */
const INK = "#14181a";
const INK_MUTED = "#5c6366";
const GROUND = "#fbfaf8";
const SURFACE = "#f2f0ec";
const BORDER = "#ddd8d0";
const BRAND = "#0ca92d";
const BRAND_STRONG = "#0a8524";
const ON_PHOTO = "#ffffff";
const ON_PHOTO_MUTED = "#ccd4d9";

const OG_W = 1200;
const OG_H = 630;

/* --- Typefaces ----------------------------------------------------------
   The same two families src/lib/fonts.ts loads. Cached, never committed.   */
const FONT_DIR = p(".cache/fonts");
const FONTS = {
  display: {
    file: path.join(FONT_DIR, "IBMPlexSans-var.ttf"),
    url: "https://github.com/google/fonts/raw/main/ofl/ibmplexsans/IBMPlexSans%5Bwdth,wght%5D.ttf",
    family: "IBM Plex Sans",
  },
  sans: {
    file: path.join(FONT_DIR, "Inter-var.ttf"),
    url: "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf",
    family: "Inter",
  },
};

async function ensureFonts() {
  fs.mkdirSync(FONT_DIR, { recursive: true });
  for (const font of Object.values(FONTS)) {
    if (fs.existsSync(font.file)) continue;
    process.stdout.write(`fetching ${path.basename(font.file)} ... `);
    const res = await fetch(font.url);
    if (!res.ok) throw new Error(`${res.status} fetching ${font.url}`);
    fs.writeFileSync(font.file, Buffer.from(await res.arrayBuffer()));
    console.log("done");
  }
}

/**
 * A line (or wrapped block) of text as an RGBA buffer.
 *
 * dpi is fixed at 72 so `size` is read directly in pixels rather than points,
 * which keeps the layout arithmetic below honest.
 */
async function text({
  value,
  font,
  size,
  weight = "Semibold",
  color,
  width,
  lineHeight,
}) {
  const markup = `<span foreground="${color}">${value}</span>`;

  const buffer = await sharp({
    text: {
      text: markup,
      font: `${font.family} ${weight} ${size}`,
      fontfile: font.file,
      rgba: true,
      dpi: 72,
      align: "left",
      ...(width ? { width, wrap: "word" } : {}),
      ...(lineHeight ? { spacing: Math.round((lineHeight - 1) * size) } : {}),
    },
  })
    .png()
    .toBuffer();

  const meta = await sharp(buffer).metadata();
  return { input: buffer, width: meta.width, height: meta.height };
}

const rect = (w, h, fill) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${fill}"/></svg>`,
  );

/* ======================================================================
   Favicons
   ====================================================================== */

/**
 * A minimal ICO container with PNG frames.
 *
 * PNG-in-ICO is understood by every browser this site targets, and it keeps the
 * 32 and 48 frames a fraction of the size the equivalent BMP frames would be.
 */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  const directory = Buffer.alloc(16 * frames.length);
  let offset = header.length + directory.length;

  frames.forEach((frame, i) => {
    const at = i * 16;
    directory[at] = frame.size >= 256 ? 0 : frame.size; // 0 means 256
    directory[at + 1] = frame.size >= 256 ? 0 : frame.size;
    directory[at + 2] = 0; // palette size
    directory[at + 3] = 0; // reserved
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(frame.data.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += frame.data.length;
  });

  return Buffer.concat([
    header,
    directory,
    ...frames.map((frame) => frame.data),
  ]);
}

async function favicons() {
  const source = p("public/brand/zelenik-symbol.png");

  // Flattened onto its own brand green, then given an opaque alpha channel
  // back. The flatten is so a future transparent master cannot produce a
  // see-through tab icon; the ensureAlpha is because the ICO decoder Next.js
  // uses to read this file for the icon metadata rejects a PNG frame that is
  // not RGBA.
  const square = (size) =>
    sharp(source)
      .resize(size, size, { kernel: "lanczos3" })
      .flatten({ background: BRAND })
      .ensureAlpha()
      .png({ compressionLevel: 9 })
      .toBuffer();

  const ico = buildIco(
    await Promise.all(
      [16, 32, 48].map(async (size) => ({ size, data: await square(size) })),
    ),
  );
  fs.writeFileSync(p("src/app/favicon.ico"), ico);
  console.log(`favicon.ico            16 + 32 + 48   ${ico.length} B`);

  for (const [file, size] of [
    ["src/app/icon.png", 512],
    ["src/app/apple-icon.png", 180],
  ]) {
    const data = await square(size);
    fs.writeFileSync(p(file), data);
    console.log(`${path.basename(file).padEnd(22)} ${size}x${size}`.padEnd(45) + `${data.length} B`);
  }
}

/* ======================================================================
   Open Graph
   ====================================================================== */

async function ogHome() {
  const scrim = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
       <defs>
         <linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
           <stop offset="0"    stop-color="#050a10" stop-opacity="0.88"/>
           <stop offset="0.30" stop-color="#050a10" stop-opacity="0.78"/>
           <stop offset="0.46" stop-color="#050a10" stop-opacity="0.52"/>
           <stop offset="0.62" stop-color="#050a10" stop-opacity="0.18"/>
           <stop offset="0.76" stop-color="#050a10" stop-opacity="0"/>
         </linearGradient>
       </defs>
       <rect width="${OG_W}" height="${OG_H}" fill="url(#s)"/>
     </svg>`,
  );

  // Cover-crop the hero frame. 1672x941 scales to 1200x675 on width, and the
  // 45 surplus rows come mostly off the foreground so the roofline stays put.
  const photo = await sharp(p("public/images/hero/hero-house-on.webp"))
    .resize({ width: OG_W })
    .extract({ left: 0, top: 30, width: OG_W, height: OG_H })
    .toBuffer();

  const logo = await sharp(p("public/brand/zelenik-logo-horizontal.png"))
    .resize({ width: 400 })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const PAD = 72;
  let y = 122;

  const layers = [
    { input: scrim, left: 0, top: 0 },
    { input: logo, left: PAD, top: y },
  ];
  y += logoMeta.height + 48;

  layers.push({ input: rect(64, 3, BRAND), left: PAD, top: y });
  y += 3 + 34;

  const headline = await text({
    value: "Elektroinštalacije, servis in tehnične rešitve",
    font: FONTS.display,
    size: 52,
    weight: "Semibold",
    color: ON_PHOTO,
    width: 600,
    lineHeight: 1.14,
  });
  layers.push({ input: headline.input, left: PAD, top: y });
  y += headline.height + 34;

  const meta = await text({
    value: "Destrnik pri Ptuju · od leta 2000 · 041 731 214",
    font: FONTS.sans,
    size: 26,
    weight: "Medium",
    color: ON_PHOTO_MUTED,
    width: 640,
  });
  layers.push({ input: meta.input, left: PAD, top: y });

  // JPEG, not PNG. This card is a photograph, and the PNG of it was 820 kB
  // against 130 kB here for no visible difference. Every scraper that matters
  // handles JPEG; several still handle WebP badly, which is why the modern
  // format the rest of the site uses is deliberately not used for this one.
  const file = p("public/og/og-home.jpg");
  await sharp(photo)
    .composite(layers)
    .jpeg({ quality: 86, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(file);

  console.log(
    `og-home.jpg            ${OG_W}x${OG_H}`.padEnd(45) +
      `${fs.statSync(file).size} B`,
  );
}

async function ogDefault() {
  const PANEL_X = 812;

  const logo = await sharp(p("public/brand/zelenik-logo-horizontal.png"))
    .resize({ width: 452 })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const symbol = await sharp(p("public/brand/zelenik-symbol.png"))
    .resize({ width: 188 })
    .png()
    .toBuffer();

  const PAD = 72;
  let y = 112;

  const layers = [
    // The right panel and its hairline echo the tonal band the site uses to
    // separate one section from the next.
    { input: rect(OG_W - PANEL_X, OG_H, SURFACE), left: PANEL_X, top: 0 },
    { input: rect(1, OG_H, BORDER), left: PANEL_X, top: 0 },
    { input: symbol, left: PANEL_X + (OG_W - PANEL_X - 188) / 2, top: 221 },
    // The same 4px brand edge the closing CTA panel carries.
    { input: rect(OG_W, 4, BRAND), left: 0, top: 0 },
    { input: logo, left: PAD, top: y },
  ];
  y += logoMeta.height + 50;

  layers.push({ input: rect(64, 3, BRAND), left: PAD, top: y });
  y += 3 + 34;

  const headline = await text({
    value: "Elektroinštalacije, servis in tehnične rešitve",
    font: FONTS.display,
    size: 50,
    weight: "Semibold",
    color: INK,
    // Narrower than the column so the line breaks after "servis", which is
    // where the homepage card breaks too.
    width: 622,
    lineHeight: 1.14,
  });
  layers.push({ input: headline.input, left: PAD, top: y });
  y += headline.height + 30;

  const meta = await text({
    value: "Destrnik pri Ptuju · od leta 2000",
    font: FONTS.sans,
    size: 25,
    weight: "Medium",
    color: INK_MUTED,
    width: PANEL_X - PAD - 64,
  });
  layers.push({ input: meta.input, left: PAD, top: y });

  const phone = await text({
    value: "041 731 214",
    font: FONTS.sans,
    size: 34,
    weight: "SemiBold",
    color: BRAND_STRONG,
  });
  layers.push({ input: phone.input, left: PAD, top: OG_H - 72 - phone.height });

  // Flat colour and type, so PNG is both smaller and sharper here than JPEG.
  const file = p("public/og/og-default.png");
  await sharp({
    create: {
      width: OG_W,
      height: OG_H,
      channels: 4,
      background: GROUND,
    },
  })
    .composite(layers)
    .png({ compressionLevel: 9, palette: true })
    .toFile(file);

  console.log(
    `og-default.png         ${OG_W}x${OG_H}`.padEnd(45) +
      `${fs.statSync(file).size} B`,
  );
}

/* ====================================================================== */

await ensureFonts();
fs.mkdirSync(p("public/og"), { recursive: true });
await favicons();
await ogHome();
await ogDefault();
