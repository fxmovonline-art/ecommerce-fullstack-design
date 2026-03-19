"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2, Edit2, Plus } from "lucide-react";
import AdminSidebar from "@/app/components/admin-sidebar";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  });

  // Check authentication and fetch user
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/user", {
          cache: "no-store",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const userData = await response.json();

        if (userData.role !== "ADMIN") {
          router.push("/login");
          return;
        }

        setUser(userData);
        fetchProducts();
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/products/${editingId}`
        : "/api/products";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          image: formData.image,
          description: formData.description,
          category: formData.category,
          stock: parseInt(formData.stock),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save product");
      }

      await response.json();
      toast.success(
        editingId ? "Product updated successfully" : "Product added successfully"
      );

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock.toString(),
    });
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      category: "",
      stock: "",
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", background: "#fff" }}>
        <AdminSidebar />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: "18px" }}>Loading...</p>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", margin: 0 }}>
          Product Management
        </h1>
        <p style={{ color: "#666", margin: "8px 0 0 0" }}>
          Manage your products, {user.name}
        </p>
      </div>

      {/* Add Product Button */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => (isFormOpen ? resetForm() : setIsFormOpen(true))}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "#317eff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          <Plus size={18} />
          {isFormOpen && editingId === null ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {/* Add/Edit Product Form */}
      {isFormOpen && (
        <section
          style={{
            background: "#f9f9f9",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            padding: "30px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleFormSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {/* Product Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="e.g., iPhone 15 Pro"
                />
              </div>

              {/* Price */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  Price (USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="99.99"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="e.g., Electronics"
                />
              </div>

              {/* Stock */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="50"
                />
              </div>
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#333",
                }}
              >
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#333",
                }}
              >
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
                placeholder="Enter product description..."
              />
            </div>

            {/* Form Actions */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "12px 28px",
                  background: submitting ? "#ccc" : "#317eff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Update Product"
                    : "Add Product"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: "12px 28px",
                  background: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Products Table */}
      <section>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
          Product Management ({products.length})
        </h2>

        {products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              background: "#f9f9f9",
              borderRadius: "8px",
              color: "#666",
            }}
          >
            <p>No products found. Add your first product to get started.</p>
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f5f5f5",
                    borderBottom: "2px solid #e5e5e5",
                  }}
                >
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Product Name
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Stock
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: "1px solid #e5e5e5",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background =
                        "#f9f9f9";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background =
                        "inherit";
                    }}
                  >
                    <td style={{ padding: "16px", color: "#333" }}>
                      <strong>{product.name}</strong>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#999",
                          marginTop: "4px",
                        }}
                      >
                        {product.description.substring(0, 40)}...
                      </div>
                    </td>
                    <td style={{ padding: "16px", color: "#666" }}>
                      {product.category}
                    </td>
                    <td style={{ padding: "16px", color: "#333", fontWeight: "600" }}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color:
                          product.stock > 0 ? "#28a745" : "#dc3545",
                        fontWeight: "600",
                      }}
                    >
                      {product.stock}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={() => handleEdit(product)}
                        style={{
                          padding: "8px 12px",
                          background: "#ffc107",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{
                          padding: "8px 12px",
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
))}    
              </tbody>
            </table>
          </div>
        )}
      </section>
      </main>
    </div>
  );
}
