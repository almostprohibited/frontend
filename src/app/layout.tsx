import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import "./globals.css";

import { Affix, Alert, Box, ColorSchemeScript, MantineProvider, Stack, Text, mantineHtmlProps } from '@mantine/core';
import Footer from "@/components/footer/component";
import Header from "@/components/header/component";
import { ReactNode } from "react";
import { Metadata } from 'next';
import { useIsBeta } from '@/utils/hooks/useIsBeta';
import { IconFlask } from '@tabler/icons-react';
import Link from 'next/link';

export const metadata: Metadata = {
	title: "Almost Prohibited - Browse items from your favourite retailers",
	description: "Canada's upcoming aggregator for firearms, parts, and accessories",
};

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
	const isBeta = useIsBeta();
	
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider defaultColorScheme="dark">
					{
						isBeta && 
						<Affix position={{ bottom: 20, right: 20 }}>
							<Link href="https://almostprohibited.ca">
								<Alert
									variant="filled"
									color="grape"
									title="This is the beta website!"
									icon={<IconFlask />}
									maw="20rem"
								>
									<Stack>
										<Text size="sm">
											{"This site may contain features that are broken, or work in progress."}
										</Text>
										<Text size="sm">
											{"Click to head back to the release site."}
										</Text>
									</Stack>
								</Alert>
							</Link>
						</Affix>
					}
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
