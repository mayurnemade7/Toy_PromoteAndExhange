import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.37", "localhost", "127.0.0.1"],
  turbopack: {
    // Point Turbopack to the monorepo root so pnpm-workspace.yaml is found
    root: path.resolve(__dirname, "../.."),
  },
  // Allow importing from shared monorepo packages
  transpilePackages: ["@toy-exchange/types", "@toy-exchange/firebase-client"],
};

export default nextConfig;
