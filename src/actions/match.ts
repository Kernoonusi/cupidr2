"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const match = async (type: "accept" | "reject", userID: string) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }

    const existingMatch = await db.matchPreferences.findFirst({
      where: {
        excluderId: userID,
        excludeeId: user.id,
        type: "like",
      },
    });

    if (!existingMatch) {
      return { error: "No such match found" };
    }

    await db.matchPreferences.update({
      where: {
        id: existingMatch.id,
      },
      data: {
        matched: true,
      },
    });

    if (type === "accept") {
      await db.chat.create({
        data: {
          participants: {
            createMany: {
              skipDuplicates: true,
              data: [{ userId: user.id }, { userId: userID }],
            },
          },
        },
      });
    }

    return { success: "Matched successfully" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
