"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getMatches = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const users = await db.user.findMany({
      where: {
        matchPreferencesExcluder: {
          some: {
            excludeeId: user.id,
            type: "like",
            matched: false,
          },
        },
      },
    });

    return { success: "Retrieved matches", users };
  } catch (error) {
    console.log(error)
    return { error: "An error occurred" };
  }
};
