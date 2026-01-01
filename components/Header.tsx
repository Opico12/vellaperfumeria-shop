
import React, { useState } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- MEGA MENU DATA ---
interface SubCategory {
    name: string;
    link: string;
    payload?: any;
}

interface MenuSection {
    title: string;
    items: SubCategory[];
}

interface MegaMenuCategory {
    label: string;
    sections: MenuSection[];
    promoImage: string;
    promoText: string;
}

const megaMenuData: Record<string, MegaMenuCategory> = {
    'MAQUILLAJE': {
        label: 'Maquillaje',
        promoImage: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=e6a950aa-3fef-457c-bcbf-1058993497d0&name=3_Promo_split_GiftSets_600x450&inputFormat=jpg',
        promoText: 'Descubre THE ONE Enero',
        sections: [
            {
                title: 'Rostro',
                items: [
                    { name: 'Bases y BB Creams', link: 'products', payload: 'makeup' },
                    { name: 'Correctores', link: 'products', payload: 'makeup' },
                    { name: 'Polvos y Fijadores', link: 'products', payload: 'makeup' },
                    { name: 'Coloretes', link: 'products', payload: 'makeup' },
                ]
            },
            {
                title: 'Ojos y Labios',
                items: [
                    { name: 'Máscaras de Pestañas', link: 'products', payload: 'makeup' },
                    { name: 'Delineadores', link: 'products', payload: 'makeup' },
                    { name: 'Sombras de Ojos', link: 'products', payload: 'makeup' },
                    { name: 'Barras de Labios', link: 'products', payload: 'makeup' },
                ]
            },
            {
                title: 'Por Marca',
                items: [
                    { name: 'Giordani Gold Luxury', link: 'products', payload: 'makeup' },
                    { name: 'THE ONE Performance', link: 'products', payload: 'makeup' },
                    { name: 'OnColour Pop', link: 'products', payload: 'makeup' },
                ]
            }
        ]
    },
    'TRATAMIENTOS': {
        label: 'Cuidado Facial',
        promoImage: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=6efc6ae1-0a1d-4df6-97f8-d785fa0c0476&name=5_Promo_split_Novage_600x450&inputFormat=jpg',
        promoText: 'Sistemas Novage+ 2026',
        sections: [
            {
                title: 'Rutinas Completas',
                items: [
                    { name: 'Novage+ Antiedad', link: 'products', payload: 'skincare' },
                    { name: 'Optimals Hidratación', link: 'products', payload: 'skincare' },
                    { name: 'Love Nature Eco', link: 'products', payload: 'skincare' },
                ]
            },
            {
                title: 'Específicos',
                items: [
                    { name: 'Limpiadores y Tónicos', link: 'products', payload: 'skincare' },
                    { name: 'Serums y Tratamientos', link: 'products', payload: 'skincare' },
                    { name: 'Contorno de Ojos', link: 'products', payload: 'skincare' },
                ]
            },
            {
                title: 'Cuidado Corporal',
                items: [
                    { name: 'Milk & Honey Gold', link: 'products', payload: 'personal-care' },
                    { name: 'Essense & Co', link: 'products', payload: 'personal-care' },
                    { name: 'Cuidado de Manos', link: 'products', payload: 'personal-care' },
                ]
            }
        ]
    },
    'FRAGANCIAS': {
        label: 'Fragancias',
        promoImage: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=36924433-3518-4215-a3be-a4ab341f18a1&name=FRA_01&inputFormat=jpg',
        promoText: 'Tu esencia ideal',
        sections: [
            {
                title: 'Mujer',
                items: [
                    { name: 'Parfums Premium', link: 'products', payload: 'perfume' },
                    { name: 'Eau de Parfum', link: 'products', payload: 'perfume' },
                    { name: 'Brumas Corporales', link: 'products', payload: 'perfume' },
                ]
            },
            {
                title: 'Hombre',
                items: [
                    { name: 'Eau de Toilette', link: 'products', payload: 'perfume' },
                    { name: 'Sets de Regalo', link: 'products', payload: 'perfume' },
                    { name: 'Cuidado Personal', link: 'products', payload: 'men' },
                ]
            },
            {
                title: 'Especiales',
                items: [
                    { name: 'Best Sellers', link: 'products', payload: 'perfume' },
                    { name: 'Novedades 2026', link: 'products', payload: 'perfume' },
                ]
            }
        ]
    }
};

