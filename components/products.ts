
import type { Product } from './types';

export const allProducts: Product[] = [
    {
        id: 46060,
        name: "Perfume All or Nothing Amplified",
        brand: "All or Nothing",
        price: 62.99,
        regularPrice: 75.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46060%2F46060_1.png",
        description: "Una fragancia poderosa y cautivadora que amplifica tu esencia única. Notas de nardo y ámbar. Edición lanzamiento.",
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
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47028%2F47028_1.png",
        description: "Hidratación lujosa para prolongar el aroma de tu perfume favorito durante todo el día.",
        stock: 100,
        category: "perfume"
    },
    {
        id: 38863,
        name: "Barra de Labios Ultra Brillo THE ONE",
        brand: "THE ONE",
        price: 7.99,
        regularPrice: 14.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F38863%2F38863_1.png",
        description: "Brillo irresistible y color intenso en una sola pasada. Acabado ultra-glossy.",
        stock: 300,
        category: "makeup",
        tag: "OFERTA",
        variants: { "Tono": [{ value: "Amber Fruity", colorCode: "#e27a3f" }, { value: "Matte Burgundy", colorCode: "#800020" }] }
    },
    {
        id: 46047,
        name: "Eau de Parfum Love Potion Cherry on Top",
        brand: "Love Potion",
        price: 25.99,
        regularPrice: 46.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46047%2F46047_1.png",
        description: "Fragancia dulce y juguetona con notas de cereza y chocolate. 50 ml.",
        stock: 40,
        category: "perfume",
        tag: "NOVEDAD"
    },
    {
        id: 48083,
        name: "Set Love Potion: EDP + Crema + Caja",
        brand: "Love Potion",
        price: 29.99,
        regularPrice: 58.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48083%2F48083_1.png",
        description: "Set festivo que incluye Eau de Parfum, crema de manos y caja exclusiva de Jan y Valentina.",
        stock: 20,
        category: "perfume",
        tag: "SET"
    },
    {
        id: 47499,
        name: "Eau de Toilette Elvie Midnight Magic",
        brand: "Elvie",
        price: 22.99,
        regularPrice: 47.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47499%2F47499_1.png",
        description: "Embárcate en un viaje mágico nocturno con notas florales y almizcle.",
        stock: 30,
        category: "perfume"
    },
    {
        id: 48650,
        name: "Mascara Winter Wanderlust Waterproof",
        brand: "THE ONE",
        price: 9.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48650%2F48650_1.png",
        description: "Volumen extremo resistente al agua para cautivar en cualquier clima.",
        stock: 150,
        category: "makeup"
    },
    {
        id: 47005,
        name: "Crema de Día Reafirmante Royal Velvet SPF 20",
        brand: "Royal Velvet",
        price: 43.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47005%2F47005_1.png",
        description: "Fortalece la estructura de la piel y mejora su elasticidad con protección solar.",
        stock: 60,
        category: "skincare"
    },
    {
        id: 47007,
        name: "Contorno de Ojos Reafirmante Royal Velvet",
        brand: "Royal Velvet",
        price: 30.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47007%2F47007_1.png",
        description: "Tratamiento específico para reafirmar y suavizar la zona de los ojos.",
        stock: 50,
        category: "skincare"
    },
    {
        id: 48117,
        name: "Crema de Noche Royal Velvet Especial",
        brand: "Royal Velvet",
        price: 23.99,
        regularPrice: 43.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48117%2F48117_1.png",
        description: "Edición especial de noche para una piel visiblemente más firme al despertar.",
        stock: 45,
        category: "skincare",
        tag: "OFERTA"
    },
    {
        id: 42499,
        name: "Eau de Toilette Eclat Femme Weekend",
        brand: "Eclat",
        price: 26.99,
        regularPrice: 42.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42499%2F42499_1.png",
        description: "Sofisticación parisina para un fin de semana lleno de luz y frescura.",
        stock: 55,
        category: "perfume"
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
        description: "Caja rígida de alta calidad para presentaciones de lujo.",
        stock: 100,
        category: "accessories"
    },
    {
        id: 36152,
        name: "Crema Universal Frambuesa",
        brand: "Crema Universal",
        price: 7.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F36152%2F36152_1.png",
        description: "Fórmula 99% natural que hidrata y protege pieles secas.",
        stock: 1000,
        category: "skincare",
        rating: 5,
        reviewCount: 3142
    }
];
