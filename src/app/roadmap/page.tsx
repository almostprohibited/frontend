"use client";

import { Box, Group, List, ListItem, Space, Stack, Text, Timeline, TimelineItem, Title } from "@mantine/core";
import { IconAdjustmentsAlt, IconChartHistogram, IconGitPullRequest, IconPlus, IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export default function roadmapPage() {
	return (
		<Box mt="2rem" p={"var(--content-side-padding)"}>
			<Title order={1} ta="center">{"Roadmap"}</Title>
			<Space h="xl" />
			<Text size="sm" c="dark">
				{"Roadmap last updated: August 27th 2025"}
			</Text>
			<Space h="md" />
			<Group gap="xs">
				<Text>{"Read my rants about what I want to add to the website below. Treat it as a blog if you will."}</Text>
				<Text>{"Do you want to influence this roadmap? Head over to the"} <Link style={{color: "revert"}} href="/contact">contact page</Link> {"and let me hear about it."}</Text>
				<Text>{"If anything on here is in progress, it'll probably be visible"} <Link style={{color: "revert"}} href="https://beta.almostprohibited.ca">at the beta site</Link>.</Text>
			</Group>
			<Space h="xl" />
			<Timeline active={2} bulletSize="2.5rem">
				<TimelineItem
					title="(ongoing) Additional retailer support"
					bullet={
						<IconPlus />
					}
				>
					<Stack gap="xs" mt="1rem" c="dimmed">
						<Text>{"We could always add support for more retailers, after all, most of us are here to find the lowest prices across ALL stores in Canada right?"}</Text>
						<Text>{"Recently added retailers:"}</Text>
						<List withPadding>
							<ListItem>{"International Shooting Supplies"}</ListItem>
							<ListItem>{"Prophet River"}</ListItem>
							<ListItem>{"Dominion Outdoors"}</ListItem>
						</List>
						<Text>{"The short list of retailers to add (non-exhaustive, and in no particular order):"}</Text>
						<List withPadding>
							<ListItem>{"Great North Guns"}</ListItem>
							<ListItem>{"Solely Outdoors"}</ListItem>
							<ListItem>{"Clinton Sporting Goods"}</ListItem>
							<ListItem>{"InterSurplus"}</ListItem>
						</List>
					</Stack>
				</TimelineItem>
				<TimelineItem
					title="(complete) Support for searching ammunition"
					bullet={
						<IconSearch />
					}
				>
					<Stack mt="1rem" c="dimmed">
						<Text>{"I don't list ammo on the site (you'll find components, but not complete rounds) because of one reason: sorting by cost per round."}</Text>
						<Text>{"The ultimate goal of this site is to be nearly automatic in all aspects, meaning I shouldn't have to go around micromanaging items, or having to run crawlers by hand."}</Text>
						<Text>{
							`
								You may have noticed just on your own time, that each store names their ammo products slightly differently to each other.
								Some retailers including number of rounds in the title, some in the description, or some not at all. Maybe it's listed as "x rounds", or perhaps "Box of x".
							`
						}</Text>
						<Text>{"This is where the issue lies: the kinda of chaotic nature of naming products. I could just use regular expressions to grab round counts on a retailer by retailer basis, but where's the fun in that?"}</Text>
					</Stack>
				</TimelineItem>
				<TimelineItem
					title="(in progress) Pricing history"
					bullet={
						<IconChartHistogram />
					}
				>
					<Stack mt="1rem" c="dimmed">
						<Text>{"You know what would be cool? If there was a histogram that plotted the historical price of a particular product, for a particular retailer."}</Text>
						<Text>{"The way that I store the costs of products should let me do this pretty easily. Just have to find the time to do this now."}</Text>
					</Stack>
				</TimelineItem>
				<TimelineItem
					title="Open source"
					bullet={
						<IconGitPullRequest />
					}
				>
					<Stack mt="1rem" c="dimmed">
						<Text>{"I hope that I'll be able to maintain and keep this running for as long as I can (years)."}</Text>
						<Text>{"Opening sourcing this project is one of the ways that I'll be able to make sure that if I can't continue this project, others can."}</Text>
						<Text>{"I have API tokens and webhook URLs hard-coded in the code base, so I can't exactly just toggle the visibility on Github to make everything public right now."}</Text>
					</Stack>
				</TimelineItem>
				<TimelineItem
					title="Additional filters"
					bullet={
						<IconAdjustmentsAlt />
					}
				>
					<Stack mt="1rem" c="dimmed">
						<Text>{"There aren't many filters on the site. Sure you have price filters, very basic \"is gun\", and \"is not gun\" filters, but everything is currently designed in a way where you probably know what you want."}</Text>
						<Text>{"What happens if I don't know what I want, but I know what type of firearm I want? Maybe I want to just look up all lever action rifles. Maybe I want all 1-6x LPVOs, but don't care about the brand."}</Text>
						<Text>{"You might be able to search your way around, but in some cases you won't be able to."}</Text>
					</Stack>
				</TimelineItem>
			</Timeline>
		</Box>
	);
}
