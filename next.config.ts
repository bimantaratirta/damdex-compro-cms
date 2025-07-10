import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is3.cloudhost.id",
        port: "", // Kosongkan jika tidak menggunakan port khusus
        pathname: "/damdex-compro/**", // Izinkan semua path di hostname ini
      },
    ],
  },
};

export default nextConfig;
