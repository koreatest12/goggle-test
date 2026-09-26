import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const required = [
  "index.html",
  ".nojekyll",
  "_next",
];

const failures = [];
for (const item of required) {
  const target = path.join(root, item);
  if (!fs.existsSync(target)) failures.push(item);
}

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}
if (fs.existsSync(root)) walk(root);

const summary = {
  root,
  htmlFiles: htmlFiles.length,
  hasIndex: fs.existsSync(path.join(root, "index.html")),
  hasNoJekyll: fs.existsSync(path.join(root, ".nojekyll")),
  hasStaticAssets: fs.existsSync(path.join(root, "_next")),
  generatedAt: new Date().toISOString(),
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  console.error("Build verification failed. Missing:", failures.join(", "));
  process.exit(1);
}

if (htmlFiles.length === 0) {
  console.error("Build verification failed: no HTML files found.");
  process.exit(1);
}

console.log("Build verification passed.");
