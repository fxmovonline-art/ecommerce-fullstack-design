"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import styles from "./page.module.css";
import { useCart } from "@/lib/cartStore";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartPage() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);

  const changeQuantity = (id: string, next: number) => {
    updateQuantity(id, Math.max(1, next));
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const shipping = items.length > 0 ? 14 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <main className={styles.cartPage}>
      <section className={styles.container}>
        <div className={styles.layout}>
          <div className={`${styles.card} ${styles.cartCard}`}>
            <h1 className={styles.title}>My cart ({items.length})</h1>

            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Your cart is empty.</p>
                <Link href="/shop" className={styles.backToShop}>
                  Back to shop
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.items}>
                  {items.map((item) => {
                    const qty = item.quantity;
                    return (
                      <article key={item.id} className={styles.itemRow}>
                        <div className={styles.itemMain}>
                          <div className={styles.itemImageWrap}>
                            <Image src={item.image} alt={item.name} width={84} height={84} className={styles.itemImage} />
                          </div>
                          <div>
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <p className={styles.itemMeta}>{item.category} product</p>
                          </div>
                        </div>

                        <div className={styles.itemActions}>
                          <strong className={styles.price}>{money.format(item.price * qty)}</strong>
                          <div className={styles.qtyWrap}>
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() => changeQuantity(item.id, qty - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span>{qty}</span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() => changeQuantity(item.id, qty + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button type="button" className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className={styles.footerRow}>
                  <Link href="/shop" className={styles.backToShop}>
                    Back to shop
                  </Link>
                </div>
              </>
            )}
          </div>

          <aside className={`${styles.card} ${styles.summary}`}>
            <h3>Order Summary</h3>

            <div className={styles.summaryLine}>
              <span>Subtotal</span>
              <span>{money.format(subtotal)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Shipping estimate</span>
              <span>{money.format(shipping)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Tax estimate</span>
              <span>{money.format(tax)}</span>
            </div>

            <div className={styles.totalLine}>
              <span>Total</span>
              <strong>{money.format(total)}</strong>
            </div>

            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={() => window.alert("Checkout flow is coming soon.")}
            >
              Checkout
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
