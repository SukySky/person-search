// app/schemas.ts

import { z } from 'zod'
import { User } from '@prisma/client';

export type { User };

// User Schema for Validation
export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(7, "Phone number must be at least 7 characters long"),
});
