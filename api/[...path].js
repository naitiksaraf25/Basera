import { Readable } from "stream";
import app from "../server/app.js";

/**
 * Vercel Serverless Function Catch-All Handler
 * Catches all /api/[...path] filesystem routes on Vercel.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data") && !req.rawBody) {
    await new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        const fullBuffer = Buffer.concat(chunks);
        req.rawBody = fullBuffer;
        req.pipe = function (dest, options) {
          return Readable.from(fullBuffer).pipe(dest, options);
        };
        resolve();
      });
      req.on("error", reject);
    });
  }
  return app(req, res);
}
