import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Multiple root layouts (one per language) need a global 404 document.
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  /** Old URLs from before the four-division structure (keep links and search results working). */
  async redirects() {
    const moved: [string, string][] = [
      ["/diensten/ai-oplossingen", "/diensten/ai-solutions"],
      ["/diensten/bedrijfsautomatisering", "/diensten/ai-solutions"],
      ["/diensten/softwareontwikkeling", "/diensten/digital-solutions"],
      ["/diensten/web-en-digitaal", "/diensten/digital-solutions"],
      ["/en/services/business-automation", "/en/services/ai-solutions"],
      ["/en/services/software-development", "/en/services/digital-solutions"],
      ["/en/services/web-and-digital", "/en/services/digital-solutions"],
      ["/ai-academy", "/academy"],
      ["/ai-academy/:slug", "/academy/:slug"],
      ["/en/ai-academy", "/en/academy"],
      ["/en/ai-academy/:slug", "/en/academy/:slug"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
