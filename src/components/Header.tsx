import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onCategorySelect: (cat: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onCategorySelect,
  activeCategory,
}) => {
  const { cartCount, setIsCartOpen, wishlist } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'All Collections', value: 'All' },
    { label: 'Apparel', value: 'Apparel' },
    { label: 'Leather Goods', value: 'Leather Goods' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Objects', value: 'Objects' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-zinc-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="text-xl sm:text-2xl font-serif tracking-widest uppercase font-semibold text-zinc-950 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            Aura Retail
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] uppercase tracking-wider font-medium text-zinc-600">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => onCategorySelect(item.value)}
                  className={`relative py-1 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-zinc-950 font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-950" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Functional affordances (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-5 shrink-0">
            <button
              onClick={onSearchClick}
              className="p-1 text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('featured-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative p-1 text-zinc-700 hover:text-zinc-950 transition-colors hidden sm:block cursor-pointer"
              aria-label="Wishlist items"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-800" />
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="group flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-zinc-200 group-hover:scale-110 transition-transform" />
              <span>Bag ({cartCount})</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-zinc-700 hover:text-zinc-950 lg:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[112px] bg-[#FBFBFA] border-b border-zinc-200 shadow-xl px-6 py-6 z-25 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-150">
          <p className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Browse Collections
          </p>
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onCategorySelect(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm py-1.5 transition-colors ${
                  activeCategory === item.value
                    ? 'text-zinc-950 font-bold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between text-xs text-zinc-500">
            <span>Free express delivery over $150</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSearchClick();
              }}
              className="text-zinc-900 font-medium underline"
            >
              Quick Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};
