"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AboutYou } from "@/components/account/about-you";
import { PhotosGallery } from "@/components/account/photos-gallery";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AccountAvatar } from "@/components/account/account-avatar";

export default function Account() {
  const user = useCurrentUser();

  return (
    <main className="max-w-7xl justify-center px-4 mx-auto flex flex-col items-center gap-4">
      <AccountAvatar user={user} />
      <h1 className="text-2xl font-bold text-center">{user?.name}, 18</h1>
      <Card className="w-full mt-16 dark:bg-dark">
        <CardHeader>
          <CardTitle>Your photos</CardTitle>
          <CardDescription>More is better (max is 5)</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <PhotosGallery />
        </CardContent>
      </Card>
      <Card className="w-full dark:bg-dark">
        <CardHeader>
          <CardTitle>About you</CardTitle>
          <CardDescription>Write information here</CardDescription>
        </CardHeader>
        <CardContent>
          <AboutYou />
        </CardContent>
      </Card>
    </main>
  );
}
