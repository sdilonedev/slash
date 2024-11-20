import { z } from "zod";

export const LinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string(),
  shortCode: z.string(),
  description: z.string().optional(),
  expirationDate: z.date()
});

export const CreateLinkSchema = z.object({
  originalUrl: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Original URL is required")
    .regex(/^\S+$/, {
      message: "URL must not contain any blank spaces.",
    }),

  shortCode: z
    .string()
    .min(4, "Short code must have at least 4 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Short code can only contain letters, numbers, hyphens, and underscores"),

  description: z
    .string()
    .max(100, "Description cannot exceed 200 characters")
    .optional(),

  expirationDate: z
    .preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date())
    .refine((date) => date === undefined || date > new Date(), {
      message: "Expiration date must be in the future",
    }),
});

export const EditLinkSchema = z.object({
  id: z.string(),
  originalUrl: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Original URL is reWquired")
    .regex(/^\S+$/, {
      message: "URL must not contain any blank spaces.",
    }),

  shortCode: z
    .string()
    .min(4, "Short code must have at least 4 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Short code can only contain letters, numbers, hyphens, and underscores"),

  description: z
    .string()
    .max(100, "Description cannot exceed 200 characters")
    .optional(),

  expirationDate: z
    .preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date())
    .refine((date) => date === undefined || date > new Date(), {
      message: "Expiration date must be in the future",
    }),
});

export const DeleteLinkSchema = z.object({
  shortCode: z.string().min(1, { message: "Shortcode is required." }),
});

export type LinkSchema = z.TypeOf<typeof LinkSchema>;
export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>;
export type EditLinkInput = z.TypeOf<typeof EditLinkSchema>;