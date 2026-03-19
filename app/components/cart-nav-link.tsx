"use client";

import Link from "next/link";

import { useCart } from "@/lib/cartStore";

type CartNavLinkProps = {
  variant?: "desktop" | "mobile";
};

export default function CartNavLink({ variant = "desktop" }: CartNavLinkProps) {
  const totalItems = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  if (variant === "mobile") {
    return (
      <Link href="/cart" aria-label="Cart" className="mobile-header-btn cart-link-mobile">
        <span className="mobile-cart-icon" />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </Link>
    );
  }

  return (
    <Link href="/cart" className="top-link-item">
      <span className="cart-icon-wrap" aria-hidden="true">
        <span className="top-link-icon cart" />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </span>
      <span>My cart</span>
    </Link>
  );
}
