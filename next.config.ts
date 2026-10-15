import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Prisma needs its engine binary + schema in the standalone output.
  outputFileTracingIncludes: {
    "/": ["./node_modules/.prisma/**/*", "./prisma/**/*", "./db/**/*"],
  },
};

export default nextConfig;
