
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

// Types for Mega Menu
interface SubCategory {
    name: string;
    link: string;
}

interface MegaMenuCategory {
    id: string;
    label: string;
    subcategories: { title: string; items: SubCategory[] }[];
    image?: string;
}

// NavLink Component with Hover Support
const NavLink: React.FC<{ 
    onClick?: () => void, 
    href?: string, 
    children: React.ReactNode, 
    className?: string, 
    isDark?: boolean,
    onMouseEnter?: () => void,
}> = ({ onClick, href, children, className, isDark, onMouseEnter }) => {
    const baseClass = `text-sm font-medium transition-colors duration-200 ${className}`;
    const colorClass = isDark ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700";
    
    const content = <span className={!isDark ? "hover-underline-effect" : ""}>{children}</span>;

    if (href) {
        return (
            <a href={href} className={`${baseClass} ${colorClass}`} onMouseEnter={onMouseEnter}>
                {content}
            </a>
        );
    }
    return (
        <button onClick={onClick} className={`${baseClass} ${colorClass}`} onMouseEnter={onMouseEnter}>
            {content}
        </button>
    );
};

interface HeaderProps {
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [cartPulse, setCartPulse] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const megaMenuRef = useRef<HTMLDivElement>(null);

    // Mega Menu Data enriched with user inputs
    const megaMenuData: Record<string, MegaMenuCategory> = {
        'Tienda': {
            id: 'Tienda',
            label: 'Tienda',
            subcategories: [
                { title: 'Cuidado Facial', items: [{ name: 'Ver Todo', link: 'skincare' }, { name: 'Limpiadoras', link: 'skincare' }, { name: 'Serums', link: 'skincare' }, { name: 'Hidratantes', link: 'skincare' }] },
                { title: 'Maquillaje', items: [{ name: 'Ver Todo', link: 'makeup' }, { name: 'Rostro', link: 'makeup' }, { name: 'Ojos', link: 'makeup' }, { name: 'Labios', link: 'makeup' }] },
                { title: 'Cuerpo y Baño', items: [{ name: 'Ver Todo', link: 'personal-care' }, { name: 'Higiene', link: 'personal-care' }, { name: 'Hidratación', link: 'personal-care' }, { name: 'Cabello', link: 'hair' }] },
                { title: 'Fragancias', items: [{ name: 'Ver Todo', link: 'perfume' }, { name: 'Para Ella', link: 'perfume' }, { name: 'Para Él', link: 'perfume' }] },
            ],
            image: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=e6a950aa-3fef-457c-bcbf-1058993497d0&name=3_Promo_split_GiftSets_600x450&inputFormat=jpg'
        },
        'Cuidado Facial': {
            id: 'Cuidado Facial',
            label: 'Cuidado Facial',
            subcategories: [
                { title: 'Categorías', items: [
                    { name: 'Hidratantes', link: 'skincare' },
                    { name: 'Limpiadoras y Tónicos', link: 'skincare' },
                    { name: 'Cuidado de Ojos', link: 'skincare' },
                    { name: 'Serums y Tratamientos', link: 'skincare' },
                    { name: 'Mascarillas', link: 'skincare' },
                    { name: 'Protección Solar', link: 'skincare' },
                    { name: 'Herramientas y Accesorios', link: 'accessories' }
                ]},
                { title: 'Necesidades', items: [
                    { name: 'Antiedad', link: 'skincare' },
                    { name: 'Manchas e Hiperpigmentación', link: 'skincare' },
                    { name: 'Acné e Imperfecciones', link: 'skincare' },
                    { name: 'Piel Sensible', link: 'skincare' },
                    { name: 'Hidratación', link: 'skincare' },
                    { name: 'Rutinas', link: 'skincare' }
                ]},
                { title: 'Marcas Destacadas', items: [
                    { name: 'Novage+', link: 'skincare' },
                    { name: 'Optimals', link: 'skincare' },
                    { name: 'Love Nature', link: 'skincare' },
                    { name: 'Waunt', link: 'skincare' },
                    { name: 'Royal Velvet', link: 'skincare' }
                ]},
            ],
            image: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=6efc6ae1-0a1d-4df6-97f8-d785fa0c0476&name=5_Promo_split_Novage_600x450&inputFormat=jpg'
        },
        'Maquillaje': {
            id: 'Maquillaje',
            label: 'Maquillaje',
            subcategories: [
                { title: 'Rostro', items: [{ name: 'Bases de Maquillaje', link: 'makeup' }, { name: 'Correctores', link: 'makeup' }, { name: 'Polvos', link: 'makeup' }, { name: 'Coloretes', link: 'makeup' }, { name: 'Iluminadores', link: 'makeup' }] },
                { title: 'Ojos', items: [{ name: 'Máscaras de Pestañas', link: 'makeup' }, { name: 'Delineadores', link: 'makeup' }, { name: 'Sombras de Ojos', link: 'makeup' }, { name: 'Cejas', link: 'makeup' }] },
                { title: 'Labios', items: [{ name: 'Barras de Labios', link: 'makeup' }, { name: 'Brillos', link: 'makeup' }, { name: 'Perfiladores', link: 'makeup' }] },
                { title: 'Marcas', items: [{ name: 'Giordani Gold', link: 'makeup' }, { name: 'THE ONE', link: 'makeup' }, { name: 'OnColour', link: 'makeup' }] },
            ],
            image: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=179aab29-b41b-4e67-af6d-927cf4656de4&name=2_Promo_split_double_gifts&inputFormat=jpg'
        }
    };

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

