"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export const sendMessage = async (chatId: string, msg: string) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }

    const message = await db.messages.create({
      data: {
        chatId,
        senderId: user.id,
        message: msg,
      },
    });

    pusherServer.trigger(chatId, "message:new", message);

    return { success: "Sent message" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
