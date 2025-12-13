
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

    // Configuración del contenido mixto (Productos y Banners) según el HTML proporcionado
    const mixedContent = [
        { type: 'product', id: 47188 }, // Iluminador
        { type: 'product', id: 47977 }, // Brillo Pestañas
        {
            type: 'banner',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=89efb747-b19f-4e77-a3b9-5aa87b51f223&name=1_Promo_split_double_gifts&inputFormat=jpg",
            title: "Selección de productos de belleza para iluminar las Fiestas de Navidad",
            buttonText: "COMPRAR REGALOS",
            targetView: 'ofertas',
            targetPayload: null,
            isLarge: true // Spans 2 columns
        },
        { type: 'product', id: 48650 }, // Máscara
        { type: 'product', id: 47253 }, // Pomada
        { type: 'product', id: 46134 }, // BB Cream
        {
            type: 'banner',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=product-management-media%2FProducts%2F47188%2F47188_1.png&MediaId=20570078&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP", // Placeholder or use background color logic
            title: "Experimenta con maquillaje virtual en tiempo real",
            buttonText: "PROBAR AHORA",
            isVirtualTryOn: true,
            targetView: 'ia',
            targetPayload: null
        }
    ];

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
                        if (item.type === 'banner') {
                            const isVirtualTryOn = item.isVirtualTryOn;
                            return (
                                <div 
                                    key={index} 
                                    className={`relative flex flex-col justify-center items-center overflow-hidden cursor-pointer group ${item.isLarge ? 'col-span-2' : 'col-span-1'} ${isVirtualTryOn ? 'bg-black text-white' : 'bg-gray-100'}`}
                                    onClick={() => item.targetView && onNavigate(item.targetView as View, item.targetPayload)}
                                    style={{ minHeight: '350px' }}
                                >
                                    {isVirtualTryOn ? (
                                        // Virtual Try On Banner Style
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black opacity-90 flex flex-col items-center justify-center text-center p-6">
                                            <h3 className="text-2xl font-bold mb-6 max-w-xs mx-auto leading-tight">{item.title}</h3>
                                            <button className="text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">
                                                {item.buttonText}
                                            </button>
                                        </div>
                                    ) : (
                                        // Standard Promo Banner
                                        <>
                                            <div className="absolute inset-0">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white text-center flex flex-col items-center">
                                                <h3 className="text-xl font-bold mb-3 leading-tight shadow-sm">{item.title}</h3>
                                                <button className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-gray-200 transition-colors">
                                                    {item.buttonText}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        } else if (item.type === 'product' && item.id) {
                            const product = allProducts.find(p => p.id === item.id);
                            if (!product) return null;
                            
                            return (
                                <div key={index} className="h-full">
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
                    <p className="text-gray-600 mb-4 font-medium">Mostrando 5 de 177 productos</p>
                    <div className="w-full h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
                        <div className="h-full bg-black w-[18%] rounded-full"></div>
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
