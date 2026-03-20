"use client";

import toast from "react-hot-toast";

import { useCart } from "@/lib/cartStore";

type SaveForLaterButtonProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  className?: string;
  label?: string;
};

export default function SaveForLaterButton({
  id,
  name,
  price,
  image,
  description,
  category,
  className,
  label = "Save for later",
}: SaveForLaterButtonProps) {
  const addSavedItem = useCart((state) => state.addSavedItem);

  const handleSave = () => {
    addSavedItem({ id, name, price, image, description, category });
    toast.success("Saved for later");
  };

  return (
    <button type="button" className={className} onClick={handleSave}>
      {label}
    </button>
  );
}
