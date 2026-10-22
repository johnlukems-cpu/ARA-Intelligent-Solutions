#!/usr/bin/env node
/**
 * Crawls the running site from both language homepages and verifies that
 * every internal link, image and stylesheet/script resolves (HTTP 200).
 * Usage: BASE_URL=http://localhost:3000 npm run check:links
 */
const base = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const queue = ["/", "/en", "/sitemap.xml", "/robots.txt"];
const seen = new Set(queue);
const assets = new Set();
const failures = [];
let pages = 0;

const attr = (html, regex) => [...html.matchAll(regex)].map((m) => m[1].replace(/&amp;/g, "&"));

while (queue.length) {
  const path = queue.shift();
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status !== 200) {
    failures.push(`${res.status} ${path}`);
    continue;
  }
  pages++;
  if (!(res.headers.get("content-type") ?? "").includes("text/html")) continue;
  const html = await res.text();
  for (const link of attr(html, /<a[^>]+href="([^"]+)"/g)) {
    if (!link.startsWith("/") || link.startsWith("//")) continue;
    const clean = link.split("#")[0].split("?")[0] || "/";
    if (!seen.has(clean)) {
      seen.add(clean);
      queue.push(clean);
    }
  }
  for (const src of [
    ...attr(html, /<img[^>]+src="([^"]+)"/g),
    ...attr(html, /<link[^>]+href="(\/[^"]+\.(?:css|png|jpg|webp|ico|woff2))"/g),
    ...attr(html, /<script[^>]+src="([^"]+)"/g),
    ...attr(html, /<meta property="og:image" content="([^"]+)"/g).map((u) => u.replace(/^https?:\/\/[^/]+/, "")),
  ]) {
    if (src.startsWith("/")) assets.add(src);
  }
}

for (const asset of assets) {
  const res = await fetch(base + asset);
  if (res.status !== 200) failures.push(`${res.status} asset ${asset}`);
}

console.log(`Checked ${pages} pages and ${assets.size} assets.`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log("No broken internal links or assets found.");