const Header: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <header className="relative z-50 bg-white" onMouseLeave={() => setActiveMenu(null)}>
            {/* Promo Top Bar */}
            <div className="bg-pink-50 text-pink-700 py-1.5 px-4 text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-center uppercase border-b border-pink-100">
                ENVÍO GRATIS EN PEDIDOS +35€ | CALIDAD ORIFLAME GARANTIZADA 🌸
            </div>

            {/* Middle Bar: Logo and Tools */}
            <div className="container mx-auto px-4 md:px-8 py-3 md:py-4">
                <div className="flex justify-between items-center h-12 md:h-20">
                    {/* Search & Burger (Mobile) */}
                    <div className="flex items-center gap-3 flex-1">
                        <button className="md:hidden p-1.5 text-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                        <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2 w-72 group focus-within:ring-1 focus-within:ring-pink-400 focus-within:bg-white transition-all shadow-inner">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="¿Qué buscas hoy?" 
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full placeholder-gray-400 font-medium"
                            />
                        </div>
                    </div>

                    {/* Central Logo */}
                    <div className="flex-shrink-0">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-90 transition-opacity">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className="h-12 md:h-20 w-auto" 
                            />
                        </button>
                    </div>

                    {/* Icons Right */}
                    <div className="flex items-center justify-end gap-1 md:gap-3 flex-1">
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

            {/* MAIN NAVIGATION BAR (FULL WIDTH BLACK) */}
            <nav className="hidden md:block bg-black w-full border-t border-gray-900 shadow-xl overflow-visible">
                <div className="container mx-auto px-4">
                    <ul className="flex justify-center items-center">
                        <li>
                            <button 
                                onClick={() => onNavigate('home')} 
                                className="text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-8 py-5"
                            >
                                Inicio
                            </button>
                        </li>
                        
                        {Object.keys(megaMenuData).map((key) => (
                            <li key={key}>
                                <button 
                                    onMouseEnter={() => setActiveMenu(key)}
                                    className={`text-white text-[11px] font-bold tracking-[0.3em] uppercase transition-all px-8 py-5 border-b-2 ${activeMenu === key ? 'border-pink-500 text-pink-400' : 'border-transparent hover:text-pink-300'}`}
                                >
                                    {megaMenuData[key].label}
                                </button>
                            </li>
                        ))}
                        
                        <li>
                            <button onClick={() => onNavigate('catalog')} className="text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-400 transition-all px-8 py-5">
                                Catálogo 📖
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ofertas')} className="text-pink-400 text-[11px] font-bold tracking-[0.3em] uppercase hover:text-pink-300 transition-all px-8 py-5">
                                Ofertas 🔥
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onNavigate('ia')} className="text-white text-[11px] font-bold tracking-[0.3em] uppercase flex items-center gap-2 px-8 py-5 group">
                                <span className="text-pink-500 group-hover:animate-pulse">✨</span> IA
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* MEGA MENU DROPDOWN (VISIBLE BLACK BACKGROUND - FULL WIDTH) */}
            {activeMenu && megaMenuData[activeMenu] && (
                <div 
                    className="absolute top-full left-0 w-full bg-black text-white shadow-[0_30px_60px_rgba(0,0,0,0.7)] animate-menu-slide origin-top z-50 border-t border-gray-800"
                    onMouseEnter={() => setActiveMenu(activeMenu)}
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    <div className="container mx-auto grid grid-cols-12 gap-10 py-12 px-8">
                        {/* Categories columns */}
                        <div className="col-span-8 grid grid-cols-3 gap-8">
                            {megaMenuData[activeMenu].sections.map((section, idx) => (
                                <div key={idx} className="space-y-6">
                                    <h3 className="text-pink-500 font-serif text-lg italic font-bold tracking-widest border-b border-gray-900 pb-2">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.items.map((item, i) => (
                                            <li key={i}>
                                                <button 
                                                    onClick={() => {
                                                        onNavigate(item.link as View, item.payload);
                                                        setActiveMenu(null);
                                                    }}
                                                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-[11px] uppercase tracking-[0.25em] text-left block w-full"
                                                >
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Right Promo Box */}
                        <div className="col-span-4 flex flex-col gap-4">
                            <div 
                                className="relative flex-grow group cursor-pointer overflow-hidden rounded-xl border border-gray-800 bg-gray-900" 
                                onClick={() => { onNavigate('products', 'all'); setActiveMenu(null); }}
                            >
                                <img 
                                    src={megaMenuData[activeMenu].promoImage} 
                                    alt="Promo" 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                                    <p className="text-white font-serif italic text-2xl mb-1">{megaMenuData[activeMenu].promoText}</p>
                                    <p className="text-pink-400 font-bold text-[9px] tracking-[0.3em] uppercase">Ver Colección Completa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Aesthetic Bottom line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-600 to-transparent opacity-20"></div>
                </div>
            )}

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[110px] bg-black/98 backdrop-blur-md text-white z-50 p-6 animate-fade-in flex flex-col overflow-y-auto">
                    <nav className="flex flex-col gap-6 text-xl font-serif tracking-[0.1em] uppercase text-center mt-10">
                        <button onClick={() => {onNavigate('home'); setIsMobileMenuOpen(false)}} className="hover:text-pink-400 py-3 border-b border-gray-900">Inicio</button>
                        <button onClick={() => {onNavigate('catalog'); setIsMobileMenuOpen(false)}} className="hover:text-pink-400 py-3 border-b border-gray-900 font-bold">Catálogo 📖</button>
                        <button onClick={() => {onNavigate('products', 'all'); setIsMobileMenuOpen(false)}} className="hover:text-pink-400 py-3 border-b border-gray-900">Tienda</button>
                        <button onClick={() => {onNavigate('ofertas'); setIsMobileMenuOpen(false)}} className="text-pink-400 py-3 border-b border-gray-900">Ofertas 🔥</button>
                        <button onClick={() => {onNavigate('ia'); setIsMobileMenuOpen(false)}} className="text-pink-300 italic py-3">Asistente Virtual ✨</button>
                    </nav>
                    <div className="mt-auto py-10 flex flex-col items-center gap-4 border-t border-gray-900">
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Sigue nuestra belleza</p>
                        <div className="flex gap-6 text-gray-400">
                            {/* Simple social icons placeholders */}
                            <span className="w-6 h-6 rounded-full bg-gray-900"></span>
                            <span className="w-6 h-6 rounded-full bg-gray-900"></span>
                            <span className="w-6 h-6 rounded-full bg-gray-900"></span>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes menuSlide {
                    from { opacity: 0; transform: scaleY(0.9) translateY(-10px); }
                    to { opacity: 1; transform: scaleY(1) translateY(0); }
                }
                .animate-menu-slide {
                    animation: menuSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-pop {
                    animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes pop {
                    0% { transform: scale(0.5); }
                    70% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </header>
    );
};

export default Header;
