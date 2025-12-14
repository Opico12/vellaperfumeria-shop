
import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

// --- ICONS ---

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
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
      <path d="M6.434 9H4.5a1.5 1.5 0 0 0-1.486 1.703l1.227 9A1.5 1.5 0 0 0 5.728 21h12.254a1.5 1.5 0 0 0 1.486-1.297l1.227-9A1.5 1.5 0 0 0 19.21 9h-1.933c-.087-2.548-.848-4.078-1.933-4.96C14.208 3.118 12.826 3 11.855 3c-.975 0-2.355.126-3.49 1.051C7.282 4.936 6.521 6.464 6.434 9m1 0c.086-2.329.778-3.533 1.564-4.174.858-.7 1.942-.826 2.857-.826.917 0 2 .12 2.857.817.785.637 1.477 1.84 1.563 4.183zm8.868 1 .053 1.448a.5.5 0 0 0 1-.018c0-.528-.013-.987-.037-1.43h1.891a.5.5 0 0 1 .495.568l-1.227 9a.5.5 0 0 1-.495.432H5.728a.5.5 0 0 1-.496-.432l-1.227-9A.5.5 0 0 1 4.5 10h1.905q-.001.372.01.756.009.333.01.674a.5.5 0 1 0 1 0c0-.285-.006-.535-.012-.766-.005-.236-.01-.452-.008-.664z"></path>
    </svg>
);

const SearchIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M14.874 15.582a6 6 0 1 1 .707-.707l3.273 3.271a.5.5 0 0 1-.708.708zM16 11a5 5 0 1 0-10 0 5 5 0 0 0 10 0"></path>
    </svg>
);

const UserIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const HeartIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="m12 20.5-.243.437-.002-.001-.006-.003-.021-.012-.08-.046-.293-.173a29 29 0 0 1-4.187-3.078C4.906 15.613 2.5 12.734 2.5 9.5c0-1.6.468-2.875 1.242-3.796A4.67 4.67 0 0 1 6.68 4.092c1.947-.28 4.088.582 5.321 2.528 1.233-1.946 3.374-2.809 5.321-2.528a4.67 4.67 0 0 1 2.937 1.612C21.032 6.624 21.5 7.9 21.5 9.5c0 3.233-2.406 6.113-4.668 8.124a29 29 0 0 1-4.531 3.28l-.029.017-.02.012-.007.003h-.001s-.001.001-.244-.436M4.508 6.348C3.907 7.063 3.5 8.1 3.5 9.5c0 2.767 2.094 5.387 4.332 7.376A28 28 0 0 0 12 19.922l.129-.077a28 28 0 0 0 4.04-2.97C18.406 14.887 20.5 12.267 20.5 9.5c0-1.4-.407-2.437-1.008-3.152a3.67 3.67 0 0 0-2.313-1.266c-1.781-.257-3.81.675-4.719 2.808L12 8.97l-.46-1.08c-.909-2.133-2.938-3.065-4.719-2.808a3.67 3.67 0 0 0-2.313 1.266M12 20.5l.244.437a.5.5 0 0 1-.487 0z"></path>
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
    // Clean sans-serif font for the main menu, uppercase, wide tracking
    const baseClass = isDark 
        ? `font-serif tracking-widest text-lg font-bold transition-all duration-300 cursor-pointer uppercase py-2 ${className}`
        : `font-sans tracking-[0.15em] text-[11px] font-bold transition-all duration-300 cursor-pointer uppercase py-4 border-b-2 border-transparent ${className}`;
    
    const colorClass = isDark ? "text-white hover:text-pink-300" : "text-gray-900 hover:text-brand-primary hover:border-brand-primary";
    
    if (href) {
        return (
            <a href={href} className={`${baseClass} ${colorClass}`} onMouseEnter={onMouseEnter}>
                {children}
            </a>
        );
    }
    return (
        <button onClick={onClick} className={`${baseClass} ${colorClass}`} onMouseEnter={onMouseEnter}>
            {children}
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
        },
         'Fragancias': {
            id: 'Fragancias',
            label: 'Fragancias',
            subcategories: [
                { title: 'Mujer', items: [{ name: 'Eau de Parfum', link: 'perfume' }, { name: 'Eau de Toilette', link: 'perfume' }, { name: 'Body Mists', link: 'perfume' }] },
                { title: 'Hombre', items: [{ name: 'Eau de Parfum', link: 'men' }, { name: 'Eau de Toilette', link: 'men' }] },
                { title: 'Colecciones', items: [{ name: 'Giordani Gold', link: 'perfume' }, { name: 'Divine', link: 'perfume' }, { name: 'Eclat', link: 'perfume' }, { name: 'Love Potion', link: 'perfume' }] },
            ],
            image: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=4139a5ab-c1f8-4d1f-86c8-e233f9fbc430&name=FRA_320x450&inputFormat=jpg'
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
        <header className="sticky top-0 z-30 font-sans" onMouseLeave={() => setActiveMegaMenu(null)}>
            {/* Background Layer - Pure White */}
            <div className="absolute inset-0 bg-white shadow-sm pointer-events-none"></div>

            {/* Top Announcement Bar - Specific Pink Transparent Color requested */}
            <div className="relative z-40 bg-[#eb8dd08f] text-white py-1.5 text-[11px] font-semibold tracking-wider border-b border-white/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-3 text-white">
                        <span className="cursor-pointer hover:text-pink-200 transition-colors" aria-label="Threads"><ThreadsIcon /></span>
                        <span className="cursor-pointer hover:text-pink-200 transition-colors" aria-label="Instagram"><InstagramIcon /></span>
                        <span className="cursor-pointer hover:text-pink-200 transition-colors" aria-label="Facebook"><FacebookIcon /></span>
                        <span className="cursor-pointer hover:text-pink-200 transition-colors" aria-label="WhatsApp"><WhatsAppIcon /></span>
                    </div>
                    <button onClick={() => onNavigate('ofertas')} className="hidden md:block text-center hover:underline truncate px-2 font-medium">
                        <span>
                            ENVÍO <span className="font-bold">GRATIS</span> EN PEDIDOS +35€ | ESPECIAL NAVIDAD
                        </span>
                    </button>
                    <div className="flex items-center space-x-4">
                        <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="text-[10px] font-bold bg-transparent border-none focus:ring-0 cursor-pointer text-white uppercase tracking-widest"
                            aria-label="Seleccionar moneda"
                        >
                            <option value="EUR" className="text-gray-900">EUR</option>
                            <option value="USD" className="text-gray-900">USD</option>
                            <option value="GBP" className="text-gray-900">GBP</option>
                        </select>
                         <button onClick={() => onNavigate('contact')} className="hidden sm:block text-[10px] font-bold text-white hover:text-pink-200 transition-colors uppercase tracking-widest">
                            BRAND PARTNER
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Header Content */}
            <div className="relative z-40 container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Logo & Actions Row */}
                <div className="flex justify-between items-center py-4 md:py-6 gap-6">
                    {/* Left: Search Bar (Desktop) & Menu (Mobile) */}
                    <div className="flex-1 flex items-center justify-start">
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Abrir menú" className="p-2 -ml-2 text-gray-800">
                                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                        <div className="hidden md:block w-full max-w-xs relative group">
                            <input 
                                type="text" 
                                placeholder="Buscar..." 
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-9 pr-4 text-xs focus:border-brand-primary focus:outline-none focus:bg-white transition-all placeholder-gray-400 text-gray-900"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex-shrink-0 flex justify-center">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-opacity flex flex-col items-center">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className="h-20 md:h-28 w-auto" 
                            />
                        </button>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-1 flex items-center justify-end space-x-2 md:space-x-4">
                        <button className="hidden md:flex flex-col items-center justify-center text-gray-800 hover:text-brand-primary transition-colors group p-2">
                             <UserIcon />
                        </button>
                        
                        <button className="hidden md:flex flex-col items-center justify-center text-gray-800 hover:text-brand-primary transition-colors group p-2">
                            <HeartIcon />
                        </button>

                        <button onClick={onCartClick} className="relative flex flex-col items-center justify-center text-gray-800 hover:text-brand-primary transition-colors group p-2" aria-label={`Ver carrito, ${cartCount} artículos`}>
                            <div className="relative">
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span key={cartCount} className={`absolute -top-1.5 -right-1.5 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${cartPulse ? 'animate-bounce' : ''}`}>
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Navigation Row - Desktop Only - Clean Sans Serif */}
                <div className="hidden md:block">
                    <nav className="flex justify-center items-center space-x-8">
                        <NavLink href="https://vellaperfumeria.com">Inicio</NavLink>
                        <NavLink onClick={() => { onNavigate('products', 'all'); setActiveMegaMenu(null); }} onMouseEnter={() => setActiveMegaMenu('Tienda')}>Tienda</NavLink>
                        <NavLink onClick={() => { onNavigate('ofertas'); setActiveMegaMenu(null); }} className="text-pink-600 font-bold hover:text-pink-700">Ofertas</NavLink>
                        <NavLink onClick={() => { onNavigate('products', 'skincare'); setActiveMegaMenu(null); }} onMouseEnter={() => setActiveMegaMenu('Cuidado Facial')}>Cuidado Facial</NavLink>
                        <NavLink onClick={() => { onNavigate('products', 'makeup'); setActiveMegaMenu(null); }} onMouseEnter={() => setActiveMegaMenu('Maquillaje')}>Maquillaje</NavLink>
                        <NavLink onClick={() => { onNavigate('products', 'perfume'); setActiveMegaMenu(null); }} onMouseEnter={() => setActiveMegaMenu('Fragancias')}>Fragancias</NavLink>
                        <NavLink onClick={() => { onNavigate('products', 'wellness'); setActiveMegaMenu(null); }} onMouseEnter={() => setActiveMegaMenu(null)}>Wellness</NavLink>
                        <NavLink onClick={() => { onNavigate('products', 'hair'); setActiveMegaMenu(null); }} onMouseEnter={() => setActiveMegaMenu(null)}>Cabello</NavLink>
                        <NavLink onClick={() => { onNavigate('products', 'men'); setActiveMegaMenu(null); }} onMouseEnter={() => setActiveMegaMenu(null)}>Hombre</NavLink>
                        <NavLink onClick={() => { onNavigate('catalog'); setActiveMegaMenu(null); }} className="text-gray-900">Catálogo</NavLink>
                        <NavLink onClick={() => { onNavigate('ia'); setActiveMegaMenu(null); }} className="text-brand-primary">Asistente IA</NavLink>
                    </nav>
                </div>
            </div>

            {/* Mega Menu Dropdown (Full Width, Black Background as requested) */}
            {activeMegaMenu && megaMenuData[activeMegaMenu] && (
                <div 
                    ref={megaMenuRef}
                    className="absolute top-full left-0 w-full bg-black text-white shadow-2xl z-40 animate-fade-in-down origin-top border-t border-gray-800"
                    onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                >
                    <div className="container mx-auto px-8 py-12">
                        <div className="grid grid-cols-12 gap-12">
                            {/* Categories Columns */}
                            <div className="col-span-9 grid grid-cols-3 gap-10">
                                {megaMenuData[activeMegaMenu].subcategories.map((sub, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <h3 className="text-pink-300 font-serif font-bold text-xl italic border-b border-gray-800 pb-3">{sub.title}</h3>
                                        <ul className="space-y-3">
                                            {sub.items.map((item, i) => (
                                                <li key={i}>
                                                    <button 
                                                        onClick={() => {
                                                            onNavigate('products', item.link);
                                                            setActiveMegaMenu(null);
                                                        }}
                                                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm text-left block w-full tracking-wide uppercase font-light"
                                                    >
                                                        {item.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Promotional Image Column */}
                            {megaMenuData[activeMegaMenu].image && (
                                <div className="col-span-3 relative overflow-hidden rounded-sm group cursor-pointer h-72 border border-gray-800" onClick={() => {
                                    onNavigate('products', 'all');
                                    setActiveMegaMenu(null);
                                }}>
                                    <img 
                                        src={megaMenuData[activeMegaMenu].image} 
                                        alt="Promoción" 
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                                        <p className="text-pink-200 font-serif text-lg italic mb-1">Descubre más</p>
                                        <span className="text-white font-bold uppercase tracking-widest text-sm border-b-2 border-pink-500 pb-1 inline-block">
                                            Ver Colección
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
                 <div ref={navRef} className="absolute top-full left-0 w-full bg-gray-950 text-white shadow-xl z-50 animate-fade-in-down origin-top h-[calc(100vh-140px)] overflow-y-auto">
                     <div className="p-6 border-b border-gray-800">
                        <div className="relative w-full">
                            <input 
                                type="text" 
                                placeholder="Buscar en Vellaperfumeria..." 
                                className="w-full bg-gray-900 border-none border-b border-gray-700 rounded-none py-3 pl-10 pr-4 text-base text-white focus:border-pink-500 focus:ring-0 font-serif italic"
                            />
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <SearchIcon />
                            </div>
                        </div>
                     </div>
                     <nav className="flex flex-col p-8 space-y-6">
                         <NavLink isDark href="https://vellaperfumeria.com" className="text-xl">Inicio</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('ofertas')} className="text-xl text-pink-400">Ofertas Especiales</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('products', 'all')} className="text-xl">Tienda</NavLink>
                         <div className="pl-6 space-y-4 border-l border-gray-800 flex flex-col my-2">
                            <NavLink isDark onClick={() => handleMobileNav('products', 'skincare')} className="text-lg text-gray-400 font-normal">Cuidado Facial</NavLink>
                            <NavLink isDark onClick={() => handleMobileNav('products', 'makeup')} className="text-lg text-gray-400 font-normal">Maquillaje</NavLink>
                            <NavLink isDark onClick={() => handleMobileNav('products', 'perfume')} className="text-lg text-gray-400 font-normal">Fragancias</NavLink>
                            <NavLink isDark onClick={() => handleMobileNav('products', 'wellness')} className="text-lg text-gray-400 font-normal">Wellness</NavLink>
                         </div>
                         <NavLink isDark onClick={() => handleMobileNav('catalog')} className="text-xl">Catálogo Digital</NavLink>
                         <NavLink isDark onClick={() => handleMobileNav('ia')} className="text-xl text-pink-300">Asistente IA</NavLink>
                     </nav>
                </div>
            )}
            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.2s ease-out forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;
