import { db } from '@/lib/db';

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
      include: {
        images: {
          where: {
            userId: id,
          },
          select: {
            url: true,
            path: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
