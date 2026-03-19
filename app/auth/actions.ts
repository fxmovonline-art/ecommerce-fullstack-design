"use server";

import { redirect } from "next/navigation";

import { createSession, clearSession, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { autoPromoteTestAdmin } from "@/app/auth/admin-actions";

export type AuthFormState = {
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  values?: {
    name?: string;
    email?: string;
  };
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function joinAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const fieldErrors: NonNullable<AuthFormState["fieldErrors"]> = {};

  if (name.length < 2) {
    fieldErrors.name = "Name must be at least 2 characters.";
  }

  if (!validateEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (password.length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
  }

  if (confirmPassword !== password) {
    fieldErrors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      values: { name, email },
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return {
        fieldErrors: { email: "An account with this email already exists." },
        values: { name, email },
      };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
      },
      select: {
        id: true,
      },
    });

    await createSession(user.id);
  } catch {
    return {
      error: "Unable to create your account right now. Please try again.",
      values: { name, email },
    };
  }

  redirect("/");
}

export async function loginAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  const fieldErrors: NonNullable<AuthFormState["fieldErrors"]> = {};

  if (!validateEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    fieldErrors.password = "Password is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      values: { email },
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return {
        error: "Invalid email or password.",
        values: { email },
      };
    }

    await createSession(user.id);

    // Auto-promote test@gmail.com to ADMIN
    await autoPromoteTestAdmin();
  } catch {
    return {
      error: "Unable to log you in right now. Please try again.",
      values: { email },
    };
  }

  redirect("/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
