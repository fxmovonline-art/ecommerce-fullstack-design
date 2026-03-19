import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "Urban Street Sneakers",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Lightweight everyday sneakers with cushioned sole and breathable mesh upper.",
    category: "Sneakers",
    stock: 45,
  },
  {
    name: "Classic White Running Shoes",
    price: 119.5,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    description: "Clean white running shoes built for comfort, grip, and long-day wear.",
    category: "Sneakers",
    stock: 36,
  },
  {
    name: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    description: "Professional DSLR camera for creators, with crisp image quality and reliable autofocus.",
    category: "Electronics",
    stock: 24,
  },
  {
    name: "Wireless Noise-Canceling Headphones",
    price: 89,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description: "Over-ear wireless headphones with immersive sound and active noise cancellation.",
    category: "Electronics",
    stock: 75,
  },
  {
    name: "Performance Laptop 14-inch",
    price: 1149,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    description: "Thin and powerful laptop suitable for remote work, study, and daily productivity.",
    category: "Electronics",
    stock: 19,
  },
  {
    name: "Everyday Smart Phone",
    price: 499,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    description: "Reliable smartphone with vibrant display, strong battery life, and smooth performance.",
    category: "Electronics",
    stock: 63,
  },
  {
    name: "Modern Smart Watch Series",
    price: 199,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description: "Smart watch with health tracking, GPS, and all-day battery for active routines.",
    category: "Wearables",
    stock: 58,
  },
  {
    name: "Denim Everyday Jacket",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80",
    description: "Regular-fit denim jacket designed for daily layering in all seasons.",
    category: "Clothing",
    stock: 52,
  },
  {
    name: "Minimalist Leather Backpack",
    price: 149,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    description: "Premium leather backpack with spacious compartments for work and travel.",
    category: "Accessories",
    stock: 28,
  },
  {
    name: "Ergonomic Office Chair",
    price: 229,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    description: "Adjustable ergonomic chair with lumbar support for long productivity sessions.",
    category: "Home",
    stock: 14,
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80",
    description: "Double-wall insulated bottle that keeps drinks cold for hours.",
    category: "Accessories",
    stock: 82,
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 64.5,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80",
    description: "Compact speaker with rich bass, clear vocals, and all-day battery.",
    category: "Electronics",
    stock: 41,
  },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleProducts });

  console.log(`Seeded ${sampleProducts.length} products.`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
