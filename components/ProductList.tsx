
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import type { Currency } from './currency';
import Breadcrumbs from './Breadcrumbs';
import { ProductCard } from './ProductCard';

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

    // Mixed Content Configuration
    // Layout: 4 items per row (Desktop)
    const mixedContent = [
        // ROW 1
        {
            type: 'banner',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=eb8edbeb-1ff0-427f-878c-8b23062b1aa6&name=Promo_split_single_1&inputFormat=jpg",
            title: "Un viaje a la Riviera para ella",
            targetView: 'products',
            targetPayload: 'skincare'
        },
        {
            type: 'product',
            id: 41070
        },
        {
            type: 'product',
            id: 44098
        },
        {
            type: 'banner',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=bda12c88-dee7-425a-9a32-8414adcf7d9f&name=Promo_split_single_2&inputFormat=jpg",
            title: "Azur refinado para él",
            targetView: 'products',
            targetPayload: 'men'
        },
        // ROW 2
        {
            type: 'banner',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=86cb5734-1101-4601-8161-e170f0cfbdd0&name=Promo_split_single_3&inputFormat=jpg",
            title: "Un aroma floral para estas fiestas",
            targetView: 'products',
            targetPayload: 'perfume'
        },
        {
            type: 'product',
            id: 47514
        },
        {
            type: 'product',
            id: 47502
        },
        {
            type: 'product',
            id: 47499
        }
    ];

    return (
        <div className="bg-white pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Top Banner Area (Breadcrumbs + Title) */}
                <div className="pt-4 pb-4">
                    <Breadcrumbs items={[
                        { label: 'Inicio', onClick: () => onNavigate('home') },
                        { label: 'Solo las mejores ofertas' }
                    ]} />
                    
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 font-serif tracking-tight">
                        Current Best Offers
                    </h1>
                </div>

                {/* 2. Category Bar (Scrollable Tabs) */}
                <div className="relative mb-8 border-b border-gray-200">
                    <div className="flex overflow-x-auto gap-6 pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {quickCategories.map((cat, index) => (
                            <button
                                key={cat.id}
                                onClick={() => onNavigate('products', cat.id === 'ofertas' ? 'all' : cat.id)}
                                className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                                    index === 0 
                                    ? 'border-black text-black' 
                                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Intro Text */}
                <div className="mb-8">
                    <p className="text-base text-gray-600 leading-relaxed max-w-4xl">
                        Si buscas ofertas y descuentos, ¡estás en el lugar adecuado! Hemos reunido aquí todas las mejores ofertas de la campaña actual para que no te pierdas ninguna.
                    </p>
                </div>

                {/* 4. Mixed Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mixedContent.map((item, index) => {
                        if (item.type === 'banner') {
                            return (
                                <div 
                                    key={index} 
                                    className="group relative flex flex-col bg-white overflow-hidden cursor-pointer h-full"
                                    onClick={() => item.targetView && onNavigate(item.targetView as View, item.targetPayload)}
                                >
                                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="pt-4 flex flex-col items-center text-center flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-pink-600 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
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
