
import type { Product } from './types';

export const allProducts: Product[] = [
    // --- PRODUCTOS HIGIENE DENTAL ---
    {
        id: 49135,
        name: "Cepillo de Dientes para Niños Dureza Suave Optifresh",
        brand: "Optifresh",
        price: 2.15,
        regularPrice: 5.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F49135%2F49135_1.png",
        description: "Cepillo de cerdas suaves diseñado específicamente para las encías sensibles de los niños.",
        stock: 50,
        category: "personal-care",
        tag: "NOVEDAD",
        rating: 5,
        reviewCount: 12
    },
    {
        id: 44952,
        name: "Pasta de Dientes Máxima Frescura Optifresh",
        brand: "Optifresh",
        price: 7.70,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44952%2F44952_1.png",
        description: "Aliento fresco duradero y protección total contra la placa y las caries.",
        stock: 150,
        category: "personal-care",
        rating: 4.8,
        reviewCount: 1350
    },
    {
        id: 44954,
        name: "Pasta de Dientes Suave de Fresa para Niños Optifresh",
        brand: "Optifresh",
        price: 4.24,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44954%2F44954_1.png",
        description: "Delicioso sabor a fresa que anima a los niños a cepillarse los dientes a diario.",
        stock: 80,
        category: "personal-care",
        rating: 4.8,
        reviewCount: 995
    },

    // --- ACCESORIOS Y BIENESTAR INVIERNO ---
    {
        id: 48540,
        name: "Manta Winter's Embrace",
        brand: "Oriflame",
        price: 16.93,
        regularPrice: 37.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48540%2F48540_1.png",
        description: "Manta ultrasuave y cálida, perfecta para las noches de invierno en casa.",
        stock: 25,
        category: "accessories",
        tag: "OFERTA",
        rating: 4.9,
        reviewCount: 234
    },
    {
        id: 48048,
        name: "Calcetines Winter's Embrace",
        brand: "Oriflame",
        price: 6.54,
        regularPrice: 14.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48048%2F48048_1.png",
        description: "Calcetines térmicos de tacto peluche para mantener tus pies calientes con estilo.",
        stock: 100,
        category: "accessories",
        tag: "NOVEDAD",
        rating: 4.9,
        reviewCount: 161
    },

    // --- SETS DE REGALO Y COSMÉTICA ---
    {
        id: 47847,
        name: "Lote Ritual de Cuidado de la Piel Wellosophy",
        brand: "Wellosophy",
        price: 38.49,
        regularPrice: 101.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47847%2F47847_1.png",
        description: "Set completo de nutrición y cuidado facial para una piel radiante desde el interior.",
        stock: 15,
        category: "skincare",
        tag: "SET",
        rating: 4.7,
        reviewCount: 62
    },
    {
        id: 48115,
        name: "Crema de Día Reafirmante SPF 20 Royal Velvet - Edición Especial",
        brand: "Royal Velvet",
        price: 19.24,
        regularPrice: 42.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48115%2F48115_1.png",
        description: "Tratamiento reafirmante con extracto de Flor de Iris Negra en envase de lujo.",
        stock: 30,
        category: "skincare",
        tag: "NOVEDAD",
        rating: 4.9,
        reviewCount: 156
    },
    {
        id: 48082,
        name: "Lote Giordani Gold Essenza Supreme",
        brand: "Giordani Gold",
        price: 66.61,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48082%2F48082_1.png",
        description: "La máxima expresión del lujo en fragancias: Perfume y loción corporal coordinada.",
        stock: 10,
        category: "perfume",
        tag: "SET",
        rating: 5,
        reviewCount: 1
    }
];
