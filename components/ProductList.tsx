
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
    
    // IDs garantizados que existen en products.ts
    const featuredIds = [46060, 48083, 47005, 48117, 48650, 36152, 47499, 48970];

    return (
        <div className="bg-white pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-8 pb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 tracking-tight">Selección Exclusiva</h1>
                    <div className="w-16 h-0.5 bg-brand-primary mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {allProducts.map(product => (
                        <ProductCard 
                            key={product.id}
                            product={product}
                            currency={currency}
                            onAddToCart={onAddToCart}
                            onQuickAddToCart={onQuickAddToCart}
                            onProductSelect={onProductSelect}
                            onQuickView={onQuickView}
                        />
                    ))}
                </div>
                
                <div className="mt-20 text-center">
                    <button 
                        onClick={() => onNavigate('products', 'all')}
                        className="inline-block bg-black text-white px-12 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl"
                    >
                        Ver Catálogo Completo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
