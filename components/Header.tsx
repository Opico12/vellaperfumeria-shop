
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

const FilterIcon = () => (
    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium w-5 h-5 mr-2" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M9.437 7a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h1.063a2 2 0 0 1 3.874 0H19.5a.5.5 0 0 1 0 1zM6.5 6.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0m11.937 5H19.5a.5.5 0 0 1 0 1h-1.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h10.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-6.063 5H19.5a.5.5 0 0 1 0 1h-8.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h3.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0" fill="currentColor"></path></svg>
);

const SortIcon = () => (
    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium w-5 h-5 mr-2" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 6a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zM19 6.5a.5.5 0 0 0-1 0v9.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L19 16.293z" fill="currentColor"></path></svg>
);

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-3 h-3 ${filled ? 'text-amber-400' : 'text-gray-600'}`} focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m14.494 8.18-1.468-3.8c-.362-.938-1.69-.938-2.052 0l-1.468 3.8a1 1 0 0 1-.774.627l-4.152.667c-.968.156-1.264 1.405-.469 1.979l3.041 2.192a1 1 0 0 1 .392 1.027l-.961 4.345c-.222 1.001.925 1.734 1.74 1.113l3.07-2.34a1 1 0 0 1 1.213 0l3.07 2.34c.816.621 1.963-.112 1.741-1.113l-.96-4.345a1 1 0 0 1 .39-1.027l3.042-2.192c.795-.574.5-1.823-.47-1.979l-4.151-.667a1 1 0 0 1-.774-.627" fill="currentColor"></path></svg>
);

const HeartIcon = () => (
    <svg className="w-5 h-5" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m12 20.5-.243.437-.002-.001-.006-.003-.021-.012-.08-.046-.293-.173a29 29 0 0 1-4.187-3.078C4.906 15.613 2.5 12.734 2.5 9.5c0-1.6.468-2.875 1.242-3.796A4.67 4.67 0 0 1 6.68 4.092c1.947-.28 4.088.582 5.321 2.528 1.233-1.946 3.374-2.809 5.321-2.528a4.67 4.67 0 0 1 2.937 1.612C21.032 6.624 21.5 7.9 21.5 9.5c0 3.233-2.406 6.113-4.668 8.124a29 29 0 0 1-4.531 3.28l-.029.017-.02.012-.007.003h-.001s-.001.001-.244-.436M4.508 6.348C3.907 7.063 3.5 8.1 3.5 9.5c0 2.767 2.094 5.387 4.332 7.376A28 28 0 0 0 12 19.922l.129-.077a28 28 0 0 0 4.04-2.97C18.406 14.887 20.5 12.267 20.5 9.5c0-1.4-.407-2.437-1.008-3.152a3.67 3.67 0 0 0-2.313-1.266c-1.781-.257-3.81.675-4.719 2.808L12 8.97l-.46-1.08c-.909-2.133-2.938-3.065-4.719-2.808a3.67 3.67 0 0 0-2.313 1.266M12 20.5l.244.437a.5.5 0 0 1-.487 0z" fill="currentColor"></path></svg>
);

const QuickBuyIcon = () => (
    <svg className="w-5 h-5" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M6.434 9H4.5a1.5 1.5 0 0 0-1.486 1.703l1.227 9A1.5 1.5 0 0 0 5.728 21h12.254a1.5 1.5 0 0 0 1.486-1.297l1.227-9A1.5 1.5 0 0 0 19.21 9h-1.933c-.087-2.548-.848-4.078-1.933-4.96C14.208 3.118 12.826 3 11.855 3c-.975 0-2.355.126-3.49 1.051C7.282 4.936 6.521 6.464 6.434 9m1 0c.086-2.329.778-3.533 1.564-4.174.858-.7 1.942-.826 2.857-.826.917 0 2 .12 2.857.817.785.637 1.477 1.84 1.563 4.183zm8.868 1 .053 1.448a.5.5 0 0 0 1-.018c0-.528-.013-.987-.037-1.43h1.891a.5.5 0 0 1 .495.568l-1.227 9a.5.5 0 0 1-.495.432H5.728a.5.5 0 0 1-.496-.432l-1.227-9A.5.5 0 0 1 4.5 10h1.905q-.001.372.01.756.009.333.01.674a.5.5 0 1 0 1 0c0-.285-.006-.535-.012-.766-.005-.236-.01-.452-.008-.664z" fill="currentColor"></path></svg>
);

const Header: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [showMegaMenu, setShowMegaMenu] = useState(false);

    // Seleccionamos los productos específicos del HTML proporcionado para el dropdown
    const featuredProducts = allProducts.filter(p => [48028, 46801, 47760, 46807].includes(p.id));

    return (
        <header className="relative z-50 bg-white" onMouseLeave={() => setShowMegaMenu(false)}>
            {/* Promo Top Bar */}
            <div className="bg-pink-50 text-pink-700 py-1.5 px-4 text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-center uppercase border-b border-pink-100">
                ENVÍO GRATIS EN PEDIDOS +35€ | CALIDAD ORIFLAME GARANTIZADA 🌸
            </div>

            {/* Main Bar with Centered Logo */}
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex justify-between items-center h-12 md:h-20">
                    
                    {/* Left Side: Burger (mobile) or Search (desktop) */}
                    <div className="flex-1 flex items-center">
                        <button className="md:hidden p-2 text-gray-800 hover:text-pink-600 transition-colors" onClick={() => onNavigate('home')}>
                            <MenuIcon />
                        </button>
                        <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2 w-72 transition-all shadow-inner focus-within:bg-white focus-within:ring-1 focus-within:ring-pink-300">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Buscar productos..." 
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
                            />
                        </div>
                    </div>

                    {/* Center Side: Logo ALWAYS centered */}
                    <div className="flex-shrink-0 flex justify-center">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-90 transition-opacity">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className="h-14 md:h-20 w-auto" 
                            />
                        </button>
                    </div>

                    {/* Right Side: Actions */}
                    <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
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

            {/* FULL WIDTH NAVIGATION BAR (BLACK) */}
            <nav className="bg-black w-full shadow-xl">
                <div className="container mx-auto px-4">
                    <ul className="flex justify-center items-center">
                        <li>
                            <button 
                                onClick={() => onNavigate('home')} 
                                className="text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-6 py-5"
                            >
                                Inicio
                            </button>
                        </li>
                        <li>
                            <button 
                                onMouseEnter={() => setShowMegaMenu(true)}
                                className={`text-white text-[11px] font-bold tracking-[0.3em] uppercase transition-all px-6 py-5 border-b-2 ${showMegaMenu ? 'border-pink-500 text-pink-400' : 'border-transparent hover:text-pink-300'}`}
                            >
                                Tienda
                            </button>
                        </li>
                        <li className="hidden lg:block">
                            <button onClick={() => onNavigate('catalog')} className="text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-6 py-5">
                                Catálogo Digital
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ofertas')} className="text-pink-400 text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-300 transition-all px-6 py-5">
                                Ofertas 🔥
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ia')} className="text-white text-[11px] font-bold tracking-[0.3em] uppercase flex items-center gap-2 px-6 py-5 group">
                                <span className="text-pink-500 group-hover:animate-pulse">✨</span> IA Beauty
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* MEGA DROPDOWN (FULL WIDTH BLACK) */}
            {showMegaMenu && (
                <div 
                    className="absolute top-full left-0 w-full bg-[#0a0a0a] text-white shadow-2xl z-50 border-t border-gray-900 animate-menu-slide origin-top"
                    onMouseEnter={() => setShowMegaMenu(true)}
                >
                    <div className="ProductList-root container mx-auto px-8 py-12" data-testid="Presentation-product-list-product-list">
                        <div className="products-app-emotion-rgisos">
                            {/* Actions bar inside dropdown */}
                            <div data-testid="Presentation-product-list-actions-root" className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-800">
                                <div className="flex gap-8">
                                    <div data-testid="Presentation-product-list-facet-filter-button" className="flex items-center cursor-pointer hover:text-pink-400 transition-colors group">
                                        <FilterIcon />
                                        <p className="text-[12px] font-bold uppercase tracking-widest">Filtrar</p>
                                    </div>
                                    <div data-testid="Presentation-product-list-sorting" className="flex items-center cursor-pointer hover:text-pink-400 transition-colors group">
                                        <SortIcon />
                                        <p className="text-[12px] font-bold uppercase tracking-widest">Recomendado</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <p className="text-gray-500 text-[11px] uppercase tracking-widest font-bold" data-testid="Presentation-product-list-items-counter">107 productos disponibles</p>
                                </div>
                            </div>

                            {/* Product Grid inside dropdown */}
                            <div className="products-app-emotion-10sxxhj">
                                <div data-testid="Presentation-product-list-ContentRows" className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {featuredProducts.map(product => (
                                        <div key={product.id} className="group relative bg-black/40 p-4 rounded-xl border border-gray-900 hover:border-pink-500/30 transition-all duration-500 cursor-pointer" onClick={() => { onNavigate('productDetail', product); setShowMegaMenu(false); }}>
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white mb-4">
                                                <img 
                                                    alt={product.name} 
                                                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                                                    src={product.imageUrl} 
                                                />
                                                {product.tag === 'NOVEDAD' && (
                                                    <div className="absolute top-2 left-2 bg-pink-600 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter">Novedad</div>
                                                )}
                                                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="bg-black/80 p-2 rounded-full hover:text-pink-400"><QuickBuyIcon/></button>
                                                    <button className="bg-black/80 p-2 rounded-full hover:text-red-500"><HeartIcon/></button>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.floor(product.rating || 0)} />)}
                                                    <span className="text-[9px] text-gray-500 ml-1">({product.reviewCount})</span>
                                                </div>
                                                <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">{product.brand}</span>
                                                <h4 className="text-[11px] font-bold text-gray-200 leading-tight h-8 line-clamp-2">{product.name}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <p className="text-sm font-black text-white">{formatCurrency(product.price, currency)}</p>
                                                    {product.regularPrice && (
                                                        <p className="text-[10px] text-gray-600 line-through">{formatCurrency(product.regularPrice, currency)}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Bottom CTA */}
                            <div className="mt-12 text-center">
                                <button 
                                    onClick={() => { onNavigate('products', 'all'); setShowMegaMenu(false); }}
                                    className="bg-white text-black text-[10px] font-black px-10 py-3.5 rounded-full hover:bg-pink-500 hover:text-white transition-all tracking-[0.2em] uppercase shadow-xl"
                                >
                                    Ver todos los productos
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Aesthetic line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"></div>
                </div>
            )}

            <style>{`
                @keyframes menuSlide {
                    from { opacity: 0; transform: scaleY(0.95); }
                    to { opacity: 1; transform: scaleY(1); }
                }
                .animate-menu-slide {
                    animation: menuSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes pop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                .animate-pop {
                    animation: pop 0.3s ease-out;
                }
            `}</style>
        </header>
    );
};

export default Header;
