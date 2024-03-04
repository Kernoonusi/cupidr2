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
import { User } from "@/types/index";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, MapPin, X } from "lucide-react";

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
		<main className="max-w-xl mx-auto px-4 relative  ">
			{isLoading ? (
				<>
					<Skeleton className="mt-4 aspect-[9/16] rounded-3xl h-[80dvh] md:h-[85dvh] md:aspect-[14/16]" />
					<div className="w-3/4 absolute bottom-32 left-10 flex flex-col gap-2">
						<Skeleton className="h-10 w-20 bg-slate-300" />
						<Skeleton className="h-5 w-60 bg-slate-300" />
						<Skeleton className="h-5 w-60 bg-slate-300" />
					</div>
					<Skeleton className="absolute h-20 w-20 rounded-full left-10 bottom-8 bg-secondary dark:bg-secondary" />
					<Skeleton className="absolute h-20 w-20 rounded-full right-10 bottom-8 bg-primary dark:bg-primary" />
				</>
			) : (
				<Carousel className="bg-slate-200 rounded-3xl relative mt-4 max-w-screen-xl max-h-[80dvh] md:max-h-[85dvh]">
					<>
						<CarouselContent>
							{swipes[0].photos.map((photo) => (
								<CarouselItem className="overflow-hidden" key={photo}>
									<Card className="rounded-3xl overflow-hidden max-h-[80dvh] md:max-h-[85dvh] border-0">
										<CardContent className="p-0 relative rounded-3xl border-0">
											<Image
												src={photo}
												alt={photo}
												className="aspect-[9/16] border-0 object-cover rounded-3xl sm:aspect-auto"
												width={900}
												height={1600}
											/>
											<div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black rounded-3xl sm:h-[70%]" />
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
								<MapPin />
								{swipes[0].location}
							</p>
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={dislike}
							className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-secondary dark:bg-secondary left-10 bottom-8`}>
							<X size={36} />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={like}
							className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-primary dark:bg-primary right-10 bottom-8 `}>
							<Heart size={36} />
						</Button>
						<CarouselPrevious className="hidden h-full rounded-3xl p-2 md:block" />
						<CarouselNext className="hidden h-full rounded-3xl p-2 md:block" />
					</>
				</Carousel>
			)}
		</main>
	);
}
