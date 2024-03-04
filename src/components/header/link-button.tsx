"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkButton({
	children,
	href,
	passHref,
}: {
	children: React.ReactNode;
	href: string;
	passHref: boolean;
}) {
	const pathname = usePathname()?.split("/")[1];
	return (
		<>
			<Link
				href={href}
				passHref={passHref}
				className="flex w-max gap-4 px-3 py-4 transition items-center justify-center rounded-lg hover:text-primary dark:hover:text-primary">
				{children}
			</Link>
			<input onChange={()=>{}} type="radio" placeholder="current-page" name="current-page" checked={"/" + pathname === href} className="hidden" />
		</>
	);
}
