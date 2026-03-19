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

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
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
    <div className={styles.productList}>
      {products.map((product) => (
        <article key={product.id} className={styles.listCard}>
          <Link href={`/product/${product.id}`} className={styles.listImageLink}>
            <div className={styles.listImage}>
              <Image
                src={product.image}
                alt={product.name}
                width={140}
                height={140}
                unoptimized
              />
            </div>
          </Link>
          <div className={styles.listContent}>
            <Link href={`/product/${product.id}`} className={styles.productTitleLink}>
              <h3>{product.name}</h3>
            </Link>
            <div className={styles.listMeta}>
              <div className={styles.rating}>
                <span className={styles.stars}>★★★★★</span>
                <span>{product.rating}</span>
                <span className={styles.orders}>{product.orders} orders</span>
              </div>
              <button className={styles.favoriteBtn}>♡</button>
            </div>
            <p className={styles.description}>{product.description}</p>
            <Link href={`/product/${product.id}`} className={styles.viewDetails}>
              View details
            </Link>
            <button
              type="button"
              className={styles.listAddCartBtn}
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </button>
            <div className={styles.listPrice}>
              <strong>${product.price.toFixed(2)}</strong>
              {product.originalPrice > product.price && (
                <span>${product.originalPrice.toFixed(2)}</span>
              )}
              {product.inStock && (
                <span className={styles.freeShipping}>Free Shipping</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
