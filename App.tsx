
import React, { Component, useState, useEffect, useCallback, type ErrorInfo, type ReactNode } from 'react';
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
import WhatsAppFloat from './components/WhatsAppFloat';
import GiftWrappingPage from './components/GiftWrappingPage';
import { allProducts } from './components/products';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Fixed ErrorBoundary inheritance by using Component from 'react' explicitly.
 * This resolves TypeScript errors where 'state' and 'props' were not recognized.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
                            className="w-full bg-pink-600 text-white font-bold px-6 py-3 rounded-full hover:bg-pink-700 transition-colors shadow-md"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
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

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const sharedCartData = searchParams.get('cart');

        if (sharedCartData) {
            try {
                const decodedData = atob(sharedCartData);
                const parsedData = JSON.parse(decodedData);
                
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
                    setIsCartOpen(true);
                    window.history.replaceState({}, document.title, window.location.pathname);
                    return; 
                }
            } catch (error) {
                console.error("Error parsing shared cart URL", error);
            }
        }

        try {
            const storedCart = localStorage.getItem('vellaperfumeria_cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('vellaperfumeria_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        setIsCartOpen(false