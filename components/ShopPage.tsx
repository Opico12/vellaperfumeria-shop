
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
            case 'popularity':
                filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'price':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'menu_order':
            default:
                break;
        }
        return filtered;
    }, [activeCategory, sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    const handleDownloadCSV = () => {
        // Headers oficiales de WooCommerce para importación
        const headers = [
            "ID", 
            "Type", 
            "SKU", 
            "Name", 
            "Published", 
            "Is featured?", 
            "Visibility in catalog", 
            "Short description", 
            "Description", 
            "Date sale price starts", 
            "Date sale price ends", 
            "Tax status", 
            "Tax class", 
            "In stock?", 
            "Stock", 
            "Low stock amount", 
            "Backorders allowed?", 
            "Sold individually?", 
            "Weight (kg)", 
            "Length (cm)", 
            "Width (cm)", 
            "Height (cm)", 
            "Allow customer reviews?", 
            "Purchase note", 
            "Sale price", 
            "Regular price", 
            "Categories", 
            "Tags", 
            "Shipping class", 
            "Images", 
            "Download limit", 
            "Download expiry days", 
            "Parent", 
            "Grouped products", 
            "Upsells", 
            "Cross-sells", 
            "External URL", 
            "Button text", 
            "Position", 
            "Attribute 1 name", 
            "Attribute 1 value(s)", 
            "Attribute 1 visible", 
            "Attribute 1 global"
        ];
        
        // Función para escapar valores CSV de forma robusta
        const escapeCSV = (value: any) => {
            if (value === null || value === undefined) return '""';
            let stringValue = String(value);
            // Reemplazar saltos de línea con espacio
            stringValue = stringValue.replace(/(\r\n|\n|\r)/gm, " ");
            // Escapar comillas dobles (reemplazar " por "")
            stringValue = stringValue.replace(/"/g, '""');
            // Envolver todo en comillas
            return `"${stringValue}"`;
        };

        const csvRows = allProducts.map(p => {
            // Lógica para Variantes (Atributos)
            let attrName = "";
            let attrValues = "";
            let attrVisible = "";
            let attrGlobal = "";

            if (p.variants) {
                const keys = Object.keys(p.variants);
                if (keys.length > 0) {
                    attrName = keys[0]; 
                    attrValues = p.variants[attrName].map(v => v.value).join(" | ");
                    attrVisible = "1"; 
                    attrGlobal = "1"; 
                }
            }

            // Imágenes
            const images = [p.imageUrl];
            if (p.variants) {
                (Object.values(p.variants) as VariantOption[][]).forEach(options => {
                    options.forEach(opt => {
                        if (opt.imageUrl && !images.includes(opt.imageUrl)) {
                            images.push(opt.imageUrl);
                        }
                    });
                });
            }
            const imagesString = images.join(", "); 

            const priceFormatted = p.price.toFixed(2);
            const regularPriceFormatted = p.regularPrice ? p.regularPrice.toFixed(2) : "";
            const categoryName = categories.find(c => c.key === p.category)?.name || p.category;
            const productName = p.name || "Producto sin nombre";

            return [
                escapeCSV(p.id),
                escapeCSV("simple"), 
                escapeCSV(`SKU-${p.id}`), 
                escapeCSV(productName),
                escapeCSV(1), // Published
                escapeCSV(0), // Is featured?
                escapeCSV("visible"),
                escapeCSV(p.description.substring(0, 150) + "..."), // Short description
                escapeCSV(p.description), // Description
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV("taxable"),
                escapeCSV(""), 
                escapeCSV(1), // In stock
                escapeCSV(p.stock),
                escapeCSV(""), 
                escapeCSV(0), 
                escapeCSV(0), 
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(1), // Reviews allowed
                escapeCSV(""), 
                escapeCSV(priceFormatted), // Sale price
                escapeCSV(regularPriceFormatted), // Regular price
                escapeCSV(categoryName), 
                escapeCSV(p.tag || ""), 
                escapeCSV(""), 
                escapeCSV(imagesString), // Images
                escapeCSV(""), 
                escapeCSV(""),
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(""), 
                escapeCSV(0), 
                escapeCSV(attrName), 
                escapeCSV(attrValues), 
                escapeCSV(attrVisible), 
                escapeCSV(attrGlobal) 
            ].join(",");
        });

        // Añadir BOM (\uFEFF) para UTF-8.
        // Añadir 'sep=,' en la primera línea para forzar a Excel a usar comas como separador.
        // NOTA: Si vas a importar directamente a WooCommerce, borra la primera línea (sep=,) en un editor de texto si te da error.
        // Pero esto solucionará el problema de visualización en Excel.
        const csvContent = "\uFEFFsep=,\n" + headers.join(",") + "\n" + csvRows.join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `productos-vellaperfumeria-woocommerce-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 font-serif">Tienda</h1>
                
                <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <select 
                        value={activeCategory} 
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                    >
                        {categories.map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.name}</option>
                        ))}
                    </select>

                    <select 
                        value={sortOrder} 
                        onChange={handleSortChange}
                        className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                    >
                        <option value="menu_order">Orden predeterminado</option>
                        <option value="popularity">Popularidad</option>
                        <option value="rating">Puntuación media</option>
                        <option value="price">Precio: bajo a alto</option>
                        <option value="price-desc">Precio: alto a bajo</option>
                    </select>

                    <button 
                        onClick={handleDownloadCSV}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-bold shadow-sm whitespace-nowrap"
                        title="Generar archivo CSV compatible con importador de WooCommerce"
                    >
                        <DownloadIcon />
                        Exportar CSV para WooCommerce
                    </button>
                </div>
            </div>

            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
                    <button 
                        onClick={() => setActiveCategory('all')}
                        className="mt-4 text-brand-primary font-semibold hover:underline"
                    >
                        Ver todos los productos
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopPage;
