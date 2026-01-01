
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import type { Product } from './types';
import type { Currency } from './currency';

// URL Actualizada a la versión 2026001 proporcionada por el usuario
const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2026001-brp?HideStandardUI=true&Page=1';
const FALLBACK_CATALOG_URL = 'https://es.oriflame.com/products/digital-catalogue-current';

interface CatalogPageProps {
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    currency: Currency;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart, onQuickAddToCart, onProductSelect, onQuickView, currency }) => {
    const [quickAddCode, setQuickAddCode] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quickAddCode.trim()) return;

        const code = parseInt(quickAddCode.trim());
        const product = allProducts.find(p => p.id === code);

        if (product) {
            onAddToCart(product, buttonRef.current, null);
            setStatusMessage(`¡${product.name} añadido!`);
            setQuickAddCode('');
            setTimeout(() => setStatusMessage(''), 3000);
        } else {
            setStatusMessage('Código no encontrado. Consúltanos por WhatsApp.');
            setTimeout(() => setStatusMessage(''), 3000);
        }
    };

    return (
        <div className="w-full px-4 py-8 bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-10">
                
                {/* Visualizador de Catálogo - FULL PAGE en móvil */}
                <div className="flex-grow w-full">
                    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Catálogo Interactivo 2026</h1>
                            <p className="text-gray-500">Explora las últimas tendencias y anota tus códigos favoritos.</p>
                        </div>
                        <a 
                            href={FALLBACK_CATALOG_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-black text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-all shadow-md flex items-center gap-2"
                        >
                            <span>ABRIR EN VENTANA NUEVA</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    </div>
                    
                    {/* Contenedor del Catálogo: h-[80vh] en móvil para ocupar toda la página */}
                    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 h-[80vh] md:h-auto md:aspect-[16/9] relative group">
                        {!isCatalogLoaded ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white via-pink-50/30 to-gray-50">
                                <div className="w-40 h-56 bg-white rounded-xl shadow-xl mb-8 flex items-center justify-center border-4 border-pink-100 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                                    <img src="https://cdn.ipaper.io/iPaper/Papers/0ae94f9f-dbf1-41ce-8890-85ef3c56310d/Pages/1/Zoom.jpg" className="w-full h-full object-cover opacity-80" alt="Cover" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">Visualizador Oficial</h3>
                                <p className="text-gray-500 max-w-sm mb-10 text-sm leading-relaxed">Cargando la mejor cosmética de Oriflame...</p>
                                
                                <button 
                                    onClick={() => setIsCatalogLoaded(true)}
                                    className="bg-brand-primary text-white font-bold py-4 px-12 rounded-full hover:bg-pink-600 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                                >
                                    ABRIR CATÁLOGO
                                </button>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-gray-100">
                                <iframe
                                    src={INTERACTIVE_CATALOG_URL}
                                    title="Catálogo Oriflame Interactivo"
                                    className="w-full h-full border-none"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Pedido Rápido Sidebar */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 sticky top-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">⚡</div>
                            <h2 className="text-2xl font-bold text-gray-900">Compra Rápida</h2>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                ¿Tienes el código del catálogo? Introdúcelo aquí para añadirlo directamente a tu cesta de <strong>Vellaperfumeria</strong>.
                            </p>
                        </div>

                        <form onSubmit={handleQuickAdd} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Código de Producto</label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="Ejem: 44962"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-2xl font-black focus:ring-4 focus:ring-pink-50 focus:bg-white focus:border-pink-300 outline-none text-center transition-all shadow-inner"
                                    value={quickAddCode}
                                    onChange={(e) => setQuickAddCode(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={quickAddCode.length < 3}
                                className="w-full bg-black text-white font-bold py-5 rounded-2xl hover:bg-gray-800 transition-all shadow-lg disabled:opacity-20 disabled:grayscale transform active:scale-95"
                            >
                                AÑADIR A LA CESTA
                            </button>
                        </form>

                        {statusMessage && (
                            <div className="mt-6 text-center animate-bounce">
                                <p className={`text-xs font-black ${statusMessage.includes('añadido') ? 'text-green-600' : 'text-pink-600'}`}>
                                    {statusMessage}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
