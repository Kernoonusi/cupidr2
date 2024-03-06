import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AboutYou from "@/components/account/aboutYou";

export default async function Account() {
  const session = await auth();

  return (
    <main className="max-w-7xl justify-center mx-auto px-4 flex flex-col items-center gap-4">
      <Avatar className="mt-6 w-32 h-32">
        <AvatarImage src={session?.user?.image || ""} alt="@shadcn" />
        <AvatarFallback>
          {session?.user?.name ? session?.user?.name[0] : ""}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold text-center">
        {session?.user?.name}, 18
      </h1>
      <Card className="w-full mt-16 dark:bg-dark">
        <CardHeader>
          <CardTitle>Photos</CardTitle>
          <CardDescription>More pictures is better</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Здесь будут все фото</p>
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
