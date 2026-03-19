"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const TEST_ADMIN_EMAIL = "test@gmail.com";

/**
 * Auto-promotes test@gmail.com to ADMIN role if not already set
 * Call this after user login/registration
 */
export async function autoPromoteTestAdmin() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null;
    }

    // If user email matches test admin email, fetch and check role
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (
      currentUser &&
      currentUser.email === TEST_ADMIN_EMAIL &&
      (currentUser as any).role !== "ADMIN"
    ) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" } as any,
      });

      console.log(
        `[AUTO-PROMOTE] User ${updatedUser.email} promoted to ${(updatedUser as any).role}`
      );

      return updatedUser;
    }

    return user;
  } catch (error) {
    console.error("Auto-promote error:", error);
    return null;
  }
}

/**
 * Check if current user is admin
 */
export async function isUserAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser();

    if (!user) return false;

    const userWithRole = await prisma.user.findUnique({
      where: { id: user.id },
    });

    return (userWithRole as any)?.role === "ADMIN" ? true : false;
  } catch {
    return false;
  }
}
