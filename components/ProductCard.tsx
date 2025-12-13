
import React, { useRef, useState } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

// --- ICONS ---
const HeartIcon: React.FC<{isFilled: boolean}> = ({ isFilled }) => (
    <svg className="h-5 w-5" fill={isFilled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={`w-3 h-3 ${className}`} style={style} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const ProductCard: React.FC<{
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ product, currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const isDiscounted = product.regularPrice && product.regularPrice > product.price;
    const hasVariants = product.variants && Object.keys(product.variants).length > 0;

    const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsWishlisted(prev => !prev);
    };

    const renderStars = () => {
        if (!product.rating) return null;
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <div className="flex items-center justify-center gap-0.5" title={`${product.rating}/5 ★`}>
                {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="text-black" />)}
                {halfStar && <StarIcon key="half" className="text-black" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />}
                {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="text-gray-200" />)}
            </div>
        );
    };
    
    const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (hasVariants) {
            onQuickView(product); 
        } else {
            onQuickAddToCart(product, btnRef.current, null);
        }
    };

    return (
        <div 
            className="group relative flex flex-col h-full bg-white transition-all duration-300 hover:shadow-xl border border-transparent hover:border-pink-50 rounded-sm overflow-hidden"
            onClick={() => onProductSelect(product)}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full bg-white overflow-hidden">
                
                {/* Badges - Personal and Elegant */}
                <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
                    {isDiscounted && (
                        <span className="bg-red-600 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm">
                            -{Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)}%
                        </span>
                    )}
                    {product.tag && (
                        <span className="bg-brand-primary text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm">
                            {product.tag}
                        </span>
                    )}
                </div>

                {/* Floating Actions (Right) */}
                <div className="absolute top-2 right-2 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <button
                        onClick={handleToggleWishlist}
                        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 ${isWishlisted ? 'bg-brand-primary text-white' : 'bg-white text-gray-800 hover:text-brand-primary'}`}
                        aria-label="Añadir a favoritos"
                        title="Añadir a favoritos"
                    >
                        <HeartIcon isFilled={isWishlisted} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-all hover:scale-105 hover:text-brand-primary"
                        aria-label="Vista Rápida"
                        title="Vista Rápida"
                    >
                        <EyeIcon />
                    </button>
                </div>

                {/* Product Image */}
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4 transition-transform duration-700 ease-in-out group-hover:scale-105" 
                />
            </div>

            {/* Product Details - Centered & Elegant */}
            <div className="p-4 flex flex-col flex-grow text-center">
                
                {/* Brand */}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                    {product.brand}
                </span>

                {/* Name - Serif Font for Elegance */}
                <h3 className="font-serif text-base text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                    <div className="mb-2 opacity-80">
                        {renderStars()}
                    </div>
                )}

                {/* Color Variants (if any) - Centered dots */}
                {product.variants?.Tono && (
                    <div className="flex justify-center items-center gap-1.5 mb-2">
                        {product.variants.Tono.slice(0, 4).map(v => (
                            <span 
                                key={v.value} 
                                className="block w-2 h-2 rounded-full border border-gray-200" 
                                style={{ backgroundColor: v.colorCode }} 
                                title={v.value}
                            ></span>
                        ))}
                        {product.variants.Tono.length > 4 && <span className="text-[10px] text-gray-400">+</span>}
                    </div>
                )}
                
                {/* Price - Push to bottom */}
                <div className="mt-auto flex flex-col items-center justify-end gap-1 pb-3">
                     {isDiscounted && (
                        <span className="text-xs text-gray-400 line-through decoration-gray-300 font-light">
                            {formatCurrency(product.regularPrice!, currency)}
                        </span>
                    )}
                    <span className={`text-lg font-medium tracking-wide ${isDiscounted ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatCurrency(product.price, currency)}
                    </span>
                </div>

                {/* Add Button - Sleek Bar */}
                <button
                    ref={btnRef}
                    onClick={handleAddToCartClick}
                    className="w-full bg-black text-white text-xs font-bold uppercase py-3 tracking-widest hover:bg-brand-primary transition-colors duration-300 flex items-center justify-center gap-2 group/btn mt-2"
                >
                    <span>Añadir</span>
                </button>
            </div>
        </div>
    );
};
