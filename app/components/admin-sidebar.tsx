"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Users, ShoppingCart, LogOut } from "lucide-react";
import { logoutAction } from "@/app/auth/actions";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Products", href: "/admin", icon: Package },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  ];

  return (
    <aside
      style={{
        width: "250px",
        background: "#f8f9fa",
        borderRight: "1px solid #e5e5e5",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo/Header */}
      <div style={{ padding: "20px", borderBottom: "1px solid #e5e5e5" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          <span style={{ color: "#317eff" }}>Admin</span> Panel
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav style={{ flex: 1, padding: "20px 0" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 20px",
                color: isActive ? "#317eff" : "#666",
                textDecoration: "none",
                borderLeft: isActive ? "4px solid #317eff" : "4px solid transparent",
                background: isActive ? "#f0f5ff" : "transparent",
                transition: "all 0.2s",
              }}
            >
              <Icon size={20} />
              <span style={{ fontWeight: isActive ? "600" : "500" }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <form
        action={logoutAction}
        style={{ padding: "20px", borderTop: "1px solid #e5e5e5" }}
      >
        <button
          type="submit"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px",
            background: "#f0f0f0",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            color: "#d32f2f",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#f0f0f0";
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </form>
    </aside>
  );
}
