"use client";

import { Heart, Loader2, X } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { match } from "@/actions/match";
import { useToast } from "@/components/ui/use-toast";

export function LikeMatch({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const onLike = async () => {
    startTransition(() => {
      match("accept", userId).then((data) => {
        if (data?.success) {
          toast({
            title: "Start chatting!",
          });
          router.push("/chat");
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
    <Button
      variant="outline"
      size="icon"
      className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-primary dark:bg-primary right-10 bottom-8 `}
      onClick={onLike}
    >
      {isPending ? (
        <Loader2 size={24} className="transition animate-spin" />
      ) : (
        <Heart size={36} />
      )}
    </Button>
  );
}

export function DislikeMatch({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onDislike = async () => {
    startTransition(() => {
      match("reject", userId).then((data) => {
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
    <Button
      variant="outline"
      size="icon"
      className={`absolute w-fit h-fit p-6 rounded-full border-0 bg-secondary dark:bg-secondary left-10 bottom-8`}
      onClick={onDislike}
    >
      {isPending ? (
        <Loader2 size={24} className="transition animate-spin" />
      ) : (
        <X size={36} />
      )}
    </Button>
  );
}
