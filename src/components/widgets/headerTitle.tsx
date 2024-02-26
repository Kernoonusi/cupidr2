"use client";

import { usePathname } from "next/navigation";

const titles: Map<string, string> = new Map([
	["/", "Cupidr"],
	["/swipes", "Swipes"],
	["/chat", "Chat"],
	["/account", "Account"],
]);

export default function HeaderTitle() {
	const pathname = usePathname();
	const currentPageTitle = titles.get(pathname) || "Cupidr";

	return (
		<section className="p-2">
			<h1 className="text-3xl font-bold">{currentPageTitle}</h1>
		</section>
	);
}
