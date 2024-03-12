"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Cities } from "@/constants";
import { Heart, MapPin, X } from "lucide-react";
import Image from "next/image";

const likes = [
  {
    id: 1,
    name: "John Doe",
    photos: ["/userPhotos/1.png", "/userPhotos/2.png", "/userPhotos/3.png"],
    age: 25,
    location: Cities.chelyabinsk,
    description: "I'm a software developer, enjoying my work and spending my free time with my family",
  },
  {
    id: 2,
    name: "Jane Doe",
    photos: ["/userPhotos/4.png", "/userPhotos/5.png"],
    age: 30,
    location: Cities.moscow,
    description: "Love hiking and spending time outdoors, enjoying nature and new experiences",
  },
  {
    id: 3,
    name: "John Smith",
    photos: ["/userPhotos/10.png", "/userPhotos/2.png", "/userPhotos/3.png"],
    age: 28,
    location: Cities.kazan,
    description: "I'm a photographer, traveling the world and capturing life's beautiful moments",
  },
  {
    id: 4,
    name: "Jane Smith",
    photos: ["/userPhotos/8.png", "/userPhotos/6.png"],
    age: 35,
    location: Cities.chelyabinsk,
    description: "I'm a yoga and wellness enthusiast, connecting with nature and improving my health",
  },
];

export default function Likes() {
  return (
    <main className="max-w-7xl mt-4 justify-center px-4 mx-auto flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold">This people liked you</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {likes.map((like) => (
          <article key={like.id}>
            <Carousel className="bg-slate-200 rounded-3xl relative mt-4 max-w-screen-xl max-h-[80dvh] md:max-h-[85dvh]">
              <CarouselContent>
                {like.photos.map((photo) => (
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
                  {like.name}, {like.age}
                </h2>
                <p>{like.description}</p>
                <p className="flex items-center gap-1">
                  <MapPin />
                  {like.location}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-secondary dark:bg-secondary left-10 bottom-8`}
              >
                <X size={36} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-primary dark:bg-primary right-10 bottom-8 `}
              >
                <Heart size={36} />
              </Button>
            </Carousel>
          </article>
        ))}
      </div>
      <p>{likes.length} likes</p>
    </main>
  );
}
