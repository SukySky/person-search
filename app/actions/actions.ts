// app/actions.ts
'use server'

import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User, userSchema } from './schemas';

const prisma = new PrismaClient();

// Search Users Function
export async function searchUsers(query: string): Promise<User[]> {
  console.log('Searching users with query:', query);

  // Use Prisma to search for users in the database
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { phoneNumber: { contains: query, mode: 'insensitive' } },
      ],
    },
  });

  return users as User[];
}

// Add User Function
export async function addUser(data: Omit<User, 'id'>): Promise<User> {
  // Validate incoming data
  const { id: parsedId, ...validatedData } = userSchema.parse(data);

  // Create a new user in the database using Prisma
  const newUser = await prisma.user.create({
    data: validatedData,
  });

  return newUser as User;
}

// Edit User Function
export async function editUser(id: string, data: Omit<User, 'id'>): Promise<User> {
  // Validate the incoming data
  const { id: parsedId, ...validatedData } = userSchema.parse(data);

  // Update the user in the database using Prisma
  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: validatedData,
  });

  return updatedUser as User;
}
