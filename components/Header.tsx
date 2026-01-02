
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

const InstagramIconSmall = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" />
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

    // Selección premium para el mega menú
    const featuredItems = allProducts.filter(p => [48115, 48082, 49135, 44952].includes(p.id));

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
            {/* 1. Barra de Promoción Superior (Rosa) */}
            <div className="bg-pink-50 text-pink-700 py-1.5 px-4 md:px-12 text-[10px] font-black uppercase border-b border-pink-100">
                <div className="max-w-[1920px] mx-auto flex justify-between items-center">
                    <a href="https://instagram.com/vellaperfumeria" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors flex items-center gap-1.5">
                        <InstagramIconSmall />
                        <span className="hidden lg:inline tracking-widest">SÍGUENOS</span>
                    </a>
                    <div className="tracking-[0.2em] md:tracking-[0.4em] text-center flex-grow px-2">
                        ENVÍO GRATIS +35€ | CALIDAD ORIFLAME GARANTIZADA 🌸
                    </div>
                    <div className="hidden md:flex gap-4 opacity-60 tracking-widest">
                        <span>ESPAÑA</span>
                    </div>
                </div>
            </div>

            {/* 2. Área de Logo y Acciones (Blanco) */}
            <div className={`bg-white transition-all duration-300 border-b border-gray-100 ${isScrolled ? 'py-1' : 'py-3'}`}>
                <div className="w-full px-4 md:px-12 flex items-center justify-between">
                    {/* Buscador */}
                    <div className="hidden lg:flex items-center w-1/4">
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2 w-full max-w-xs transition-all focus-within:bg-white focus-within:ring-1 focus-within:ring-pink-300">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Buscar productos..." 
                                className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-full font-bold uppercase tracking-tighter"
                            />
                        </div>
                    </div>

                    {/* Logo Central */}
                    <div className="flex justify-center w-full lg:w-2/4">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-90 transition-transform hover:scale-105">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className={`transition-all duration-500 ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-20'} w-auto object-contain`} 
                            />
                        </button>
                    </div>

                    {/* Iconos Derecha */}
                    <div className="flex items-center justify-end gap-2 md:gap-6 w-1/4">
                        <button className="p-2 text-gray-800 hover:text-pink-600 transition-colors flex items-center gap-2 group">
                            <UserIcon />
                            <span className="text-[10px] font-black tracking-widest uppercase hidden xl:block">Mi Cuenta</span>
                        </button>
                        <button onClick={onCartClick} className="relative p-2 text-gray-800 hover:text-pink-600 flex items-center gap-2 group">
                            <CartIcon />
                            <span className="text-[10px] font-black tracking-widest uppercase hidden xl:block">Cesta</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. BARRA DE NAVEGACIÓN NEGRA (ANCHURA COMPLETA) */}
            <nav className="bg-black w-full shadow-2xl relative border-t border-white/10 hidden md:block">
                <div className="w-full flex justify-center items-center">
                    <ul className="flex justify-center items-stretch h-14">
                        <li>
                            <button onClick={() => onNavigate('home')} className="h-full text-white text-[11px] font-black tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-8">
                                Inicio
                            </button>
                        </li>
                        
                        {/* Trigger del Dropdown */}
                        <li onMouseEnter={() => setShowMegaMenu(true)} className="relative group">
                            <button className={`h-full text-white text-[11px] font-black tracking-[0.3em] uppercase transition-all px-8 flex items-center gap-2 ${showMegaMenu ? 'text-pink-400 bg-white/5' : 'hover:text-pink-400 hover:bg-white/5'}`}>
                                Productos <span className="text-[8px] opacity-40 group-hover:rotate-180 transition-transform duration-300">▼</span>
                            </button>
                            <div className={`absolute bottom-0 left-0 h-0.5 bg-pink-500 transition-all duration-300 ${showMegaMenu ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                        </li>

                        {/* Link Resaltado ONE COLOUR */}
                        <li>
                            <button 
                                onClick={() => onNavigate('products', 'the-one')} 
                                className="h-full text-pink-400 text-[11px] font-black tracking-[0.3em] uppercase hover:text-white hover:bg-pink-600 transition-all px-8 border-x border-white/5"
                            >
                                One Colour (The ONE)
                            </button>
                        </li>

                        <li>
                            <button onClick={() => onNavigate('catalog')} className="h-full text-white text-[11px] font-black tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-8">
                                Catálogo Digital
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ofertas')} className="h-full text-white text-[11px] font-black tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-8 flex items-center gap-2">
                                <span className="animate-pulse">🔥</span> Ofertas
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ia')} className="h-full text-white text-[11px] font-black tracking-[0.3em] uppercase flex items-center gap-2 px-8 hover:bg-white/5">
                                <span className="text-pink-500">✨</span> Beauty IA
                            </button>
                        </li>
                    </ul>
                </div>

                {/* 4. MEGA MENÚ DESPLEGABLE (FONDO NEGRO - ANCHURA COMPLETA) */}
                {showMegaMenu && (
                    <div 
                        className="absolute top-full left-0 w-full bg-[#0a0a0a] text-white shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-[110] border-t border-white/10 backdrop-blur-3xl animate-mega-reveal origin-top overflow-hidden"
                        onMouseEnter={() => setShowMegaMenu(true)}
                    >
                        <div className="w-full max-w-[1920px] mx-auto px-8 md:px-24 py-16">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                
                                {/* Columna de Categorías */}
                                <div className="lg:col-span-3 space-y-12">
                                    <div>
                                        <h3 className="text-pink-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                                            <div className="w-10 h-[1px] bg-pink-500/30"></div> Universos de Belleza
                                        </h3>
                                        <ul className="space-y-6">
                                            {[
                                                { id: 'skincare', label: 'Cuidado Facial Avanzado' },
                                                { id: 'makeup', label: 'Maquillaje Profesional' },
                                                { id: 'perfume', label: 'Alta Perfumería' },
                                                { id: 'wellness', label: 'Bienestar Holístico' },
                                                { id: 'hair', label: 'Cuidado del Cabello' }
                                            ].map(cat => (
                                                <li key={cat.id}>
                                                    <button 
                                                        onClick={() => { onNavigate('products', cat.id); setShowMegaMenu(false); }} 
                                                        className="text-xs hover:text-pink-400 transition-all uppercase tracking-[0.25em] font-bold block text-left group w-full"
                                                    >
                                                        <span className="group-hover:translate-x-3 transition-transform duration-300 inline-block">
                                                            {cat.label}
                                                        </span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bloque Destacado en el Menú */}
                                    <div className="pt-10 border-t border-white/10">
                                        <div className="bg-gradient-to-br from-pink-900/40 to-black p-6 rounded-2xl border border-pink-500/20">
                                            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">Tendencia</h3>
                                            <button 
                                                onClick={() => { onNavigate('products', 'the-one'); setShowMegaMenu(false); }}
                                                className="w-full bg-pink-600 text-white text-[11px] font-black py-4 px-6 rounded-xl hover:bg-pink-50 transition-colors uppercase tracking-widest flex items-center justify-between group"
                                            >
                                                The ONE Colour
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Área de Productos Destacados */}
                                <div className="lg:col-span-9">
                                    <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
                                        <div>
                                            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.5em]">
                                                Selección <span className="text-pink-500 underline decoration-pink-500/30 underline-offset-8">Iconos Vellaperfumeria</span>
                                            </h3>
                                        </div>
                                        <button 
                                            onClick={() => { onNavigate('products', 'all'); setShowMegaMenu(false); }} 
                                            className="text-[9px] font-black text-gray-500 hover:text-pink-400 transition-all uppercase tracking-[0.3em] pb-1"
                                        >
                                            Ver Todo el Catálogo
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                                        {featuredItems.map(product => (
                                            <div 
                                                key={product.id} 
                                                className="group/item cursor-pointer"
                                                onClick={() => { onNavigate('productDetail', product); setShowMegaMenu(false); }}
                                            >
                                                <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden mb-5 p-4 relative border border-white/5 group-hover/item:border-pink-500/30 transition-all duration-500">
                                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-1000" />
                                                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/5 transition-all"></div>
                                                </div>
                                                <div className="space-y-3 px-1">
                                                    <h4 className="text-[11px] font-bold text-gray-300 line-clamp-1 group-hover/item:text-pink-400 transition-colors uppercase tracking-widest">{product.name}</h4>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-black text-pink-500">{formatCurrency(product.price, currency)}</p>
                                                        <span className="text-[8px] text-gray-500 font-black uppercase tracking-tighter opacity-0 group-hover/item:opacity-100 transition-opacity">Ver Detalle</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Línea decorativa inferior */}
                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <div className="py-8 text-center bg-black/50">
                             <p className="text-[9px] font-black tracking-[1em] text-gray-600 uppercase">Beauty Essentials & Oriflame Innovation</p>
                        </div>
                    </div>
                )}
            </nav>

            <style>{`
                @keyframes megaReveal {
                    from { opacity: 0; transform: translateY(-10px) scaleY(0.98); }
                    to { opacity: 1; transform: translateY(0) scaleY(1); }
                }
                .animate-mega-reveal { 
                    animation: megaReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
            `}</style>
        </header>
    );
};

export default Header;
