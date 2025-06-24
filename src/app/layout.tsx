import type { Metadata } from "next";

import '@mantine/core/styles.css';
import { Box, ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

import "./globals.css";
import Footer from "@/components/footer/component";
import Header from "@/components/header/component";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Almost Prohibited",
	description: "Canada's upcoming sporting goods aggregator",
};

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
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
