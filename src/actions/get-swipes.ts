"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getSwipes = async (limit: number) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const fields = ["id", "email", "name"];
    const directions = ["asc", "desc"];
    const users = await db.user.findMany({
      take: limit,
      orderBy: {
        [fields[Math.floor(Math.random() * fields.length)]]:
          directions[Math.floor(Math.random() * directions.length)],
      },
      where: {
        id: { not: { equals: user.id } },
        age: {
          gte: user.preferences.minAge,
          lte: user.preferences.maxAge,
        },
        // location: user.location,
        AND: [
          {
            gender: {
              equals:
                user.preferences.gender === "both"
                  ? undefined
                  : user.preferences.gender,
            },
          },
          {
            preferences: {
              some: {
                gender: {
                  in: [user.preferences.gender, "both"],
                },
              },
            },
          },
        ],
        NOT: {
          OR: [
            {
              matchPreferencesExcluder: {
                some: {
                  OR: [{ excludeeId: user.id }, { excluderId: user.id }],
                },
              },
            },
            {
              matchPreferencesExcludee: {
                some: {
                  OR: [{ excludeeId: user.id }, { excluderId: user.id }],
                },
              },
            },
          ],
        },
      },
      select: {
        id: true,
        email: true,
        bio: true,
        age: true,
        name: true,
        gender: true,
        location: true,
        images: true,
      },
    });

    return {
      success: "Swipes retrieved successfully",
      users,
    };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