    return (
        <header className="bg-white shadow-sm sticky top-0 z-30" onMouseLeave={() => setActiveMegaMenu(null)}>
            {/* Top Announcement Bar - Condensed */}
            <div className="text-black py-1 text-xs font-medium" style={{ backgroundColor: '#f78df685' }}>
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
                        {/* Right side spacer or user icon if needed */}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Logo Section */}
                <div className="flex justify-center py-1 relative">
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

                {/* Navbar */}
                <div className="flex justify-between items-center pb-2 border-t border-gray-100 pt-1">
                    <div className="flex-1 hidden md:flex items-center space-x-4">
                        <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="text-xs font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
                            aria-label="Seleccionar moneda"
                        >
                            <option value="EUR">EUR €</option>
                            <option value="USD">USD $</option>
                            <option value="GBP">GBP £</option>
                        </select>
                         <button onClick={() => onNavigate('contact')} className="text-xs font-medium text-gray-600 hover:text-black transition-colors">
                            Conviértete en Brand Partner
                        </button>
                    </div>

                    <nav className="hidden md:flex flex-auto justify-center items-center space-x-5 h-full">
                        <NavLink href="https://vellaperfumeria.com" onMouseEnter={() => setActiveMegaMenu(null)}>Inicio</NavLink>
                        
                        <div className="h-full flex items-center" onMouseEnter={() => setActiveMegaMenu('Tienda')}>
                            <NavLink onClick={() => onNavigate('products', 'all')} className="h-full flex items-center">Tienda</NavLink>
                        </div>
                        <div className="h-full flex items-center" onMouseEnter={() => setActiveMegaMenu('Cuidado Facial')}>
                            <NavLink onClick={() => onNavigate('products', 'skincare')} className="h-full flex items-center">Cuidado Facial</NavLink>
                        </div>
                        <div className="h-full flex items-center" onMouseEnter={() => setActiveMegaMenu('Maquillaje')}>
                            <NavLink onClick={() => onNavigate('products', 'makeup')} className="h-full flex items-center">Maquillaje</NavLink>
                        </div>
                        
                        <NavLink onClick={() => onNavigate('products', 'hair')} onMouseEnter={() => setActiveMegaMenu(null)}>Cuidado Capilar</NavLink>
                        <NavLink onClick={() => onNavigate('products', 'perfume')} onMouseEnter={() => setActiveMegaMenu(null)}>Fragancias</NavLink>
                        <NavLink onClick={() => onNavigate('products', 'wellness')} onMouseEnter={() => setActiveMegaMenu(null)}>Wellness</NavLink>
                        <NavLink onClick={() => onNavigate('ofertas')} onMouseEnter={() => setActiveMegaMenu(null)}>Ideas Regalo</NavLink>
                        <NavLink onClick={() => onNavigate('catalog')} onMouseEnter={() => setActiveMegaMenu(null)}>Catálogo</NavLink>
                        <NavLink onClick={() => onNavigate('ia')} onMouseEnter={() => setActiveMegaMenu(null)}>Asistente IA</NavLink>
                    </nav>

