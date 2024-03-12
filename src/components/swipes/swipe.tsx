"use client";
import { Heart, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { getSwipes } from "@/actions/get-swipes";
import { useToast } from "@/components/ui/use-toast";
import { dislike } from "@/actions/dislike";
import { like } from "@/actions/like";
import { User } from "@/types";
import { SwipeSkeleton } from "./swipeSkeleton";

export function Swipe({ initSwipes }: { initSwipes: User[] }) {
  const { toast } = useToast();
  const [swipes, setSwipes] = useState<User[]>(initSwipes);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const loadSwipes = (amount: number) => {
    getSwipes(amount).then((data) => {
      console.log(data);

      const {
        success: successMessage,
        error: errorMessage,
        users,
      } = data || {};

      setSuccess(successMessage);
      setError(errorMessage);

      setSwipes((prevSwipes) => [...prevSwipes, ...(users || [])]);
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const dislikeSwipe = (id: string) => {
    startTransition(() => {
      dislike(id);
      swipes.shift();
      loadSwipes(1);
    });
  };
  const likeSwipe = (id: string) => {
    startTransition(() => {
      like(id);
      swipes.shift();
      loadSwipes(1);
    });
  };

  return (
    <>
      {!isPending ? (
        <Carousel className="bg-slate-200 rounded-3xl relative mt-4 max-w-screen-xl max-h-[80dvh] md:max-h-[85dvh]">
          <CarouselContent>
            {swipes[0].images.map((photo) => (
              <CarouselItem className="overflow-hidden" key={photo.id}>
                <Card className="rounded-3xl overflow-hidden max-h-[80dvh] md:max-h-[85dvh] border-0">
                  <CardContent className="p-0 relative rounded-3xl border-0">
                    <Image
                      src={photo.url}
                      alt={photo.path}
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
            <p>{swipes[0].bio}</p>
            <p className="flex items-center gap-1">
              <MapPin />
              {swipes[0].location}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => dislikeSwipe(swipes[0].id)}
            className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-secondary dark:bg-secondary left-10 bottom-8`}
          >
            <X size={36} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => likeSwipe(swipes[0].id)}
            className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-primary dark:bg-primary right-10 bottom-8 `}
          >
            <Heart size={36} />
          </Button>
          <CarouselPrevious className="hidden h-full rounded-3xl p-2 md:block" />
          <CarouselNext className="hidden h-full rounded-3xl p-2 md:block" />
        </Carousel>
      ) : (
        <SwipeSkeleton />
      )}
    </>
  );
}
