import type { Metadata } from "next";

import '@mantine/core/styles.css';
import { Box, ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

import "./globals.css";
import Footer from "@/components/footer/component";
import Header from "@/components/header/component";

export const metadata: Metadata = {
	title: "project-carbon",
	description: "project-carbon",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider defaultColorScheme="dark">
					<Header />
					<Box style={{flexGrow: 1}} mb="2rem">
						{children}
					</Box>
					<Footer />
				</MantineProvider>
			</body>
		</html>
	);
}
