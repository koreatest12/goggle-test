import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "../out");

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";
const START_TIME = Date.now();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function getSafeFilePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const normalized = path.normalize(cleanPath).replace(/^(\.\.[\/\\])+/, "");
  let targetPath = path.join(ROOT_DIR, normalized);

  // Directory handling (Next.js trailingSlash: true export)
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
    targetPath = path.join(targetPath, "index.html");
  } else if (!fs.existsSync(targetPath)) {
    if (fs.existsSync(`${targetPath}.html`)) {
      targetPath = `${targetPath}.html`;
    } else if (fs.existsSync(path.join(targetPath, "index.html"))) {
      targetPath = path.join(targetPath, "index.html");
    }
  }

  return targetPath;
}

const server = http.createServer((req, res) => {
  // Security Headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Healthcheck endpoint
  if (req.url === "/healthz" || req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        status: "healthy",
        uptimeSeconds: Math.floor((Date.now() - START_TIME) / 1000),
        node: process.version,
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  // Only GET and HEAD allowed
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }

  let filePath = getSafeFilePath(req.url);

  // Fallback to 404 or _not-found
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    const notFoundPath = path.join(ROOT_DIR, "404.html");
    const appNotFoundPath = path.join(ROOT_DIR, "_not-found/index.html");
    if (fs.existsSync(notFoundPath)) {
      filePath = notFoundPath;
      res.statusCode = 404;
    } else if (fs.existsSync(appNotFoundPath)) {
      filePath = appNotFoundPath;
      res.statusCode = 404;
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const stat = fs.statSync(filePath);

  // Caching policy
  if (filePath.includes("_next/static") || ext === ".woff2") {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else if (ext === ".html") {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  } else {
    res.setHeader("Cache-Control", "public, max-age=3600");
  }

  res.setHeader("Content-Type", contentType);

  if (req.method === "HEAD") {
    res.writeHead(res.statusCode || 200);
    res.end();
    return;
  }

  // Compression support (gzip / deflate) for text assets
  const acceptEncoding = req.headers["accept-encoding"] || "";
  const isCompressible = /text|javascript|json|xml|svg/.test(contentType);

  if (isCompressible && acceptEncoding.includes("gzip")) {
    res.writeHead(res.statusCode || 200, { "Content-Encoding": "gzip" });
    const raw = fs.createReadStream(filePath);
    raw.pipe(zlib.createGzip()).pipe(res);
  } else if (isCompressible && acceptEncoding.includes("deflate")) {
    res.writeHead(res.statusCode || 200, { "Content-Encoding": "deflate" });
    const raw = fs.createReadStream(filePath);
    raw.pipe(zlib.createDeflate()).pipe(res);
  } else {
    res.writeHead(res.statusCode || 200, { "Content-Length": stat.size });
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, HOST, () => {
  const displayHost = HOST === "0.0.0.0" ? "localhost" : HOST;
  console.log("=================================================");
  console.log("  Goggle-Test Production Static Server (Node 24)");
  console.log(`  Local:   http://${displayHost}:${PORT}`);
  console.log(`  Health:  http://${displayHost}:${PORT}/api/health`);
  console.log(`  Root:    ${ROOT_DIR}`);
  console.log("=================================================");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  console.log("\nTerminating server...");
  server.close(() => process.exit(0));
});
