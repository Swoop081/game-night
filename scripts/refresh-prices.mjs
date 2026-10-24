// Weekly price + photo snapshot for Come On Down.
// Opens each retailer's own website in a real browser, reads the product data the page loads
// (embedded JSON, network JSON and schema.org markup), and writes data/products.json.
// A retailer that fails keeps last week's items, so the game always has a full catalogue.
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "data/products.json", REPORT = "data/report.json";
const PER_QUERY = 4, PAGE_TIMEOUT = 45000;
const enc = encodeURIComponent;

const SOURCES = [
  { r: "Woolworths", url: q => `https://www.woolworths.com.au/shop/search/products?searchTerm=${enc(q)}`,
    q: [["tim tam","🍫"],["vegemite","🍞"],["milo","🥛"],["weet-bix","🥣"],["coca cola 1.25l","🥤"],["cadbury dairy milk block","🍫"],["arnotts shapes","🍘"],["smiths chips","🥔"],["nescafe blend 43","☕"],["golden gaytime","🍦"],["toilet paper","🧻"],["laundry liquid","🧺"]] },
  { r: "Coles", url: q => `https://www.coles.com.au/search/products?q=${enc(q)}`, imgBase: "https://productimages.coles.com.au/productimages",
    q: [["tim tam","🍫"],["vegemite","🍞"],["milo","🥛"],["weet-bix","🥣"],["pepsi max","🥤"],["kit kat","🍫"],["doritos","🌽"],["ice cream","🍦"],["coffee pods","☕"],["dishwasher tablets","🍽️"],["sausages","🌭"],["nutella","🍫"]] },
  { r: "Kmart", url: q => `https://www.kmart.com.au/search/?searchTerm=${enc(q)}`,
    q: [["air fryer","🍟"],["kettle","🫖"],["toaster","🍞"],["lego","🧱"],["outdoor chair","🪑"],["cushion","🛋️"],["lamp","💡"],["bluetooth speaker","🔊"],["vacuum","🧹"],["bike","🚲"],["quilt cover","🛏️"],["storage","📦"]] },
  { r: "Big W", url: q => `https://www.bigw.com.au/search?text=${enc(q)}`,
    q: [["lego","🧱"],["barbie","🎀"],["nintendo switch","🎮"],["trampoline","🤸"],["scooter","🛴"],["tent","⛺"],["hot wheels","🏎️"],["board game","🎲"],["pram","👶"],["electric toothbrush","🪥"]] },
  { r: "Bunnings", url: q => `https://www.bunnings.com.au/search/products?q=${enc(q)}`,
    q: [["cordless drill","🪛"],["barbecue","🍖"],["lawn mower","🌱"],["ladder","🪜"],["wheelbarrow","🛒"],["pressure washer","💦"],["toolbox","🧰"],["garden hose","🚿"],["outdoor setting","🪑"],["paint 10l","🎨"],["pizza oven","🍕"],["ozito","🔧"]] },
  { r: "JB Hi-Fi", url: q => `https://www.jbhifi.com.au/search?query=${enc(q)}`,
    q: [["65 inch tv","📺"],["noise cancelling headphones","🎧"],["playstation 5","🎮"],["xbox","🎮"],["laptop","💻"],["soundbar","🔊"],["airpods","🎧"],["smartwatch","⌚"],["robot vacuum","🤖"],["coffee machine","☕"]] },
  { r: "Officeworks", url: q => `https://www.officeworks.com.au/shop/officeworks/search?q=${enc(q)}`,
    q: [["office chair","🪑"],["printer","🖨️"],["standing desk","🗄️"],["calculator","🧮"],["backpack","🎒"],["shredder","📄"]] },
  { r: "Target", url: q => `https://www.target.com.au/search?text=${enc(q)}`,
    q: [["bath towel","🛁"],["pyjamas","👕"],["toy","🧸"],["sneakers","👟"],["bedding","🛏️"]] },
  { r: "Aldi", pages: [
    ["https://www.aldi.com.au/special-buys","🛒"],
    ["https://www.aldi.com.au/products/snacks-confectionery/confectionery/k/1588161408332088","🍫"],
    ["https://www.aldi.com.au/products/drinks/k/1000000000","🥤"],
    ["https://www.aldi.com.au/products/pantry/k/970000000","🥫"],
    ["https://www.aldi.com.au/products/cleaning-household/k/1050000000","🧻"] ], perPage: 12 },
  { r: "IKEA", pages: [
    ["https://www.ikea.com/au/en/cat/sofas-fu003/","🛋️"],
    ["https://www.ikea.com/au/en/cat/beds-bm003/","🛏️"],
    ["https://www.ikea.com/au/en/cat/dining-tables-21825/","🍽️"],
    ["https://www.ikea.com/au/en/cat/armchairs-fu006/","🪑"],
    ["https://www.ikea.com/au/en/cat/bookcases-shelving-units-st002/","📚"] ], perPage: 8 },
];

