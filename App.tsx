
import React, { useState, useEffect, useCallback } from 'react';
// Types
import type { View, Product, CartItem } from './components/types';
import type { Currency } from './components/currency';
import { blogPosts } from './components/blogData';
// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ShopPage from './components/ShopPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartSidebar from './components/CartSidebar';
import OfertasPage from './components/OfertasPage';
import AsistenteIAPage from './components/AsistenteIAPage';
import CatalogPage from './components/CatalogPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import QuickViewModal from './components/QuickViewModal';
import Breadcrumbs, { type BreadcrumbItem } from './components/Breadcrumbs';
import CheckoutPage from './components/CheckoutPage';
import BottomNavBar from './components/BottomNavBar';
import { allProducts } from './components/products';

interface ErrorBoundaryProps {
    children?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

// Error Boundary mejorado
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error crítico en la aplicación:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center p-4">
                    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-100 max-w-md w-full">
                        <h1 className="text-2xl font-bold text-pink-600 mb-2">¡Vaya! Algo salió mal</h1>
                        <p className="text-gray-600 mb-6 text-sm">Hemos tenido un problema técnico cargando la tienda.</p>
                        <div className="bg-gray-100 p-3 rounded text-xs text-left text-gray-700 font-mono mb-6 overflow-auto max-h-32">
                            {this.state.error?.message || 'Error desconocido'}
                        </div>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="w-full bg-pink-500 text-white font-bold px-6 py-3 rounded-full hover:bg-pink-600 transition-colors shadow-md"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }
        return (this as any).props.children;
    }
}

type AppView = {
    current: View;
    payload?: any;
};

