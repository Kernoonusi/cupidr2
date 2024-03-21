"use client";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getMessages } from "@/actions/get-messages";
import { sendMessage } from "@/actions/send-message";
import { pusherClient } from "@/lib/pusher";
import { getParticipants } from "@/actions/get-participants";
import { Skeleton } from "@/components/ui/skeleton";

interface IFormInput {
  message: string;
}

export default function ChatField({ params }: { params: { chatId: string } }) {
  const [participants, setParticipants] = useState<{
    [key: string]: Record<string, any>;
  }>();
  const [chatMessages, setChatMessages] = useState<Record<string, any>[]>();
  const messagesEndRef = useRef<null | HTMLSpanElement>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

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
      pusherClient.unbind("message:new");
    };
  }, [params.chatId]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
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

  const skeleton = [...Array(10).keys()].map((i) => (
    <div
      key={i}
      className="grid grid-cols-[auto_1fr] grid-rows-2 py-2 gap-1 gap-x-6 items-center "
    >
      <Skeleton className="h-12 w-12 rounded-full row-span-2" />
      <Skeleton className="h-4 w-4/12" />
      <Skeleton className="h-4 w-10/12" />
    </div>
  ));

  return (
    <main className="max-w-7xl w-full px-4 flex flex-col justify-end">
      {isPending ? (
        <div className="w-full h-[80dvh] flex flex-col justify-end pr-2 overflow-x-auto overflow-y-auto sm:w-full">
          {skeleton}
        </div>
      ) : (
        <div className="w-full h-[80dvh] pr-2 overflow-x-auto overflow-y-auto sm:w-full">
          {chatMessages &&
            participants &&
            chatMessages?.length > 0 &&
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
            })}
          <span ref={messagesEndRef} />
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-2 items-center sticky bottom-0 py-2 px-2 dark:bg-dark"
        >
          <FormField
            control={form.control}
            name="message"
            rules={{
              required: "Type a message",
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-100 shadow-md dark:bg-slate-800"
                    type="text"
                    placeholder="Type a message"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primary shadow-md dark:bg-primary"
          >
            <SendHorizontal size={24} />
          </Button>
        </form>
      </Form>
    </main>
  );
}
