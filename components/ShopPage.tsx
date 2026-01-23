
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const categories = [
    { key: 'all', name: 'Todos los productos' },
    { key: 'skincare', name: 'Cuidado Facial' },
    { key: 'makeup', name: 'Maquillaje' },
    { key: 'perfume', name: 'Fragancias' },
    { key: 'wellness', name: 'Bienestar' },
    { key: 'accessories', name: 'Accesorios' },
];

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ShopPage: React.FC<{
    currency: Currency;
    initialCategory: string;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, initialCategory, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'the-one') {
            return allProducts.filter(p => p.brand.toUpperCase().includes('THE ONE'));
        } else if (activeCategory !== 'all') {
            return allProducts.filter(p => p.category === activeCategory);
        }
        return allProducts;
    }, [activeCategory]);

    const escapeCSV = (val: any): string => {
        if (val === null || val === undefined) return '""';
        let s = String(val).trim();
        s = s.replace(/"/g, '""'); 
        if (s.includes(',') || s.includes('\n') || s.includes('"')) {
            return `"${s}"`;
        }
        return `"${s}"`;
    };

    const handleDownloadCSV = () => {
        const headers = ["ID", "Name", "Brand", "Category", "Description", "Price", "RegularPrice", "ImageURL", "Stock"];
        
        const rows = allProducts.map(p => {
            return [
                p.id,
                escapeCSV(p.name),
                escapeCSV(p.brand),
                escapeCSV(p.category),
                escapeCSV(p.description),
                p.price.toFixed(2),
                p.regularPrice ? p.regularPrice.toFixed(2) : p.price.toFixed(2),
                escapeCSV(p.imageUrl),
                p.stock
            ].join(",");
        });

        const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Inventario_Vellaperfumeria_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Download Panel */}
            <div className="mb-10 bg-brand-dark text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/5">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Base de Datos de Productos</h2>
                    <p className="text-gray-400 text-sm mt-1">Exporta el inventario completo con descripciones y códigos Oriflame actualizados.</p>
                </div>
                <button 
                    onClick={handleDownloadCSV}
                    className="bg-brand-primary text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-brand-primary/20"
                >
                    <DownloadIcon />
                    Descargar CSV Maestro
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                        {categories.find(c => c.key === activeCategory)?.name || 'Tienda'}
                    </h1>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catálogo:</span>
                    <select 
                        value={activeCategory} 
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="bg-gray-50 border-none rounded-xl py-3 px-6 text-xs font-bold uppercase tracking-widest text-gray-700 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer shadow-sm"
                    >
                        {categories.map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.length > 0 ? filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        currency={currency}
                        onAddToCart={onAddToCart}
                        onQuickAddToCart={onQuickAddToCart}
                        onProductSelect={onProductSelect}
                        onQuickView={onQuickView}
                    />
                )) : (
                    <div className="col-span-full py-20 text-center text-gray-400 italic font-serif">
                        No se han encontrado productos en esta sección...
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
