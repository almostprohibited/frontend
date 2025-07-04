import '@mantine/core/styles.css';
import "./globals.css";

import { Box, ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import Footer from "@/components/footer/component";
import Header from "@/components/header/component";
import { ReactNode } from "react";
import { RetailerEnum } from '@/utils/apiStructs';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Almost Prohibited - Browse items from your favourite retailers",
	description: "Canada's upcoming aggregator for firearms, parts, and accessories",
	keywords: RetailerEnum.getRetailers().map(retailer => retailer.name)
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
