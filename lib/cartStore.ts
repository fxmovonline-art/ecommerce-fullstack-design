import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
};

type AddItemInput = Omit<CartItem, "quantity">;
export type SavedItem = AddItemInput;

type CartStore = {
  items: CartItem[];
  savedItems: SavedItem[];
  addItem: (item: AddItemInput) => void;
  addSavedItem: (item: AddItemInput) => void;
  removeItem: (id: string) => void;
  removeSavedItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  moveToSaved: (id: string) => void;
  moveToCart: (id: string) => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      savedItems: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((cartItem) => cartItem.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
              savedItems: state.savedItems.filter((savedItem) => savedItem.id !== item.id),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            savedItems: state.savedItems.filter((savedItem) => savedItem.id !== item.id),
          };
        }),
      addSavedItem: (item) =>
        set((state) => {
          const alreadySaved = state.savedItems.some((savedItem) => savedItem.id === item.id);
          if (alreadySaved) {
            return {
              items: state.items.filter((cartItem) => cartItem.id !== item.id),
            };
          }

          return {
            items: state.items.filter((cartItem) => cartItem.id !== item.id),
            savedItems: [...state.savedItems, item],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      removeSavedItem: (id) =>
        set((state) => ({
          savedItems: state.savedItems.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          }

          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
          };
        }),
      moveToSaved: (id) =>
        set((state) => {
          const cartItem = state.items.find((item) => item.id === id);
          if (!cartItem) {
            return state;
          }

          const normalizedItem: SavedItem = {
            id: cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            image: cartItem.image,
            description: cartItem.description,
            category: cartItem.category,
          };

          const alreadySaved = state.savedItems.some((item) => item.id === id);

          return {
            items: state.items.filter((item) => item.id !== id),
            savedItems: alreadySaved
              ? state.savedItems
              : [...state.savedItems, normalizedItem],
          };
        }),
      moveToCart: (id) =>
        set((state) => {
          const savedItem = state.savedItems.find((item) => item.id === id);
          if (!savedItem) {
            return state;
          }

          const existingCartItem = state.items.find((item) => item.id === id);
          if (existingCartItem) {
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
              savedItems: state.savedItems.filter((item) => item.id !== id),
            };
          }

          return {
            items: [...state.items, { ...savedItem, quantity: 1 }],
            savedItems: state.savedItems.filter((item) => item.id !== id),
          };
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
