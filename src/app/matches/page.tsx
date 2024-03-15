import Image from "next/image";
import { Heart, MapPin, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { User } from "@/types";
import { getMatches } from "@/actions/get-matches";
import { DislikeMatch, LikeMatch } from "@/components/matches/match-actions";

export default async function Matches() {
  let matches: User[] = [];
  let error: string | undefined = undefined;
  let success: string | undefined = undefined;

  const loadMatches = async () => {
    try {
      const {
        success: successMessage,
        error: errorMessage,
        users,
      } = await getMatches();

      success = successMessage;
      error = errorMessage;

      matches = users || [];
    } catch (error) {
      console.error("Error loading swipes:", error);
    }
  };

  if (!matches.length && !error) {
    await loadMatches();
  }

  return (
    <main className="max-w-7xl mt-4 justify-center px-4 mx-auto flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold">This people liked you</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <article key={match.id}>
            <Carousel className="bg-slate-200 rounded-3xl relative h-full max-w-screen-sm">
              <CarouselContent>
                {match.images.length > 0 ? (
                  match.images.map((image, i) => (
                    <CarouselItem className="overflow-hidden" key={i}>
                      <Card className="rounded-3xl overflow-hidden max-h-[80dvh] border-0">
                        <CardContent className="p-0 relative rounded-3xl border-0">
                          <Image
                            src={image.url}
                            alt={image.path}
                            className="aspect-[9/16] border-0 w-full h-full object-cover rounded-3xl"
                            width={900}
                            height={1600}
                          />
                          <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black rounded-3xl sm:h-[70%]" />
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
                  {match.name}, {match.age}
                </h2>
                <p>{match.bio}</p>
                <p className="flex items-center gap-1">
                  <MapPin />
                  {match.location}
                </p>
              </div>
              <LikeMatch userId={match.id} />
              <DislikeMatch userId={match.id} />
            </Carousel>
          </article>
        ))}
      </div>
      <p>{matches.length} likes</p>
    </main>
  );
}
