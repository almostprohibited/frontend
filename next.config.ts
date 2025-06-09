import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	experimental: {
		optimizePackageImports: [
			"@mantine/core",
			"@mantine/hooks",
		]
	},
	distDir: "dist"
};

export default nextConfig;