const AppContent: React.FC = () => {
    const [view, setView] = useState<AppView>({ current: 'home' });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    // Load cart from local storage OR URL param on initial render
    useEffect(() => {
        // 1. Check for shared cart in URL
        const searchParams = new URLSearchParams(window.location.search);
        const sharedCartData = searchParams.get('cart');

        if (sharedCartData) {
            try {
                // Decode base64 string
                const decodedData = atob(sharedCartData);
                const parsedData = JSON.parse(decodedData);
                
                // Reconstruct cart items based on IDs to ensure data freshness
                const restoredCart: CartItem[] = parsedData.map((item: any) => {
                    const product = allProducts.find(p => p.id === item.productId);
                    if (product) {
                        return {
                            id: item.id,
                            product: product,
                            quantity: item.quantity,
                            selectedVariant: item.selectedVariant
                        };
                    }
                    return null;
                }).filter(Boolean);

                if (restoredCart.length > 0) {
                    setCartItems(restoredCart);
                    setIsCartOpen(true); // Open cart to show user the shared items
                    // Clean URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                    return; 
                }
            } catch (error) {
                console.error("Error parsing shared cart URL", error);
            }
        }

        // 2. If no URL cart, try LocalStorage
        try {
            const storedCart = localStorage.getItem('vellaperfumeria_cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('vellaperfumeria_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);
    
    // Scroll to top on view change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        // Close overlays when navigating
        setIsCartOpen(false);
        setQuickViewProduct(null);
        setView({ current: newView, payload });
    }, []);

    const handleProductSelect = (product: Product) => {
        handleNavigate('productDetail', product);
    };

    const showAddToCartConfirmation = (buttonElement: HTMLButtonElement | null) => {
        if (!buttonElement) return;
        buttonElement.classList.add('ring-2', 'ring-pink-400');
        setTimeout(() => {
            buttonElement.classList.remove('ring-2', 'ring-pink-400');
        }, 1000);
    };

    const handleAddToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        const cartItemId = selectedVariant 
            ? `${product.id}-${Object.values(selectedVariant).join('-')}`
            : `${product.id}`;
            
        const existingItem = cartItems.find(item => item.id === cartItemId);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { id: cartItemId, product, quantity: 1, selectedVariant }]);
        }
        
        setIsCartOpen(true);
        if(buttonElement) showAddToCartConfirmation(buttonElement);
    };
    
    const handleQuickAddToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        handleAddToCart(product, buttonElement, selectedVariant);
        if (!isCartOpen) setIsCartOpen(true);
    };

    const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveItem(cartItemId);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const handleRemoveItem = (cartItemId: string) => {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        handleNavigate('checkout');
    };

    const handleSelectPost = (post: any) => {
        handleNavigate('blogPost', post);
    };

    const renderContent = () => {
        switch (view.current) {
            case 'home':
                return <ProductList onNavigate={handleNavigate} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} currency={currency} onQuickView={setQuickViewProduct} />;
            case 'products':
                return <ShopPage initialCategory={view.payload || 'all'} currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'productDetail':
                return <ProductDetailPage product={view.payload} currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'ofertas':
                return <OfertasPage currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'ia':
                return <AsistenteIAPage />;
            case 'catalog':
                return <CatalogPage onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} currency={currency} />;
            case 'blog':
                 return <BlogPage posts={blogPosts} onSelectPost={handleSelectPost} />;
            case 'blogPost':
                 return <BlogPostPage post={view.payload} allPosts={blogPosts} onSelectPost={handleSelectPost} onBack={() => handleNavigate('blog')} />;
            case 'checkout':
                return <CheckoutPage cartItems={cartItems} currency={currency} onClearCart={handleClearCart} onNavigate={handleNavigate} />;
            default:
                return <ProductList onNavigate={handleNavigate} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} currency={currency} onQuickView={setQuickViewProduct} />;
        }
    };
    
    const categories = [
        { key: 'all', name: 'Todos los productos' },
        { key: 'skincare', name: 'Cuidado Facial' },
        { key: 'makeup', name: 'Maquillaje' },
        { key: 'perfume', name: 'Fragancias' },
        { key: 'wellness', name: 'Wellness' },
        { key: 'hair', name: 'Cuidado del Cabello' },
        { key: 'personal-care', name: 'Cuidado Personal' },
        { key: 'men', name: 'Hombre' },
        { key: 'accessories', name: 'Accesorios' },
    ];

    const buildBreadcrumbs = (): BreadcrumbItem[] => {
        const homeCrumb: BreadcrumbItem = { label: 'Inicio', onClick: () => handleNavigate('home') };
        const crumbs = [homeCrumb];

        switch(view.current) {
            case 'products':
                crumbs.push({ label: 'Tienda', onClick: () => handleNavigate('products', 'all') });
                if (view.payload && view.payload !== 'all') {
                    const categoryName = categories.find(c => c.key === view.payload)?.name || view.payload;
                    crumbs.push({ label: categoryName });
                }
                break;
            case 'productDetail':
                {
                    const product = view.payload as Product;
                    const categoryName = categories.find(c => c.key === product.category)?.name || product.category;
                    crumbs.push({ label: 'Tienda', onClick: () => handleNavigate('products', 'all') });
                    crumbs.push({ label: categoryName, onClick: () => handleNavigate('products', product.category) });
                    crumbs.push({ label: product.name });
                }
                break;
            case 'ofertas':
                crumbs.push({ label: 'Ideas Regalo' });
                break;
             case 'ia':
                crumbs.push({ label: 'Asistente IA' });
                break;
            case 'catalog':
                crumbs.push({ label: 'Catálogo' });
                break;
            case 'blog':
                crumbs.push({ label: 'Blog' });
                break;
            case 'blogPost':
                crumbs.push({ label: 'Blog', onClick: () => handleNavigate('blog') });
                crumbs.push({ label: view.payload.title });
                break;
            case 'checkout':
                crumbs.push({ label: 'Finalizar Compra' });
                break;
        }

        return crumbs;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 font-sans text-gray-800">
            <Header
                onNavigate={handleNavigate}
                currency={currency}
                onCurrencyChange={setCurrency}
                cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
            />
             <main className="flex-grow py-2 mb-16 md:mb-0">
                <Breadcrumbs items={buildBreadcrumbs()} />
                {renderContent()}
            </main>
            <Footer onNavigate={handleNavigate} />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                currency={currency}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                isCheckingOut={false}
                checkoutError={null}
                onNavigate={handleNavigate}
            />

            {quickViewProduct && (
                <QuickViewModal
                    product={quickViewProduct}
                    currency={currency}
                    onClose={() => setQuickViewProduct(null)}
                    onAddToCart={handleAddToCart}
                    onProductSelect={(p) => {
                        setQuickViewProduct(null);
                        handleProductSelect(p);
                    }}
                />
            )}
            
            <BottomNavBar
                onNavigate={handleNavigate}
                currentView={view.current}
                currentCategory={typeof view.payload === 'string' ? view.payload : ''}
            />

            <style>{`
                :root {
                    /* TRANSPARENT PINK THEME (Glassmorphism) */
                    --color-primary: #ec4899; /* Pink 500 (Main Buttons, Highlights) */
                    --color-primary-hover: #db2777; /* Pink 600 */
                    --color-secondary: #fce7f3; /* Pink 100 (Backgrounds) */
                    
                    --glass-bg: rgba(255, 255, 255, 0.7);
                    --glass-border: rgba(236, 72, 153, 0.2);
                    --glass-blur: 12px;
                }
                
                body {
                    background-color: #fdf2f8; /* Pink 50 */
                }

                /* Selection Color */
                ::selection {
                    background-color: #f472b6; /* Pink 400 */
                    color: white;
                }
                
                /* Buttons */
                .btn-primary {
                    background-color: var(--color-primary);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 9999px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3);
                }
                .btn-primary:hover {
                    background-color: var(--color-primary-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 8px -1px rgba(236, 72, 153, 0.4);
                }

                /* Updated Brand Classes for Components */
                .bg-brand-primary { background-color: var(--color-primary); }
                .text-brand-primary { color: var(--color-primary); }
                
                /* The "Purple" classes now map to Transparent Pink/Rose styles */
                .bg-brand-purple { 
                    background-color: rgba(255, 255, 255, 0.6); 
                    backdrop-filter: blur(var(--glass-blur));
                    border: 1px solid var(--glass-border);
                }
                .text-brand-purple { color: #be185d; } /* Pink 700 */
                
                .bg-brand-purple-dark { background-color: #fbcfe8; } /* Pink 200 */
                .text-brand-purple-dark { color: #831843; } /* Pink 900 */
                
                .border-brand-purple { border-color: #fbcfe8; }
                .border-brand-purple-dark { border-color: #ec4899; }
                
                .ring-brand-purple { --tw-ring-color: #fbcfe8; }
                .ring-brand-purple-dark { --tw-ring-color: #ec4899; }

                /* Hover Effects */
                .hover-underline-effect {
                    display: inline-block;
                    position: relative;
                }
                .hover-underline-effect::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 2px;
                    bottom: -2px;
                    left: 0;
                    background-color: var(--color-primary);
                    transform-origin: bottom right;
                    transition: transform 0.3s ease-out;
                }
                .hover-underline-effect:hover::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                }

                /* Animation */
                @keyframes pop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                .animate-pop {
                    animation: pop 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <AppContent />
        </ErrorBoundary>
    );
};

export default App;
