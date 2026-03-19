"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/components/admin-sidebar";

export default function OrdersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/user", {
          cache: "no-store",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const userData = await response.json();

        if (userData.role !== "ADMIN") {
          router.push("/login");
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>
        <AdminSidebar />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: "18px" }}>Loading...</p>
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, marginBottom: "8px" }}>
            Order Management
          </h1>
          <p style={{ color: "#666", margin: "8px 0 0 0" }}>
            Track and manage customer orders
          </p>
        </div>

        {/* Empty State */}
        <section>
          <div
            style={{
              textAlign: "center",
              padding: "80px 40px",
              background: "#f9f9f9",
              borderRadius: "8px",
              color: "#666",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0, marginBottom: "8px" }}>
              No Orders Yet
            </h2>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "20px" }}>
              Orders will appear here once customers place them.
            </p>
            <p style={{ fontSize: "13px", color: "#bbb" }}>
              Check back later to manage customer orders
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
