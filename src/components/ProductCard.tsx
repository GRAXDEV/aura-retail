import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Star, Eye, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProductModal, addToCart, wishlist, toggleWishlist, formatPrice } = useStore();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const isSaved = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick add default first available size
    const availableSize = product.sizes.find((s) => s.available) || product.sizes[0];
    addToCart(product, selectedColor, availableSize.size, 1);
  };

  return (
    <article
      onClick={() => setActiveProductModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-zinc-200/80 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Visual Slot (65-75% height) */}
      <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden">
        {!imageFailed ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageFailed(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-100">
            <span className="text-xs uppercase font-serif tracking-widest text-zinc-400">
              Aura Retail
            </span>
            <span className="text-sm font-medium text-zinc-700 mt-2">{product.name}</span>
          </div>
        )}

        {/* Top Floating Controls: Stock Urgency & Wishlist */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            {product.stockLeft && product.stockLeft <= 5 ? (
              <span className="inline-block bg-white/95 backdrop-blur-xs text-amber-800 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded shadow-xs border border-amber-200/60">
                Only {product.stockLeft} Remaining
              </span>
            ) : product.isBestseller ? (
              <span className="inline-block bg-white/95 backdrop-blur-xs text-zinc-800 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded shadow-xs border border-zinc-200">
                Core Edition
              </span>
            ) : null}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-zinc-950 shadow-xs transition-colors cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isSaved ? 'fill-zinc-900 text-zinc-900' : ''
              }`}
            />
          </button>
        </div>

        {/* Hover Quick Actions Bar */}
        <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-zinc-950/95 hover:bg-zinc-900 text-white text-[11px] font-semibold uppercase tracking-wider rounded backdrop-blur-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="p-2.5 bg-white/95 hover:bg-white text-zinc-800 rounded shadow-md transition-colors"
            aria-label="Inspect details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata: Category · Rating */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-zinc-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-medium text-zinc-700">{product.rating}</span>
              <span className="text-zinc-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-[15px] font-semibold text-zinc-900 leading-snug group-hover:text-zinc-700 transition-colors">
            {product.name}
          </h3>

          {/* Short tagline */}
          <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{product.tagline}</p>
        </div>

        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className="text-base font-semibold text-zinc-950">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Color Swatch Indicators */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                title={c.name}
                aria-label={`Select ${c.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  selectedColor.name === c.name
                    ? 'ring-1 ring-zinc-900 ring-offset-1 border-transparent scale-110'
                    : 'border-zinc-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
