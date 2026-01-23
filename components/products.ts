
import type { Product } from './types';

export const allProducts: Product[] = [
    {
        id: 46060,
        name: "Perfume All or Nothing Amplified",
        brand: "All or Nothing",
        price: 62.99,
        regularPrice: 75.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46060%2F46060_1.png",
        description: "Una fragancia poderosa y cautivadora que amplifica tu esencia única. Notas de nardo y ámbar.",
        stock: 50,
        category: "perfume",
        tag: "NOVEDAD",
        rating: 5,
        reviewCount: 24
    },
    {
        id: 47028,
        name: "Crema Perfumada All or Nothing Amplified",
        brand: "All or Nothing",
        price: 9.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47028%2F47028_1.png",
        description: "Hidratación lujosa para prolongar el aroma de tu perfume favorito.",
        stock: 100,
        category: "perfume"
    },
    {
        id: 38863,
        name: "Barra de Labios Ultra Brillo THE ONE",
        brand: "THE ONE",
        price: 7.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F38863%2F38863_1.png",
        description: "Brillo irresistible y color intenso en una sola pasada.",
        stock: 300,
        category: "makeup",
        variants: { "Tono": [{ value: "Amber Fruity", colorCode: "#e27a3f" }] }
    },
    {
        id: 46047,
        name: "Eau de Parfum Love Potion Cherry on Top",
        brand: "Love Potion",
        price: 25.99,
        regularPrice: 46.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46047%2F46047_1.png",
        description: "Fragancia dulce con notas de cereza y chocolate. 50 ml.",
        stock: 40,
        category: "perfume",
        tag: "OFERTA"
    },
    {
        id: 48083,
        name: "Set Love Potion: EDP + Crema + Caja",
        brand: "Love Potion",
        price: 29.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48083%2F48083_1.png",
        description: "Set festivo con Eau de Parfum y Crema de Manos en caja exclusiva.",
        stock: 20,
        category: "perfume",
        tag: "SET"
    },
    {
        id: 47499,
        name: "Eau de Toilette Elvie Midnight Magic",
        brand: "Elvie",
        price: 22.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47499%2F47499_1.png",
        description: "Aroma mágico y nocturno con notas florales.",
        stock: 30,
        category: "perfume"
    },
    {
        id: 48650,
        name: "Mascara Winter Wanderlust Waterproof",
        brand: "THE ONE",
        price: 9.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48650%2F48650_1.png",
        description: "Volumen extremo resistente al agua para cautivar los sentidos.",
        stock: 150,
        category: "makeup"
    },
    {
        id: 47005,
        name: "Crema de Día Reafirmante Royal Velvet SPF 20",
        brand: "Royal Velvet",
        price: 43.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47005%2F47005_1.png",
        description: "Fortalece la piel y mejora su elasticidad con protección solar.",
        stock: 60,
        category: "skincare"
    },
    {
        id: 47007,
        name: "Contorno de Ojos Reafirmante Royal Velvet",
        brand: "Royal Velvet",
        price: 30.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47007%2F47007_1.png",
        description: "Tratamiento reafirmante para la delicada zona de los ojos.",
        stock: 50,
        category: "skincare"
    },
    {
        id: 48117,
        name: "Crema de Noche Royal Velvet Especial",
        brand: "Royal Velvet",
        price: 23.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48117%2F48117_1.png",
        description: "Edición especial. Nutrición nocturna para una piel más firme.",
        stock: 45,
        category: "skincare",
        tag: "OFERTA"
    },
    {
        id: 47420,
        name: "Espátula Oriflame Exclusive",
        brand: "Accesorios",
        price: 6.29,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47420%2F47420_1.png",
        description: "Herramienta higiénica para aplicación de cosméticos.",
        stock: 200,
        category: "accessories"
    },
    {
        id: 48975,
        name: "Bolsa de Regalo Festive Grande",
        brand: "Jan & Valentina",
        price: 3.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48975%2F48975_1.png",
        description: "Bolsa de regalo grande con diseño festivo exclusivo.",
        stock: 500,
        category: "accessories"
    },
    {
        id: 48970,
        name: "Caja de Regalo Festive Premium",
        brand: "Jan & Valentina",
        price: 10.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48970%2F48970_1.png",
        description: "Caja de alta calidad para presentaciones de lujo.",
        stock: 100,
        category: "accessories"
    },
    {
        id: 36152,
        name: "Crema Universal Frambuesa",
        brand: "Crema Universal",
        price: 7.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F36152%2F36152_1.png",
        description: "Fórmula 99% natural que hidrata y protege.",
        stock: 1000,
        category: "skincare"
    }
];
