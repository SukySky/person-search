import { z } from 'zod';

// User Form Schema for Validation
export const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(7, "Phone number must be at least 7 characters long"),
});

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(7, "Phone number must be at least 7 characters long"),
  location: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

