
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

    // Productos destacados para el mega desplegable (simulando los del HTML provisto)
    const featuredItems = allProducts.filter(p => [47847, 48028, 48649, 47536].includes(p.id));

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
            {/* Top Promo Bar (Visible solo cuando no hay scroll) */}
            {!isScrolled && (
                <div className="bg-pink-50 text-pink-700 py-1.5 px-4 text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-center uppercase border-b border-pink-100">
                    ENVÍO GRATIS EN PEDIDOS +35€ | CALIDAD ORIFLAME GARANTIZADA 🌸
                </div>
            )}

            {/* Main Header Area (Logo & Actions) */}
            <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2 border-b' : 'py-5 md:py-8'}`}>
                <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
                    
                    {/* Left: Search Bar */}
                    <div className="hidden lg:flex items-center w-1/3">
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-6 py-2.5 w-full max-w-xs transition-all shadow-inner focus-within:bg-white focus-within:ring-1 focus-within:ring-pink-300 group">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Buscar en Vellaperfumeria..." 
                                className="bg-transparent border-none focus:ring-0 text-xs ml-3 w-full font-medium"
                            />
                        </div>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex justify-center w-full lg:w-1/3">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-90 transition-all transform hover:scale-105 active:scale-95">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className={`transition-all duration-500 ${isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-28'} w-auto object-contain`} 
                            />
                        </button>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-3 md:gap-6 w-1/3">
                        <button className="p-2 text-gray-800 hover:text-pink-600 transition-colors hidden sm:flex items-center gap-2 group">
                            <UserIcon />
                            <span className="text-[10px] font-bold tracking-widest uppercase hidden xl:block">Mi Perfil</span>
                        </button>
                        <button onClick={onCartClick} className="relative p-2 text-gray-800 hover:text-pink-600 transition-transform active:scale-90 flex items-center gap-2 group">
                            <CartIcon />
                            <span className="text-[10px] font-bold tracking-widest uppercase hidden xl:block">Carrito</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pop">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* FULL WIDTH NAVIGATION BAR (BLACK) */}
            <nav className="bg-black w-full shadow-lg relative hidden md:block">
                <div className="container mx-auto px-4">
                    <ul className="flex justify-center items-center">
                        <li className="relative group">
                            <button 
                                onClick={() => onNavigate('home')} 
                                className="text-white text-[11px] font-black tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-8 py-5 flex items-center gap-2"
                            >
                                Inicio
                            </button>
                        </li>
                        <li className="relative group">
                            <button 
                                onMouseEnter={() => setShowMegaMenu(true)}
                                className={`text-white text-[11px] font-black tracking-[0.3em] uppercase transition-all px-8 py-5 border-b-4 ${showMegaMenu ? 'border-pink-500 text-pink-400' : 'border-transparent hover:text-pink-400'}`}
                            >
                                Productos <span className="ml-1 text-[8px] opacity-50">▼</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('catalog')} className="text-white text-[11px] font-black tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-8 py-5">
                                Catálogo Digital
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ofertas')} className="text-pink-400 text-[11px] font-black tracking-[0.3em] uppercase hover:text-pink-300 transition-all px-8 py-5 flex items-center gap-2">
                                <span className="animate-pulse text-white">🔥</span> Ofertas de Invierno
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ia')} className="text-white text-[11px] font-black tracking-[0.3em] uppercase flex items-center gap-2 px-8 py-5 group/ia">
                                <span className="text-pink-500 group-hover/ia:animate-spin">✨</span> Beauty IA
                            </button>
                        </li>
                    </ul>
                </div>

                {/* FULL WIDTH BLACK MEGA MENU DROPDOWN */}
                {showMegaMenu && (
                    <div 
                        className="absolute top-full left-0 w-full bg-[#050505] text-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-[110] border-t border-gray-900 animate-mega-slide origin-top"
                        onMouseEnter={() => setShowMegaMenu(true)}
                    >
                        <div className="container mx-auto px-8 md:px-12 py-16">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                                
                                {/* Column 1: Categories Links */}
                                <div className="md:col-span-3 space-y-12">
                                    <div>
                                        <h3 className="text-pink-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                            <div className="w-4 h-[1px] bg-pink-600"></div> EXPLORA COLECCIONES
                                        </h3>
                                        <ul className="space-y-4">
                                            <li><button onClick={() => { onNavigate('products', 'skincare'); setShowMegaMenu(false); }} className="text-xs hover:text-pink-400 transition-colors uppercase tracking-[0.2em] font-bold block text-left">Cuidado de la Piel</button></li>
                                            <li><button onClick={() => { onNavigate('products', 'makeup'); setShowMegaMenu(false); }} className="text-xs hover:text-pink-400 transition-colors uppercase tracking-[0.2em] font-bold block text-left">Maquillaje Profesional</button></li>
                                            <li><button onClick={() => { onNavigate('products', 'perfume'); setShowMegaMenu(false); }} className="text-xs hover:text-pink-400 transition-colors uppercase tracking-[0.2em] font-bold block text-left">Perfumería Selectiva</button></li>
                                            <li><button onClick={() => { onNavigate('products', 'wellness'); setShowMegaMenu(false); }} className="text-xs hover:text-pink-400 transition-colors uppercase tracking-[0.2em] font-bold block text-left">Wellosophy & Salud</button></li>
                                            <li><button onClick={() => { onNavigate('products', 'hair'); setShowMegaMenu(false); }} className="text-xs hover:text-pink-400 transition-colors uppercase tracking-[0.2em] font-bold block text-left">Cuidado Capilar</button></li>
                                        </ul>
                                    </div>
                                    <div className="pt-8 border-t border-gray-900">
                                        <h3 className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-4">MÁS ACCIONES</h3>
                                        <ul className="space-y-3">
                                            <li><button onClick={() => onNavigate('blog')} className="text-[10px] text-gray-400 hover:text-white transition-colors uppercase tracking-widest font-medium">Beauty Blog</button></li>
                                            <li><button onClick={() => onNavigate('about')} className="text-[10px] text-gray-400 hover:text-white transition-colors uppercase tracking-widest font-medium">Conócenos</button></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Column 2+: Featured Items (Mimicking the user's provided ProductList snippet) */}
                                <div className="md:col-span-9">
                                    <div className="flex justify-between items-center mb-8 border-b border-gray-900 pb-4">
                                        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em]">
                                            Sugerencias de la Semana <span className="text-pink-500 ml-2">Tendencia ✨</span>
                                        </h3>
                                        <button 
                                            onClick={() => { onNavigate('products', 'all'); setShowMegaMenu(false); }} 
                                            className="text-[10px] font-black border-b-2 border-pink-600 pb-1 text-gray-400 hover:text-white transition-all uppercase tracking-widest"
                                        >
                                            Ver Todo el Catálogo
                                        </button>
                                    </div>
                                    
                                    {/* Grid of featured products inside menu */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                        {featuredItems.map(product => (
                                            <div 
                                                key={product.id} 
                                                className="group/item flex flex-col cursor-pointer bg-[#0c0c0c] p-4 rounded-2xl border border-transparent hover:border-pink-900/30 transition-all duration-500 shadow-lg"
                                                onClick={() => { onNavigate('productDetail', product); setShowMegaMenu(false); }}
                                            >
                                                <div className="aspect-[4/5] bg-white rounded-xl overflow-hidden mb-4 p-4 relative">
                                                    <img 
                                                        src={product.imageUrl} 
                                                        alt={product.name} 
                                                        className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-700" 
                                                    />
                                                    {product.tag && (
                                                        <span className="absolute top-2 left-2 bg-black text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-tighter shadow-xl">
                                                            {product.tag}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.floor(product.rating || 0)} />)}
                                                    </div>
                                                    <h4 className="text-[11px] font-bold text-gray-300 line-clamp-2 leading-snug h-8 group-hover/item:text-pink-400 transition-colors uppercase tracking-wider">{product.name}</h4>
                                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-900/50">
                                                        <p className="text-xs font-black text-pink-600 tracking-wider">
                                                            {formatCurrency(product.price, currency)}
                                                        </p>
                                                        <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">VER MÁS</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Elegant footer for mega menu */}
                        <div className="bg-gradient-to-r from-transparent via-pink-600/20 to-transparent h-[1px] w-full"></div>
                        <div className="py-4 text-center bg-black/40">
                             <p className="text-[8px] font-bold tracking-[0.5em] text-gray-600 uppercase">Vellaperfumeria × Oriflame Official Partner</p>
                        </div>
                    </div>
                )}
            </nav>

            <style>{`
                @keyframes megaSlide {
                    from { 
                        opacity: 0; 
                        transform: translateY(-20px) scaleY(0.98); 
                        filter: blur(4px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scaleY(1); 
                        filter: blur(0);
                    }
                }
                .animate-mega-slide {
                    animation: megaSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes pop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                }
                .animate-pop {
                    animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
            `}</style>
        </header>
    );
};

export default Header;
