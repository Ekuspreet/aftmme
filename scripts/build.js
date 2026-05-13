import fs from "fs";
import path from "path";
import ejs from "ejs";

const BUILD_DIR = "icct-sd-26-web-static";
const VIEWS_DIR = "views";

const pages = [
  { name: "home", path: "index.html" },
  { name: "about", path: "about.html" },
  { name: "cfp", path: "cfp.html" },
  { name: "submission", path: "submission.html" },
  { name: "speakers", path: "speakers.html" },
  { name: "committees", path: "committees.html" },
  { name: "registration", path: "registration.html" },
  { name: "contact", path: "contact.html" },
  { name: "sponsorship", path: "sponsorship.html" },
  { name: "awards", path: "awards.html" },
  { name: "publications", path: "publications.html" },
  { name: "poster", path: "poster.html" },
  { name: "accomodation", path: "accomodation.html" },
  { name: "paper", path: "paper.html" },
  { name: "gallery", path: "gallery.html" },
  { name: "proceedings", path: "proceedings.html" }
];

// Ensure build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

for (const page of pages) {
  const src = path.join(VIEWS_DIR, "index.ejs"); // Always render index.ejs
  const dest = path.join(BUILD_DIR, page.path);

  if (!fs.existsSync(src)) {
    console.warn(`⚠️ Source file does not exist: ${src}`);
    continue;
  }

  // ✅ Use ejs.renderFile to preserve includes
  var html = await ejs.renderFile(
    src,
    { title: page.name, page: page.name, static: true },
    {
      filename: src, // required for resolving relative includes
      root: path.resolve(VIEWS_DIR),
    },
  );
  html = html.replace(/href="\/([^"]*)/g, 'href="./$1');
  html = html.replace(/src="\/(css|js|images)\//g, 'src="./$1/');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log(`✅ Built page: ${page.name} → ${page.path}`);
}

// ✅ Copy static assets from public/
if (fs.existsSync("public")) {
  fs.cpSync("public", BUILD_DIR, { recursive: true });
  console.log("✅ Copied static assets from public/");
} else {
  console.warn("⚠️ No 'public' directory found to copy.");
}
