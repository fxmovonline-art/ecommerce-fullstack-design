"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AdminNavLinkProps = {
  variant?: "desktop" | "mobile";
};

type User = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export default function AdminNavLink({ variant = "desktop" }: AdminNavLinkProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/user", {
          cache: "no-store",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Only show if user is admin
  if (loading || !user || user.role !== "ADMIN") {
    return null;
  }

  if (variant === "mobile") {
    return (
      <Link
        href="/admin"
        aria-label="Admin Dashboard"
        className="mobile-header-btn admin-link-mobile"
      >
        <span className="mobile-admin-icon">⚙</span>
      </Link>
    );
  }

  return (
    <Link href="/admin" className="top-link-item">
      <span className="top-link-icon admin" aria-hidden="true">
        ⚙
      </span>
      <span>Dashboard</span>
    </Link>
  );
}
