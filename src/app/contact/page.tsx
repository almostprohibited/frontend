"use client";

import { ContactForm } from "@/components/contact/contactForm";
import { Box, Code, Flex, Stack, Text, Title } from "@mantine/core";

export default function contactPage() {
	return (
		<Box mt="2rem" p={"var(--content-side-padding)"}>
			<Title order={1} ta={"center"}>{"Contact Me"}</Title>
			<Flex
				gap="xl"
				mt="5rem"
				direction="row"
				justify="center"
			>
				<Box w="50%">
					<Stack>
						<Title order={2} c="lightgrey">{"For retailers"}</Title>
						<Text>{"I perform a daily crawl on your products starting at 12AM PT. This crawl only fetches text. All images, and dynamically loading content, are not loaded."}</Text>
						<Text>{"There is a minimum of 1 second between page requests, but this is typically 10 seconds for most retailers."}</Text>
						<Text>{"My crawler will identify itself with the following user agent:"}</Text>
						<Code block>{"almostprohibited/1.0 (+https://almostprohibited.ca/contact/; hello@almostprohibited.ca)"}</Code>
						<Text>{"The crawler won't read any "}<Code>{"/robots.txt"}</Code>{" files (because I haven't added that functionality), so you're probably better off contacting me. Prefer emails in this context."}</Text>
					</Stack>
					<Stack mt="3rem">
						<Title order={2}>{"For everyone else"}</Title>
						<Text>{"See something that's broken? Encountered missing products? Want to spill the beans on your favourite Crown land to \"visit\"?"}</Text>
						<Text>{"Send me a message about it and I'll take a look into it at some point."}</Text>
					</Stack>
				</Box>
				<Box w="50%">
					<ContactForm />
				</Box>
			</Flex>
		</Box>
	)
}
