'use server';
// THIS IS A MOCK DATABASE SERVICE.
// In a real application, you would replace this with a connection to a real database
// like MongoDB, PostgreSQL, or Firebase Firestore.

import type { User } from '@/lib/types';

// For this prototype, we'll store users in a localStorage item.
// This is NOT secure and should not be used in production.
const getUserStorage = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const users = JSON.parse(localStorage.getItem('shopwave-users') || '[]');
    return users;
  } catch (e) {
    return [];
  }
};

const setUserStorage = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shopwave-users', JSON.stringify(users));
  }
};

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  const users = getUserStorage();
  const user = users.find((u: User) => u.email === email);
  return user || null;
}

export async function createUser(
  userData: Omit<User, 'id'>
): Promise<User> {
  const users = getUserStorage();
  const existingUser = users.find((user: User) => user.email === userData.email);

  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  // In a real DB, the ID would be generated automatically.
  const newUser: User = { id: `user_${Date.now()}`, ...userData };
  
  // Don't store passwords in plaintext in a real app!
  users.push(newUser);
  setUserStorage(users);

  return newUser;
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  // Example API call to /api/login
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}
