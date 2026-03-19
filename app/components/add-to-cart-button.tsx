"use client";

import toast from "react-hot-toast";

import { useCart } from "@/lib/cartStore";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  className?: string;
  label?: string;
};

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  description,
  category,
  className,
  label = "Add to cart",
}: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, price, image, description, category });
    toast.success("Added to cart");
  };

  return (
    <button type="button" className={className} onClick={handleAddToCart}>
      {label}
    </button>
  );
}
