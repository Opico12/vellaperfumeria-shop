
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
    { key: 'wellness', name: 'Wellness' },
    { key: 'hair', name: 'Cuidado del Cabello' },
    { key: 'personal-care', name: 'Cuidado Personal' },
    { key: 'the-one', name: 'Colección The ONE' }, // Añadida categoría lógica para el menú
    { key: 'accessories', name: 'Accesorios' },
];

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        let filtered = [...allProducts];

        if (activeCategory === 'the-one') {
            // Filtrado especial por MARCA cuando se pide "The ONE"
            filtered = allProducts.filter(p => p.brand.toUpperCase() === 'THE ONE' || p.brand.toUpperCase() === 'THEONE');
        } else if (activeCategory !== 'all') {
            filtered = allProducts.filter(p => p.category === activeCategory);
        }

        switch (sortOrder) {
            case 'price': filtered.sort((a, b) => a.price - b.price); break;
            case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'rating': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
            default: break;
        }
        return filtered;
    }, [activeCategory, sortOrder]);

    const handleDownloadFullCSV = () => {
        const headers = [
            "ID", "SKU", "Nombre", "Publicado", "¿Está destacado?", "Visibilidad en el catálogo",
            "Descripción corta", "Descripción", "En inventario?", "Stock", "Precio rebajado", "Precio normal",
            "Categorías", "Imágenes", "Atributo 1 nombre", "Atributo 1 valor(es)", "Atributo 1 visible", "Atributo 1 global"
        ];
        
        const escapeCSV = (val: any) => {
            if (val === null || val === undefined) return '""';
            let s = String(val).replace(/(\r\n|\n|\r)/gm, " ");
            s = s.replace(/"/g, '""');
            return `"${s}"`;
        };

        const rows = allProducts.map(p => {
            const ingredientsPart = p.description.split("INGREDIENTES:")[1]?.trim() || "Consulte envase";
            const catName = categories.find(c => c.key === p.category)?.name || p.category;

            return [
                escapeCSV(p.id),
                escapeCSV(`VELLA-${p.id}`),
                escapeCSV(p.name),
                escapeCSV(1),
                escapeCSV(0),
                escapeCSV("visible"),
                escapeCSV(`Marca: ${p.brand}. ${p.description.substring(0, 80)}...`),
                escapeCSV(p.description),
                escapeCSV(1),
                escapeCSV(p.stock),
                escapeCSV(p.price.toFixed(2)),
                escapeCSV(p.regularPrice ? p.regularPrice.toFixed(2) : p.price.toFixed(2)),
                escapeCSV(catName),
                escapeCSV(p.imageUrl),
                escapeCSV("Ingredientes"),
                escapeCSV(ingredientsPart),
                escapeCSV(1),
                escapeCSV(1)
            ].join(",");
        });

        const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `CATALOGO_IMPORT_VELLA_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            {/* HERRAMIENTA DE EXPORTACIÓN RESALTADA */}
            <div className="mb-12 p-8 bg-black rounded-[2.5rem] shadow-2xl border-4 border-pink-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-pink-500/20 transition-all duration-700"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <span className="inline-block px-4 py-1 rounded-full bg-pink-500 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">Administración</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Generador de CSV Maestro</h2>
                        <p className="text-gray-400 text-sm max-w-xl font-medium">
                            Descarga la base de datos completa optimizada para <b>WooCommerce</b>.
                        </p>
                    </div>
                    <button 
                        onClick={handleDownloadFullCSV}
                        className="flex items-center gap-4 bg-pink-500 hover:bg-white text-black hover:text-pink-600 px-10 py-5 rounded-2xl transition-all duration-500 font-black text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)] transform hover:scale-105 active:scale-95"
                    >
                        <DownloadIcon />
                        Descargar CSV Resaltado
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
                        {categories.find(c => c.key === activeCategory)?.name || 'Tienda'}
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        {activeCategory === 'the-one' ? 'Productos de maquillaje profesional THE ONE.' : 'Filtra por categorías para encontrar tu producto ideal.'}
                    </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <select 
                            value={activeCategory} 
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="appearance-none bg-white border-2 border-gray-100 rounded-2xl py-3 px-8 text-sm font-bold text-gray-700 focus:border-pink-300 outline-none transition-all shadow-sm cursor-pointer pr-12"
                        >
                            {categories.map(cat => (
                                <option key={cat.key} value={cat.key}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredAndSortedProducts.length > 0 ? filteredAndSortedProducts.map(product => (
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
                    <div className="col-span-full py-20 text-center">
                        <p className="text-gray-400 italic">No se han encontrado productos en esta colección todavía.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
