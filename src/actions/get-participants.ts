"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getParticipants = async (chatId: string) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }

    const existingChat = await db.chat.findUnique({
      where: {
        id: chatId,
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (!existingChat) {
      return { error: "Chat not found" };
    }

    const participants = await db.user.findMany({
      where: {
        participants: {
          some: {
            chatId,
          },
        },
      },
      include: {
        images: true,
      },
    });

    const participantsMap = participants.reduce(
      (map: { [key: string]: Record<string, any> }, participant) => {
        map[participant.id] = participant;
        return map;
      },
      {},
    );

    return { success: "Retrieved participants", participants: participantsMap };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
