import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit plain HTML/CSS/JS to `out/` so any static host can serve it.
  output: "export",
  // The default image optimizer needs a server, which static export lacks.
  images: { unoptimized: true },
};

export default nextConfig;
