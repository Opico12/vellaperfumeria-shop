
import React, { useState, useMemo, useEffect } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CheckoutPageProps {
    cartItems: CartItem[];
    currency: Currency;
    onClearCart: () => void;
    onNavigate: (view: View, payload?: any) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, currency, onClearCart, onNavigate }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'connecting' | 'authenticating' | 'processing' | 'success'>('idle');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);
    const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'unknown'>('unknown');

    // Form state for Billing Details
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        email: '',
        notes: ''
    });

    // Form state for Credit Card
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvc: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const subtotal = useMemo(() => {
        const items = orderSuccess ? purchasedItems : cartItems;
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems, purchasedItems, orderSuccess]);

    const hasShippingSaver = useMemo(() => {
        const items = orderSuccess ? purchasedItems : cartItems;
        return items.some(item => item.product.isShippingSaver);
    }, [cartItems, purchasedItems, orderSuccess]);

    const shippingCost = subtotal >= 35 || hasShippingSaver ? 0 : 6.00;
    const total = subtotal + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const detectCardType = (number: string) => {
        const cleanNumber = number.replace(/\D/g, '');
        if (cleanNumber.startsWith('4')) return 'visa';
        if (cleanNumber.startsWith('5')) return 'mastercard';
        return 'unknown';
    };

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            // Remove non-digits and limit to 16
            const raw = value.replace(/\D/g, '').slice(0, 16);
            setCardType(detectCardType(raw));
            // Add space every 4 digits
            formattedValue = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
        } else if (name === 'expiry') {
            // Remove non-digits and limit to 4
            const raw = value.replace(/\D/g, '').slice(0, 4);
            if (raw.length >= 2) {
                formattedValue = `${raw.slice(0, 2)}/${raw.slice(2)}`;
            } else {
                formattedValue = raw;
            }
        } else if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3); // Limit to 3 digits
        } else if (name === 'cardName') {
            formattedValue = value.toUpperCase();
        }

        setCardData(prev => ({ ...prev, [name]: formattedValue }));
        
        if (errors[name]) {
             setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        // Billing Validation
        if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
        if (!formData.lastName.trim()) newErrors.lastName = 'Los apellidos son obligatorios';
        if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
        if (!formData.zip.trim()) newErrors.zip = 'El código postal es obligatorio';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
             newErrors.email = 'Introduce un email válido';
        }

        // Card Validation (only if card is selected)
        if (paymentMethod === 'card') {
            const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '');
            if (cleanCardNumber.length < 16) newErrors.cardNumber = 'Número inválido';
            
            if (!cardData.cardName.trim()) newErrors.cardName = 'Titular obligatorio';
            
            if (!cardData.expiry || cardData.expiry.length < 5) {
                 newErrors.expiry = 'Incompleto';
            } else {
                const [month, year] = cardData.expiry.split('/');
                const monthNum = parseInt(month, 10);
                const yearNum = parseInt(year, 10);
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;
                
                if (monthNum < 1 || monthNum > 12) newErrors.expiry = 'Mes inválido';
                else if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) newErrors.expiry = 'Caducada';
            }
            
            if (!cardData.cvc || cardData.cvc.length < 3) newErrors.cvc = 'Incompleto';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;

        if (!validateForm()) {
            const firstError = document.querySelector('.border-red-500');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setPaymentStatus('connecting');

        // Procesamiento de Pago Real (Simulado visualmente)
        setTimeout(() => {
            setPaymentStatus('authenticating');
            
            setTimeout(() => {
                setPaymentStatus('processing');
                
                 setTimeout(() => {
                    setPurchasedItems([...cartItems]);
                    setPaymentStatus('success');
                    setOrderSuccess(true);
                    setOrderNumber(Math.floor(10000000 + Math.random() * 90000000).toString());
                    onClearCart();
                    window.scrollTo(0, 0);
                }, 2000); 

            }, 2500); 

        }, 1500); 
    };

    const getStatusText = () => {
        switch(paymentStatus) {
            case 'connecting': return 'Contactando con el emisor...';
            case 'authenticating': return 'Verificando 3D Secure...';
            case 'processing': return 'Autorizando transacción...';
            default: return 'Procesando...';
        }
    }

    const isBusy = paymentStatus === 'connecting' || paymentStatus === 'authenticating' || paymentStatus === 'processing';

    if (orderSuccess) {
        return (
            <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">¡Pago Autorizado!</h2>
                <p className="text-xl text-gray-600 mb-8">Tu pedido ha sido procesado correctamente. ID: <span className="font-bold text-brand-primary">#{orderNumber}</span></p>
                
                <div className="max-w-lg mx-auto bg-white rounded-lg p-8 border border-gray-200 mb-10 text-left shadow-md">
                    <h3 className="font-bold text-xl mb-6 border-b pb-4">Recibo de Compra</h3>
                    
                    <div className="space-y-4 mb-6">
                        {purchasedItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-shrink-0">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-contain rounded bg-white border" />
                                        <span className="absolute -top-2 -right-2 bg-gray-100 text-gray-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-gray-800 line-clamp-2">{item.product.name}</p>
                                        {item.selectedVariant && <p className="text-xs text-gray-500 truncate">{Object.values(item.selectedVariant).join(', ')}</p>}
                                    </div>
                                </div>
                                <span className="font-semibold text-gray-700 whitespace-nowrap ml-2">
                                    {formatCurrency(item.product.price * item.quantity, currency)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                         <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">{formatCurrency(subtotal, currency)}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-600">Envío:</span>
                            <span className="font-medium">{shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost, currency)}</span>
                        </div>
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-gray-600">Método de pago:</span>
                            <span className="font-medium capitalize">
                                {paymentMethod === 'card' ? 'Tarjeta Crédito/Débito' : paymentMethod === 'googlepay' ? 'Google Pay' : 'Transferencia'}
                            </span>
                        </div>
                        <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                            <span className="font-bold text-lg text-gray-800">Total cargado:</span>
                            <span className="font-bold text-xl text-green-700">{formatCurrency(total, currency)}</span>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 mt-6 bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Se ha enviado el recibo a <b>{formData.email}</b>. Gracias por confiar en Vellaperfumeria.</span>
                    </div>
                </div>

                <button 
                    onClick={() => onNavigate('products', 'all')}
                    className="bg-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-gray-800 transition-all transform hover:scale-105"
                >
                    Seguir comprando
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="mb-8 text-center md:text-left border-b pb-4">
                <h1 className="text-3xl font-extrabold text-brand-primary">Pasarela de Pago Segura</h1>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="mb-4 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 mb-8 text-lg">No tienes productos en el carrito.</p>
                    <button 
                        onClick={() => onNavigate('products', 'all')}
                        className="text-white bg-brand-primary px-6 py-3 rounded-md font-bold hover:bg-gray-800 transition-colors"
                    >
                        Ir a la tienda
                    </button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Columna Izquierda: Detalles de Facturación */}
                    <div className="w-full lg:w-7/12 space-y-8">
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6 border-b pb-2">
                                <h2 className="text-xl font-bold text-gray-800">Datos de Envío</h2>
                            </div>
                            
                            <form id="checkout-form" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                    <input 
                                        type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                        className={`w-full border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
                                    <input 
                                        type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                        className={`w-full border ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de la calle *</label>
                                    <input 
                                        type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Número de la casa y nombre de la calle" 
                                        className={`w-full border ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md mb-3 focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1 mb-2">{errors.address}</p>}
                                    <input type="text" placeholder="Apartamento, habitación, unidad, etc. (opcional)" className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-shadow" />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Localidad / Ciudad *</label>
                                    <input 
                                        type="text" name="city" value={formData.city} onChange={handleInputChange}
                                        className={`w-full border ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Código postal *</label>
                                    <input 
                                        type="text" name="zip" value={formData.zip} onChange={handleInputChange}
                                        className={`w-full border ${errors.zip ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                                    <input 
                                        type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                        className={`w-full border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de correo electrónico *</label>
                                    <input 
                                        type="email" name="email" value={formData.email} onChange={handleInputChange}
                                        className={`w-full border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Columna Derecha: Tu Pedido y Pago */}
                    <div className="w-full lg:w-5/12">
                        <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg border border-gray-200 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-4">Tu pedido</h2>
                            
                            {/* Lista de Productos */}
                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex-shrink-0">
                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-14 h-14 object-contain rounded bg-white border" />
                                                <span className="absolute -top-2 -right-2 bg-brand-purple text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-800 line-clamp-2">{item.product.name}</p>
                                                {item.selectedVariant && <p className="text-xs text-gray-500 truncate">{Object.values(item.selectedVariant).join(', ')}</p>}
                                            </div>
                                        </div>
                                        <span className="font-semibold text-gray-700 whitespace-nowrap ml-2">
                                            {formatCurrency(item.product.price * item.quantity, currency)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Totales */}
                            <div className="space-y-3 border-t border-gray-300 pt-4 mb-6 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(subtotal, currency)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 items-center">
                                    <span>Envío</span>
                                    <span className="text-right">
                                        {shippingCost === 0 ? (
                                            <span className="text-green-600 font-bold">Gratis</span>
                                        ) : (
                                            formatCurrency(shippingCost, currency)
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-300 pt-4">
                                    <span>Total</span>
                                    <span>{formatCurrency(total, currency)}</span>
                                </div>
                            </div>

                            {/* Métodos de Pago */}
                            <div className="bg-white p-4 rounded-md border border-gray-200 mb-6">
                                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Método de Pago</h3>
                                <div className="space-y-4">
                                    {/* Tarjeta */}
                                    <label className="flex items-center cursor-pointer p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors has-[:checked]:border-brand-primary has-[:checked]:bg-blue-50/30">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            className="form-radio h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                        />
                                        <span className="ml-3 text-sm font-bold text-gray-800">Tarjeta de Crédito / Débito</span>
                                        <div className="ml-auto flex gap-1">
                                            <div className={`w-8 h-5 bg-gray-100 rounded border flex items-center justify-center text-[8px] transition-opacity ${cardType === 'mastercard' ? 'opacity-40' : 'opacity-100 font-bold text-blue-800'}`}>VISA</div>
                                            <div className={`w-8 h-5 bg-gray-100 rounded border flex items-center justify-center text-[8px] transition-opacity ${cardType === 'visa' ? 'opacity-40' : 'opacity-100 font-bold text-red-600'}`}>MC</div>
                                        </div>
                                    </label>
                                    
                                    {/* Formulario de Tarjeta Integrado */}
                                    {paymentMethod === 'card' && (
                                        <div className="bg-gray-50 p-4 rounded border border-gray-200 animate-fade-in">
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="text-xs font-bold text-gray-600 uppercase">Información de la Tarjeta</h4>
                                                <span className="text-xs text-green-600 flex items-center gap-1 font-semibold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                    SSL Seguro
                                                </span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        name="cardNumber"
                                                        placeholder="0000 0000 0000 0000" 
                                                        className={`w-full border ${errors.cardNumber ? 'border-red-500 bg-red-50' : cardData.cardNumber.length === 19 ? 'border-green-500 bg-green-50' : 'border-gray-300'} px-4 py-2.5 pl-10 rounded-md text-sm focus:ring-brand-purple focus:border-brand-purple transition-all`}
                                                        value={cardData.cardNumber}
                                                        onChange={handleCardChange}
                                                        maxLength={19}
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="relative">
                                                        <input 
                                                            type="text" 
                                                            name="expiry"
                                                            placeholder="MM/AA" 
                                                            className={`w-full border ${errors.expiry ? 'border-red-500 bg-red-50' : cardData.expiry.length === 5 ? 'border-green-500 bg-green-50' : 'border-gray-300'} px-4 py-2.5 rounded-md text-sm focus:ring-brand-purple focus:border-brand-purple transition-all`}
                                                            value={cardData.expiry}
                                                            onChange={handleCardChange}
                                                            maxLength={5}
                                                        />
                                                        {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                                                    </div>
                                                    <div className="relative group">
                                                        <input 
                                                            type="text" 
                                                            name="cvc"
                                                            placeholder="CVC" 
                                                            className={`w-full border ${errors.cvc ? 'border-red-500 bg-red-50' : cardData.cvc.length === 3 ? 'border-green-500 bg-green-50' : 'border-gray-300'} px-4 py-2.5 rounded-md text-sm focus:ring-brand-purple focus:border-brand-purple transition-all`}
                                                            value={cardData.cvc}
                                                            onChange={handleCardChange}
                                                            maxLength={3}
                                                        />
                                                        <div className="absolute right-3 top-3 text-gray-400 cursor-help group-hover:text-gray-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <input 
                                                        type="text" 
                                                        name="cardName"
                                                        placeholder="NOMBRE DEL TITULAR" 
                                                        className={`w-full border ${errors.cardName ? 'border-red-500 bg-red-50' : cardData.cardName.length > 3 ? 'border-green-500 bg-green-50' : 'border-gray-300'} px-4 py-2.5 rounded-md text-sm focus:ring-brand-purple focus:border-brand-purple transition-all uppercase`}
                                                        value={cardData.cardName}
                                                        onChange={handleCardChange}
                                                    />
                                                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Google Pay Button */}
                                    <label className="flex items-center cursor-pointer p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors has-[:checked]:border-brand-primary has-[:checked]:bg-blue-50/30">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            className="form-radio h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300"
                                            checked={paymentMethod === 'googlepay'}
                                            onChange={() => setPaymentMethod('googlepay')}
                                        />
                                        <div className="ml-3 flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-800">Google Pay</span>
                                            <span className="text-xs bg-black text-white px-2 py-0.5 rounded font-bold">GPay</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center cursor-pointer p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors has-[:checked]:border-brand-primary has-[:checked]:bg-blue-50/30">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            className="form-radio h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300"
                                            checked={paymentMethod === 'transfer'}
                                            onChange={() => setPaymentMethod('transfer')}
                                        />
                                        <span className="ml-3 text-sm font-bold text-gray-800">Transferencia bancaria</span>
                                    </label>
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 mb-6 leading-tight">
                                Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra <a href="#" className="underline hover:text-black">política de privacidad</a>.
                            </div>

                            <button 
                                type="button" 
                                onClick={handlePlaceOrder}
                                disabled={isBusy}
                                className={`w-full bg-brand-primary text-white font-bold py-4 rounded-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all text-lg flex justify-center items-center transform active:scale-95 ${isBusy ? 'opacity-90 cursor-wait' : ''}`}
                            >
                                {isBusy ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {getStatusText()}
                                    </>
                                ) : (
                                    paymentMethod === 'googlepay' ? 'Pagar con GPay' : `Pagar ${formatCurrency(total, currency)}`
                                )}
                            </button>
                            
                            <div className="mt-4 flex justify-center items-center gap-2 text-xs text-gray-400 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Pago Seguro SSL 256-bit</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1d5db; 
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af; 
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CheckoutPage;
