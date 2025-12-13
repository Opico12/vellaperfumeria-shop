
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
  | { type: 'banner-image', image: string, title: string, buttonText: string, link: string, colSpan?: number }
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
    
    // Categorías para el menú de pestañas horizontal
    const quickCategories = [
        { id: 'ofertas', label: 'Solo las mejores ofertas' },
        { id: 'skincare', label: 'Cuidado Facial' },
        { id: 'makeup', label: 'Maquillaje' },
        { id: 'perfume', label: 'Fragancias' },
        { id: 'wellness', label: 'Wellness' },
        { id: 'hair', label: 'Cabello' },
    ];

    // Defined based on the HTML structure provided
    const mixedContent: MixedItem[] = [
        { type: 'product', id: 47188 },
        { type: 'product', id: 47977 },
        {
            type: 'banner-image',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=89efb747-b19f-4e77-a3b9-5aa87b51f223&name=1_Promo_split_double_gifts&inputFormat=jpg",
            title: "Selección de productos de belleza para iluminar las Fiestas de Navidad",
            buttonText: "COMPRAR REGALOS",
            link: "ofertas",
            colSpan: 2
        },
        { type: 'product', id: 48650 },
        { type: 'product', id: 47253 },
        { type: 'product', id: 46134 },
        {
            type: 'banner-text',
            title: "Experimenta con maquillaje virtual en tiempo real",
            buttonText: "PROBAR AHORA",
            link: "ia"
        },
        { type: 'banner-video', src: "https://media-cdn.oriflame.com/static-media-web/0fa45d91-4c57-41ab-957e-9404e87544d8?mimeType=video%2fmp4" },
        {
            type: 'banner-image',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=179aab29-b41b-4e67-af6d-927cf4656de4&name=2_Promo_split_double_gifts&inputFormat=jpg",
            title: "Regalos que deslumbran para todas las fans del maquillaje",
            buttonText: "COMPRAR AHORA",
            link: "ofertas",
            colSpan: 2
        },
        { type: 'product', id: 46901 },
        { type: 'product', id: 46929 },
        { type: 'product', id: 48039 },
        {
            type: 'banner-text',
            title: "Convierte tu regalo de belleza en un momento de alegría.",
            buttonText: "AÑADE CAJITA DE REGALO",
            link: "ofertas"
        },
        { type: 'banner-video', src: "https://media-cdn.oriflame.com/static-media-web/0c22a307-2248-4454-8c99-59a059540721?mimeType=video%2fmp4" },
        { type: 'product', id: 46888 },
        { type: 'product', id: 47704 },
        { type: 'product', id: 46940 },
        { type: 'product', id: 47180 },
        { type: 'product', id: 47192 },
        { type: 'product', id: 48640 },
        { type: 'product', id: 46906 },
        { type: 'product', id: 42121 },
        { type: 'product', id: 42102 },
        { type: 'product', id: 41107 },
        { type: 'product', id: 43244 },
        { type: 'product', id: 41760 },
        { type: 'product', id: 42652 },
        { type: 'product', id: 44835 },
        { type: 'product', id: 34647 },
        { type: 'product', id: 46588 },
        { type: 'product', id: 37728 },
        { type: 'product', id: 46611 },
        { type: 'product', id: 46549 },
        { type: 'product', id: 46601 },
        { type: 'product', id: 45361 },
        { type: 'product', id: 38690 },
        { type: 'product', id: 46595 },
        { type: 'product', id: 38991 },
    ];

    const handleClickLink = (link: string) => {
        if(link === 'ofertas') onNavigate('ofertas');
        else if (link === 'ia') onNavigate('ia');
        else onNavigate('products', 'all');
    }

    return (
        <div className="bg-white pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Breadcrumbs & Title */}
                <div className="pt-4 pb-4">
                    <Breadcrumbs items={[
                        { label: 'Inicio', onClick: () => onNavigate('home') },
                        { label: 'Maquillaje' }
                    ]} />
                    
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 font-serif tracking-tight">
                        Maquillaje
                    </h1>
                </div>

                {/* 2. Category Bar */}
                <div className="relative mb-6 border-b border-gray-200">
                    <div className="flex overflow-x-auto gap-6 pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {quickCategories.map((cat, index) => (
                            <button
                                key={cat.id}
                                onClick={() => onNavigate('products', cat.id === 'ofertas' ? 'all' : cat.id)}
                                className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                                    index === 2 
                                    ? 'border-black text-black' 
                                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Action Bar (Filter, Sort, Count) */}
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 mb-6 border-b border-gray-100">
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                        <button className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group">
                            <FilterIcon />
                            <span className="text-base font-medium group-hover:underline">Filtrar</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group">
                            <SortIcon />
                            <span className="text-base font-medium group-hover:underline">Recomendado</span>
                        </button>
                    </div>
                    <div className="mt-4 sm:mt-0 text-sm text-gray-500 font-medium">
                        177 productos
                    </div>
                </div>

                {/* 4. Mixed Content Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {mixedContent.map((item, index) => {
                        if (item.type === 'banner-image') {
                            return (
                                <div 
                                    key={`banner-img-${index}`} 
                                    className={`relative flex flex-col justify-end overflow-hidden cursor-pointer group ${item.colSpan === 2 ? 'col-span-2' : 'col-span-1'} bg-gray-100 h-full`}
                                    onClick={() => handleClickLink(item.link)}
                                    style={{ minHeight: '350px' }}
                                >
                                    <div className="absolute inset-0">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white text-center flex flex-col items-center">
                                        <h3 className="text-xl font-bold mb-3 leading-tight drop-shadow-md">{item.title}</h3>
                                        <button className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-gray-200 transition-colors">
                                            {item.buttonText}
                                        </button>
                                    </div>
                                </div>
                            );
                        } else if (item.type === 'banner-text') {
                            return (
                                <div 
                                    key={`banner-txt-${index}`} 
                                    className="relative flex flex-col justify-center items-center text-center p-6 bg-[#f9f3f1] cursor-pointer group col-span-1 h-full"
                                    onClick={() => handleClickLink(item.link)}
                                >
                                    <h3 className="text-xl font-serif text-gray-900 mb-6 leading-snug">{item.title}</h3>
                                    <button className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-70 transition-opacity">
                                        {item.buttonText}
                                    </button>
                                </div>
                            );
                        } else if (item.type === 'banner-video') {
                            return (
                                <div key={`banner-vid-${index}`} className="relative col-span-1 h-full min-h-[350px] bg-black cursor-pointer group" onClick={() => item.link && handleClickLink(item.link)}>
                                    <video 
                                        autoPlay 
                                        muted 
                                        loop 
                                        playsInline 
                                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        src={item.src}
                                    />
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

                {/* 5. Pagination / Load More */}
                <div className="mt-16 flex flex-col items-center justify-center max-w-md mx-auto text-center">
                    <p className="text-gray-600 mb-4 font-medium">Mostrando 32 de 177 productos</p>
                    <div className="w-full h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
                        <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: '18.08%' }}></div>
                    </div>
                    <button className="px-10 py-3 border border-gray-300 rounded-full font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition-all uppercase text-sm tracking-wide">
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
