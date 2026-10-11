import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';
import { X, Star, ShieldCheck, Truck, RotateCcw, ChevronDown, Check, Ruler } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, formatPrice, toggleWishlist, wishlist } = useStore();

  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.available)?.size || product.sizes[0].size
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const installmentPrice = Math.round(product.price / 4);

  const images = [product.image, product.secondaryImage || product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-zinc-950 shadow-sm border border-zinc-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto hide-scrollbar">
          {/* Left Column: Visual Gallery (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-100 p-6 lg:p-8 flex flex-col justify-between">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-zinc-200 shadow-xs mb-4">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {product.stockLeft && product.stockLeft <= 5 && (
                <div className="absolute top-4 left-4 bg-white/95 text-amber-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs border border-amber-200">
                  Only {product.stockLeft} in stock
                </div>
              )}
            </div>

            {/* Thumbnail switcher */}
            <div className="flex items-center gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === img ? 'border-zinc-900 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Origin & Craftsmanship stamp */}
            <div className="mt-6 pt-4 border-t border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
              <span>{product.origin}</span>
              <span className="font-mono text-[11px] text-zinc-400">Ref. AUR-{product.id.slice(0, 5).toUpperCase()}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span className="uppercase tracking-widest font-semibold text-zinc-400">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-zinc-800">{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl font-serif font-normal text-zinc-950 mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-zinc-500 mb-4">{product.tagline}</p>

              {/* Pricing & Installments */}
              <div className="mb-6 p-3.5 rounded-lg bg-zinc-50 border border-zinc-100">
                <div className="flex items-baseline gap-3 font-mono tabular-nums">
                  <span className="text-2xl font-bold text-zinc-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-zinc-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  or 4 interest-free payments of <span className="font-medium text-zinc-800">{formatPrice(installmentPrice)}</span> with Klarna or Afterpay
                </p>
              </div>

              {/* Color Selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-500 uppercase tracking-wider font-medium text-[11px]">
                    Colorway: <strong className="text-zinc-900 font-semibold">{selectedColor.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`relative w-8 h-8 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-zinc-900 ring-offset-2 border-transparent scale-105'
                          : 'border-zinc-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-500 uppercase tracking-wider font-medium text-[11px]">
                    Select Size
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 text-zinc-800 hover:underline font-medium text-[11px] cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>

                {showSizeGuide && (
                  <div className="mb-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md text-[11px] text-zinc-600 animate-in fade-in duration-150">
                    <p className="font-semibold text-zinc-900 mb-1">Tailoring Dimensions (cm):</p>
                    <div className="grid grid-cols-4 gap-2 text-center font-mono">
                      <div className="bg-white p-1 rounded border border-zinc-200">S: 104cm Chest</div>
                      <div className="bg-white p-1 rounded border border-zinc-200">M: 110cm Chest</div>
                      <div className="bg-white p-1 rounded border border-zinc-200">L: 116cm Chest</div>
                      <div className="bg-white p-1 rounded border border-zinc-200">XL: 122cm Chest</div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        disabled={!s.available}
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 px-1 text-xs font-medium rounded-md border transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-950 text-white border-zinc-950 font-semibold shadow-xs'
                            : s.available
                            ? 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                            : 'bg-zinc-50 text-zinc-300 border-zinc-100 line-through cursor-not-allowed'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>

                {selectedSizeObj?.stockCount !== undefined && selectedSizeObj.stockCount <= 3 && (
                  <p className="text-[11px] text-amber-700 mt-2 font-medium">
                    ⚡ Only {selectedSizeObj.stockCount} units remaining in size {selectedSize}
                  </p>
                )}
              </div>

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-zinc-200 rounded-md bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-sm text-zinc-600 hover:text-zinc-950 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-mono font-semibold text-zinc-900 min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-sm text-zinc-600 hover:text-zinc-950 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Add to Bag</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">{formatPrice(product.price * quantity)}</span>
                </button>
              </div>

              {/* In-Modal Conversion Guarantees */}
              <div className="space-y-2 py-3 border-y border-zinc-100 text-[11px] text-zinc-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  <span>Complimentary carbon-neutral delivery over $150</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  <span>Prepaid 30-day global return label enclosed</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                  <span>Lifetime seam, hardware & repair commitment</span>
                </div>
              </div>

              {/* Collapsible Accordions */}
              <div className="mt-4 divide-y divide-zinc-100">
                <div className="py-2.5">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-900 cursor-pointer"
                  >
                    <span>Materials & Craftsmanship</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${
                        openAccordion === 'specs' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'specs' && (
                    <div className="mt-2 text-xs text-zinc-600 leading-relaxed space-y-1.5 animate-in fade-in duration-150">
                      <p><strong>Composition:</strong> {product.materials}</p>
                      <ul className="list-disc list-inside space-y-1 text-zinc-500 pl-1">
                        {product.features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="py-2.5">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'fit' ? null : 'fit')}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-900 cursor-pointer"
                  >
                    <span>Tailoring & Fit Advisory</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${
                        openAccordion === 'fit' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'fit' && (
                    <div className="mt-2 text-xs text-zinc-600 leading-relaxed animate-in fade-in duration-150">
                      <p>{product.fitNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
