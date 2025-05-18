import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	experimental: {
		optimizePackageImports: [
			"@mantine/core",
			"@mantine/hooks",
		]
	},
	reactStrictMode: false
};

export default nextConfig;
