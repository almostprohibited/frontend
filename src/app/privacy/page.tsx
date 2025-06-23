import { Anchor, Box, List, ListItem, Space, Stack, Text, Title } from "@mantine/core";

export default function privacyPage() {
	return (
		<Box mt="2rem" p={"var(--content-side-padding)"}>
			<Title order={1} ta="center">{"Privacy Policy"}</Title>
			<Space h="xl" />
			<Text size="sm" c="dark">
				{"Last updated: June 22th 2025"}
			</Text>
			<Space h="md" />
			<Stack gap="xl">
				<Stack>
					<Title order={2} c="lightgrey">{"TL;DR"}</Title>
					<Text>{"I don't care about your data. Unless you are trying to contact me, I won't save anything on my servers."}</Text>
				</Stack>
				<Stack>
					<Title order={2} c="grey">{"Cloudflare"}</Title>
					<Text>{"This website uses Cloudflare, a US based company to manage content delivery and firewall rules."}</Text>
					<Text>{"All traffic flows through their servers, before reaching mine."}</Text>
					<Text>
						{"Please visit "}<Anchor href="https://www.cloudflare.com/privacypolicy/" target="_blank">{"https://www.cloudflare.com/privacypolicy/"}</Anchor>{" for more infomation about what data is retained on their servers."}</Text>
				</Stack>
				<Stack>
					<Title order={2} c="grey">{"When you browse the website"}</Title>
					<Text>{"Your browser sends some basic information along with every request when you visit the website."}</Text>
					<Text>{"This includes, but is not limited to:"}</Text>
					<List withPadding>
						<ListItem>{"IP addresses"}</ListItem>
						<ListItem>{"User agents"}</ListItem>
						<ListItem>{"Type of device"}</ListItem>
					</List>
					<Text>{"I do not store, or log, any of this information permanently on my own servers as you are browsing the site"}.</Text>
				</Stack>
				<Stack>
					<Title order={2} c="grey">{"When you use the search function"}</Title>
					<Text>{"You provide user input when using the search function found in the website, or directly through the URI, to search for products."}</Text>
					<Text>{"This includes, but is not limited to:"}</Text>
					<List withPadding>
						<ListItem>{"The product name"}</ListItem>
						<ListItem>{"Page number"}</ListItem>
						<ListItem>{"Price filter"}</ListItem>
					</List>
					<Text>{"I do not store, or log, any of this information permanently on my own servers whenever you use the search functions."}</Text>
				</Stack>
				<Stack>
					<Title order={2} c="grey">{"When you use the contact form"}</Title>
					<Text>{"Using the contact form involves typing in the provided text boxes with some of your information and pressing the submit button."}</Text>
					<Text>{"The following information is collected when you use the form:"}</Text>
					<List withPadding>
						<ListItem>{"Your IP address"}</ListItem>
						<ListItem>{"The message body"}</ListItem>
						<ListItem>{"The date and time of when you submitted the form"}</ListItem>
						<ListItem>{"The email address (if provided)"}</ListItem>
						<ListItem>{"The subject line of the message (if provided)"}</ListItem>
					</List>
					<Text>{"I store this permanently on my server every time the form is submitted."}</Text>
				</Stack>
			</Stack>
		</Box>
	);
}
