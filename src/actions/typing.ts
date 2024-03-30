"use server";

import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";

export const typing = async (chatId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "User not found" };
  }

  pusherServer.trigger(chatId, "message:typing", {
    id: user.id,
    name: user.name,
  });
};
