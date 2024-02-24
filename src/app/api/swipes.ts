"use server";

import User from "@/components/shared/types";

const users: User[] = [
	{
		id: 1,
		name: "Jane",
		photos: ["/userPhotos/1.png", "/userPhotos/7.png", "/userPhotos/8.png"],
		age: 25,
		location: "New York",
		description: "I like to code",
	},
	{
		id: 2,
		name: "John",
		photos: ["/userPhotos/3.png"],
		age: 18,
		location: "London",
		description: "Basketball player",
	},
	{
		id: 3,
		name: "Alex",
		photos: ["/userPhotos/4.png"],
		age: 30,
		location: "Paris",
		description: "I like to code",
	},
];

export default async function getSwipes(id: number): Promise<User> {
    if (id > users.length) {
        throw new Error("User not found");
    }
	return users[id];
}
