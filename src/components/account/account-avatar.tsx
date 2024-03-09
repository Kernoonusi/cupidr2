"use client";
import { AlertTriangle, Camera, Check, Loader2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "next-auth";
import { setAvatar } from "@/actions/set-avatar";

export function AccountAvatar({ user }: { user: User | undefined }) {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const changeAvatar = async (url: string) => {
    startTransition(() => {
      setAvatar(url).then((data) => {
        if (data?.success) {
          setSuccess(data.success);
          setError(undefined);
          update();
        }
        if (data?.error) {
          setError(data.error);
          setSuccess(undefined);
        }
      });
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="relative group mt-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={user?.image || ""} alt="@shadcn" />
            <AvatarFallback>{user?.name ? user?.name[0] : ""}</AvatarFallback>
          </Avatar>
          <div className="w-full h-full opacity-0 bg-[rgba(0,0,0,0.5)] rounded-full flex justify-center items-center absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition group-hover:opacity-100">
            <Camera size={48} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change avatar?</DialogTitle>
            <DialogDescription>Select one of your photos</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            {user?.images &&
              user.images.map((image) => (
                <div key={image.url} className="relative group">
                  <Image
                    src={image.url}
                    alt="user photos"
                    className="object-cover h-full w-full aspect-[3/4] rounded-lg"
                    width={360}
                    height={640}
                  />
                  <button
                    onClick={() => changeAvatar(image.url)}
                    className="w-full h-full opacity-0 bg-[rgba(0,0,0,0.5)] rounded-lg flex justify-center items-center absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition group-hover:opacity-100"
                  >
                    <p className="sr-only">Change avatar</p>
                    {isPending ? (
                      <Loader2 size={48} />
                    ) : success ? (
                      <ThumbsUp
                        size={48}
                        className="transition text-secondary"
                      />
                    ) : error ? (
                      <AlertTriangle
                        size={48}
                        className="transition text-primary"
                      />
                    ) : (
                      <Check size={48} />
                    )}
                  </button>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
