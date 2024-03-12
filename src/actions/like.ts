"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const like = async (excludeeID: string) => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return { error: "Unauthorized" };
    }

    const excluder = await getUserById(user.id);

    if (!excluder) {
      return { error: "User not found" };
    }

    const excludee = await getUserById(excludeeID);

    if (!excludee) {
      return { error: "User not found" };
    }

    const existingMatch = await db.matchPreferences.findFirst({
      where: {
        excludeeId: excludee.id,
        excluderId: excluder.id,
      },
    });

    if (existingMatch) {
      return { error: "Already matched this person" };
    }

    const existingMatchOfMe = await db.matchPreferences.findFirst({
      where: {
        excluderId: excludee.id,
        excludeeId: excluder.id,
      },
    });

    if (existingMatchOfMe) {
      return { error: "You was already matched by this person" };
    }

    await db.matchPreferences.create({
      data: {
        excluderId: excluder.id,
        excludeeId: excludee.id,
        type: "like",
      },
    });

    return { success: "Liked successfully" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
