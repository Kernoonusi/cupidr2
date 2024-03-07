"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const setAvatar = async (url: string) => {
  const user = await currentUser();

  if (!user?.images.some((image) => image.url === url)) return;

  if (!user.id) {
    return { error: "User not found" };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      image: url,
    },
  });

  return { success: "Avatar updated" };
};
