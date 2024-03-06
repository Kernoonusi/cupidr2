import { CircleUser, Heart, LogIn, MessageSquareMore } from "lucide-react";

import LinkButton from "@/components/header/link-button";
import { HeaderTitle } from "@/components/header/header-title";
import { currentUser } from "@/lib/auth";

export default async function Header() {
  const user = await currentUser();
  return (
    <header className="w-screen flex flex-col justify-center items-center sticky top-0 border-b bg-white dark:bg-dark dark:border-b-zinc-700 z-10 md:flex-row lg:grid lg:grid-rows-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <div className="hidden w-full h-full md:order-0 lg:block" />
      <HeaderTitle />
      <div className="hidden w-full h-full md:order-2 lg:block" />
      <nav className="md:px-3 md:order-1">
        <ul className="flex items-center gap-4 sm:gap-8">
          <li className="has-[:checked]:border-b">
            <LinkButton href="/swipes" passHref>
              <p className="hidden md:block font-medium">Swipes</p>
              <Heart />
            </LinkButton>
          </li>
          <li className="has-[:checked]:border-b">
            <LinkButton href="/chat" passHref>
              <p className="hidden md:block font-medium">Chat</p>
              <MessageSquareMore />
            </LinkButton>
          </li>
          {user && (
            <li className="has-[:checked]:border-b">
              <LinkButton href="/account" passHref>
                <p className="hidden md:block font-medium">{user?.name}</p>
                <CircleUser />
              </LinkButton>
            </li>
          )}
          {!user && (
            <li className="has-[:checked]:border-b">
              <LinkButton href="/api/auth/signin" passHref>
                <p className="hidden md:block font-medium">Sign in</p>
                <LogIn />
              </LinkButton>
            </li>
          )}
        </ul>
      </nav>
      <div className="hidden w-full h-full md:order-4 lg:block" />
    </header>
  );
}
