
import React, { useState, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

const CartIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const Header: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, cartCount, onCartClick }) => {
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuData = [
        { id: 'skincare', label: 'Cuidado Facial', items: ['Royal Velvet', 'Novage+', 'Crema Universal', 'Optimals'] },
        { id: 'makeup', label: 'Maquillaje', items: ['Labiales THE ONE', 'Máscaras', 'Paletas Sombras', 'Accesorios'] },
        { id: 'perfume', label: 'Fragancias', items: ['All or Nothing', 'Love Potion', 'Elvie', 'Sets Regalo'] },
        { id: 'accessories', label: 'Regalos', items: ['Joyas', 'Bolsas Festivas', 'Cajas Premium', 'Espátulas'] }
    ];

    return (
        <header 
            className={`w-full z-[100] transition-all duration-300 bg-white ${isScrolled ? 'fixed top-0 shadow-md' : 'relative'}`}
            onMouseLeave={() => setShowMegaMenu(false)}
        >
            {/* Promo Bar */}
            <div className="bg-brand-primary text-white py-2 text-[10px] font-black uppercase tracking-[0.3em] text-center">
                VALENTINA Y JAN COMPARTEN ACTOS DE AMOR • ENVÍOS GRATIS +35€ 🌸
            </div>

            {/* Main Header Container */}
            <div className="w-full px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-50">
                <div className="w-1/3 md:flex hidden">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">Buscar</button>
                </div>

                <div className="w-1/3 flex justify-center">
                    <button onClick={() => onNavigate('home')}>
                        <img 
                            src="https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png" 
                            alt="Logo" 
                            className={`${isScrolled ? 'h-10' : 'h-24'} transition-all duration-500`}
                        />
                    </button>
                </div>

                <div className="w-1/3 flex justify-end gap-6 items-center">
                    <button onClick={onCartClick} className="relative text-gray-700 hover:text-brand-primary">
                        <CartIcon />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Full Width Navbar */}
            <nav className="w-full bg-white hidden md:block">
                <ul className="flex justify-center items-center">
                    <li><button onClick={() => onNavigate('home')} className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:text-brand-primary transition-colors">Inicio</button></li>
                    <li onMouseEnter={() => setShowMegaMenu(true)}>
                        <button className={`px-8 py-4 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${showMegaMenu ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary'}`}>
                            Productos <span>▼</span>
                        </button>
                    </li>
                    <li><button onClick={() => onNavigate('ofertas')} className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-brand-primary hover:text-black">Ofertas</button></li>
                    <li><button onClick={() => onNavigate('ia')} className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-600">IA Beauty</button></li>
                </ul>
            </nav>

            {/* Black Mega Menu Dropdown */}
            {showMegaMenu && (
                <div 
                    className="absolute top-full left-0 w-full bg-[#0a0a0a] text-white shadow-2xl z-[110] border-t border-white/5 animate-fade-in"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                >
                    <div className="max-w-7xl mx-auto px-12 py-16 grid grid-cols-4 gap-12">
                        {menuData.map(cat => (
                            <div key={cat.id} className="space-y-6">
                                <h3 className="text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] pb-3 border-b border-white/10">
                                    {cat.label}
                                </h3>
                                <ul className="space-y-4">
                                    {cat.items.map(item => (
                                        <li key={item}>
                                            <button 
                                                onClick={() => { onNavigate('products', cat.id); setShowMegaMenu(false); }}
                                                className="text-xs text-gray-400 hover:text-white transition-all block text-left"
                                            >
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-[#111] py-4 text-center border-t border-white/5">
                        <button onClick={() => onNavigate('products', 'all')} className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary hover:text-white transition-colors">
                            Ver todo el universo Vellaperfumeria →
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>
        </header>
    );
};

export default Header;
