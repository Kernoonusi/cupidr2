"use client";

import { Heart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { match } from "@/actions/match";
import { redirect } from "next/navigation";

export function LikeMatch({ userId }: { userId: string }) {
  const onLike = async () => {
    match("accept", userId);
    redirect("/chat");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-primary dark:bg-primary right-10 bottom-8 `}
      onClick={onLike}
    >
      <Heart size={36} />
    </Button>
  );
}

export function DislikeMatch({ userId }: { userId: string }) {
  const onDislike = async () => {
    match("reject", userId);
    redirect("/chat");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-secondary dark:bg-secondary left-10 bottom-8`}
      onClick={onDislike}
    >
      <X size={36} />
    </Button>
  );
}
