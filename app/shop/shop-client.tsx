"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import styles from "./shop.module.css";
import AdminNavLink from "@/app/components/admin-nav-link";
import CartNavLink from "@/app/components/cart-nav-link";
import SearchBar from "@/app/components/search-bar";
import FilterSidebar from "@/app/shop/filter-sidebar";
import ProductGrid from "@/app/shop/product-grid";
import ProductList from "@/app/shop/product-list";
import Toolbar from "@/app/shop/toolbar";

type ApiProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
};

type ShopProduct = {
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
  brand: string;
};

type FilterState = {
  categories: string[];
  brands: string[];
  features: string[];
  priceRange: [number, number];
};

type ShopClientProps = {
  initialProducts: ApiProduct[];
};

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const searchParams = useSearchParams();
  const searchQuery = (searchParams.get("search") ?? "").trim().toLowerCase();

  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filters, setFilters] = useState<FilterState>({
    categories: [] as string[],
    brands: [] as string[],
    features: [] as string[],
    priceRange: [0, 2000] as [number, number],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const mappedProducts = useMemo<ShopProduct[]>(
    () =>
      initialProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: Number((product.price * 1.13).toFixed(2)),
        image: product.image,
        rating: 7.5,
        orders: Math.max(24, product.stock * 3),
        description: product.description,
        inStock: product.stock > 0,
        category: product.category,
        brand: product.name.split(" ")[0] ?? "Generic",
      })),
    [initialProducts],
  );

  // Get category from URL params
  const category = searchParams.get("category") ?? "";

  const filteredProducts = mappedProducts.filter((product) => {
    const matchesSearch =
      searchQuery.length === 0 ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    if (!matchesSearch) {
      return false;
    }

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }
    return true;
  });

  return (
    <main className={styles.shopPage}>
      {/* Desktop header & nav */}
      <section className="container panel top-header desktop-only">
        <Link href="/" className="brand-mark">
          <span className="brand-icon">B</span>
          <span className="brand-text">Brand</span>
        </Link>
        <SearchBar />
        <div className="top-links">
          <a href="#" className="top-link-item">
            <span className="top-link-icon profile" aria-hidden="true" />
            <span>Profile</span>
          </a>
          <a href="#" className="top-link-item">
            <span className="top-link-icon message" aria-hidden="true" />
            <span>Message</span>
          </a>
          <a href="#" className="top-link-item">
            <span className="top-link-icon orders" aria-hidden="true" />
            <span>Orders</span>
          </a>
          <AdminNavLink />
          <CartNavLink />
        </div>
      </section>
      <section className="container panel nav-strip desktop-only">
        <div className="left-nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/shop">All category</Link>
          <Link href="/shop">Hot offers</Link>
          <a href="#">Gift boxes</a>
          <a href="#">Projects</a>
          <a href="#">Menu item</a>
          <a href="#">Help</a>
        </div>
        <div className="right-nav">
          <a href="#">English, USD</a>
          <a href="#">Ship to DE</a>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <div className="container">
          <Link href="/">Home</Link>
          {category && (
            <>
              <span>{">"}</span>
              <Link href="/shop">All Products</Link>
              <span>{">"}</span>
              <strong>{category.charAt(0).toUpperCase() + category.slice(1)}</strong>
            </>
          )}
          {!category && (
            <>
              <span>{">"}</span>
              <strong>All Products</strong>
            </>
          )}
        </div>
      </nav>

      {/* Main shop grid */}
      <div className={`container ${styles.shopGrid}`}>
        {/* Mobile filter button */}
        <button
          className={styles.mobileFilterBtn}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <span>⚙ Filters</span>
        </button>

        {/* Sidebar - desktop visible, mobile can slide */}
        <aside
          className={`${styles.sidebar} ${showMobileFilters ? styles.showMobile : ""}`}
        >
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <button
            className={styles.closeMobileFilters}
            onClick={() => setShowMobileFilters(false)}
          >
            ✕
          </button>
        </aside>

        {/* Main content */}
        <section className={styles.mainContent}>
          <Toolbar
            viewMode={viewMode}
            setViewMode={setViewMode}
            itemCount={filteredProducts.length}
            onMobileFilterClick={() => setShowMobileFilters(true)}
            category={category}
          />

          {filteredProducts.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              padding: "40px 20px",
              color: "#666"
            }}>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                No products found
              </p>
              <p style={{ fontSize: "14px", color: "#999" }}>
                {searchQuery || category 
                  ? `No products match your search for "${searchQuery || category}"`
                  : "Try adjusting your filters or search terms"
                }
              </p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
