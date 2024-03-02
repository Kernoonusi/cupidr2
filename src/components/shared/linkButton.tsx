import Link from "next/link"

export default function LinkButton({
	children,
	href,
	passHref
}: {
	children: React.ReactNode;
	href: string;
	passHref: boolean;
}) {
	return (
		<Link
			href={href}
			passHref={passHref}
			className="flex gap-4 px-3 py-2 hover:bg-slate-100 transition rounded-lg dark:hover:bg-zinc-800">
			{children}
		</Link>
	);
}
