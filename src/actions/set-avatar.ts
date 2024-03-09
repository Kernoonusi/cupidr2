"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const setAvatar = async (url: string) => {
  const user = await currentUser();

  const userHasImage = user?.images.some((image) => image.url === url);

  if (!userHasImage) {
    return {
      error: "You do not have permission to set this image as your avatar",
    };
  }

  if (!user || !user.id) {
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
