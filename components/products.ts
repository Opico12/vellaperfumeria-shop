
import type { Product } from './types';

export const allProducts: Product[] = [
    // --- 2025 NEW ARRIVALS (From HTML) ---
    {
        id: 41070,
        name: "Contorno de Ojos y Labios Renewing Restore Novage+",
        brand: "Novage+",
        price: 16.99,
        regularPrice: 38.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F41070%2F41070_1.png&MediaId=19720523&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Contorno de ojos y labios avanzado que restaura la elasticidad y reduce arrugas profundas.",
        stock: 50,
        category: 'skincare',
        tag: 'NOVEDAD',
        rating: 4.9,
        reviewCount: 513,
        statusLabel: "De vuelta muy pronto"
    },
    {
        id: 44098,
        name: "Tratamiento de Día SPF 30 Multi-Correcting Restore Novage+",
        brand: "Novage+",
        price: 24.99,
        regularPrice: 55.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44098%2F44098_1.png&MediaId=19720543&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Crema de día multi-correctora con SPF 30. Fortalece la barrera cutánea y combate el envejecimiento.",
        stock: 40,
        category: 'skincare',
        tag: 'OFERTA',
        rating: 4.9,
        reviewCount: 844,
    },
    {
        id: 47514,
        name: "Eau de Parfum Miss Giordani Floral",
        brand: "Giordani Gold",
        price: 17.99,
        regularPrice: 44.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47514%2F47514_1.png&MediaId=19584358&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Un aroma floral exuberante y sofisticado para celebrar la feminidad.",
        stock: 120,
        category: 'perfume',
        tag: 'NOVEDAD',
        rating: 4.9,
        reviewCount: 763,
    },
    {
        id: 47502,
        name: "Eau de Parfum Mister Giordani Aqua",
        brand: "Giordani Gold",
        price: 18.99,
        regularPrice: 44.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47502%2F47502_1.png&MediaId=19717478&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Una fragancia acuática y amaderada, fresca y refinada para el hombre moderno.",
        stock: 80,
        category: 'perfume', // mapped from men/fragrance
        tag: 'NOVEDAD',
        rating: 4.9,
        reviewCount: 519,
        statusLabel: "De vuelta muy pronto"
    },
    {
        id: 47499,
        name: "Eau de Toilette Elvie Midnight Magic",
        brand: "Elvie",
        price: 17.99,
        regularPrice: 41.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47499%2F47499_1.png&MediaId=19828893&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Una fragancia mágica inspirada en el misterio de la medianoche.",
        stock: 150,
        category: 'perfume',
        tag: 'NOVEDAD',
        rating: 4.8,
        reviewCount: 536,
    },
    // --- EXISTING PRODUCTS ---
    {
        id: 47188,
        name: "Iluminador Líquido Illuskin THE ONE",
        brand: "The ONE",
        price: 8.46,
        regularPrice: 20.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47188%2F47188_1.png&MediaId=20570078&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Iluminador líquido versátil para un brillo natural y radiante.",
        stock: 100,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.6,
        reviewCount: 10,
        variants: {
            'Tono': [
                { value: 'Champagne', colorCode: '#F7E7CE' },
                { value: 'Rose Gold', colorCode: '#B76E79' }
            ]
        }
    },
    {
        id: 47977,
        name: "Brillo para Pestañas y Cejas Glitter THE ONE",
        brand: "The ONE",
        price: 8.46,
        regularPrice: 18.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47977%2F47977_1.png&MediaId=20570089&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Toque de brillo festivo para pestañas y cejas.",
        stock: 80,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.8,
        reviewCount: 4,
        variants: {
            'Tono': [
                { value: 'Silver Glitter', colorCode: '#C0C0C0' },
                { value: 'Gold Glitter', colorCode: '#FFD700' }
            ]
        }
    },
    {
        id: 48650,
        name: "Máscara de Pestañas Winter Wonder Lash Waterproof THE ONE",
        brand: "The ONE",
        price: 5.38,
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48650%2F48650_1.png&MediaId=20570152&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Máscara 5 en 1 a prueba de agua, edición de invierno.",
        stock: 120,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.9,
        reviewCount: 16,
        variants: {
            'Tono': [
                { value: 'Black', colorCode: '#000000' }
            ]
        }
    },
    {
        id: 47253,
        name: "Pomada para Cejas THE ONE",
        brand: "The ONE",
        price: 5.38,
        regularPrice: 18.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47253%2F47253_1.png&MediaId=20250127&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Pomada de alta pigmentación para definir y rellenar las cejas.",
        stock: 90,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.8,
        reviewCount: 551,
        variants: {
            'Tono': [
                { value: 'Blonde', colorCode: '#b38b6d' },
                { value: 'Brown', colorCode: '#6b4e3d' },
                { value: 'Dark Brown', colorCode: '#3e2c22' }
            ]
        }
    },
    {
        id: 46134,
        name: "BB Cream Beautifier MAX SPF 15 THE ONE",
        brand: "The ONE",
        price: 5.77,
        regularPrice: 17.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46134%2F46134_1.png&MediaId=20038270&Version=4&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "BB Cream multifunción que perfecciona, hidrata y protege.",
        stock: 150,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.8,
        reviewCount: 293,
        variants: {
            'Tono': [
                { value: 'Fair', colorCode: '#f3e5dc' },
                { value: 'Light', colorCode: '#ebd7c9' },
                { value: 'Medium', colorCode: '#dcbfa8' },
                { value: 'Dark', colorCode: '#c49e82' }
            ]
        }
    },
    {
        id: 46901,
        name: "Perlas con Serum Giordani Gold - Edición Especial",
        brand: "Giordani Gold",
        price: 16.93,
        regularPrice: 35.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46901%2F46901_1.png&MediaId=20449670&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Perlas bronceadoras con serum antienvejecimiento.",
        stock: 50,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.8,
        reviewCount: 92,
        variants: {
            'Tono': [
                { value: 'Natural Radiance', colorCode: '#d4b895' },
                { value: 'Golden Bronze', colorCode: '#b08d73' }
            ]
        }
    },
    {
        id: 46929,
        name: "Sombra de Ojos Colour Unlimited THE ONE",
        brand: "The ONE",
        price: 5.38,
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46929%2F46929_1.png&MediaId=20181760&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Sombra de ojos en stick de larga duración.",
        stock: 200,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 1490,
        variants: {
            'Tono': [
                { value: 'Soft Nude', colorCode: '#e8cbb9' },
                { value: 'Bronze', colorCode: '#bfa07f' },
                { value: 'Espresso', colorCode: '#4a3b32' }
            ]
        }
    },
    {
        id: 48039,
        name: "Máscara de Pestañas Hypnotic Colour THE ONE",
        brand: "The ONE",
        price: 6.15,
        regularPrice: 18.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48039%2F48039_1.png&MediaId=20301795&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Máscara de pestañas de color intenso.",
        stock: 120,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.8,
        reviewCount: 412,
        variants: {
            'Tono': [
                { value: 'Black', colorCode: '#000000' },
                { value: 'Deep Blue', colorCode: '#00008b' }
            ]
        }
    },
    {
        id: 46888,
        name: "Rotulador de Labios Stain & Stay THE ONE",
        brand: "The ONE",
        price: 5.77,
        regularPrice: 16.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46888%2F46888_1.png&MediaId=20030909&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Tinte de labios en formato rotulador de larga duración.",
        stock: 85,
        category: 'makeup',
        rating: 4.4,
        reviewCount: 748,
        variants: {
            'Tono': [
                { value: 'Ruby Red', colorCode: '#a81c30' },
                { value: 'Coral', colorCode: '#ff6f61' }
            ]
        }
    },
    {
        id: 47704,
        name: "Delineador de Ojos High Impact THE ONE",
        brand: "The ONE",
        price: 4.23,
        regularPrice: 13.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47704%2F47704_1.png&MediaId=20324587&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Delineador de ojos de alto impacto y precisión.",
        stock: 150,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.8,
        reviewCount: 675,
        variants: {
            'Tono': [
                { value: 'Black', colorCode: '#000000' },
                { value: 'Mocha', colorCode: '#4b3621' }
            ]
        }
    },
    {
        id: 46940,
        name: "Stick Iluminador con Color THE ONE",
        brand: "The ONE",
        price: 7.69,
        regularPrice: 22.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46940%2F46940_1.png&MediaId=20026191&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Iluminador y colorete en stick fácil de difuminar.",
        stock: 60,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 556,
        variants: {
            'Tono': [
                { value: 'Coral Glow', colorCode: '#ff7f50' },
                { value: 'Bronze Luster', colorCode: '#cd7f32' }
            ]
        }
    },
    {
        id: 47180,
        name: "Bálsamo de Labios Smooth Like Butter Waunt",
        brand: "Waunt",
        price: 7.69,
        regularPrice: 16.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47180%2F47180_1.png&MediaId=19970405&Version=4&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Bálsamo labial ultra nutritivo con efecto manteca.",
        stock: 90,
        category: 'skincare',
        rating: 4.8,
        reviewCount: 592,
        variants: {
            'Tono': [
                { value: 'Soft Pink', colorCode: '#FFC0CB' }
            ]
        }
    },
    {
        id: 47192,
        name: "Sombra de Ojos Líquida THE ONE",
        brand: "The ONE",
        price: 6.92,
        regularPrice: 20.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47192%2F47192_1.png&MediaId=20325039&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Sombra líquida metálica de alto brillo.",
        stock: 80,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.6,
        reviewCount: 173,
        variants: {
            'Tono': [
                { value: 'Silver Chrome', colorCode: '#c0c0c0' },
                { value: 'Rose Metal', colorCode: '#b76e79' },
                { value: 'Gold Rush', colorCode: '#ffd700' }
            ]
        }
    },
    {
        id: 48640,
        name: "Barra de Labios Líquida Glitter THE ONE",
        brand: "The ONE",
        price: 9.23,
        regularPrice: 17.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48640%2F48640_1.png&MediaId=20570134&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Labial líquido con acabado glitter espectacular.",
        stock: 70,
        category: 'makeup',
        tag: 'NOVEDAD',
        rating: 4.6,
        reviewCount: 21,
        variants: {
            'Tono': [
                { value: 'Red Sparkle', colorCode: '#dc143c' },
                { value: 'Pink Shimmer', colorCode: '#ff69b4' }
            ]
        }
    },
    {
        id: 46906,
        name: "Maquillaje Stress-Free Everlasting Sync SPF 20",
        brand: "The ONE",
        price: 8.46,
        regularPrice: 20.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46906%2F46906_1.png&MediaId=19738309&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Base de maquillaje inteligente que se adapta a tu piel.",
        stock: 200,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 1045,
        variants: {
            'Tono': [
                { value: 'Porcelain', colorCode: '#f5deb3' },
                { value: 'Ivory', colorCode: '#fffff0' },
                { value: 'Beige', colorCode: '#f5f5dc' },
                { value: 'Sand', colorCode: '#c2b280' }
            ]
        }
    },
    {
        id: 42121,
        name: "Paleta de Ojos y Rostro Fabulous Beauty Giordani Gold",
        brand: "Giordani Gold",
        price: 19.24,
        regularPrice: 42.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42121%2F42121_1.png&MediaId=19732116&Version=5&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Paleta completa de lujo para ojos y rostro.",
        stock: 40,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 375,
        variants: {
            'Tono': [
                { value: 'Universal', colorCode: '#d8bfd8' }
            ]
        }
    },
    {
        id: 42102,
        name: "Maquillaje Mineral de Larga Duración SPF 20 Giordani Gold",
        brand: "Giordani Gold",
        price: 13.08,
        regularPrice: 31.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42102%2F42102_1.png&MediaId=18431815&Version=3&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Base mineral de larga duración para una piel impecable.",
        stock: 120,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 1074,
        variants: {
            'Tono': [
                { value: 'Light Ivory', colorCode: '#fff8dc' },
                { value: 'Natural Beige', colorCode: '#eec591' }
            ]
        }
    },
    {
        id: 41107,
        name: "Corrector y Serum Potenciador Giordani Gold",
        brand: "Giordani Gold",
        price: 8.46,
        regularPrice: 24.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F41107%2FES%2F41107_1.png&MediaId=16778914&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Corrector con serum antiedad para ojos.",
        stock: 95,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 1066,
        variants: {
            'Tono': [
                { value: 'Light', colorCode: '#faebd7' },
                { value: 'Medium', colorCode: '#deb887' }
            ]
        }
    },
    {
        id: 43244,
        name: "Maquillaje Eternal Glow SPF 25 Giordani Gold",
        brand: "Giordani Gold",
        price: 16.16,
        regularPrice: 32.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F43244%2FES%2F43244_1.png&MediaId=18142025&Version=8&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Base iluminadora para un brillo eterno.",
        stock: 80,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 1027,
        variants: {
            'Tono': [
                { value: 'Vanilla', colorCode: '#f3e5ab' },
                { value: 'Porcelain', colorCode: '#fddde6' },
                { value: 'Marble', colorCode: '#f6e3d5' }
            ]
        }
    },
    {
        id: 41760,
        name: "Stick de Aceite para Uñas y Cutículas THE ONE Expert",
        brand: "The ONE",
        price: 4.61,
        regularPrice: 10.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F41760%2F41760_1.png&MediaId=14318005&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Cuidado nutritivo para uñas y cutículas en formato stick.",
        stock: 200,
        category: 'personal-care',
        rating: 4.8,
        reviewCount: 641
    },
    {
        id: 42652,
        name: "Barra de Labios Iconic Satin SPF 15 Giordani Gold",
        brand: "Giordani Gold",
        price: 9.23,
        regularPrice: 22.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42652%2F42652_1.png&MediaId=18837652&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Labial satinado de lujo con SPF 15.",
        stock: 150,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 450,
        variants: {
            'Tono': [
                { value: 'Nude Rose', colorCode: '#ffe4e1' },
                { value: 'Vintage Peach', colorCode: '#ffdab9' },
                { value: 'Red Passion', colorCode: '#8b0000' }
            ]
        }
    },
    {
        id: 44835,
        name: "Polvos Compactos con Serum Giordani Gold",
        brand: "Giordani Gold",
        price: 13.08,
        regularPrice: 26.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44835%2F44835_1.png&MediaId=19278494&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Polvos compactos sedosos con beneficios antiedad.",
        stock: 100,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 372,
        variants: {
            'Tono': [
                { value: 'Light', colorCode: '#f0e68c' },
                { value: 'Medium', colorCode: '#bdb76b' }
            ]
        }
    },
    {
        id: 34647,
        name: "Polvos Compactos Everlasting THE ONE",
        brand: "The ONE",
        price: 9.23,
        regularPrice: 19.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F34647%2F34647_1.png&MediaId=14800970&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Polvos matificantes de larga duración.",
        stock: 180,
        category: 'makeup',
        rating: 4.8,
        reviewCount: 329,
        variants: {
            'Tono': [
                { value: 'Porcelain', colorCode: '#fff0f5' },
                { value: 'Nude', colorCode: '#ffe4c4' }
            ]
        }
    },
    {
        id: 46588,
        name: "Brillo de Labios Oh! Sweet Glossy OnColour",
        brand: "OnColour",
        price: 2.69,
        regularPrice: 4.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46588%2F46588_1.png&MediaId=18704766&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Brillo labial dulce y brillante.",
        stock: 250,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 1388,
        variants: {
            'Tono': [
                { value: 'Candy Pink', colorCode: '#ffb6c1' },
                { value: 'Peach Syrup', colorCode: '#ffcc99' }
            ]
        }
    },
    {
        id: 37728,
        name: "Perfilador de Labios Ultimate THE ONE",
        brand: "The ONE",
        price: 4.23,
        regularPrice: 13.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F37728%2F37728_1.png&MediaId=13799751&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Perfilador de labios retráctil de alta definición.",
        stock: 130,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 1226,
        variants: {
            'Tono': [
                { value: 'Nude', colorCode: '#deb887' },
                { value: 'Rose', colorCode: '#ff007f' },
                { value: 'Red', colorCode: '#ff0000' }
            ]
        }
    },
    {
        id: 46611,
        name: "Barra de Labios Cremosa OnColour (Tono 1)",
        brand: "OnColour",
        price: 1.92,
        regularPrice: 5.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46611%2F46611_1.png&MediaId=18840964&Version=5&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Labial cremoso con colores vibrantes.",
        stock: 300,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 718,
        variants: {
            'Tono': [
                { value: 'Red Kiss', colorCode: '#ff0000' }
            ]
        }
    },
    {
        id: 46549,
        name: "Máscara de Pestañas False Lashes Salon Lift THE ONE",
        brand: "The ONE",
        price: 6.92,
        regularPrice: 18.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46549%2F46549_1.png&MediaId=18810797&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Efecto pestañas postizas con elevación de salón.",
        stock: 140,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 707,
        variants: {
            'Tono': [
                { value: 'Black', colorCode: '#000000' }
            ]
        }
    },
    {
        id: 46601,
        name: "Barra de Labios Cremosa OnColour (Tono 2)",
        brand: "OnColour",
        price: 1.92,
        regularPrice: 5.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46601%2FES%2F46601_1.png&MediaId=18220588&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Labial cremoso para uso diario.",
        stock: 200,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 690,
        variants: {
            'Tono': [
                { value: 'Pink Orchid', colorCode: '#da70d6' }
            ]
        }
    },
    {
        id: 45361,
        name: "Sombra de Ojos Líquida Metallic THE ONE",
        brand: "The ONE",
        price: 6.54,
        regularPrice: 16.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45361%2FES%2F45361_1.png&MediaId=18267832&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Sombra líquida de acabado metálico.",
        stock: 100,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 649,
        variants: {
            'Tono': [
                { value: 'Steel', colorCode: '#778899' },
                { value: 'Copper', colorCode: '#b87333' }
            ]
        }
    },
    {
        id: 38690,
        name: "Barra de Labios Cremosa OnColour (Tono 3)",
        brand: "OnColour",
        price: 1.92,
        regularPrice: 5.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F38690%2FES%2F38690_1.png&MediaId=18220058&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Labial hidratante y suave.",
        stock: 220,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 536,
        variants: {
            'Tono': [
                { value: 'Nude Peony', colorCode: '#d8bfd8' }
            ]
        }
    },
    {
        id: 46595,
        name: "Gel para Cejas Lift & Fix THE ONE",
        brand: "The ONE",
        price: 6.54,
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46595%2F46595_1.png&MediaId=18715133&Version=1&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Gel fijador transparente para cejas.",
        stock: 110,
        category: 'makeup',
        rating: 4.7,
        reviewCount: 494,
        variants: {
            'Tono': [
                { value: 'Transparent', colorCode: '#ffffff' }
            ]
        }
    },
    {
        id: 38991,
        name: "Esmalte de Uñas OnColour",
        brand: "OnColour",
        price: 2.30,
        regularPrice: 7.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F38991%2F38991_1.png&MediaId=12525117&Version=2&w=600&bc=%23f5f5f5&ib=%23f5f5f5&h=600&q=90&imageFormat=WebP",
        description: "Esmalte de uñas de colores vivos y secado rápido.",
        stock: 300,
        category: 'makeup',
        rating: 4.6,
        reviewCount: 1740,
        variants: {
            'Tono': [
                { value: 'Ice Cream', colorCode: '#fffdd0' },
                { value: 'Minty', colorCode: '#98ff98' },
                { value: 'Candy', colorCode: '#ff1493' }
            ]
        }
    }
];
