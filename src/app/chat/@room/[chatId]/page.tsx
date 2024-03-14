"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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

// const defaultChatMessages = [
//   {
//     id: 1,
//     name: "John",
//     message: "Hi, how are you?",
//     time: "10:00",
//   },
//   {
//     id: 2,
//     name: "Jane",
//     message: "I'm good, thanks!",
//     time: "10:01",
//   },
//   {
//     id: 3,
//     name: "John",
//     message: "What about you?",
//     time: "10:02",
//   },
//   {
//     id: 4,
//     name: "Jane",
//     message: "I'm also good, how about you?",
//     time: "10:02",
//   },
//   {
//     id: 5,
//     name: "John",
//     message: "I'm also good, how about you?",
//     time: "10:02",
//   },
//   {
//     id: 6,
//     name: "Jane",
//     message: "I'm also good, how about you?",
//     time: "10:02",
//   },
//   {
//     id: 7,
//     name: "John",
//     message: "I'm also good, how about you?",
//     time: "10:02",
//   },
//   {
//     id: 8,
//     name: "Jane",
//     message: "I'm also good, how about you?",
//     time: "10:02",
//   },
//   {
//     id: 9,
//     name: "John",
//     message: "I'm also good, how about you?",
//     time: "10:03",
//   },
//   {
//     id: 10,
//     name: "Jane",
//     message: "I'm also good, how about you?",
//     time: "10:03",
//   },
//   {
//     id: 11,
//     name: "John",
//     message: "I'm also good, how about you?",
//     time: "10:03",
//   },
//   {
//     id: 12,
//     name: "Jane",
//     message: "I'm also good, how about you?",
//     time: "10:03",
//   },
//   {
//     id: 13,
//     name: "John",
//     message: "I'm also good, how about you?",
//     time: "10:03",
//   },
//   {
//     id: 14,
//     name: "Jane",
//     message: "I'm also good, how about you?",
//     time: "10:03",
//   },
// ];

interface IFormInput {
  message: string;
}

export default function ChatField({ params }: { params: { chatId: string } }) {
  const [participants, setParticipants] = useState<{
    [key: string]: Record<string, any>;
  }>();
  const [chatMessages, setChatMessages] = useState<Record<string, any>[]>();
  const messagesEndRef = useRef<null | HTMLSpanElement>(null);

  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
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

  return (
    <main className="max-w-7xl w-full px-4 overflow-y-auto flex flex-col justify-end ">
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
      <span ref={messagesEndRef}></span>

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