/* ---------- generic product extraction from any JSON ---------- */
const NAME_KEYS = ["displayName","DisplayName","productName","name","Name","title"];
const PRICE_KEYS = ["price","Price","currentPrice","salePrice","priceValue","finalPrice","now","InstorePrice","pricing","prices","offers"];
const IMG_KEYS = ["LargeImageFile","MediumImageFile","image","imageUrl","imageURL","Image","images","imageUris","thumbnail","thumbnailUrl","primaryImage","mainImage","heroImage","imageLink","contextualImageUrl","media"];
const BAD_NAME = /^(home|search|menu|filter|sort|shop|cart|sign in|log in|categories|brands|undefined|null)$/i;

function num(v) {
  if (v == null) return null;
  if (typeof v === "number") return v > 0 && v < 200000 ? v : null;
  if (typeof v === "string") { const m = v.replace(/,/g, "").match(/(\d+(?:\.\d{1,2})?)/); return m ? num(parseFloat(m[1])) : null; }
  if (Array.isArray(v)) { for (const x of v) { const n = num(x); if (n) return n; } return null; }
  if (typeof v === "object") {
    for (const k of ["now","value","amount","current","price","Price","salePrice","sellingPrice","finalPrice","lowPrice","numeral","wholeNumber","currentPrice"]) {
      if (k in v) { const n = num(v[k]); if (n) return n; }
    }
    if (v.integer != null || v.wholeNumber != null) return num(`${v.integer ?? v.wholeNumber}.${v.decimals ?? v.decimal ?? "00"}`);
  }
  return null;
}
function img(v, base) {
  if (!v) return null;
  if (typeof v === "string") {
    let s = v.trim();
    if (!/\.(jpe?g|png|webp|avif)(\?|$)|\/image|images?\//i.test(s) && !/^https?:\/\/[^ ]+$/.test(s)) return null;
    if (s.startsWith("//")) s = "https:" + s;
    else if (s.startsWith("/") && base) s = base + s;
    return /^https:\/\//.test(s) ? s : null;
  }
  if (Array.isArray(v)) { for (const x of v) { const r = img(x, base); if (r) return r; } return null; }
  if (typeof v === "object") for (const k of ["uri","url","src","href","imageUrl","large","medium","original","contentUrl","path"]) if (v[k]) { const r = img(v[k], base); if (r) return r; }
  return null;
}
function nameOf(o) {
  let n = null;
  for (const k of NAME_KEYS) if (typeof o[k] === "string" && o[k].trim().length >= 3 && o[k].length <= 140) { n = o[k].trim(); break; }
  if (!n || BAD_NAME.test(n)) return null;
  const brand = typeof o.brand === "string" ? o.brand : (o.brand && typeof o.brand.name === "string" ? o.brand.name : null);
  if (brand && !n.toLowerCase().includes(brand.toLowerCase())) n = `${brand} ${n}`;
  if (typeof o.size === "string" && o.size.length < 20 && !n.toLowerCase().includes(o.size.toLowerCase())) n = `${n} ${o.size}`;
  return n.replace(/\s+/g, " ");
}
function extract(json, base, out, depth = 0) {
  if (!json || typeof json !== "object" || depth > 40) return;
  if (Array.isArray(json)) { for (const x of json) extract(x, base, out, depth + 1); return; }
  const n = nameOf(json);
  if (n) {
    let p = null; for (const k of PRICE_KEYS) if (k in json) { p = num(json[k]); if (p) break; }
    let im = null; for (const k of IMG_KEYS) if (k in json) { im = img(json[k], base); if (im) break; }
    if (p && im) out.push({ n, p: Math.round(p * 100) / 100, img: im, url: typeof json.url === "string" ? json.url : undefined });
  }
  for (const k in json) { const v = json[k]; if (v && typeof v === "object") extract(v, base, out, depth + 1); }
}

async function grab(page, url, base) {
  const found = [];
  const onResp = async res => {
    try {
      const ct = res.headers()["content-type"] || "";
      if (!ct.includes("json") || res.request().resourceType() === "image") return;
      const t = await res.text(); if (t.length > 6e6) return;
      extract(JSON.parse(t), base, found);
    } catch {}
  };
  page.on("response", onResp);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.mouse.wheel(0, 2500).catch(() => {}); await page.waitForTimeout(2500);
    const blobs = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('script[type="application/ld+json"],script#__NEXT_DATA__,script[type="application/json"]').forEach(s => out.push(s.textContent));
      for (const k of ["__NUXT__","__INITIAL_STATE__","__PRELOADED_STATE__","__APOLLO_STATE__"]) if (window[k]) try { out.push(JSON.stringify(window[k])); } catch {}
      return out;
    });
    for (const b of blobs) { try { extract(JSON.parse(b), base, found); } catch {} }
    const title = await page.title();
    return { found, title };
  } finally { page.off("response", onResp); }
}

