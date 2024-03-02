"use server";

import User from "@/types/types";

const users: User[] = [
	{
		id: 1,
		name: "Jane",
		photos: ["/userPhotos/1.png", "/userPhotos/2.png", "/userPhotos/3.png"],
		age: 25,
		location: "New York",
		description: "I like to code",
	},
	{
		id: 2,
		name: "John",
		photos: ["/userPhotos/4.png"],
		age: 18,
		location: "London",
		description: "Basketball player",
	},
	{
		id: 3,
		name: "Alex",
		photos: ["/userPhotos/5.png"],
		age: 30,
		location: "Paris",
		description: "I like to code",
	},
	{
		id: 4,
		name: "Sarah",
		photos: ["/userPhotos/6.png", "/userPhotos/7.png"],
		age: 40,
		location: "Berlin",
		description: "I like to code",
	},
	{
		id: 5,
		name: "Mike",
		photos: ["/userPhotos/8.png"],
		age: 30,
		location: "Paris",
		description: "I like to code",
	},
	{
		id: 6,
		name: "Ella",
		photos: ["/userPhotos/9.png", "/userPhotos/10.png"],
		age: 40,
		location: "Berlin",
		description: "I like to code",
	},
	{
		id: 7,
		name: "Sam",
		photos: ["/userPhotos/11.png"],
		age: 30,
		location: "Paris",
		description: "I like to code",
	},
	{
		id: 8,
		name: "Lily",
		photos: ["/userPhotos/12.png", "/userPhotos/13.png"],
		age: 40,
		location: "Berlin",
		description: "I like to code",
	},
];

export const getSwipes = async function (id: number): Promise<User> {
	if (id > users.length) {
		throw new Error("User not found");
	}
	return users[id];
};
export const getNextSwipes = async function (): Promise<User[]> {
	let swipes: User[] = [];
	for (let i = 0; i < 5; i++) {
		swipes.push(users[i]);
	}
	return swipes;
};
export const getNextSwipe = async function (): Promise<User> {
	return users[Math.round(Math.random() * 7)];
};
