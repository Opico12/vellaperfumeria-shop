
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
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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

    const featuredItems = allProducts.filter(p => [48115, 48082, 49135, 44285].includes(p.id));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            className={`w-full z-[100] transition-all duration-500 bg-black ${isScrolled ? 'fixed top-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'relative'}`}
            onMouseLeave={() => setShowMegaMenu(false)}
        >
            {/* 1. TOP PROMO BAR (Opcional, muy fina) */}
            {!isScrolled && (
                <div className="bg-pink-500/10 text-pink-300 py-1 text-[9px] font-black uppercase tracking-[0.3em] text-center border-b border-white/5">
                    Envío Gratis desde 35€ • 15% DTO en tu primer pedido con Vellaperfumeria 🌸
                </div>
            )}

            {/* 2. MAIN NAV BAR (BLACK - FULL WIDTH) */}
            <div className={`w-full transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <div className="max-w-[1920px] mx-auto px-4 md:px-10 flex items-center justify-between gap-8">
                    
                    {/* Logotipo (Invertido a blanco) */}
                    <div className="flex-shrink-0">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-all flex items-center">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className={`${isScrolled ? 'h-10' : 'h-14'} w-auto object-contain brightness-0 invert`} 
                            />
                        </button>
                    </div>

                    {/* Menú Central (Escritorio) */}
                    <nav className="hidden lg:flex items-center justify-center flex-grow">
                        <ul className="flex items-center space-x-1">
                            <li><button onClick={() => onNavigate('home')} className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:text-pink-400 transition-colors">Inicio</button></li>
                            
                            {/* Trigger del Mega Menú */}
                            <li onMouseEnter={() => setShowMegaMenu(true)} className="relative group">
                                <button className={`px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2 transition-colors ${showMegaMenu ? 'text-pink-400' : 'text-white hover:text-pink-400'}`}>
                                    Productos <span className={`text-[7px] transition-transform duration-300 ${showMegaMenu ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-pink-500 transition-all duration-300 ${showMegaMenu ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                            </li>

                            <li><button onClick={() => onNavigate('products', 'the-one')} className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-pink-400 hover:text-white transition-colors">The ONE</button></li>
                            <li><button onClick={() => onNavigate('catalog')} className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:text-pink-400 transition-colors">Catálogo</button></li>
                            <li><button onClick={() => onNavigate('ofertas')} className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:text-pink-400 transition-colors">Ofertas</button></li>
                            <li><button onClick={() => onNavigate('ia')} className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2 text-white hover:text-pink-400">
                                <span className="text-pink-500 animate-pulse">✨</span> IA Beauty
                            </button></li>
                        </ul>
                    </nav>

                    {/* Acciones Derecha (Buscador & Icons) */}
                    <div className="flex items-center gap-2 md:gap-6">
                        <div className="hidden xl:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:bg-white/10 transition-all">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="BUSCAR..." 
                                className="bg-transparent border-none focus:ring-0 text-[10px] ml-2 w-32 font-black uppercase tracking-widest text-white placeholder-white/20"
                            />
                        </div>
                        <button className="p-2 text-white hover:text-pink-400 transition-colors flex items-center gap-2">
                            <UserIcon />
                            <span className="text-[10px] font-black tracking-widest uppercase hidden sm:block">Perfil</span>
                        </button>
                        <button onClick={onCartClick} className="relative p-2 text-white hover:text-pink-400 transition-colors flex items-center gap-2 group">
                            <CartIcon />
                            <span className="text-[10px] font-black tracking-widest uppercase hidden sm:block">Cesta</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-black">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. MEGA MENÚ DESPLEGABLE (ANCHURA COMPLETA - NEGRO) */}
            {showMegaMenu && (
                <div 
                    className="absolute top-full left-0 w-full bg-[#080808] text-white shadow-[0_40px_100px_rgba(0,0,0,0.9)] z-[110] border-t border-white/5 backdrop-blur-3xl animate-mega-reveal origin-top overflow-hidden"
                    onMouseEnter={() => setShowMegaMenu(true)}
                >
                    <div className="max-w-[1920px] mx-auto px-8 md:px-20 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            
                            {/* Columna 1: Facial (Basado en tu HTML) */}
                            <div className="lg:col-span-3 space-y-10">
                                <div>
                                    <h3 className="text-pink-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                        <div className="w-8 h-[1px] bg-pink-500/50"></div> Cuidado Facial
                                    </h3>
                                    <ul className="space-y-4">
                                        {['Hidratantes', 'Ojos', 'Limpieza', 'Labios', 'Tratamientos'].map(label => (
                                            <li key={label}>
                                                <button onClick={() => { onNavigate('products', 'skincare'); setShowMegaMenu(false); }} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group flex items-center gap-2">
                                                    <span className="w-0 group-hover:w-2 h-[1px] bg-pink-500 transition-all"></span>
                                                    {label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Columna 2: Maquillaje & Fragancias */}
                            <div className="lg:col-span-3 space-y-10">
                                <div>
                                    <h3 className="text-pink-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                        <div className="w-8 h-[1px] bg-pink-500/50"></div> Color & Aroma
                                    </h3>
                                    <ul className="space-y-4">
                                        {['Rostro', 'Ojos', 'Labiales', 'Fragancias Mujer', 'Fragancias Hombre'].map(label => (
                                            <li key={label}>
                                                <button onClick={() => { onNavigate('products', 'makeup'); setShowMegaMenu(false); }} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group flex items-center gap-2">
                                                    <span className="w-0 group-hover:w-2 h-[1px] bg-pink-500 transition-all"></span>
                                                    {label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Columna 3: Wellness & Otros */}
                            <div className="lg:col-span-2 space-y-10">
                                <div>
                                    <h3 className="text-pink-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                        <div className="w-8 h-[1px] bg-pink-500/50"></div> Más
                                    </h3>
                                    <ul className="space-y-4">
                                        {['Nutrición', 'Capilar', 'Accesorios', 'Regalos'].map(label => (
                                            <li key={label}>
                                                <button onClick={() => { onNavigate('products', 'wellness'); setShowMegaMenu(false); }} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group flex items-center gap-2">
                                                    <span className="w-0 group-hover:w-2 h-[1px] bg-pink-500 transition-all"></span>
                                                    {label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Columna 4: Destacados Visuales */}
                            <div className="lg:col-span-4 bg-white/5 rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Selección Oriflame Iconos</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {featuredItems.slice(0, 2).map(product => (
                                        <div key={product.id} className="cursor-pointer group/card" onClick={() => { onNavigate('productDetail', product); setShowMegaMenu(false); }}>
                                            <div className="aspect-square bg-white rounded-2xl p-3 mb-3 overflow-hidden">
                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-700" />
                                            </div>
                                            <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-400 group-hover/card:text-pink-400 transition-colors">{product.name}</p>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => { onNavigate('products', 'all'); setShowMegaMenu(false); }}
                                    className="w-full mt-6 bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all"
                                >
                                    Ver toda la colección
                                </button>
                            </div>

                        </div>
                    </div>
                    {/* Footer del Dropdown */}
                    <div className="py-6 border-t border-white/5 bg-black/50 text-center">
                         <p className="text-[8px] font-black tracking-[1.5em] text-gray-600 uppercase">Vellaperfumeria • Exclusive Brand Partner Oriflame</p>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes megaReveal {
                    from { opacity: 0; transform: translateY(-10px) scaleY(0.98); }
                    to { opacity: 1; transform: translateY(0) scaleY(1); }
                }
                .animate-mega-reveal { 
                    animation: megaReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
            `}</style>
        </header>
    );
};

export default Header;
