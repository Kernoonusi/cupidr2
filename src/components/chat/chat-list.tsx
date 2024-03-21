"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState, useTransition } from "react";
import { getChats } from "@/actions/get-chats";
import { pusherClient } from "@/lib/pusher";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

export function ChatList() {
  const user = useCurrentUser();
  const [chats, setChats] = useState<Record<string, any>[]>();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    startTransition(() => {
      getChats().then((data) => {
        if (!data) {
          return;
        }

        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
          return;
        }

        if (data.success) {
          setChats(data.chats);
        }
      });
    });
  }, [setChats, toast]);

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
    <div className="w-screen h-[85dvh] overflow-x-auto overflow-y-auto sm:w-full">
      {isPending ? (
        <>
          <div className="grid w-[250px] grid-cols-[auto_1fr] grid-rows-[fit-content_1fr] px-4 py-2 gap-1 gap-x-6 items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </div>
          <div className="grid w-[250px] grid-cols-[auto_1fr] grid-rows-[fit-content_1fr] px-4 py-2 gap-1 gap-x-6 items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </div>
          <div className="grid w-[250px] grid-cols-[auto_1fr] grid-rows-[fit-content_1fr] px-4 py-2 gap-1 gap-x-6 items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </div>
          <div className="grid w-[250px] grid-cols-[auto_1fr] grid-rows-[fit-content_1fr] px-4 py-2 gap-1 gap-x-6 items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </div>
        </>
      ) : chats && chats?.length > 0 ? (
        chats.map((chat) => {
          const companion =
            chat.participants[0].user.id === user?.id
              ? chat.participants[1].user
              : chat.participants[0].user;
          return (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="grid grid-cols-[auto_1fr] grid-rows-[fit-content_1fr] px-4 py-2 gap-1 gap-x-6 items-center hover:bg-gray-100 dark:hover:bg-zinc-700 lg:first:rounded-t-lg lg:last:rounded-b-lg"
            >
              <Avatar className="grid row-span-2">
                <AvatarImage src={companion.image} />
                <AvatarFallback>{companion.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-bold">{companion.name}</h2>
              <p>
                {chat.messages.length > 0
                  ? chat.messages[0].message.length > 30
                    ? chat.messages[0].message.slice(0, 30) + "..."
                    : chat.messages[0].message
                  : "Chat has started"}
              </p>
            </Link>
          );
        })
      ) : (
        <div>No chats</div>
      )}
    </div>
  );
}
