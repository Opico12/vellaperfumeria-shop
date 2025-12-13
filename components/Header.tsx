
import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

// Social Icons
const ThreadsIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.01 3.51c-1.35 0-2.45 1.1-2.45 2.45v.38c0 .28.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-.38c0-.69.56-1.25 1.25-1.25h.19c.69 0 1.25.56 1.25 1.25v2.87c0 1.35-1.1 2.45-2.45 2.45h-.87c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5h.87c2.21 0 4-1.79 4-4V5.96c0-1.35-1.1-2.45-2.45-2.45h-2.12zm-3.09 3.1h-1.5c-.28 0-.5.22-.5.5v.38c0 1.35 1.1 2.45 2.45 2.45h.19c.69 0 1.25-.56 1.25-1.25V5.96c0-1.35-1.1-2.45-2.45-2.45H3.01c-1.35 0-2.45 1.1-2.45 2.45v2.12c0 2.21 1.79 4 4 4h.87c.28 0 .5-.22.5-.5v-1.5c0-.28-.22-.5-.5-.5h-.87c-.69 0-1.25-.56-1.25-1.25v-.38c0-.28-.22-.5-.5-.5z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SearchIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface HeaderProps {
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

// Estructura de navegación mejorada
interface NavItem {
    label: string;
    view?: View;
    payload?: any;
    href?: string;
    subItems?: NavItem[];
    // Propiedades para Mega Menú Visual
    isPromoMenu?: boolean;
    promoItems?: PromoItem[];
}

interface PromoItem {
    title: string;
    subtitle: string;
    image: string;
    view: View;
    payload?: any;
    badge?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [cartPulse, setCartPulse] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const navigationStructure: NavItem[] = [
        { label: 'Inicio', href: 'https://vellaperfumeria.com' },
        {
            label: 'Ofertas',
            isPromoMenu: true,
            promoItems: [
                {
                    title: 'Novage+ -40%',
                    subtitle: 'Rejuvenece tu mirada',
                    image: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=6efc6ae1-0a1d-4df6-97f8-d785fa0c0476&name=5_Promo_split_Novage_600x450&inputFormat=jpg',
                    view: 'products',
                    payload: 'skincare',
                    badge: '-40%'
                },
                {
                    title: 'Duologi 6,99€',
                    subtitle: 'Cuidado capilar experto',
                    image: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=df88458d-0b4f-4f26-80a4-bc41f7aade2b&name=6_Promo_split_Duologi_600x450&inputFormat=jpg',
                    view: 'ofertas',
                    badge: 'OFERTA'
                },
                {
                    title: 'Ideas Regalo',
                    subtitle: 'Sets exclusivos',
                    image: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=10eada9f-b5ef-4854-911a-34f17f58b371&name=2_Promo_split_NewCollection_600x450&inputFormat=jpg',
                    view: 'catalog',
                    badge: 'NAVIDAD'
                }
            ]
        },
        { 
            label: 'Tienda', 
            subItems: [
                { label: 'Ver Todo', view: 'products', payload: 'all' },
                { label: 'Cuidado Facial', view: 'products', payload: 'skincare' },
                { label: 'Maquillaje', view: 'products', payload: 'makeup' },
                { label: 'Fragancias', view: 'products', payload: 'perfume' },
                { label: 'Cuidado Capilar', view: 'products', payload: 'hair' },
                { label: 'Wellness', view: 'products', payload: 'wellness' },
                { label: 'Cuidado Personal', view: 'products', payload: 'personal-care' },
                { label: 'Hombre', view: 'products', payload: 'men' },
                { label: 'Accesorios', view: 'products', payload: 'accessories' },
            ]
        },
        {
            label: 'Descubrir',
            subItems: [
                { label: 'Catálogo Actual (C17)', view: 'catalog' },
                { label: 'Bestsellers', view: 'products', payload: 'all' },
                { label: 'Suscríbete y Ahorra', view: 'products', payload: 'wellness' },
                { label: 'Blog', view: 'blog' },
            ]
        },
        { label: 'Asistente IA', view: 'ia' }
    ];

    useEffect(() => {
        if (cartCount > 0) {
            setCartPulse(true);
            const timer = setTimeout(() => setCartPulse(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMobileNav = (view: View, payload?: any) => {
        onNavigate(view, payload);
        setIsMobileMenuOpen(false);
    }

    const handleNavClick = (item: NavItem) => {
        if (item.href) {
            window.location.href = item.href;
        } else if (item.view) {
            onNavigate(item.view, item.payload);
        }
        setActiveDropdown(null);
    };

    return (
        <header className="flex flex-col shadow-sm sticky top-0 z-30">
            {/* 1. Top Announcement Bar - Pink */}
            <div className="text-black py-1 text-xs font-medium w-full" style={{ backgroundColor: '#f78df685' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="cursor-pointer hover:opacity-75 transition-opacity text-black" aria-label="Threads"><ThreadsIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity text-black" aria-label="Instagram"><InstagramIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity text-black" aria-label="Facebook"><FacebookIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity text-black" aria-label="WhatsApp"><WhatsAppIcon /></span>
                    </div>
                    <button onClick={() => onNavigate('ofertas')} className="hidden md:block text-center text-black hover:underline truncate px-2">
                        <span>
                            <span className="font-bold">CATÁLOGO 17</span> | ESPECIAL NAVIDAD | Envío GRATIS +35€
                        </span>
                    </button>
                    <div className="flex items-center space-x-4">
                        {/* Right side spacer */}
                    </div>
                </div>
            </div>

            {/* 2. Logo Area - White */}
            <div className="bg-white w-full border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center py-2 relative">
                    <form action="https://vellaperfumeria.com" method="GET" target="_top">
                        <button type="submit" className="hover:opacity-80 transition-opacity flex items-center">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria Logo" 
                                className="h-16 md:h-20 w-auto" 
                            />
                        </button>
                    </form>
                </div>
            </div>

            {/* 3. Navigation Menu - Black - Full Width Mega Menu Capable */}
            <div className="bg-black text-white w-full relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
                    
                    {/* Left: Currency & Contact */}
                    <div className="flex-1 hidden md:flex items-center space-x-4">
                        <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="text-xs font-medium bg-transparent border-none focus:ring-0 cursor-pointer text-white hover:text-gray-300 transition-colors"
                            aria-label="Seleccionar moneda"
                        >
                            <option value="EUR" className="text-black">EUR €</option>
                            <option value="USD" className="text-black">USD $</option>
                            <option value="GBP" className="text-black">GBP £</option>
                        </select>
                         <button onClick={() => onNavigate('contact')} className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
                            Brand Partner
                        </button>
                    </div>

                    {/* Center: Desktop Navigation with Mega Menu */}
                    <nav className="hidden md:flex flex-auto justify-center items-center h-full">
                        <ul className="flex space-x-8 h-full">
                            {navigationStructure.map((item) => (
                                <li 
                                    key={item.label}
                                    className="relative h-full flex items-center group"
                                    onMouseEnter={() => setActiveDropdown(item.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button
                                        onClick={() => handleNavClick(item)}
                                        className={`text-sm font-medium transition-colors duration-200 uppercase tracking-wide px-2 py-1 ${activeDropdown === item.label ? 'text-[#ec4899]' : 'text-white hover:text-gray-300'}`}
                                    >
                                        {item.label}
                                    </button>

                                    {/* Full Width Dropdown */}
                                    {((item.subItems || item.isPromoMenu) && activeDropdown === item.label) && (
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen bg-black text-white shadow-2xl z-50 border-t border-gray-800 animate-fade-in-down origin-top" style={{ marginTop: '0px' }}>
                                            <div className="container mx-auto px-4 py-8">
                                                
                                                {/* Visual Promo Menu */}
                                                {item.isPromoMenu && item.promoItems ? (
                                                    <div className="grid grid-cols-3 gap-8">
                                                        {item.promoItems.map((promo, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="relative group/promo cursor-pointer overflow-hidden rounded-lg border border-gray-800"
                                                                onClick={() => onNavigate(promo.view, promo.payload)}
                                                            >
                                                                <div className="aspect-[16/9] w-full relative">
                                                                    <img src={promo.image} alt={promo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-110" />
                                                                    <div className="absolute inset-0 bg-black/40 group-hover/promo:bg-black/20 transition-colors"></div>
                                                                    {promo.badge && (
                                                                        <span className="absolute top-2 left-2 bg-[#ec4899] text-white text-xs font-bold px-2 py-1 uppercase tracking-widest shadow-md">
                                                                            {promo.badge}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                                                                    <h4 className="text-xl font-bold text-white mb-1 group-hover/promo:text-[#ec4899] transition-colors">{promo.title}</h4>
                                                                    <p className="text-sm text-gray-300">{promo.subtitle}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    /* Standard List Menu */
                                                    <div className="grid grid-cols-4 gap-y-6 gap-x-8">
                                                        {item.subItems?.map((sub) => (
                                                            <button 
                                                                key={sub.label}
                                                                onClick={() => handleNavClick(sub)}
                                                                className="text-left text-gray-300 hover:text-[#ec4899] transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform flex items-center group"
                                                            >
                                                                <span className="w-1.5 h-1.5 bg-[#ec4899] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                                {sub.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right: Icons */}
                    <div className="flex-1 flex justify-end items-center space-x-4">
                        <button className="text-white hover:text-gray-300 transition-colors" aria-label="Buscar">
                            <SearchIcon />
                        </button>
                        <button onClick={onCartClick} className="relative text-white hover:text-gray-300 transition-colors" aria-label={`Ver carrito, ${cartCount} artículos`}>
                            <CartIcon />
                            {cartCount > 0 && (
                                <span key={cartCount} className={`absolute -top-2 -right-2 bg-[#ec4899] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${cartPulse ? 'animate-pop' : ''}`}>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Abrir menú" className="text-white hover:text-gray-300">
                                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Black Background */}
            {isMobileMenuOpen && (
                 <div ref={navRef} className="absolute top-full left-0 w-full bg-black text-white shadow-xl z-50 animate-fade-in-down origin-top border-t border-gray-800 max-h-[80vh] overflow-y-auto">
                     <div className="p-3 text-center bg-gray-900 font-bold text-xs uppercase tracking-widest text-pink-300 border-b border-gray-800">
                        <button onClick={() => handleMobileNav('ofertas')} className="w-full h-full block">
                            Catálogo 17 | Especial Navidad
                        </button>
                     </div>
                     <nav className="flex flex-col p-6 space-y-2">
                        {navigationStructure.map((item) => (
                            <div key={item.label} className="border-b border-gray-800 pb-2">
                                <button 
                                    onClick={() => {
                                        if (item.isPromoMenu) return; // In mobile, maybe expand? For now just simple toggle or link
                                        if (!item.subItems && !item.isPromoMenu) handleNavClick(item);
                                    }}
                                    className="text-lg font-bold text-white w-full text-left py-2 flex justify-between items-center"
                                >
                                    {item.label}
                                </button>
                                
                                {item.isPromoMenu && item.promoItems && (
                                    <div className="pl-4 space-y-3 mt-2 mb-2">
                                        {item.promoItems.map((promo, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleMobileNav(promo.view, promo.payload)}
                                                className="block w-full text-left group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img src={promo.image} alt={promo.title} className="w-12 h-8 object-cover rounded" />
                                                    <div>
                                                        <p className="text-sm font-bold text-pink-300 group-hover:text-white transition-colors">{promo.title}</p>
                                                        <p className="text-xs text-gray-500">{promo.subtitle}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {item.subItems && (
                                    <div className="pl-4 space-y-2 mt-1 mb-2">
                                        {item.subItems.map(sub => (
                                            <button 
                                                key={sub.label}
                                                onClick={() => handleNavClick(sub)}
                                                className="block text-sm text-gray-400 hover:text-pink-300 py-1 w-full text-left"
                                            >
                                                {sub.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                     </nav>
                     <div className="p-6 bg-gray-900 flex flex-col space-y-4">
                        <button onClick={() => { handleMobileNav('contact'); }} className="text-sm font-medium text-gray-400 hover:text-white transition-colors text-left">
                            Conviértete en Brand Partner
                        </button>
                        <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="text-sm font-medium bg-black border border-gray-700 text-white rounded p-2 focus:ring-pink-500 w-full"
                            aria-label="Seleccionar moneda"
                        >
                            <option value="EUR">EUR €</option>
                            <option value="USD">USD $</option>
                            <option value="GBP">GBP £</option>
                        </select>
                     </div>
                </div>
            )}
            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: scaleY(0); }
                    to { opacity: 1; transform: scaleY(1); }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.2s ease-out forwards;
                }
                /* Ensure full width dropdown works even inside container */
                .w-screen {
                    width: 100vw;
                }
            `}</style>
        </header>
    );
};

export default Header;
