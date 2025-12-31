
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product, VariantOption } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const categories = [
    { key: 'all', name: 'Todos los productos' },
    { key: 'skincare', name: 'Cuidado Facial' },
    { key: 'makeup', name: 'Maquillaje' },
    { key: 'perfume', name: 'Fragancias' },
    { key: 'wellness', name: 'Wellness' },
    { key: 'hair', name: 'Cuidado del Cabello' },
    { key: 'personal-care', name: 'Cuidado Personal' },
    { key: 'men', name: 'Hombre' },
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
    const [sortOrder, setSortOrder] = useState('menu_order');
    
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = activeCategory === 'all'
            ? [...allProducts]
            : allProducts.filter(p => p.category === activeCategory);

        switch (sortOrder) {
            case 'price': filtered.sort((a, b) => a.price - b.price); break;
            case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'rating': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
            default: break;
        }
        return filtered;
    }, [activeCategory, sortOrder]);

    const handleDownloadCSV = () => {
        // Esquema WooCommerce: Los campos deben estar entre comillas y separados por coma
        const headers = [
            "Type", "SKU", "Name", "Published", "Is featured?", "Visibility in catalog",
            "Short description", "Description", "In stock?", "Stock", "Sale price", "Regular price",
            "Categories", "Images", "Attribute 1 name", "Attribute 1 value(s)", "Attribute 1 visible", "Attribute 1 global"
        ];
        
        const escapeCSV = (val: any) => {
            if (val === null || val === undefined) return '""';
            let s = String(val).replace(/(\r\n|\n|\r)/gm, " "); // Quitar saltos de línea
            s = s.replace(/"/g, '""'); // Escapar comillas: " -> ""
            return `"${s}"`;
        };

        const rows = allProducts.map(p => {
            // Lógica de variantes para el desplegable de WooCommerce
            let attrName = "";
            let attrValues = "";
            if (p.variants) {
                const keys = Object.keys(p.variants);
                if (keys.length > 0) {
                    attrName = keys[0];
                    attrValues = p.variants[attrName].map(v => v.value).join(" | ");
                }
            }

            // Imágenes (URL principal + variantes si las hay)
            const imgs = [p.imageUrl];
            if (p.variants) {
                Object.values(p.variants).forEach((opts: any) => {
                    opts.forEach((o: any) => { if (o.imageUrl) imgs.push(o.imageUrl); });
                });
            }

            const catName = categories.find(c => c.key === p.category)?.name || p.category;

            return [
                escapeCSV("simple"),
                escapeCSV(p.id),
                escapeCSV(p.name),
                escapeCSV(1),
                escapeCSV(0),
                escapeCSV("visible"),
                escapeCSV(p.description.substring(0, 100) + "..."),
                escapeCSV(p.description),
                escapeCSV(1),
                escapeCSV(p.stock),
                escapeCSV(p.price.toFixed(2)),
                escapeCSV(p.regularPrice ? p.regularPrice.toFixed(2) : p.price.toFixed(2)),
                escapeCSV(catName),
                escapeCSV(imgs.join(", ")),
                escapeCSV(attrName),
                escapeCSV(attrValues),
                escapeCSV(1),
                escapeCSV(1)
            ].join(",");
        });

        // El BOM (\uFEFF) es vital para que Excel no rompa los acentos
        const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `WooCommerce_VellaPerfumeria_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900">Nuestra Tienda</h1>
                    <p className="text-gray-500 mt-2">Explora la colección completa de cosmética premium.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    <select 
                        value={activeCategory} 
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:ring-brand-primary"
                    >
                        {categories.map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.name}</option>
                        ))}
                    </select>

                    <button 
                        onClick={handleDownloadCSV}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-all text-sm font-bold shadow-lg"
                    >
                        <DownloadIcon />
                        Exportar para WooCommerce
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredAndSortedProducts.map(product => (
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
        </div>
    );
};

export default ShopPage;
