import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import getSwipes from "@/app/api/swipes";
export default async function Swipes({ params: { id } }: { params: { id: number } }) {
	const recomendedUser = await getSwipes(id);
	return (
		<main className="w-full mx-auto px-4 relative overflow-hidden">
			<Carousel>
				<CarouselContent>
					{recomendedUser.photos.map((user) => (
						<CarouselItem>
							<Card className="rounded-3xl">
								<CardContent className="p-0">
									<img src={user} alt={user} className="w-full h-full object-cover rounded-3xl" />
									<div className="w-3/4 absolute bottom-32 left-14 text-white">
										<h2 className="text-3xl">
											{recomendedUser.name}, {recomendedUser.age}
										</h2>
										<p>{recomendedUser.description}</p>
										<p className="flex items-center gap-1">
											<span className="material-symbols-outlined">location_on</span>
											{recomendedUser.location}
										</p>
									</div>
									<Button
										variant="outline"
										size="icon"
										className="absolute bottom-8 left-14 w-fit h-fit p-1 rounded-full bg-red-600 border-0">
										<span className="material-symbols-outlined text-6xl">cancel</span>
									</Button>
									<Button
										variant="outline"
										size="icon"
										className="absolute bottom-8 right-14 w-fit h-fit p-1 pb-0 rounded-full bg-blue-600 border-0">
										<span className="material-symbols-outlined text-6xl">favorite</span>
									</Button>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="hidden md:block" />
				<CarouselNext className="hidden md:block" />
			</Carousel>
		</main>
	);
}
