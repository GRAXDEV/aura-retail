import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, Banknote, ArrowLeft, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    appliedPromo,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    formatPrice,
  } = useStore();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Julian',
    lastName: 'Moreau',
    email: 'julian.moreau@aura-studio.com',
    phone: '+1 (555) 234-8901',
    address: '424 Mercer Street, Suite 5B',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States',
    paymentMethod: 'card' as 'card' | 'cod' | 'apple_pay',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '884',
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderNum = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsSubmitting(false);
      setStep('confirmed');
      clearCart();
    }, 900);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold tracking-wider text-zinc-950">Aura Retail</span>
            <span className="text-zinc-300">/</span>
            <span className="text-xs uppercase tracking-wider font-medium text-zinc-600">
              {step === 'confirmed' ? 'Order Confirmation' : 'Secure Express Checkout'}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-md transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'confirmed' ? (
          <div className="p-8 sm:p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700 block mb-1">
              Payment Authorized
            </span>
            <h2 className="text-3xl font-serif text-zinc-950 mb-2">Order Confirmed</h2>
            <p className="text-sm font-mono text-zinc-600 mb-6 font-semibold">
              Reference: {orderNumber}
            </p>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5 text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between text-zinc-600">
                <span>Recipient:</span>
                <span className="font-medium text-zinc-900">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Delivery Address:</span>
                <span className="font-medium text-zinc-900 text-right">
                  {formData.address}, {formData.city} {formData.postalCode}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Confirmation Email:</span>
                <span className="font-medium text-zinc-900">{formData.email}</span>
              </div>
              <div className="flex justify-between text-zinc-600 pt-2 border-t border-zinc-200">
                <span>Fulfillment Status:</span>
                <span className="text-emerald-700 font-semibold">Preparing for Dispatch in 24h</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer"
            >
              Return to Storefront
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Column: Form Steps (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8">
              {/* Progress Tabs */}
              <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 mb-6 pb-4 border-b border-zinc-100">
                <span
                  className={step === 'details' ? 'text-zinc-950 font-semibold' : 'text-zinc-500'}
                >
                  1. Shipping & Contact
                </span>
                <span>→</span>
                <span
                  className={step === 'payment' ? 'text-zinc-950 font-semibold' : 'text-zinc-400'}
                >
                  2. Payment & Method
                </span>
              </div>

              {step === 'details' ? (
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                        Mobile Phone (Dispatch Alerts)
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-md focus:border-zinc-900 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-zinc-600 mb-2">
                      Select Payment Method
                    </label>

                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          formData.paymentMethod === 'card'
                            ? 'border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950'
                            : 'border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-zinc-800 mb-2" />
                        <span className="text-xs font-semibold text-zinc-900">Card</span>
                        <span className="text-[10px] text-zinc-400">Visa, MC, Amex</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                        className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          formData.paymentMethod === 'apple_pay'
                            ? 'border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950'
                            : 'border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-zinc-800 mb-2" />
                        <span className="text-xs font-semibold text-zinc-900">Apple Pay</span>
                        <span className="text-[10px] text-zinc-400">1-Touch Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          formData.paymentMethod === 'cod'
                            ? 'border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950'
                            : 'border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        <Banknote className="w-4 h-4 text-zinc-800 mb-2" />
                        <span className="text-xs font-semibold text-zinc-900">Cash on Del.</span>
                        <span className="text-[10px] text-zinc-400">Pay on arrival</span>
                      </button>
                    </div>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          defaultValue={formData.cardNumber}
                          className="w-full px-3 py-2 text-xs font-mono border border-zinc-200 rounded bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1">
                            Expires
                          </label>
                          <input
                            type="text"
                            defaultValue={formData.cardExpiry}
                            className="w-full px-3 py-2 text-xs font-mono border border-zinc-200 rounded bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            defaultValue={formData.cardCvc}
                            className="w-full px-3 py-2 text-xs font-mono border border-zinc-200 rounded bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'cod' && (
                    <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-lg text-xs text-amber-900 leading-relaxed">
                      <strong>Cash on Delivery:</strong> Please prepare exact payment of{' '}
                      <strong>{formatPrice(cartTotal)}</strong> at the time of courier delivery.
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="px-4 py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium rounded-md flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Authorization...</span>
                      ) : (
                        <span>Authorize Payment · {formatPrice(cartTotal)}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-zinc-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-zinc-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase font-semibold tracking-wider text-zinc-500 mb-4">
                  Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                <div className="space-y-3 max-h-48 overflow-y-auto divide-y divide-zinc-200/60 pr-1 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-14 rounded object-cover border border-zinc-200 shrink-0"
                      />
                      <div className="flex-1 truncate">
                        <p className="text-xs font-medium text-zinc-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          Qty: {item.quantity} · {item.selectedSize}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-900 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-zinc-600 font-mono tabular-nums pt-4 border-t border-zinc-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-900 font-medium">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo ({appliedPromo.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Transit</span>
                    <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="pt-3 border-t border-zinc-200 flex justify-between text-sm font-semibold text-zinc-950 font-sans">
                    <span>Total Due</span>
                    <span className="font-mono tabular-nums">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200/80 text-[11px] text-zinc-500 space-y-1.5">
                <p>✓ Insured express international transit via DHL</p>
                <p>✓ 100% plastic-free compostable unboxing</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
