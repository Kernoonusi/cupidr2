import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getFullUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            url: true,
            path: true,
          },
        },
        preferences: {
          select: {
            minAge: true,
            maxAge: true,
            gender: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getFullUserByEmail = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            url: true,
            path: true,
          },
        },
        preferences: {
          select: {
            minAge: true,
            maxAge: true,
            gender: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
