import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    // Check if user is authenticated and is admin
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if user is admin
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!currentUser || (currentUser as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    // Fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Map users to include role (fetch separately due to Prisma limitations)
    const usersWithRoles = await Promise.all(
      users.map(async (u) => {
        const fullUser = await prisma.user.findUnique({
          where: { id: u.id },
        });
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          role: (fullUser as any)?.role || "USER",
          createdAt: u.createdAt.toISOString(),
        };
      })
    );

    return NextResponse.json(usersWithRoles, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
