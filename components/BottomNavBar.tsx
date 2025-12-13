
import React from 'react';
import type { View } from './types';

// Icons
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 0 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const CatalogIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 0 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const OffersIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 0 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
);

const AssistantIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 0 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
);

const ShopIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 0 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

interface BottomNavBarProps {
    onNavigate: (view: View, payload?: any) => void;
    currentView: View;
    currentCategory: string;
}

interface NavItem {
    view: View;
    label: string;
    icon: React.FC<{ isActive: boolean }>;
    payload?: any;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onNavigate, currentView }) => {
    
    const navItems: NavItem[] = [
        { view: 'home', label: 'Inicio', icon: HomeIcon, payload: undefined },
        { view: 'catalog', label: 'Catálogo', icon: CatalogIcon, payload: undefined },
        { view: 'ofertas', label: 'Ofertas', icon: OffersIcon, payload: undefined },
        { view: 'ia', label: 'Asistente', icon: AssistantIcon, payload: undefined },
        { view: 'products', label: 'Tienda', icon: ShopIcon, payload: 'all' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] z-40 pb-safe">
            <nav className="flex justify-around items-center h-16">
                {navItems.map(item => {
                    const isActive = item.view === 'products'
                        ? (currentView === 'products' || currentView === 'productDetail')
                        : currentView === item.view;
                        
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.view, item.payload)}
                            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative group ${
                                isActive 
                                ? 'text-[#ec4899]' 
                                : 'text-gray-400 hover:text-white'
                            }`}
                            aria-label={item.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {isActive && (
                                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-[#ec4899] rounded-b-md shadow-[0_0_10px_#ec4899]"></span>
                            )}
                            
                            <div className={`p-1 rounded-full transition-transform duration-300 ${isActive ? 'transform -translate-y-0.5 scale-110' : ''}`}>
                                <Icon isActive={isActive} />
                            </div>
                            <span className={`text-[9px] uppercase tracking-widest mt-0.5 font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                        </button>
                    )
                })}
            </nav>
            <style>{`
                @supports (padding-bottom: env(safe-area-inset-bottom)) {
                    .pb-safe {
                        padding-bottom: env(safe-area-inset-bottom);
                    }
                }
            `}</style>
        </div>
    );
};

export default BottomNavBar;
