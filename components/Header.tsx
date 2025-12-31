
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
    'COSMETICA': {
        label: 'Maquillaje y Color',
        promoImage: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=e6a950aa-3fef-457c-bcbf-1058993497d0&name=3_Promo_split_GiftSets_600x450&inputFormat=jpg',
        promoText: 'Novedades Giordani Gold',
        sections: [
            {
                title: 'Rostro',
                items: [
                    { name: 'Bases de Maquillaje', link: 'products', payload: 'makeup' },
                    { name: 'Correctores', link: 'products', payload: 'makeup' },
                    { name: 'Polvos y Bronceadores', link: 'products', payload: 'makeup' },
                    { name: 'Coloretes', link: 'products', payload: 'makeup' },
                ]
            },
            {
                title: 'Ojos y Labios',
                items: [
                    { name: 'Máscaras de Pestañas', link: 'products', payload: 'makeup' },
                    { name: 'Delineadores', link: 'products', payload: 'makeup' },
                    { name: 'Labiales Iconic', link: 'products', payload: 'makeup' },
                    { name: 'Cuidado de Labios', link: 'products', payload: 'makeup' },
                ]
            },
            {
                title: 'Marcas',
                items: [
                    { name: 'Giordani Gold', link: 'products', payload: 'makeup' },
                    { name: 'The ONE', link: 'products', payload: 'makeup' },
                    { name: 'OnColour', link: 'products', payload: 'makeup' },
                ]
            }
        ]
    },
    'TRATAMIENTOS': {
        label: 'Cuidado Facial Avanzado',
        promoImage: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=6efc6ae1-0a1d-4df6-97f8-d785fa0c0476&name=5_Promo_split_Novage_600x450&inputFormat=jpg',
        promoText: 'Sistemas Novage+ Antiedad',
        sections: [
            {
                title: 'Sistemas Completos',
                items: [
                    { name: 'Rutina Antiarrugas', link: 'products', payload: 'skincare' },
                    { name: 'Rutina Lifting & Firmeza', link: 'products', payload: 'skincare' },
                    { name: 'Rutina Antimanchas', link: 'products', payload: 'skincare' },
                ]
            },
            {
                title: 'Potenciadores',
                items: [
                    { name: 'Novage+ Proceuticals', link: 'products', payload: 'skincare' },
                    { name: 'Serums Específicos', link: 'products', payload: 'skincare' },
                    { name: 'Tratamientos de Noche', link: 'products', payload: 'skincare' },
                ]
            },
            {
                title: 'Cuerpo y Bienestar',
                items: [
                    { name: 'Higiene Personal', link: 'products', payload: 'personal-care' },
                    { name: 'Duologi Capilar', link: 'products', payload: 'hair' },
                    { name: 'Wellness by Oriflame', link: 'products', payload: 'wellness' },
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
            {/* Top Bar */}
            <div className="bg-[#fce7f3] text-pink-800 py-2 px-4 text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-center uppercase border-b border-pink-100">
                DISTRIBUIDOR OFICIAL ORIFLAME | ENVÍO GRATIS +35€ 🌸
            </div>

            {/* Main Header Area */}
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="md:hidden p-2 text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                        <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 w-64 group focus-within:ring-2 focus-within:ring-pink-200 transition-all">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Buscar en Vellaperfumeria..." 
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full placeholder-gray-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-90 transition-opacity">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria Logo" 
                                className="h-14 md:h-24 w-auto" 
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
                        <button className="p-2 text-gray-700 hover:text-brand-primary transition-colors">
                            <UserIcon />
                        </button>
                        <button onClick={onCartClick} className="relative p-2 text-gray-700 hover:text-brand-primary transition-colors">
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pop">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar (FULL WIDTH BLACK) */}
            <nav className="hidden md:block bg-black w-full shadow-lg border-t border-gray-900">
                <div className="container mx-auto flex justify-center items-center">
                    <button 
                        onClick={() => onNavigate('home')} 
                        className="text-white text-[12px] font-bold tracking-[0.25em] uppercase hover:text-brand-primary transition-colors px-8 py-5 border-b-2 border-transparent hover:border-brand-primary"
                    >
                        Inicio
                    </button>
                    
                    {Object.keys(megaMenuData).map((key) => (
                        <button 
                            key={key}
                            onMouseEnter={() => setActiveMenu(key)}
                            className={`text-white text-[12px] font-bold tracking-[0.25em] uppercase hover:text-brand-primary transition-colors px-8 py-5 border-b-2 ${activeMenu === key ? 'border-brand-primary text-brand-primary' : 'border-transparent'}`}
                        >
                            {megaMenuData[key].label}
                        </button>
                    ))}
                    
                    <button onClick={() => onNavigate('ofertas')} className="text-pink-400 text-[12px] font-bold tracking-[0.25em] uppercase hover:text-pink-300 transition-colors px-8 py-5">
                        Ofertas 🔥
                    </button>
                    <button onClick={() => onNavigate('catalog')} className="text-white text-[12px] font-bold tracking-[0.25em] uppercase hover:text-brand-primary transition-colors px-8 py-5">
                        Catálogo 📖
                    </button>
                    <button onClick={() => onNavigate('ia')} className="text-white text-[12px] font-bold tracking-[0.25em] uppercase flex items-center gap-2 px-8 py-5 group">
                        <span className="text-brand-primary group-hover:animate-pulse">✨</span> Asistente IA
                    </button>
                </div>
            </nav>

            {/* Mega Menu Dropdown (FULL WIDTH BLACK - HIGH VISIBILITY) */}
            {activeMenu && megaMenuData[activeMenu] && (
                <div 
                    className="absolute top-full left-0 w-full bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-down origin-top border-t border-gray-800 z-50"
                    onMouseEnter={() => setActiveMenu(activeMenu)}
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    <div className="container mx-auto grid grid-cols-12 gap-12 py-14 px-8">
                        {/* Sections Column (8/12) */}
                        <div className="col-span-8 grid grid-cols-3 gap-12">
                            {megaMenuData[activeMenu].sections.map((section, idx) => (
                                <div key={idx} className="space-y-8">
                                    <h3 className="text-brand-primary font-serif text-xl italic font-bold tracking-wide border-b border-gray-900 pb-3">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {section.items.map((item, i) => (
                                            <li key={i}>
                                                <button 
                                                    onClick={() => {
                                                        onNavigate(item.link as View, item.payload);
                                                        setActiveMenu(null);
                                                    }}
                                                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all text-[12px] uppercase tracking-[0.2em] text-left block w-full"
                                                >
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Promo Area (4/12) */}
                        <div className="col-span-4 relative group cursor-pointer overflow-hidden rounded-2xl border border-gray-800 shadow-inner" onClick={() => onNavigate('products', 'all')}>
                            <img 
                                src={megaMenuData[activeMenu].promoImage} 
                                alt="Promoción Especial" 
                                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8">
                                <p className="text-pink-300 font-serif italic text-2xl mb-2 drop-shadow-md">{megaMenuData[activeMenu].promoText}</p>
                                <span className="text-white font-bold text-[11px] tracking-[0.3em] uppercase border-b-2 border-brand-primary pb-1 inline-block w-fit">
                                    VER PRODUCTOS
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Visual Bottom Accent */}
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
                </div>
            )}

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[120px] bg-black/95 backdrop-blur-lg text-white z-50 p-8 animate-fade-in flex flex-col gap-8 items-center text-center">
                    <nav className="flex flex-col gap-8 text-2xl font-serif tracking-widest uppercase">
                        <button onClick={() => {onNavigate('home'); setIsMobileMenuOpen(false)}} className="hover:text-pink-400">Inicio</button>
                        <button onClick={() => {onNavigate('products', 'all'); setIsMobileMenuOpen(false)}} className="hover:text-pink-400">Tienda Online</button>
                        <button onClick={() => {onNavigate('ofertas'); setIsMobileMenuOpen(false)}} className="text-pink-400">Ofertas 🔥</button>
                        <button onClick={() => {onNavigate('catalog'); setIsMobileMenuOpen(false)}} className="hover:text-pink-400">Catálogo 📖</button>
                        <button onClick={() => {onNavigate('ia'); setIsMobileMenuOpen(false)}} className="text-brand-primary italic">Asistente IA ✨</button>
                    </nav>
                </div>
            )}

            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;
