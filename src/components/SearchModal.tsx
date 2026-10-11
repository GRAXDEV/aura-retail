import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { setActiveProductModal, formatPrice } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results: Product[] = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.materials.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 3);

  const handleSelectProduct = (p: Product) => {
    onClose();
    setActiveProductModal(p);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wool overshirts, leather totes, sneakers, cashmere..."
            className="w-full text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-900 rounded cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto divide-y divide-zinc-100">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-3 px-2">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Searches'}
          </p>

          {results.length > 0 ? (
            results.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(prod)}
                className="w-full text-left py-3 px-2 rounded-lg hover:bg-zinc-50 flex items-center justify-between gap-4 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 truncate">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-12 h-14 object-cover rounded border border-zinc-200 shrink-0"
                  />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors truncate">
                      {prod.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 truncate">{prod.tagline}</p>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                      {prod.category} · {prod.origin}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-semibold text-zinc-950 tabular-nums">
                    {formatPrice(prod.price)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-10 text-center text-xs text-zinc-500">
              No matching products found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
