"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getMessages = async (chatId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const messages = await db.messages.findMany({
      where: {
        chat: {
          id: chatId,
          participants: {
            some: {
              userId: user.id as string,
            },
          },
        },
      },
    });

    if (!messages) {
      return { error: "No messages found" };
    }

    return { success: "Retrieved messages", messages };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
