import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import Image from "next/image";
import LinkButton from "./linkButton";
import HeaderTitle from "./headerTitle";

function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}>
			<Button
				type="submit"
				variant="ghost"
				className="gap-4 flex items-center dark:hover:bg-zinc-800">
				<p className="hidden md:block font-medium">Sign out</p>
				<span className="material-symbols-outlined text-primary">logout</span>
			</Button>
		</form>
	);
}

export default async function Header() {
	const session = await auth();
	return (
		<header className="w-screen flex flex-col justify-center items-center sticky top-0 border-b dark:bg-dark dark:border-b-zinc-700 z-10  md:flex-row lg:grid lg:grid-rows-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
			<div className="hidden w-full h-full md:order-0 lg:block"/>
			<HeaderTitle />
			<div className="hidden w-full h-full md:order-2 lg:block"/>
			<nav className="md:px-3 md:order-1">
				<ul className="flex items-center gap-4 sm:gap-8">
					<li className="has-[:checked]:border-b">
						<LinkButton href="/swipes" passHref>
							<p className="hidden md:block font-medium">Swipes</p>
							<span className="material-symbols-outlined">favorite</span>
						</LinkButton>
					</li>
					<li className="has-[:checked]:border-b">
						<LinkButton href="/chat" passHref>
							<p className="hidden md:block font-medium">Chat</p>
							<span className="material-symbols-outlined">chat</span>
						</LinkButton>
					</li>
					<li className="has-[:checked]:border-b">
						{session?.user?.image && session?.user?.name ? (
							<LinkButton href="/account" passHref>
								<p className="font-medium">{session?.user?.name}</p>
								<Image
									src={session.user.image}
									alt="user profile picture"
									width={30}
									height={30}
									className="rounded-full"
								/>
							</LinkButton>
						) : (
							<LinkButton href="/account" passHref>
								<p className="hidden md:block font-medium">Account</p>
								<span className="material-symbols-outlined">account_circle</span>
							</LinkButton>
						)}
					</li>
					<li className="justify-self-end">
						{session?.user ? (
							<SignOut />
						) : (
							<LinkButton href="/api/auth/signin" passHref>
								<p className="hidden md:block font-medium">Sign in</p>
								<span className="material-symbols-outlined">login</span>
							</LinkButton>
						)}
					</li>
				</ul>
			</nav>
			<div className="hidden w-full h-full md:order-4 lg:block"/>
		</header>
	);
}
