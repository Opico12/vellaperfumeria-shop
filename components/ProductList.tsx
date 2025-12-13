
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import type { Currency } from './currency';
import Breadcrumbs from './Breadcrumbs';
import { ProductCard } from './ProductCard';

// Icons for Action Bar
const FilterIcon = () => (
    <svg className="w-6 h-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.437 7a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h1.063a2 2 0 0 1 3.874 0H19.5a.5.5 0 0 1 0 1zM6.5 6.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0m11.937 5H19.5a.5.5 0 0 1 0 1h-1.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h10.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-6.063 5H19.5a.5.5 0 0 1 0 1h-8.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h3.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0"></path>
    </svg>
);

const SortIcon = () => (
    <svg className="w-6 h-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 6a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zM19 6.5a.5.5 0 0 0-1 0v9.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L19 16.293z"></path>
    </svg>
);

type MixedItem = 
  | { type: 'product', id: number }
  | { type: 'banner-image', image: string, title: string, buttonText: string, link: string, colSpan?: number, textColor?: string }
  | { type: 'banner-text', title: string, buttonText: string, link: string }
  | { type: 'banner-video', src: string, link?: string };

const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, currency, onQuickView }) => {
    
    // Quick Category Tabs
    const quickCategories = [
        { id: 'new-arrivals', label: '2025 novedades al mejor precio', active: true },
        { id: 'ofertas', label: 'Solo las mejores ofertas' },
    ];

    // Mixed Content Layout matching the HTML provided
    const mixedContent: MixedItem[] = [
        // 1. Banner "Un viaje a la Riviera"
        { 
            type: 'banner-image', 
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=eb8edbeb-1ff0-427f-878c-8b23062b1aa6&name=Promo_split_single_1&inputFormat=jpg",
            title: "Un viaje a la Riviera para ella",
            buttonText: "VER MÁS",
            link: "products",
            colSpan: 1,
            textColor: "text-white"
        },
        // 2. Product 41070 (Novage+)
        { type: 'product', id: 41070 },
        // 3. Product 44098 (Novage+ SPF)
        { type: 'product', id: 44098 },
        // 4. Banner "Azur refinado"
        {
            type: 'banner-image',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=bda12c88-dee7-425a-9a32-8414adcf7d9f&name=Promo_split_single_2&inputFormat=jpg",
            title: "Azur refinado para él",
            buttonText: "COMPRAR",
            link: "products",
            colSpan: 1,
            textColor: "text-white"
        },
        // 5. Banner "Catálogo 17" - UPDATED
        {
            type: 'banner-image',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=10eada9f-b5ef-4854-911a-34f17f58b371&name=2_Promo_split_NewCollection_600x450&inputFormat=jpg",
            title: "Catálogo 17: Especial Navidad",
            buttonText: "VER CATÁLOGO",
            link: "catalog",
            colSpan: 1,
            textColor: "text-white"
        },
        // 6. Product 47514 (Miss Giordani)
        { type: 'product', id: 47514 },
        // 7. Product 47502 (Mister Giordani)
        { type: 'product', id: 47502 },
        // 8. Product 47499 (Elvie)
        { type: 'product', id: 47499 },
    ];

    const handleClickLink = (link: string) => {
        if(link === 'ofertas') onNavigate('ofertas');
        else if (link === 'ia') onNavigate('ia');
        else if (link === 'catalog') onNavigate('catalog');
        else if (link === 'wellness') onNavigate('products', 'wellness');
        else onNavigate('products', 'all');
    }

    return (
        <div className="bg-white pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Breadcrumbs & Title */}
                <div className="pt-4 pb-4">
                    <Breadcrumbs items={[
                        { label: 'Inicio', onClick: () => onNavigate('home') },
                        { label: '2025 novedades al mejor precio' }
                    ]} />
                    
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 font-serif tracking-tight">
                        2025 novedades al mejor precio
                    </h1>
                </div>

                {/* 2. Category Bar */}
                <div className="relative mb-6 border-b border-gray-200">
                    <div className="flex overflow-x-auto gap-6 pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {quickCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    if(cat.id === 'ofertas') onNavigate('ofertas');
                                    // else stay here
                                }}
                                className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                                    cat.active
                                    ? 'border-brand-primary text-brand-primary' 
                                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Intro Text */}
                <div className="mb-8 max-w-4xl">
                    <p className="text-gray-600 leading-relaxed text-lg">
                        ¿Busca nuevas ideas para regalar? Nada de déjà vu del año pasado. Esta Navidad, sorprenda a todos los miembros de su lista con los últimos lanzamientos, ahora a los mejores precios.
                    </p>
                </div>

                {/* 4. Action Bar (Filter, Sort, Count) */}
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 mb-6 border-b border-gray-100">
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                        <button className="flex items-center gap-2 text-gray-800 hover:text-brand-primary transition-colors group">
                            <FilterIcon />
                            <span className="text-base font-medium group-hover:underline">Filtrar</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-800 hover:text-brand-primary transition-colors group">
                            <SortIcon />
                            <span className="text-base font-medium group-hover:underline">Recomendado</span>
                        </button>
                    </div>
                    <div className="mt-4 sm:mt-0 text-sm text-gray-500 font-medium">
                        30 productos
                    </div>
                </div>

                {/* 5. Mixed Content Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {mixedContent.map((item, index) => {
                        if (item.type === 'banner-image') {
                            return (
                                <div 
                                    key={`banner-img-${index}`} 
                                    className={`relative flex flex-col justify-end overflow-hidden cursor-pointer group ${item.colSpan === 2 ? 'col-span-2' : 'col-span-1'} bg-gray-100 rounded-lg shadow-md border border-brand-secondary`}
                                    onClick={() => handleClickLink(item.link)}
                                    style={{ minHeight: '350px' }}
                                >
                                    <div className="absolute inset-0">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start text-left z-10">
                                        <h3 className="text-xl font-bold mb-3 leading-tight text-white drop-shadow-md font-serif">{item.title}</h3>
                                        <button className="text-xs font-bold uppercase tracking-widest border-b border-white text-white pb-1 hover:opacity-80 transition-opacity">
                                            {item.buttonText}
                                        </button>
                                    </div>
                                </div>
                            );
                        } else if (item.type === 'product' && item.id) {
                            const product = allProducts.find(p => p.id === item.id);
                            if (!product) return null;
                            
                            return (
                                <div key={`prod-${index}`} className="h-full">
                                    <ProductCard 
                                        product={product}
                                        currency={currency}
                                        onAddToCart={onAddToCart}
                                        onQuickAddToCart={onQuickAddToCart}
                                        onProductSelect={onProductSelect}
                                        onQuickView={onQuickView}
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                {/* 6. Pagination / Load More */}
                <div className="mt-16 flex flex-col items-center justify-center max-w-md mx-auto text-center">
                    <p className="text-gray-600 mb-4 font-medium">Mostrando 5 de 30 productos</p>
                    <div className="w-full h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full transition-all duration-500" style={{ width: '16.66%' }}></div>
                    </div>
                    <button className="px-10 py-3 border border-gray-300 rounded-full font-bold text-gray-800 hover:bg-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-all uppercase text-sm tracking-wide">
                        Mostrar más
                    </button>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8"></div>
            </div>
            
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ProductList;
