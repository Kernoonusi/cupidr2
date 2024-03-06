import { Cities } from "@/constants";
import { Gender, UserRole } from "@prisma/client";
import * as z from "zod";

// Images
const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const UploadSchema = z.object({
  images: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`)
    .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      `Each file size should be less than 5 MB.`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      "Only these types are allowed .jpg, .jpeg, .png and .webp",
    ),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "New password is required", path: ["newPassword"] },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    { message: "Password is required", path: ["password"] },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const PreferencesSchema = z.object({
  gender: z.enum([Gender.male, Gender.female, Gender.both], {
    invalid_type_error: "Gender is required",
  }),
  agePref: z
    .array(
      z.number({ invalid_type_error: "Age range is required" }).min(18).max(99),
      {
        invalid_type_error: "Age range is required",
      },
    )
    .max(2),
});

export const ProfileSchema = z.object({
  description: z.string().max(250, {
    message: "Maximum 250 characters allowed",
  }),
  gender: z.enum([Gender.male, Gender.female], {
    invalid_type_error: "Gender is required",
  }),
  location: z.nativeEnum(Cities, {
    invalid_type_error: "Location is required",
  }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 years old" })
    .max(99, { message: "You must be at most 99 years old" }),
});
