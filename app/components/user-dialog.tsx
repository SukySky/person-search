// app/actions.ts
'use server'

import { PrismaClient } from '@prisma/client';
import { User, userSchema } from '@/app/actions/schemas';

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

  return users as unknown as User[];
}

// Add User Function
export async function addUser(data: Omit<User, 'id'>): Promise<User> {
  // Validate incoming data
  const validatedData = userSchema.parse(data);

  // Create a new user in the database using Prisma
  const newUser = await prisma.user.create({
    data: { ...validatedData, id: undefined },
  });

  return newUser as unknown as User;
}

// Edit User Function
export async function editUser(id: number, data: Omit<User, 'id'>): Promise<User> {
  // Validate the incoming data
  const validatedData = userSchema.parse(data);

  // Update the user in the database using Prisma
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...validatedData, id: undefined },
  });

  return updatedUser as unknown as User;
}

import React from 'react';

// Define the UserDialog component
const UserDialog: React.FC = () => {
  return (
    <div>
      {/* Your UserDialog component implementation */}
    </div>
  );
};

export default UserDialog;