"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./shop.module.css";
import { useCart } from "@/lib/cartStore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  orders: number;
  description: string;
  inStock: boolean;
  category: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    toast.success("Added to cart");
  };

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <article key={product.id} className={styles.gridCard}>
          <Link href={`/product/${product.id}`} className={styles.cardImageLink}>
            <div className={styles.cardImage}>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                unoptimized
              />
            </div>
          </Link>
          <button className={styles.favoriteBtn}>♡</button>
          <div className={styles.cardContent}>
            <Link href={`/product/${product.id}`} className={styles.productTitleLink}>
              <h3>{product.name}</h3>
            </Link>
            <div className={styles.rating}>
              <span className={styles.stars}>★★★★★</span>
              <span>{product.rating}</span>
            </div>
            <div className={styles.price}>
              <strong>${product.price.toFixed(2)}</strong>
              <span>${product.originalPrice.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className={styles.addCartBtn}
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
