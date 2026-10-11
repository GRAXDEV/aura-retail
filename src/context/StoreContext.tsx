import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, CurrencyConfig } from '../types';
import { PRODUCTS } from '../data/products';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.0 },
};

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  shippingCost: number;
  cartTotal: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  freeShippingProgress: number;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (p: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  confirmedOrder: any | null;
  setConfirmedOrder: (order: any) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  currency: CurrencyConfig;
  setCurrency: (c: CurrencyConfig) => void;
  formatPrice: (amountUSD: number) => string;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 150;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart with one item to demonstrate conversion-ready state immediately
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'wool-overshirt-charcoal-Washed Charcoal-M',
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[0],
      selectedSize: 'M',
      quantity: 1,
    },
  ]);

  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['tote-italian-calfskin']);
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });
    showToast(`Added ${product.name} (${color.name}, ${size}) to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discountAmount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const freeShippingUnlocked = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = cartSubtotal === 0 || freeShippingUnlocked ? 0 : 18;
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedPromo({ code: 'WELCOME10', discountPercent: 10 });
      return { success: true, message: '10% Welcome discount applied successfully.' };
    }
    if (clean === 'AURA20') {
      setAppliedPromo({ code: 'AURA20', discountPercent: 20 });
      return { success: true, message: '20% Private Collector discount applied.' };
    }
    if (clean === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', discountPercent: 5 });
      return { success: true, message: 'VIP shipping perk & 5% credit applied.' };
    }
    return { success: false, message: 'Invalid code. Try WELCOME10 for 10% off.' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const formatPrice = (amountUSD: number) => {
    const converted = amountUSD * currency.rate;
    if (currency.code === 'JPY') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toFixed(0)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingCost,
        cartTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping,
        freeShippingProgress,
        appliedPromo,
        applyPromo,
        removePromo,
        isCartOpen,
        setIsCartOpen,
        activeProductModal,
        setActiveProductModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        confirmedOrder,
        setConfirmedOrder,
        wishlist,
        toggleWishlist,
        currency,
        setCurrency,
        formatPrice,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
