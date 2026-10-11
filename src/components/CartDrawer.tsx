import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { UPSELL_ITEMS, PRODUCTS } from '../data/products';
import { X, Trash2, Tag, ShieldCheck, ArrowRight, Plus, Sparkles, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    amountUntilFreeShipping,
    freeShippingProgress,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
    formatPrice,
    addToCart,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ msg: string; err: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback({ msg: res.message, err: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleAddUpsell = (upsell: typeof UPSELL_ITEMS[0]) => {
    const parentProd = PRODUCTS.find((p) => p.category === upsell.category) || PRODUCTS[0];
    addToCart(
      {
        ...parentProd,
        id: upsell.id,
        name: upsell.name,
        price: upsell.price,
      },
      parentProd.colors[0],
      'One Size',
      1
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-zinc-200 animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif font-normal text-zinc-950">Your Shopping Bag</h2>
              <span className="text-xs font-mono text-zinc-400">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dynamic Free Shipping Threshold Bar */}
          <div className="bg-zinc-50 px-6 py-3.5 border-b border-zinc-200/60">
            <div className="flex items-center justify-between text-xs mb-2">
              {amountUntilFreeShipping === 0 ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Unlocked: Complimentary Global Express Shipping
                </span>
              ) : (
                <span className="text-zinc-700">
                  Add <strong className="font-mono text-zinc-950">{formatPrice(amountUntilFreeShipping)}</strong> more for Free Express Shipping
                </span>
              )}
              <span className="font-mono text-[11px] text-zinc-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-950 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-sm font-medium text-zinc-900 mb-2">Your shopping bag is empty</p>
                <p className="text-xs text-zinc-500 mb-6">Explore the collection to add handcrafted essentials.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-zinc-950 text-white text-xs font-medium uppercase tracking-wider rounded-md hover:bg-zinc-800 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-md overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200/60">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-h-[96px]">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-zinc-900 leading-snug">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-mono font-semibold text-zinc-950 tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {item.selectedColor.name} · Size {item.selectedSize}
                      </p>
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-zinc-200 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-zinc-600 hover:text-zinc-950 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-zinc-600 hover:text-zinc-950 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-600 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* In-Cart 1-Click Upsell Module */}
            {cart.length > 0 && (
              <div className="pt-5 pb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                  Frequently Paired Together
                </span>
                <div className="space-y-2.5">
                  {UPSELL_ITEMS.map((upsell) => (
                    <div
                      key={upsell.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 bg-zinc-50/60 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <img
                          src={upsell.image}
                          alt={upsell.name}
                          className="w-10 h-10 rounded object-cover border border-zinc-200 shrink-0"
                        />
                        <div>
                          <p className="text-[11px] font-medium text-zinc-900 leading-tight">
                            {upsell.name}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                            {formatPrice(upsell.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddUpsell(upsell)}
                        className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-zinc-200/80 space-y-4">
              {/* Promo Code Form */}
              <div>
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Discount code (e.g. WELCOME10)"
                        className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-md placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
                    <span className="font-medium">
                      Code {appliedPromo.code} ({appliedPromo.discountPercent}% OFF) applied
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-emerald-700 hover:text-emerald-900 font-semibold underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoFeedback && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      promoFeedback.err ? 'text-red-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoFeedback.msg}
                  </p>
                )}
              </div>

              {/* Subtotal Calculation Lines */}
              <div className="space-y-1.5 text-xs text-zinc-600 font-mono tabular-nums">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-zinc-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedPromo.discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                </div>
                <div className="pt-2 border-t border-zinc-100 flex justify-between text-sm font-semibold text-zinc-950 font-sans">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-6 bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Bank-Grade 256-Bit SSL
                </span>
                <span>·</span>
                <span>30-Day Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
