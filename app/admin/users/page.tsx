"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/components/admin-sidebar";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAuthAndFetchUsers() {
      try {
        // Check if user is admin
        const userResponse = await fetch("/api/auth/user", {
          cache: "no-store",
        });

        if (!userResponse.ok) {
          router.push("/login");
          return;
        }

        const userData = await userResponse.json();

        if (userData.role !== "ADMIN") {
          router.push("/login");
          return;
        }

        setIsAdmin(true);

        // Fetch all users
        const usersResponse = await fetch("/api/admin/users", {
          cache: "no-store",
        });

        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }

        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndFetchUsers();
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
            User Management
          </h1>
          <p style={{ color: "#666", margin: "8px 0 0 0" }}>
            Total registered users: {users.length}
          </p>
        </div>

        {/* Users Table */}
        <section>
          {users.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 40px",
                background: "#f9f9f9",
                borderRadius: "8px",
                color: "#666",
              }}
            >
              <p style={{ fontSize: "16px", marginBottom: "10px" }}>No users found yet.</p>
              <p style={{ fontSize: "14px", color: "#999" }}>
                Users will appear here once they register.
              </p>
            </div>
          ) : (
            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #e5e5e5" }}>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      Role
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: "1px solid #e5e5e5",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.background = "#f9f9f9";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.background = "inherit";
                      }}
                    >
                      <td style={{ padding: "16px", color: "#333", fontWeight: "500" }}>
                        {user.name}
                      </td>
                      <td style={{ padding: "16px", color: "#666" }}>
                        {user.email}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            background: user.role === "ADMIN" ? "#fff3cd" : "#e7f3ff",
                            color: user.role === "ADMIN" ? "#856404" : "#004085",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: "16px", color: "#999", fontSize: "13px" }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
