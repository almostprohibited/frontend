import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	productionBrowserSourceMaps: false,
	distDir: "dist"
};

export default nextConfig;
