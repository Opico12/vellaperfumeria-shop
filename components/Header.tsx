
import React, { useState } from 'react';
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

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const QuickBuyIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.434 9H4.5a1.5 1.5 0 0 0-1.486 1.703l1.227 9A1.5 1.5 0 0 0 5.728 21h12.254a1.5 1.5 0 0 0 1.486-1.297l1.227-9A1.5 1.5 0 0 0 19.21 9h-1.933c-.087-2.548-.848-4.078-1.933-4.96C14.208 3.118 12.826 3 11.855 3c-.975 0-2.355.126-3.49 1.051C7.282 4.936 6.521 6.464 6.434 9m1 0c.086-2.329.778-3.533 1.564-4.174.858-.7 1.942-.826 2.857-.826.917 0 2 .12 2.857.817.785.637 1.477 1.84 1.563 4.183zm8.868 1 .053 1.448a.5.5 0 0 0 1-.018c0-.528-.013-.987-.037-1.43h1.891a.5.5 0 0 1 .495.568l-1.227 9a.5.5 0 0 1-.495.432H5.728a.5.5 0 0 1-.496-.432l-1.227-9A.5.5 0 0 1 4.5 10h1.905q-.001.372.01.756.009.333.01.674a.5.5 0 1 0 1 0c0-.285-.006-.535-.012-.766-.005-.236-.01-.452-.008-.664z"/></svg>
);

const HeartIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="m12 20.5-.243.437-.002-.001-.006-.003-.021-.012-.08-.046-.293-.173a29 29 0 0 1-4.187-3.078C4.906 15.613 2.5 12.734 2.5 9.5c0-1.6.468-2.875 1.242-3.796A4.67 4.67 0 0 1 6.68 4.092c1.947-.28 4.088.582 5.321 2.528 1.233-1.946 3.374-2.809 5.321-2.528a4.67 4.67 0 0 1 2.937 1.612C21.032 6.624 21.5 7.9 21.5 9.5c0 3.233-2.406 6.113-4.668 8.124a29 29 0 0 1-4.531 3.28l-.029.017-.02.012-.007.003h-.001s-.001.001-.244-.436"/></svg>
);

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-3 h-3 ${filled ? 'text-amber-400' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="currentColor"><path d="m14.494 8.18-1.468-3.8c-.362-.938-1.69-.938-2.052 0l-1.468 3.8a1 1 0 0 1-.774.627l-4.152.667c-.968.156-1.264 1.405-.469 1.979l3.041 2.192a1 1 0 0 1 .392 1.027l-.961 4.345c-.222 1.001.925 1.734 1.74 1.113l3.07-2.34a1 1 0 0 1 1.213 0l3.07 2.34c.816.621 1.963-.112 1.741-1.113l-.96-4.345a1 1 0 0 1 .39-1.027l3.042-2.192c.795-.574.5-1.823-.47-1.979l-4.151-.667a1 1 0 0 1-.774-.627"/></svg>
);

