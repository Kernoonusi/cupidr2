"use client";
import { Frown, Heart, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getSwipes } from "@/actions/get-swipes";
import { useToast } from "@/components/ui/use-toast";
import { dislike } from "@/actions/dislike";
import { like } from "@/actions/like";
import { User } from "@/types";
import "./swipe.css";

export function Swipe({ initSwipes }: { initSwipes: User[] }) {
  const { toast } = useToast();
  const [swipes, setSwipes] = useState<User[]>(initSwipes);
  const [images, setImages] = useState<User["images"]>(
    swipes.flatMap((swipe) => swipe.images),
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const swipeElementRef = useRef<HTMLDivElement>(null);

  const loadSwipes = (amount: number) => {
    getSwipes(amount).then((data) => {
      const {
        success: successMessage,
        error: errorMessage,
        users,
      } = data || {};

      setSuccess(successMessage);
      setError(errorMessage);

      const newUsers = users?.filter(
        (user) => !swipes.some((swipe) => swipe.id === user.id),
      );
      const newImages = newUsers?.flatMap((user) => user.images) || [];
      setSwipes((prevSwipes) => [...prevSwipes, ...newUsers || []]);
      setImages((prevImages) => [
        ...prevImages.filter((image) => !newImages.includes(image)),
        ...newImages,
      ]);
      console.log(images, swipes);
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
      const swipeElement = swipeElementRef.current;
      const handleTransitionEnd = () => {
        swipeElementRef.current?.classList.toggle("dislikeSwipe");
        swipeElementRef.current?.classList.toggle("overflow-hidden");
        setSwipes((prevSwipes) => prevSwipes.slice(1));
        setImages((prevImages) => prevImages.slice(1));
      };

      if (swipeElement) {
        console.log("swiped dislike", swipeElement);
        swipeElement.classList.toggle("dislikeSwipe");
        swipeElement.classList.toggle("overflow-hidden");
        swipeElement.addEventListener("animationend", handleTransitionEnd);
      }

      dislike(id).then((data) => {
        if (swipes.length < 3) {
          loadSwipes(3);
        }
        if (data?.error) {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
        }
      });
    });
  };
  const likeSwipe = (id: string) => {
    startTransition(() => {
      const swipeElement = swipeElementRef.current;
      const handleTransitionEnd = () => {
        swipeElementRef.current?.classList.toggle("likeSwipe");
        swipeElementRef.current?.classList.toggle("overflow-hidden");
        setSwipes((prevSwipes) => prevSwipes.slice(1));
        setImages((prevImages) => prevImages.slice(1));
      };

      if (swipeElement) {
        console.log("swiped like", swipeElement);
        swipeElement.classList.toggle("likeSwipe");
        swipeElement.classList.toggle("overflow-hidden");
        swipeElement.addEventListener("animationend", handleTransitionEnd);
      }

      like(id).then((data) => {
        if (swipes.length < 3) {
          loadSwipes(3);
        }
        if (data?.error) {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
        }
      });
    });
  };

  return (
    <>
      {swipes.length > 0 ? (
        swipes.map((swipe, i) => (
          <Carousel
            className={`bg-slate-200 rounded-3xl mt-4 max-h-[80dvh] md:max-h-[85dvh] ${i > 0 ? "-z-30 absolute top-0" : "z-10 relative"} ${i > 1 ? "-z-40" : i > 2 ? "hidden" : ""}`}
            key={swipe.id}
            ref={i === 0 ? swipeElementRef : undefined}
          >
            <CarouselContent>
              {swipe.images.length > 0 ? (
                swipe.images.map((photo) => (
                  <CarouselItem className="overflow-hidden" key={photo.id}>
                    <Card className="rounded-3xl overflow-hidden max-h-[80dvh] md:max-h-[85dvh] border-0">
                      <CardContent className="p-0 relative rounded-3xl h-[85dvh] aspect-[9/16] border-0 md:aspect-[3/4]">
                        <Image
                          key={photo.id}
                          src={photo.url}
                          alt={photo.path}
                          className={`border-0 object-cover rounded-3xl`}
                          quality={85}
                          priority
                          fill
                        />
                        <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black rounded-3xl" />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="overflow-hidden">
                  <Card className="rounded-3xl overflow-hidden max-h-[80dvh]  border-0">
                    <CardContent className="p-0 relative rounded-3xl border-0">
                      <div className="aspect-[9/16] w-full h-full flex justify-center items-center border-0 object-cover rounded-3xl">
                        <p className="text-3xl w-full h-full">No images</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
            </CarouselContent>
            <div className="w-3/4 absolute bottom-32 left-10 text-white">
              <h2 className="text-3xl">
                {swipe.name}, {swipe.age}
              </h2>
              <p>{swipe.bio}</p>
              <p className="flex items-center gap-1">
                <MapPin />
                {swipe.location}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              disabled={isPending}
              onClick={() => dislikeSwipe(swipe.id)}
              className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-secondary dark:bg-secondary left-10 bottom-8`}
            >
              <X size={36} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={isPending}
              onClick={() => likeSwipe(swipe.id)}
              className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-primary dark:bg-primary right-10 bottom-8 `}
            >
              <Heart size={36} />
            </Button>
            <CarouselPrevious className="hidden h-full rounded-3xl p-2 md:block" />
            <CarouselNext className="hidden h-full rounded-3xl p-2 md:block" />
          </Carousel>
        ))
      ) : (
        <div className="flex w-full h-full mt-4 flex-col items-center justify-center">
          <Frown size={48} />
          <h2 className="text-3xl">No swipes</h2>
        </div>
      )}
    </>
  );
}
