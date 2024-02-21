"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { log } from "console";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import io from "Socket.IO-client";

const chatMessages = [
	{
		id: 1,
		name: "John",
		message: "Hi, how are you?",
	},
	{
		id: 2,
		name: "Jane",
		message: "I'm good, thanks!",
	},
	{
		id: 3,
		name: "John",
		message: "What about you?",
	},
	{
		id: 4,
		name: "Jane",
		message: "I'm also good, how about you?",
	},
	{
		id: 5,
		name: "John",
		message: "I'm also good, how about you?",
	},
	{
		id: 6,
		name: "Jane",
		message: "I'm also good, how about you?",
	},
	{
		id: 7,
		name: "John",
		message: "I'm also good, how about you?",
	},
	{
		id: 8,
		name: "Jane",
		message: "I'm also good, how about you?",
	},
	{
		id: 9,
		name: "John",
		message: "I'm also good, how about you?",
	},
	{
		id: 10,
		name: "Jane",
		message: "I'm also good, how about you?",
	},
	{
		id: 11,
		name: "John",
		message: "I'm also good, how about you?",
	},
	{
		id: 12,
		name: "Jane",
		message: "I'm also good, how about you?",
	},
	{
		id: 13,
		name: "John",
		message: "I'm also good, how about you?",
	},
	{
		id: 14,
		name: "Jane",
		message: "I'm also good, how about you?",
	},
];

const userName = "John";
let socket;

export default function Chat() {
	const messagesEndRef = useRef<null | HTMLSpanElement>(null);
	const form = useForm({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [chatMessages]);

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
						<small>{new Date().toLocaleTimeString()}</small>
						<p>{message.message}</p>
					</div>
				))}
				<span ref={messagesEndRef}></span>
			</main>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="bg-white grid grid-cols-[1fr_auto] gap-2 items-center sticky bottom-0 py-2 px-2">
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<textarea
										id="message"
										className="w-full bg-gray-200 rounded-md border-gray-300 px-4 py-1 focus:ring-blue-500 focus:border-blue-500"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						<span className="material-symbols-outlined">send</span>
					</Button>
				</form>
			</Form>
		</>
	);
}