const Header: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [showMegaMenu, setShowMegaMenu] = useState(false);

    // Definimos los productos exactos del HTML proporcionado por el usuario
    const snippetProducts = [
        {
            id: 49135,
            name: "Cepillo de Dientes para Niños Dureza Suave Optifresh",
            brand: "Optifresh",
            price: 2.15,
            regularPrice: 5.00,
            imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F49135%2F49135_1.png&MediaId=20702750&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
            tag: "Novedad",
            rating: 0,
            reviewCount: 0
        },
        {
            id: 44952,
            name: "Pasta de Dientes Máxima Frescura Optifresh",
            brand: "Optifresh",
            price: 7.70,
            imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44952%2F44952_1.png&MediaId=14708973&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
            tag: "Nueva edición disponible",
            rating: 4.8,
            reviewCount: 1350
        },
        {
            id: 44954,
            name: "Pasta de Dientes Suave de Fresa para Niños Optifresh",
            brand: "Optifresh",
            price: 4.24,
            imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44954%2F44954_1.png&MediaId=14709007&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
            tag: "Nueva edición disponible",
            rating: 4.8,
            reviewCount: 995
        }
    ];

    return (
        <header className="relative z-50 bg-white" onMouseLeave={() => setShowMegaMenu(false)}>
            {/* Promo Top Bar */}
            <div className="bg-pink-50 text-pink-700 py-1.5 px-4 text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-center uppercase border-b border-pink-100">
                ENVÍO GRATIS EN PEDIDOS +35€ | CALIDAD ORIFLAME GARANTIZADA 🌸
            </div>

            {/* Main Header with perfectly centered logo */}
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="grid grid-cols-3 items-center h-12 md:h-20">
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-800 hover:text-pink-600 transition-colors">
                            <MenuIcon />
                        </button>
                        <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2 w-64 transition-all shadow-inner focus-within:bg-white focus-within:ring-1 focus-within:ring-pink-300">
                            <SearchIcon />
                            <input type="text" placeholder="Buscar..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button onClick={() => onNavigate('home')}>
                            <img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" alt="Vellaperfumeria" className="h-14 md:h-24 w-auto" />
                        </button>
                    </div>

                    <div className="flex items-center justify-end gap-2 md:gap-4">
                        <button className="p-2 text-gray-800 hover:text-pink-600 transition-colors hidden sm:block">
                            <UserIcon />
                        </button>
                        <button onClick={onCartClick} className="relative p-2 text-gray-800 hover:text-pink-600 transition-colors">
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-black text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white animate-pop">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* FULL WIDTH NAVIGATION BAR */}
            <nav className="bg-black w-full shadow-xl">
                <div className="container mx-auto px-4">
                    <ul className="flex justify-center items-center">
                        <li><button onClick={() => onNavigate('home')} className="text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-6 py-5">Inicio</button></li>
                        <li><button onMouseEnter={() => setShowMegaMenu(true)} className={`text-white text-[11px] font-bold tracking-[0.3em] uppercase transition-all px-6 py-5 border-b-2 ${showMegaMenu ? 'border-pink-500 text-pink-400' : 'border-transparent hover:text-pink-300'}`}>Tienda</button></li>
                        <li><button onClick={() => onNavigate('catalog')} className="text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-6 py-5">Catálogo</button></li>
                        <li><button onClick={() => onNavigate('ofertas')} className="text-pink-400 text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-300 transition-all px-6 py-5">Ofertas 🔥</button></li>
                        <li><button onClick={() => onNavigate('ia')} className="text-white text-[11px] font-bold tracking-[0.3em] uppercase flex items-center gap-2 px-6 py-5 group"><span className="text-pink-500 group-hover:animate-pulse">✨</span> IA Beauty</button></li>
                    </ul>
                </div>
            </nav>

            {/* FULL WIDTH BLACK DROPDOWN MENU */}
            {showMegaMenu && (
                <div 
                    className="absolute top-full left-0 w-full bg-[#0a0a0a] text-white shadow-2xl z-50 border-t border-gray-900 animate-menu-slide origin-top"
                    onMouseEnter={() => setShowMegaMenu(true)}
                >
                    <div className="container mx-auto px-8 py-10">
                        {/* Title of Dropdown */}
                        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                             <h3 className="text-xl font-serif font-bold uppercase tracking-widest text-pink-500">Higiene Dental & Cuidado</h3>
                             <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">Novedades Destacadas</p>
                        </div>

                        {/* Product Grid - replicates user HTML structure but clean */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {snippetProducts.map(product => (
                                <div key={product.id} className="group relative bg-[#111] p-5 rounded-2xl border border-gray-800 hover:border-pink-500/40 transition-all duration-500 cursor-pointer" onClick={() => { onNavigate('productDetail', product as any); setShowMegaMenu(false); }}>
                                    
                                    {/* Image Area */}
                                    <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f5f5f5] mb-5">
                                        <img 
                                            alt={product.name} 
                                            className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-700" 
                                            src={product.imageUrl} 
                                        />
                                        
                                        {/* Badge Novedad/Chip */}
                                        <div className="absolute top-3 left-3 bg-pink-600 text-white text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-widest shadow-xl">
                                            {product.tag}
                                        </div>

                                        {/* Actions Hover */}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="bg-black/90 p-2.5 rounded-full hover:text-pink-400 text-white transition-colors shadow-lg"><QuickBuyIcon/></button>
                                            <button className="bg-black/90 p-2.5 rounded-full hover:text-red-500 text-white transition-colors shadow-lg"><HeartIcon/></button>
                                        </div>
                                    </div>
                                    
                                    {/* Info Area */}
                                    <div className="space-y-2 text-left">
                                        <div className="flex items-center gap-1 min-h-[14px]">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} filled={i < Math.floor(product.rating)} />
                                            ))}
                                            {product.reviewCount > 0 && <span className="text-[10px] text-gray-500 font-bold">({product.reviewCount})</span>}
                                        </div>
                                        
                                        <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{product.brand}</span>
                                        <h4 className="text-[12px] font-bold text-gray-200 leading-tight h-10 line-clamp-2">{product.name}</h4>
                                        
                                        <div className="flex items-baseline gap-3 pt-1">
                                            <p className="text-lg font-black text-white">{formatCurrency(product.price, currency, { decimals: 2 })}</p>
                                            {product.regularPrice && (
                                                <p className="text-xs text-gray-600 line-through font-bold">{formatCurrency(product.regularPrice, currency, { decimals: 2 })}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Footer Link */}
                        <div className="mt-10 pt-8 border-t border-gray-800 text-center">
                            <button 
                                onClick={() => { onNavigate('products', 'all'); setShowMegaMenu(false); }}
                                className="bg-pink-600 text-white text-[10px] font-black px-12 py-4 rounded-full hover:bg-white hover:text-black transition-all tracking-[0.3em] uppercase shadow-2xl"
                            >
                                Ver Todo el Catálogo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes menuSlide { from { opacity: 0; transform: scaleY(0.95); } to { opacity: 1; transform: scaleY(1); } }
                .animate-menu-slide { animation: menuSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
                .animate-pop { animation: pop 0.3s ease-out; }
            `}</style>
        </header>
    );
};

export default Header;
