import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MaisonEssence } from './components/MaisonEssence';
import { Categories } from './components/Categories';
import { Catalog } from './components/Catalog';
import { RitualSection } from './components/RitualSection';
import { Lookbook } from './components/Lookbook';
import { Footer } from './components/Footer';
import { ConciergeButton } from './components/ConciergeButton';
import { CustomCursor } from './components/CustomCursor';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './data';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [category, setCategory] = useState('todos');
  const [mood, setMood] = useState('todos');
  const [activeProduct, setActiveProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('celli-cart') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('celli-cart', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  // Hook for smooth scroll fade-in reveals
  useScrollReveal();

  // Populate cart items with full product details
  const hydratedCart = cartItems
    .map((item) => ({
      ...item,
      product: PRODUCTS.find((p) => p.id === item.id),
    }))
    .filter((item) => Boolean(item.product));

  const totalCartCount = hydratedCart.reduce((acc, it) => acc + it.quantity, 0);

  // Add to cart handler
  const handleAddToCart = (product, size) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === product.id && it.size === size);
      if (existing) {
        return prev.map((it) =>
          it === existing ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { id: product.id, size, quantity: 1 }];
    });
    setActiveProduct(null);
    setIsCartOpen(true);
  };

  // Modify quantity handler
  const handleQuantityChange = (productId, size, nextQuantity) => {
    setCartItems((prev) => {
      if (nextQuantity <= 0) {
        return prev.filter((it) => !(it.id === productId && it.size === size));
      }
      return prev.map((it) =>
        it.id === productId && it.size === size
          ? { ...it, quantity: nextQuantity }
          : it
      );
    });
  };

  const handleSelectCategory = (catSlug) => {
    setCategory(catSlug);
    setMood('todos');
  };

  const handleCloseModal = useCallback(() => setActiveProduct(null), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <div className="bg-[#FAF8F5] text-[#231D18] min-h-screen selection:bg-[#9B7C55] selection:text-white">
      {/* Global Navigation */}
      <Header
        count={totalCartCount}
        onCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main>
        <Hero />
        <MaisonEssence />
        <Categories onSelect={handleSelectCategory} />
        <Catalog
          category={category}
          setCategory={setCategory}
          mood={mood}
          setMood={setMood}
          onOpen={setActiveProduct}
        />
        <RitualSection />
        <Lookbook />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Concierge & Custom Pointer */}
      <ConciergeButton />
      <CustomCursor />

      {/* Modals & Drawers */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={handleCloseModal}
          onAdd={handleAddToCart}
        />
      )}

      {isCartOpen && (
        <CartDrawer
          items={hydratedCart}
          onClose={handleCloseCart}
          onQuantity={handleQuantityChange}
        />
      )}
    </div>
  );
}
