"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

const deafaultChatMessages = [
	{
		id: 1,
		name: "John",
		message: "Hi, how are you?",
		time: "10:00",
	},
	{
		id: 2,
		name: "Jane",
		message: "I'm good, thanks!",
		time: "10:01",
	},
	{
		id: 3,
		name: "John",
		message: "What about you?",
		time: "10:02",
	},
	{
		id: 4,
		name: "Jane",
		message: "I'm also good, how about you?",
		time: "10:02",
	},
	{
		id: 5,
		name: "John",
		message: "I'm also good, how about you?",
		time: "10:02",
	},
	{
		id: 6,
		name: "Jane",
		message: "I'm also good, how about you?",
		time: "10:02",
	},
	{
		id: 7,
		name: "John",
		message: "I'm also good, how about you?",
		time: "10:02",
	},
	{
		id: 8,
		name: "Jane",
		message: "I'm also good, how about you?",
		time: "10:02",
	},
	{
		id: 9,
		name: "John",
		message: "I'm also good, how about you?",
		time: "10:03",
	},
	{
		id: 10,
		name: "Jane",
		message: "I'm also good, how about you?",
		time: "10:03",
	},
	{
		id: 11,
		name: "John",
		message: "I'm also good, how about you?",
		time: "10:03",
	},
	{
		id: 12,
		name: "Jane",
		message: "I'm also good, how about you?",
		time: "10:03",
	},
	{
		id: 13,
		name: "John",
		message: "I'm also good, how about you?",
		time: "10:03",
	},
	{
		id: 14,
		name: "Jane",
		message: "I'm also good, how about you?",
		time: "10:03",
	},
];

interface IFormInput {
	message: string;
}

const userName = "John";
const userName2 = "Jane";
let socket;

export default function Chat() {
	const [chatMessages, setChatMessages] = useState(deafaultChatMessages);
	const [someoneTyping, setSomeoneTyping] = useState(false);
	const messagesEndRef = useRef<null | HTMLSpanElement>(null);
	const form = useForm({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		const now = new Date();
		setChatMessages([
			...chatMessages,
			{
				id: chatMessages.length + 1,
				name: userName,
				message: data.message,
				time: `${now.getHours()}:${
					now.getMinutes().toString().length === 1 ? `0${now.getMinutes()}` : now.getMinutes()
				}`,
			},
		]);
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [chatMessages]);

	const onTyping = (e: FormEvent<HTMLInputElement>) => {
		if (!someoneTyping) {
			setSomeoneTyping(true);
			setTimeout(() => {
				setSomeoneTyping(false);
			}, 1000);
		}
	};

	// useEffect(() => {
	// 	socketInitializer();
	// }, []);

	// const socketInitializer = async () => {
	// 	await fetch("/api/chat");
	// 	socket = io();

	// 	socket.on("connect", () => {
	// 		console.log("connected");
	// 	});
	// };
	return (
		<>
			<main className="max-w-7xl mx-auto px-4 overflow-y-scroll flex flex-col justify-end ">
				{chatMessages.map((message) => (
					<div
						key={message.id}
						className="grid grid-cols-[auto_1fr_auto] grid-rows-2 py-2 gap-1 gap-x-6 items-center ">
						<Avatar className="grid row-span-2">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>{message.name.split("")[0]}</AvatarFallback>
						</Avatar>
						<h2 className="text-lg font-bold">{message.name}</h2>
						<small>{message.time}</small>
						<p>{message.message}</p>
					</div>
				))}
				<span ref={messagesEndRef}></span>
			</main>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-2 items-center sticky bottom-0 py-2 px-2 dark:bg-dark">
					<p className="col-span-2">{someoneTyping ? `${userName2} is typing` : ""}</p>
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
										onInput={(e) => onTyping(e)}
										autoComplete="off"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type="submit" className="bg-primary shadow-md dark:bg-primary">
						<SendHorizontal size={24} />
					</Button>
				</form>
			</Form>
		</>
	);
}
