"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getNextSwipe, getNextSwipes } from "@/app/api/swipes";
import Image from "next/image";
import { useEffect, useState } from "react";
import User from "@/components/shared/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Swipes() {
	const [swipes, setSwipes] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initialLoad() {
			const newSwipes: User[] = await getNextSwipes();
			setSwipes(newSwipes);
			setIsLoading(false);
		}
		initialLoad();
	}, []);

	async function dislike() {
		swipes.shift();
		const newSwipe = await getNextSwipe();
		setSwipes([...swipes, newSwipe]);
	}
	async function like() {
		swipes.shift();
		const newSwipe = await getNextSwipe();
		setSwipes([...swipes, newSwipe]);
	}
	return (
		<main className="max-w-xl mx-auto px-4 relative overflow-hidden">
			<Carousel className="bg-slate-200 rounded-3xl mt-4 overflow-hidden">
				{isLoading ? (
					<>
						<CarouselContent>
							<CarouselItem>
								<Skeleton className="aspect-[9/16]" />
							</CarouselItem>
						</CarouselContent>
						<div className="w-3/4 absolute bottom-32 left-10 flex flex-col gap-2">
							<Skeleton className="h-10 w-20 bg-slate-300" />
							<Skeleton className="h-5 w-60 bg-slate-300" />
							<Skeleton className="h-5 w-60 bg-slate-300" />
						</div>
						<Skeleton className="absolute h-20 w-20 rounded-full left-10 bottom-8 bg-red-300" />
						<Skeleton className="absolute h-20 w-20 rounded-full right-10 bottom-8 bg-blue-300" />
					</>
				) : (
					<>
						<CarouselContent>
							{swipes[0].photos.map((photo) => (
								<CarouselItem key={photo}>
									<Card>
										<CardContent className="p-0 relative">
											<Image
												src={photo}
												alt={photo}
												className="aspect-[9/16] object-cover rounded-3xl"
												width={900}
												height={1600}
											/>
											<div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black rounded-3xl" />
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>

						<div className="w-3/4 absolute bottom-32 left-10 text-white">
							<h2 className="text-3xl">
								{swipes[0].name}, {swipes[0].age}
							</h2>
							<p>{swipes[0].description}</p>
							<p className="flex items-center gap-1">
								<span className="material-symbols-outlined">location_on</span>
								{swipes[0].location}
							</p>
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={dislike}
							className={`absolute w-fit h-fit p-5 px-6 rounded-full border-0 bg-red-500 left-10 bottom-8`}>
							<span className="material-symbols-outlined text-3xl text-white">close</span>
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={like}
							className={`absolute w-fit h-fit p-5 pb-4 pt-6 px-6 rounded-full border-0 bg-blue-500 right-10 bottom-8 `}>
							<span className="material-symbols-outlined text-3xl text-white">favorite</span>
						</Button>
						<CarouselPrevious className="hidden md:block" />
						<CarouselNext className="hidden md:block" />
					</>
				)}
			</Carousel>
		</main>
	);
}
