import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}>
      <Button type="submit">Sign out</Button>
    </form>
  );
}
export default async function Header() {
  const session = await auth();
  return (
    <header className="w-screen flex justify-center sticky top-0 bg-white z-10">
      <nav className="py-2">
        <ul className="flex gap-12">
          <li>
            <Link
              href="/swipes"
              passHref
              className="flex gap-1 px-3 py-2 hover:bg-slate-100 transition rounded-lg">
              <p className="hidden md:block font-medium">Swipes</p>
              <span className="material-symbols-outlined">favorite</span>
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              passHref
              className="flex gap-1 px-3 py-2 hover:bg-slate-100 transition rounded-lg">
              <p className="hidden md:block font-medium">Chat</p>
              <span className="material-symbols-outlined">chat</span>
            </Link>
          </li>
          <li>
            {session?.user?.image && session?.user?.name ? (
              <Link
                href="/account"
                passHref
                className="flex gap-1 px-3 py-2 hover:bg-slate-100 transition rounded-lg">
                <p className="font-medium">{session?.user?.name}</p>
                <Image
                  src={session.user.image}
                  alt="user profile picture"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link
                href="/account"
                passHref
                className="flex gap-1 px-3 py-2 hover:bg-slate-100 transition rounded-lg">
                <p className="hidden md:block font-medium">Account</p>
                <span className="material-symbols-outlined">account_circle</span>
              </Link>
            )}
          </li>
          <li className="justify-self-end">
            {session?.user ? (
              <SignOut />
            ) : (
              <Link
                href="/api/auth/signin"
                passHref
                className="flex gap-1 px-3 py-2 hover:bg-slate-100 transition rounded-lg">
                <p className="hidden md:block font-medium">Sign in</p>
                <span className="material-symbols-outlined">login</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
