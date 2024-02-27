import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import Image from "next/image";
import LinkButton from "../shared/linkButton";
import HeaderTitle from "./headerTitle";

function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}>
			<Button type="submit" variant="ghost" className="gap-4 flex items-center">
				<p className="hidden md:block font-medium">Sign out</p>
				<span className="material-symbols-outlined text-primary">logout</span>
			</Button>
		</form>
	);
}

export default async function Header() {
	const session = await auth();

	return (
		<header className="w-screen flex flex-col justify-center items-center sticky top-0 bg-gray-200 z-10 dark:bg-dark md:flex-row">
			<HeaderTitle />

			<nav className="py-2">
				<ul className="flex items-center gap-4 md:gap-12">
					<li>
						<LinkButton href="/swipes" passHref>
							<p className="hidden md:block font-medium">Swipes</p>
							<span className="material-symbols-outlined">favorite</span>
						</LinkButton>
					</li>
					<li>
						<LinkButton href="/chat" passHref>
							<p className="hidden md:block font-medium">Chat</p>
							<span className="material-symbols-outlined">chat</span>
						</LinkButton>
					</li>
					<li>
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
		</header>
	);
}
