import { Suspense } from "react";
import ShopClient from "./shop-client";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Suspense fallback={<div className="container">Loading...</div>}>
      <ShopClient initialProducts={products} />
    </Suspense>
  );
}

