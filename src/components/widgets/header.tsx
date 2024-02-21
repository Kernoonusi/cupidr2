"use client";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

let isLoggedIn = false;

export default function Header() {
	return (
		<header className="w-screen flex justify-center sticky top-0 bg-white z-10">
			<NavigationMenu className="py-2">
				<NavigationMenuList className="gap-6">
					<NavigationMenuItem>
						<Link href="/swipes" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle() + "flex gap-2"}>
								<p className="hidden md:block">Swipes</p>
								<span className="material-symbols-outlined">favorite</span>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/chat" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle() + "flex gap-2"}>
								<p className="hidden md:block">Chat</p>
								<span className="material-symbols-outlined">chat</span>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/account" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle() + "flex gap-2"}>
								<p className="hidden md:block">Account</p>
								<span className="material-symbols-outlined">account_circle</span>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem className="justify-self-end">
						<Link href="/auth" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle() + "flex gap-2"}>
								<p className="hidden md:block">Log in</p>
								<span className="material-symbols-outlined">login</span>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
