"use client";
import { useCallback, useEffect, useRef, useState, useTransition, use } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMessages } from "@/actions/get-messages";
import { sendMessage } from "@/actions/send-message";
import { pusherClient } from "@/lib/pusher";
import { getParticipants } from "@/actions/get-participants";
import { MessageForm } from "@/components/chat/message-form";
import { ChatListSkeleton } from "@/components/chat/chat-list-skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { typing } from "@/actions/typing";

export default function ChatField(props: { params: Promise<{ chatId: string }> }) {
  const params = use(props.params);
  const user = useCurrentUser();

  const [participants, setParticipants] = useState<{
    [key: string]: Record<string, any>;
  }>();

  const [isTyping, setIsTyping] = useState(false);
  const [typerName, setTyperName] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<Record<string, any>[]>();
  const messagesEndRef = useRef<null | HTMLSpanElement>(null);
  const [isPending, startTransition] = useTransition();

  const startTyping = (typerName: string) => {
    setIsTyping(true);
    setTyperName(typerName);
    setTimeout(() => {
      setTyperName(null);
      setIsTyping(false);
    }, 3000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [isPending]);

  useEffect(() => {
    startTransition(() => {
      getMessages(params.chatId).then((data) => {
        if (!data) {
          return;
        }
        setChatMessages(data.messages);
      });

      getParticipants(params.chatId).then((data) => {
        if (!data) {
          return;
        }
        setParticipants(data.participants);
      });

      pusherClient.subscribe(params.chatId);

      pusherClient.bind(
        "message:typing",
        (typer: { id: string; name: string }) => {
          if (typer.id !== user?.id) {
            startTyping(typer.name);
          }
        },
      );

      pusherClient.bind("message:new", (newMessage: Record<string, any>) => {
        setChatMessages((prevChats) => {
          const messageExists = prevChats?.some(
            (message) => message.id === newMessage.id,
          );
          return messageExists ? prevChats : [...(prevChats || []), newMessage];
        });
      });
    });

    return () => {
      pusherClient.unsubscribe(params.chatId);
      pusherClient.unbind("message:type");
      pusherClient.unbind("message:new");
    };
  }, [params.chatId, user?.id]);

  const form = useForm<{ message: string }>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<{ message: string }> = useCallback(
    (data) => {
      sendMessage(params.chatId, data.message).then(() => {
        form.reset();
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      });
    },
    [form, params.chatId],
  );

  let canPublish = true;
  const handleTyping = () => {
    if (canPublish) {
      typing(params.chatId);

      canPublish = false;
      setTimeout(() => {
        canPublish = true;
      }, 300);
    }
  };

  return (
    <main className="max-w-7xl w-full px-4 flex flex-col h-full justify-between">
      {isPending ? (
        Array.from({ length: 10 }).map((_, index) => (
          <ChatListSkeleton key={index} />
        ))
      ) : (
        <div className="w-full h-full max-h-[75dvh] pr-2 overflow-x-auto overflow-y-auto sm:w-full">
          {chatMessages && participants && chatMessages?.length > 0 ? (
            chatMessages.map((item) => {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[auto_1fr_auto] grid-rows-2 py-2 gap-1 gap-x-6 items-center "
                >
                  <Avatar className="grid row-span-2">
                    <AvatarImage src={participants[item.senderId].image} />
                    <AvatarFallback>
                      {participants[item.senderId].name}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-bold">
                    {participants[item.senderId].name}
                  </h2>
                  <small>{new Date(item.createdAt).toLocaleTimeString()}</small>
                  <p>{item.message}</p>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h2 className="text-2xl font-medium">No messages yet 😔.</h2>
            </div>
          )}
          <span ref={messagesEndRef} />
        </div>
      )}
      <div className="relative flex-grow flex flex-col justify-center gap-y-2 py-2">
        <p>{isTyping && `${typerName} is typing...`}</p>
        <MessageForm
          form={form}
          onSubmit={onSubmit}
          handleTyping={handleTyping}
        />
      </div>
    </main>
  );
}