                    <div className="flex-1 flex justify-end items-center space-x-4">
                        <button className="text-black hover:text-gray-700" aria-label="Buscar">
                            <SearchIcon />
                        </button>
                        <button onClick={onCartClick} className="relative text-black hover:text-gray-700" aria-label={`Ver carrito, ${cartCount} artículos`}>
                            <CartIcon />
                            {cartCount > 0 && (
                                <span key={cartCount} className={`absolute -top-2 -right-2 bg-brand-purple text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${cartPulse ? 'animate-pop' : ''}`}>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Abrir menú">
                                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mega Menu Dropdown (Full Width, Black Background) */}
            {activeMegaMenu && megaMenuData[activeMegaMenu] && (
                <div 
                    ref={megaMenuRef}
                    className="absolute top-full left-0 w-full bg-black text-white shadow-2xl z-40 animate-fade-in-down origin-top border-t border-gray-800"
                    onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                >
                    <div className="container mx-auto px-8 py-10">
                        <div className="grid grid-cols-4 gap-8">
                            {megaMenuData[activeMegaMenu].subcategories.map((sub, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-pink-400 font-bold uppercase tracking-widest text-sm border-b border-gray-700 pb-2">{sub.title}</h3>
                                    <ul className="space-y-2">
                                        {sub.items.map((item, i) => (
                                            <li key={i}>
                                                <button 
                                                    onClick={() => {
                                                        onNavigate('products', item.link);
                                                        setActiveMegaMenu(null);
                                                    }}
                                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm text-left"
                                                >
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {/* Promotional Image in Menu */}
                            {megaMenuData[activeMegaMenu].image && (
                                <div className="col-span-1 relative overflow-hidden rounded-lg group cursor-pointer" onClick={() => {
                                    onNavigate('products', 'all');
                                    setActiveMegaMenu(null);
                                }}>
                                    <img 
                                        src={megaMenuData[activeMegaMenu].image} 
                                        alt="Promoción" 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="bg-white/10 backdrop-blur-md px-4 py-2 text-white font-bold uppercase tracking-wider border border-white/30 hover:bg-white/20 transition-colors">
                                            Ver Todo
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu - Black Background, Full Width */}
            {isMobileMenuOpen && (
                 <div ref={navRef} className="absolute top-full left-0 w-full bg-black text-white shadow-xl z-50 animate-fade-in-down origin-top">
                     <div className="p-3 text-center bg-gray-900 font-bold text-xs uppercase tracking-widest text-pink-300">
                        <button onClick={() => handleMobileNav('ofertas')} className="w-full h-full block">
                            Catálogo 17 | Especial Navidad
                        </button>
                     </div>
                     <nav className="flex flex-col p-6 space-y-4">
                         <NavLink isDark onClick={() => handleMobileNav('home')} className="text-lg border-b border-gray-800 pb-2">Inicio</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('products', 'all')} className="text-lg border-b border-gray-800 pb-2">Tienda</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('ofertas')} className="text-lg font-bold text-pink-300 border-b border-gray-800 pb-2">Solo las mejores ofertas</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('products', 'skincare')} className="text-lg border-b border-gray-800 pb-2">Cuidado Facial</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('products', 'makeup')} className="text-lg border-b border-gray-800 pb-2">Maquillaje</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('products', 'perfume')} className="text-lg border-b border-gray-800 pb-2">Fragancias</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('products', 'wellness')} className="text-lg border-b border-gray-800 pb-2">Wellness</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('catalog')} className="text-lg border-b border-gray-800 pb-2">Catálogo Digital</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('ia')} className="text-lg border-b border-gray-800 pb-2">Asistente IA</NavLink>
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
            `}</style>
        </header>
    );
};

export default Header;
