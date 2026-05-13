import fs from "fs";
import path from "path";
import ejs from "ejs";
import { PAGES_ARRAY } from "../constants.js";

const BUILD_DIR = "aftmme-web";
const VIEWS_DIR = "views";

const pages = PAGES_ARRAY.map((page) => ({
  name: page.viewFile,
  title: page.title,
  url: page.path,
  path: page.path === "/" ? "index.html" : `${page.path.replace("/", "")}.html`,
}));

if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

for (const page of pages) {
  const src = path.join(VIEWS_DIR, "index.ejs");
  const dest = path.join(BUILD_DIR, page.path);

  if (!fs.existsSync(src)) {
    console.warn(`Source file does not exist: ${src}`);
    continue;
  }

  let html = await ejs.renderFile(
    src,
    {
      title: page.title,
      page: page.name,
      activeUrl: page.url,
      static: true,
      navLinks: PAGES_ARRAY.map((p) => ({
        label: p.navLabel,
        url: p.path,
      })),
    },
    {
      filename: src,
      root: path.resolve(VIEWS_DIR),
    },
  );

  html = html.replace(/href="\/([^"]*)/g, 'href="./$1');
  html = html.replace(/src="\/(css|js|images)\//g, 'src="./$1/');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log(`Built page: ${page.name} -> ${page.path}`);
}

if (fs.existsSync("public")) {
  fs.cpSync("public", BUILD_DIR, { recursive: true });
  console.log("Copied static assets from public/");
} else {
  console.warn("No 'public' directory found to copy.");
}
