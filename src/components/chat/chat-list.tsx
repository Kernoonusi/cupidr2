"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getChats } from "@/actions/get-chats";
import { match } from "@/actions/match";
import { pusherClient } from "@/lib/pusher";
import { useCurrentUser } from "@/hooks/use-current-user";

// const chats = [
//   {
//     id: 1,
//     name: "Pavel",
//     message: "Hi, how are you?",
//   },
//   {
//     id: 2,
//     name: "Jane",
//     message: "I'm good, thanks!",
//   },
//   {
//     id: 3,
//     name: "Armen",
//     message: "What about you?",
//   },
// ];

export function ChatList() {
  const user = useCurrentUser();
  const [chats, setChats] = useState<Record<string, any>[]>();

  useEffect(() => {
    getChats().then((data) => {
      if (!data) {
        return;
      }

      setChats(data.chats);
    });
  }, [setChats]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    pusherClient.subscribe(user?.id);
    pusherClient.bind("chat:new", (data: Record<string, any>[]) => {
      setChats((prevChats) => [data, ...(prevChats || [])]);
    });

    return () => {
      pusherClient.unsubscribe(user?.id as string);
      pusherClient.unbind("chat:new");
    };
  }, [user?.id]);

  return (
    <div className="w-screen sm:w-full">
      {chats &&
        chats?.length > 0 &&
        chats.map((chat) => {
          const companion =
            chat.participants[0].user.id === user?.id
              ? chat.participants[1].user
              : chat.participants[0].user;
          return (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="grid grid-cols-[auto_1fr] grid-rows-2 px-4 py-2 gap-1 gap-x-6 items-center hover:bg-gray-100 dark:hover:bg-zinc-700 lg:rounded-lg"
            >
              <Avatar className="grid row-span-2">
                <AvatarImage src={companion.image} />
                <AvatarFallback>{companion.name}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-bold">{companion.name}</h2>
              <p>
                {chat.messages.length > 0
                  ? chat.messages[0].message
                  : "Chat has started"}
              </p>
            </Link>
          );
        })}
    </div>
  );
}
