"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getChats = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const chats = await db.chat.findMany({
      where: {
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              include: {
                images: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return { success: "Retrieved chats", chats };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
