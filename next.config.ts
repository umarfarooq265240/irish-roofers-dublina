import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: { unoptimized: true },
  experimental: { inlineCss: true },
  trailingSlash: true,
};

export default nextConfig;
