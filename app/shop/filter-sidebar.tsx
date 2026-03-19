"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./shop.module.css";

type FilterState = {
  categories: string[];
  brands: string[];
  features: string[];
  priceRange: [number, number];
};

const CATEGORIES = [
  "Mobile accessory",
  "Electronics",
  "Smartphones",
  "Modern tech",
  "Sneakers",
  "Wearables",
  "Clothing",
  "Accessories",
  "Home",
  "Furniture",
];
const BRANDS = ["Samsung", "Apple", "Pocco", "Metallic"];
const FEATURES = [
  "Metallic",
  "Plastic cover",
  "8GB Ram",
  "Super power",
  "Large Memory",
];

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function FilterSidebar({
  filters,
  setFilters,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: false,
    features: false,
    price: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (category: string) => {
    // Build URL with category param
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentCategory === category) {
      // If clicking the same category, remove it
      params.delete("category");
    } else {
      // Set the category param
      params.set("category", category.toLowerCase());
    }

    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  };

  const toggleBrand = (brand: string) => {
    setFilters({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  const toggleFeature = (feature: string) => {
    setFilters({
      ...filters,
      features: filters.features.includes(feature)
        ? filters.features.filter((f) => f !== feature)
        : [...filters.features, feature],
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters({
      ...filters,
      priceRange: [min, max],
    });
  };

  return (
    <div className={styles.filterSidebar}>
      <h3>Category</h3>
      <button
        className={styles.collapsible}
        onClick={() => toggleSection("category")}
      >
        <span>Category</span>
        <span>{expandedSections.category ? "−" : "+"}</span>
      </button>
      {expandedSections.category && (
        <div className={styles.filterGroup}>
          {CATEGORIES.map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={
                  currentCategory.toLowerCase() === cat.toLowerCase()
                }
                onChange={() => toggleCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
          <a href="#" className={styles.seeAll}>
            See all
          </a>
        </div>
      )}

      <button
        className={styles.collapsible}
        onClick={() => toggleSection("brand")}
      >
        <span>Brands</span>
        <span>{expandedSections.brand ? "−" : "+"}</span>
      </button>
      {expandedSections.brand && (
        <div className={styles.filterGroup}>
          {BRANDS.map((brand) => (
            <label key={brand}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
          <a href="#" className={styles.seeAll}>
            See all
          </a>
        </div>
      )}

      <button
        className={styles.collapsible}
        onClick={() => toggleSection("features")}
      >
        <span>Features</span>
        <span>{expandedSections.features ? "−" : "+"}</span>
      </button>
      {expandedSections.features && (
        <div className={styles.filterGroup}>
          {FEATURES.map((feature) => (
            <label key={feature}>
              <input
                type="checkbox"
                checked={filters.features.includes(feature)}
                onChange={() => toggleFeature(feature)}
              />
              <span>{feature}</span>
            </label>
          ))}
          <a href="#" className={styles.seeAll}>
            See all
          </a>
        </div>
      )}

      <button
        className={styles.collapsible}
        onClick={() => toggleSection("price")}
      >
        <span>Price range</span>
        <span>{expandedSections.price ? "−" : "+"}</span>
      </button>
      {expandedSections.price && (
        <div className={styles.filterGroup}>
          <div className={styles.priceInputs}>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handlePriceChange(Math.max(0, parseInt(e.target.value) || 0), filters.priceRange[1])
              }
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceChange(filters.priceRange[0], Math.min(9999, parseInt(e.target.value) || 9999))
              }
            />
          </div>
          <button
            className={styles.applyBtn}
            onClick={() => {}}
          >
            Apply
          </button>
        </div>
      )}

      <button className={styles.clearFilters}>Clear all filter</button>
    </div>
  );
}
