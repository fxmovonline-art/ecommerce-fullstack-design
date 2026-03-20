"use client";

import styles from "./shop.module.css";

interface ToolbarProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: "featured" | "newest" | "price-asc" | "price-desc";
  setSortBy: (value: "featured" | "newest" | "price-asc" | "price-desc") => void;
  itemCount: number;
  onMobileFilterClick: () => void;
  activeFilterCount: number;
  category?: string;
}

export default function Toolbar({
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  itemCount,
  onMobileFilterClick,
  activeFilterCount,
  category,
}: ToolbarProps) {
  const categoryDisplay = category
    ? category
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "All Products";

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <span className={styles.itemCount}>
          {itemCount.toLocaleString()} items in {categoryDisplay}
        </span>
        <div className={styles.filters}>
          <label>
            <input type="checkbox" />
            <span>Verified only</span>
          </label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "featured" | "newest" | "price-asc" | "price-desc")}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className={styles.mobileToolbarRow}>
        <button
          type="button"
          className={styles.mobileControlBtn}
          onClick={() => setSortBy(sortBy === "newest" ? "featured" : "newest")}
        >
          Sort: {sortBy === "newest" ? "Newest" : "Featured"}
        </button>
        <button
          type="button"
          className={styles.mobileControlBtn}
          onClick={onMobileFilterClick}
        >
          Filter ({activeFilterCount})
        </button>
      </div>

      <div className={styles.viewToggle}>
        <button
          className={viewMode === "grid" ? styles.active : ""}
          onClick={() => setViewMode("grid")}
          title="Grid view"
        >
          ⊞
        </button>
        <button
          className={viewMode === "list" ? styles.active : ""}
          onClick={() => setViewMode("list")}
          title="List view"
        >
          ☰
        </button>
      </div>
    </div>
  );
}
