"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = "Search by product or category",
  onSearch 
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    setSearchInput(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const trimmedSearch = searchInput.trim();
    
    if (trimmedSearch.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", trimmedSearch);
      router.push(`/shop?${params.toString()}`);
      onSearch?.(trimmedSearch);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const trimmedSearch = searchInput.trim();
      if (trimmedSearch.length > 0) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", trimmedSearch);
        router.push(`/shop?${params.toString()}`);
        onSearch?.(trimmedSearch);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSearchSubmit}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        border: "2px solid var(--primary)"
      }}
    >
      <input
        aria-label="Search"
        placeholder={placeholder}
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          border: "none",
          background: "#fff",
          minHeight: "42px",
          padding: "0 12px",
          color: "#333",
          fontSize: "14px",
          outline: "none"
        }}
      />
      <select 
        aria-label="All category"
        style={{
          border: "1px solid #e5e5e5",
          borderLeft: "1px solid #e5e5e5",
          background: "#fff",
          minHeight: "42px",
          padding: "0 12px",
          color: "#333",
          fontSize: "14px",
          outline: "none",
          cursor: "pointer"
        }}
      >
        <option>All category</option>
      </select>
      <button 
        type="submit"
        style={{
          border: "none",
          background: "#317eff",
          color: "#fff",
          minHeight: "42px",
          padding: "0 18px",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: "14px",
          transition: "background 0.2s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#1a5cdb"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#317eff"}
      >
        Search
      </button>
    </form>
  );
}
