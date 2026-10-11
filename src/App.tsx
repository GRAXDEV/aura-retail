import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValuePropositionBar } from './components/ValuePropositionBar';
import { ProductGrid } from './components/ProductGrid';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { NotificationToast } from './components/NotificationToast';

function StorefrontContent() {
  const { activeProductModal, setActiveProductModal } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const catalogEl = document.getElementById('featured-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#18181B]">
      {/* 1. Dismissible Top Announcement */}
      <AnnouncementBar />

      {/* 2. Top Bar Contract: Brand - 4 Nav Links - Primary Bag Action */}
      <Header
        activeCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Focal Anchor */}
        <Hero />

        {/* 4. Trust Pillars */}
        <ValuePropositionBar />

        {/* 5. Product Catalog & Filter Architecture */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 6. Editorial Provenance & Craftsmanship */}
        <CraftsmanshipSection />

        {/* 7. Attributable Reviews & Rigorous Proof */}
        <ReviewsSection />
      </main>

      {/* 8. Quiet Editorial Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
      />
      <CartDrawer />
      <CheckoutModal />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
