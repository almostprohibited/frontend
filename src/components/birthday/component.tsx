import { getYearsOld } from "@/utils/birthday";
import { useMobileView } from "@/utils/hooks/useMobileView";
import { Alert, Center, Text } from "@mantine/core";
import { IconConfetti } from "@tabler/icons-react";

export default function BirthdayAlert() {
	const yearsOld = getYearsOld();
	const isMobile = useMobileView();

	return (
		<Center>
			<Alert
				variant="outline"
				color="orange"
				radius="md"
				title="Happy birthday to us!"
				m={"var(--content-side-padding)"}
				w={isMobile ? "100%" : "50%"}
				icon={<IconConfetti size="2rem" />}
			>
				<Text>
					{`AlmostProhibited.ca is turning ${yearsOld} year${yearsOld > 1 ? "s" : ""} old today!`}
				</Text>
			</Alert>
		</Center>
	);
}
