
import type { Product } from './types';

export const allProducts: Product[] = [
    // --- NUEVOS PRODUCTOS (SEGÚN HTML PROPORCIONADO) ---
    {
        id: 48922,
        name: "Peine Golden",
        brand: "Oriflame",
        price: 3.84,
        regularPrice: 6.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48922%2F48922_1.png",
        description: "Peine de púas anchas con acabado dorado premium. Ideal para desenredar sin romper la fibra capilar.",
        stock: 120,
        category: "accessories",
        tag: "NOVEDAD",
        rating: 5,
        reviewCount: 1
    },
    {
        id: 47697,
        name: "Champú Nutritivo Milk & Honey Gold",
        brand: "Milk & Honey Gold",
        price: 5.38,
        regularPrice: 12.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47697%2F47697_1.png",
        description: "Limpia y nutre profundamente el cabello dejándolo suave y brillante con extractos orgánicos de leche y miel.",
        stock: 300,
        category: "hair",
        tag: "NOVEDAD",
        rating: 4.8,
        reviewCount: 150
    },
    {
        id: 47698,
        name: "Acondicionador Nutritivo Milk & Honey Gold",
        brand: "Milk & Honey Gold",
        price: 5.38,
        regularPrice: 12.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47698%2F47698_1.png",
        description: "Acondicionador rico y cremoso que desenreda y acondiciona intensamente el cabello seco.",
        stock: 250,
        category: "hair",
        tag: "NOVEDAD",
        rating: 4.8,
        reviewCount: 120
    },
    {
        id: 47262,
        name: "Serum Reparador de Noche DUOLOGI",
        brand: "Duologi",
        price: 7.69,
        regularPrice: 20.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47262%2F47262_1.png",
        description: "Cuidado intensivo nocturno que repara la fibra capilar mientras duermes. Textura ligera y no grasa.",
        stock: 88,
        category: "hair",
        tag: "NOVEDAD",
        rating: 4.9,
        reviewCount: 295
    },
    {
        id: 46985,
        name: "Gel de Peinado DUOLOGI",
        brand: "Duologi",
        price: 5.23,
        regularPrice: 17.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46985%2F46985_1.png",
        description: "Define tu estilo con una fijación flexible y duradera. Protege el cabello de la humedad.",
        stock: 140,
        category: "hair",
        tag: "NOVEDAD",
        rating: 4.8,
        reviewCount: 277
    },
    {
        id: 46984,
        name: "Pre-Champú Reparador DUOLOGI",
        brand: "Duologi",
        price: 2.30,
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46984%2F46984_1.png",
        description: "Tratamiento intensivo previo al lavado para fortalecer y preparar el cabello dañado.",
        stock: 200,
        category: "hair",
        tag: "NOVEDAD",
        rating: 4.8,
        reviewCount: 208
    },
    {
        id: 48915,
        name: "Turbante de Satén Arctic Ritual",
        brand: "Oriflame",
        price: 6.92,
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48915%2F48915_1.png",
        description: "Suave satén que protege el cabello durante el descanso, evitando el encrespamiento y la rotura.",
        stock: 15,
        category: "accessories",
        tag: "NOVEDAD",
        rating: 4.7,
        reviewCount: 12
    },

    // --- FRAGANCIAS Y NOVEDADES PREVIAS ---
    {
        id: 48028,
        name: "Eau de Parfum Giordani Gold White",
        brand: "Giordani Gold",
        price: 22.32,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48028%2F48028_1.png",
        description: "Una fragancia luminosa y sofisticada que captura la esencia de la elegancia italiana.",
        stock: 45,
        category: "perfume",
        tag: "NOVEDAD",
        rating: 4.9,
        reviewCount: 33
    },
    {
        id: 46801,
        name: "Eau de Parfum Divine Dark Velvet",
        brand: "Divine",
        price: 34.65,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46801%2F46801_1.png",
        description: "Intenso, glamuroso y aterciopelado. Aroma floral oriental.",
        stock: 28,
        category: "perfume",
        tag: "OFERTA",
        rating: 4.8,
        reviewCount: 683
    }
];
