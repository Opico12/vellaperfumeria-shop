
import React, { useState, useCallback } from 'react';
import type { View, Product, CartItem } from './components/types';
import type { Currency } from './components/currency';
import { allProducts } from './components/products';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ShopPage from './components/ShopPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartSidebar from './components/CartSidebar';
import OfertasPage from './components/OfertasPage';
import AsistenteIAPage from './components/AsistenteIAPage';
import CatalogPage from './components/CatalogPage';
import CheckoutPage from './components/CheckoutPage';
import WhatsAppFloat from './components/WhatsAppFloat';
import HeroCarousel from './components/HeroCarousel';

const App: React.FC = () => {
    const [view, setView] = useState<{current: View, payload?: any}>({ current: 'home' });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currency] = useState<Currency>('EUR');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        setView({ current: newView, payload });
        setIsCartOpen(false);
        window.scrollTo(0, 0);
    }, []);

    const addToCart = (product: Product, _: any, selectedVariant: Record<string, string> | null) => {
        const id = `${product.id}-${selectedVariant ? JSON.stringify(selectedVariant) : 'none'}`;
        setCartItems(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) return prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item);
            return [...prev, { id, product, quantity: 1, selectedVariant }];
        });
        setIsCartOpen(true);
    };

    const renderView = () => {
        switch (view.current) {
            case 'home':
                return (
                    <div className="space-y-4">
                        <HeroCarousel onNavigate={handleNavigate} />
                        <ProductList 
                            onNavigate={handleNavigate} 
                            onProductSelect={(p) => handleNavigate('productDetail', p)}
                            onAddToCart={addToCart}
                            onQuickAddToCart={addToCart}
                            currency={currency}
                            onQuickView={(p) => handleNavigate('productDetail', p)}
                        />
                    </div>
                );
            case 'products':
                return (
                    <ShopPage 
                        currency={currency}
                        initialCategory={view.payload || 'all'}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onProductSelect={(p) => handleNavigate('productDetail', p)}
                        onQuickView={(p) => handleNavigate('productDetail', p)}
                    />
                );
            case 'productDetail':
                return <ProductDetailPage product={view.payload} currency={currency} onAddToCart={addToCart} onQuickAddToCart={addToCart} onProductSelect={(p) => handleNavigate('productDetail', p)} onQuickView={(p) => handleNavigate('productDetail', p)} />;
            case 'ofertas':
                return <OfertasPage currency={currency} onAddToCart={addToCart} onQuickAddToCart={addToCart} onProductSelect={(p) => handleNavigate('productDetail', p)} onQuickView={(p) => handleNavigate('productDetail', p)} />;
            case 'ia':
                return <AsistenteIAPage />;
            case 'catalog':
                return <CatalogPage onAddToCart={addToCart} onQuickAddToCart={addToCart} onProductSelect={(p) => handleNavigate('productDetail', p)} onQuickView={(p) => handleNavigate('productDetail', p)} currency={currency} />;
            case 'checkout':
                return <CheckoutPage cartItems={cartItems} currency={currency} onClearCart={() => setCartItems([])} onNavigate={handleNavigate} />;
            default:
                return <div className="py-20 text-center italic text-gray-500">Sección en desarrollo...</div>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header 
                onNavigate={handleNavigate} 
                currency={currency} 
                onCurrencyChange={() => {}} 
                cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
            />
            <main className="flex-grow">{renderView()}</main>
            <Footer onNavigate={handleNavigate} />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} currency={currency} onUpdateQuantity={(id, q) => q < 1 ? setCartItems(prev => prev.filter(i => i.id !== id)) : setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: q} : i))} onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))} onCheckout={() => handleNavigate('checkout')} isCheckingOut={false} checkoutError={null} onNavigate={handleNavigate} />
            <WhatsAppFloat />
        </div>
    );
};

export default App;
