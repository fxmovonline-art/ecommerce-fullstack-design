"use client";

import styles from "./shop.module.css";

interface ToolbarProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  itemCount: number;
  onMobileFilterClick: () => void;
  category?: string;
}

export default function Toolbar({
  viewMode,
  setViewMode,
  itemCount,
  category,
}: ToolbarProps) {
  const categoryDisplay = category 
    ? category.charAt(0).toUpperCase() + category.slice(1)
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
          <select>
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
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
