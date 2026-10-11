export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  size: string;
  available: boolean;
  stockCount?: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Apparel' | 'Leather Goods' | 'Footwear' | 'Objects';
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  stockLeft?: number;
  image: string;
  secondaryImage?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  description: string;
  features: string[];
  materials: string;
  fitNotes: string;
  origin: string;
}

export interface CartItem {
  id: string; // unique item instance id: productId-color-size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  itemPurchased: string;
  helpfulCount: number;
}

export interface CurrencyConfig {
  code: 'USD' | 'EUR' | 'GBP' | 'JPY';
  symbol: string;
  rate: number;
}
