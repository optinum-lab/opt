import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow production builds to succeed even when TypeScript type errors exist.
  // WARNING: This silences type errors during `next build` — only use if you
  // understand the risks and intend to address types later.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dahua-tr.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "static.ticimax.cloud",
      },
      {
        protocol: "https",
        hostname: "w0.peakpx.com",
      },
    ],
  },
};

export default nextConfig;