const words = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2 && !["inch","the","and"].includes(w));
function pickFor(found, q, n) {
  const seen = new Set(), keep = [];
  const qw = q ? words(q) : [];
  for (const f of found) {
    const key = f.n.toLowerCase(); if (seen.has(key)) continue; seen.add(key);
    if (qw.length && !qw.some(w => key.includes(w.replace(/s$/, "")))) continue;
    keep.push(f); if (keep.length >= n) break;
  }
  return keep;
}

const today = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Melbourne" });
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { products: [] };
const browser = await chromium.launch({ args: ["--disable-blink-features=AutomationControlled"] });
const ctx = await browser.newContext({
  locale: "en-AU", timezoneId: "Australia/Melbourne", viewport: { width: 1366, height: 900 },
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
});
await ctx.addInitScript(() => { Object.defineProperty(navigator, "webdriver", { get: () => undefined }); });

const products = [], report = { checked: today, retailers: {} };
for (const src of SOURCES) {
  const page = await ctx.newPage(); const got = []; const notes = [];
  const jobs = src.pages ? src.pages.map(([u, e]) => ({ u, e, q: null })) : src.q.map(([q, e]) => ({ u: src.url(q), e, q }));
  for (const j of jobs) {
    try {
      const { found, title } = await grab(page, j.u, src.imgBase);
      const pickN = src.perPage || PER_QUERY;
      const items = pickFor(found, j.q, pickN).map(x => ({ ...x, r: src.r, e: j.e, d: today }));
      got.push(...items);
      notes.push(`${j.q || j.u}: ${items.length} (raw ${found.length}, "${title.slice(0, 60)}")`);
    } catch (err) { notes.push(`${j.q || j.u}: ERROR ${String(err.message || err).slice(0, 120)}`); }
  }
  await page.close();
  const uniq = []; const seen = new Set();
  for (const g of got) { const k = g.n.toLowerCase(); if (!seen.has(k)) { seen.add(k); uniq.push(g); } }
  if (uniq.length >= 5) { products.push(...uniq); report.retailers[src.r] = { ok: true, count: uniq.length, notes }; }
  else {
    const old = prev.products.filter(p => p.r === src.r);
    products.push(...old);
    report.retailers[src.r] = { ok: false, count: uniq.length, keptFromLastWeek: old.length, notes };
  }
  console.log(src.r, report.retailers[src.r].ok ? "OK" : "FAILED", uniq.length);
}
await browser.close();

fs.mkdirSync("data", { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ checked: today, products }, null, 1));
fs.writeFileSync(REPORT, JSON.stringify(report, null, 1));
console.log("Total products", products.length);
