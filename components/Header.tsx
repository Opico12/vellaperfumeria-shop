
import React, { useState, useEffect } from 'react';
import type { View, Product } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';
import { allProducts } from './products';

// --- ICONS ---
const SearchIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-3 h-3 ${filled ? 'text-pink-500' : 'text-gray-700'}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="m14.494 8.18-1.468-3.8c-.362-.938-1.69-.938-2.052 0l-1.468 3.8a1 1 0 0 1-.774.627l-4.152.667c-.968.156-1.264 1.405-.469 1.979l3.041 2.192a1 1 0 0 1 .392 1.027l-.961 4.345c-.222 1.001.925 1.734 1.74 1.113l3.07-2.34a1 1 0 0 1 1.213 0l3.07 2.34c.816.621 1.963-.112 1.741-1.113l-.96-4.345a1 1 0 0 1 .39-1.027l3.042-2.192c.795-.574.5-1.823-.47-1.979l-4.151-.667a1 1 0 0 1-.774-.627"/>
    </svg>
);

const Header: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Selección premium para el mega menú (Productos destacados)
    const featuredItems = allProducts.filter(p => [47847, 48115, 48082, 49135].includes(p.id));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            className={`w-full z-[100] transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-2xl' : 'relative'}`}
            onMouseLeave={() => setShowMegaMenu(false)}
        >
            {/* Top Promo Bar - Full Width */}
            <div className="bg-pink-50 text-pink-700 py-1.5 px-4 text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-center uppercase border-b border-pink-100">
                ENVÍO GRATIS EN PEDIDOS +35€ | CALIDAD ORIFLAME GARANTIZADA 🌸
            </div>

            {/* Main Header - White background */}
            <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-1 border-b' : 'py-4 md:py-6'}`}>
                <div className="w-full px-4 md:px-12 flex items-center justify-between">
                    
                    {/* Search - Left */}
                    <div className="hidden lg:flex items-center w-1/4">
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2 w-full max-w-xs transition-all focus-within:bg-white focus-within:ring-1 focus-within:ring-pink-300">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Buscar..." 
                                className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-full font-medium"
                            />
                        </div>
                    </div>

                    {/* Logo - Center */}
                    <div className="flex justify-center w-full lg:w-2/4">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-90 transition-transform hover:scale-105">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className={`transition-all duration-500 ${isScrolled ? 'h-10 md:h-14' : 'h-14 md:h-24'} w-auto object-contain`} 
                            />
                        </button>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center justify-end gap-2 md:gap-6 w-1/4">
                        <button className="p-2 text-gray-800 hover:text-pink-600 transition-colors hidden sm:flex items-center gap-2 group">
                            <UserIcon />
                            <span className="text-[10px] font-black tracking-widest uppercase hidden xl:block">Mi Cuenta</span>
                        </button>
                        <button onClick={onCartClick} className="relative p-2 text-gray-800 hover:text-pink-600 flex items-center gap-2 group">
                            <CartIcon />
                            <span className="text-[10px] font-black tracking-widest uppercase hidden xl:block">Cesta</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* FULL WIDTH BLACK NAVIGATION BAR */}
            <nav className="bg-black w-full shadow-lg relative hidden md:block">
                <div className="w-full flex justify-center items-center">
                    <ul className="flex justify-center">
                        <li>
                            <button 
                                onClick={() => onNavigate('home')} 
                                className="text-white text-[11px] font-black tracking-[0.4em] uppercase hover:text-pink-400 transition-all px-10 py-5"
                            >
                                Inicio
                            </button>
                        </li>
                        <li 
                            onMouseEnter={() => setShowMegaMenu(true)}
                            className="relative"
                        >
                            <button 
                                className={`text-white text-[11px] font-black tracking-[0.4em] uppercase transition-all px-10 py-5 flex items-center gap-2 ${showMegaMenu ? 'text-pink-400' : 'hover:text-pink-400'}`}
                            >
                                Productos <span className="text-[8px] opacity-40">▼</span>
                            </button>
                            {/* Animated Pink Line under active menu item */}
                            <div className={`absolute bottom-0 left-0 h-1 bg-pink-500 transition-all duration-500 ${showMegaMenu ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('catalog')} className="text-white text-[11px] font-black tracking-[0.4em] uppercase hover:text-pink-400 transition-all px-10 py-5">
                                Catálogo Digital
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ofertas')} className="text-pink-500 text-[11px] font-black tracking-[0.4em] uppercase hover:text-pink-300 transition-all px-10 py-5 flex items-center gap-2">
                                <span className="animate-pulse text-white">🔥</span> Ofertas
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ia')} className="text-white text-[11px] font-black tracking-[0.4em] uppercase flex items-center gap-2 px-10 py-5 group/ia">
                                <span className="text-pink-500 group-hover/ia:rotate-12 transition-transform">✨</span> Beauty IA
                            </button>
                        </li>
                    </ul>
                </div>

                {/* FULL WIDTH DROPDOWN MEGA MENU */}
                {showMegaMenu && (
                    <div 
                        className="absolute top-full left-0 w-full bg-[#050505] text-white shadow-[0_40px_80px_rgba(0,0,0,0.7)] z-[110] border-t border-white/5 backdrop-blur-xl animate-mega-reveal origin-top overflow-hidden"
                        onMouseEnter={() => setShowMegaMenu(true)}
                    >
                        <div className="w-full px-8 md:px-24 py-16">
                            <div className="flex flex-col lg:flex-row gap-20">
                                
                                {/* Column 1: Navigation Links */}
                                <div className="lg:w-1/4 space-y-12">
                                    <div>
                                        <h3 className="text-pink-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-pink-600"></div> Categorías
                                        </h3>
                                        <ul className="space-y-5">
                                            {['skincare', 'makeup', 'perfume', 'wellness', 'hair'].map(cat => (
                                                <li key={cat}>
                                                    <button 
                                                        onClick={() => { onNavigate('products', cat); setShowMegaMenu(false); }} 
                                                        className="text-xs hover:text-pink-400 transition-colors uppercase tracking-[0.2em] font-bold block text-left group"
                                                    >
                                                        <span className="group-hover:translate-x-2 transition-transform inline-block">
                                                            {cat === 'skincare' ? 'Cuidado Facial' : 
                                                             cat === 'makeup' ? 'Maquillaje Pro' : 
                                                             cat === 'perfume' ? 'Fragancias' : 
                                                             cat === 'wellness' ? 'Bienestar & Salud' : 'Cuidado Capilar'}
                                                        </span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-8 border-t border-white/5">
                                        <button 
                                            onClick={() => { onNavigate('blog'); setShowMegaMenu(false); }}
                                            className="text-[10px] text-gray-400 hover:text-white transition-colors uppercase tracking-widest font-black flex items-center gap-2"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-pink-500"></span> Beauty Blog & Tips
                                        </button>
                                    </div>
                                </div>

                                {/* Column 2: Visual Featured Products Grid */}
                                <div className="lg:w-3/4">
                                    <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                                        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                                            Selección <span className="text-pink-500">Must-Have ✨</span>
                                        </h3>
                                        <button 
                                            onClick={() => { onNavigate('products', 'all'); setShowMegaMenu(false); }} 
                                            className="text-[10px] font-black text-gray-500 hover:text-pink-400 transition-all uppercase tracking-widest border-b border-transparent hover:border-pink-500 pb-1"
                                        >
                                            Ver Catálogo Completo
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                        {featuredItems.map(product => (
                                            <div 
                                                key={product.id} 
                                                className="group/item flex flex-col cursor-pointer bg-white/5 p-4 rounded-3xl border border-white/5 hover:border-pink-500/30 transition-all duration-500"
                                                onClick={() => { onNavigate('productDetail', product); setShowMegaMenu(false); }}
                                            >
                                                <div className="aspect-[1/1] bg-white rounded-2xl overflow-hidden mb-5 p-4 relative">
                                                    <img 
                                                        src={product.imageUrl} 
                                                        alt={product.name} 
                                                        className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-1000" 
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-[11px] font-bold text-gray-200 line-clamp-1 group-hover/item:text-pink-400 transition-colors uppercase tracking-wider">{product.name}</h4>
                                                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                                                        <p className="text-xs font-black text-pink-500">
                                                            {formatCurrency(product.price, currency)}
                                                        </p>
                                                        <span className="text-[7px] text-gray-500 font-bold uppercase tracking-widest">Añadir</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Footer Gradient Accent */}
                        <div className="bg-gradient-to-r from-transparent via-pink-600/30 to-transparent h-[1px] w-full"></div>
                        <div className="py-6 text-center bg-black/80">
                             <p className="text-[8px] font-black tracking-[0.8em] text-gray-600 uppercase">Vellaperfumeria Official Shop</p>
                        </div>
                    </div>
                )}
            </nav>

            <style>{`
                @keyframes megaReveal {
                    from { 
                        opacity: 0; 
                        transform: translateY(-10px) scaleY(0.95);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scaleY(1);
                    }
                }
                .animate-mega-reveal {
                    animation: megaReveal 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;
