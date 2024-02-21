"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
const chats = [
	{
		name: "John",
		message: "Hi, how are you?",
	},
	{
		name: "Jane",
		message: "I'm good, thanks!",
	},
	{
		name: "John",
		message: "What about you?",
	},
];

export default function Chat() {
	return (
		<main className="max-w-7xl mx-auto px-4">
			{chats.map((chat) => (
				<Link href="/chat/1" className="grid grid-cols-[auto_1fr] grid-rows-2 py-2 gap-1 gap-x-6 items-center hover:bg-gray-100">
					<Avatar className="grid row-span-2">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
                    <h2 className="text-lg font-bold">{chat.name}</h2>
                    <p>{chat.message}</p>
				</Link>
			))}
		</main>
	);
}
