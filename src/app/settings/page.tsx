import DateSwitch from "@/components/settings/dateSwitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Settings() {
	return (
		<main className="max-w-7xl mx-auto px-4">
			<Card className="w-full mt-4 dark:bg-dark">
				<CardHeader>
					<CardTitle>Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<DateSwitch />
				</CardContent>
			</Card>
		</main>
	);
}
