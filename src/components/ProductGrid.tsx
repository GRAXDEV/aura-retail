import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Search, X } from 'lucide-react';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = ['All', 'Apparel', 'Leather Goods', 'Footwear', 'Objects'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="featured-catalog" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-200/80">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400 block mb-2">
            The Permanent Collection
          </span>
          <h2 className="text-3xl font-serif font-normal text-zinc-950">
            Handcrafted Essentials
          </h2>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Bar Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter by material, name..."
              className="w-full pl-8 pr-7 py-2 text-xs bg-white border border-zinc-200 rounded-md placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs py-2 px-3 bg-white border border-zinc-200 rounded-md text-zinc-800 font-medium focus:outline-hidden focus:border-zinc-900 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Segmented Buttons */}
      <div className="flex items-center justify-between gap-4 mb-8 overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100/90 rounded-lg">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono tabular-nums text-zinc-500 whitespace-nowrap">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-dashed border-zinc-200 rounded-lg">
          <p className="text-sm font-medium text-zinc-900 mb-1">No matching designs found</p>
          <p className="text-xs text-zinc-500 mb-4">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
            }}
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-medium rounded-md hover:bg-zinc-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
