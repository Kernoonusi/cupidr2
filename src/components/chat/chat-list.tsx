"use client";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const chats = [
  {
    id: 1,
    name: "Pavel",
    message: "Hi, how are you?",
  },
  {
    id: 2,
    name: "Jane",
    message: "I'm good, thanks!",
  },
  {
    id: 3,
    name: "Armen",
    message: "What about you?",
  },
];

export function ChatList() {
  return (
    <div className="w-screen sm:w-full">
      {chats.map((chat) => (
        <Link
          key={chat.id}
          href={`/chat/1`}
          className="grid grid-cols-[auto_1fr] grid-rows-2 px-4 py-2 gap-1 gap-x-6 items-center hover:bg-gray-100 dark:hover:bg-zinc-700 lg:rounded-lg"
        >
          <Avatar className="grid row-span-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{chat.name.split("")[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold">{chat.name}</h2>
          <p>{chat.message}</p>
        </Link>
      ))}
    </div>
  );
}
