'use server';
import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { getAccountByUserId } from '@/data/account';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    return { error: 'Email not found' };
  }

  const existingAccount = await getAccountByUserId(existingUser.id);

  if (existingAccount) {
    return { error: 'Email not found' };
  }

  const resetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(resetToken.email, resetToken.token);

  return { success: 'Reset email sent!' };
};
