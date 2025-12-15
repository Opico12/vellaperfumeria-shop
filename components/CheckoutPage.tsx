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
    const [paymentMethod, setPaymentMethod] = useState('whatsapp');
    
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

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const hasShippingSaver = useMemo(() => {
        return cartItems.some(item => item.product.isShippingSaver);
    }, [cartItems]);

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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        // Billing Validation
        if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
        if (!formData.lastName.trim()) newErrors.lastName = 'Los apellidos son obligatorios';
        if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
        if (!formData.zip.trim()) newErrors.zip = 'El código postal es obligatorio';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
        
        // Email optional for WhatsApp order, but good to have
        if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
             newErrors.email = 'Introduce un email válido';
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

        // Construir Mensaje de WhatsApp
        let message = `*¡Hola Vellaperfumeria! Quiero realizar el siguiente pedido:* 🌸\n\n`;
        
        cartItems.forEach(item => {
            message += `▪️ [${item.quantity}] x ${item.product.name}`;
            if (item.selectedVariant) {
                message += ` (${Object.values(item.selectedVariant).join(', ')})`;
            }
            message += ` - ${formatCurrency(item.product.price * item.quantity, currency)}\n`;
        });

        message += `\n*Subtotal:* ${formatCurrency(subtotal, currency)}`;
        message += `\n*Envío:* ${shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}`;
        message += `\n*TOTAL: ${formatCurrency(total, currency)}*\n`;
        
        message += `\n--------------------------------\n`;
        message += `*Datos de Envío:*\n`;
        message += `Nombre: ${formData.firstName} ${formData.lastName}\n`;
        message += `Dirección: ${formData.address}, ${formData.city} (${formData.zip})\n`;
        message += `Teléfono: ${formData.phone}\n`;
        if (formData.email) message += `Email: ${formData.email}\n`;
        
        // Añadir Notas explícitamente si existen ("lo que anote")
        if (formData.notes) {
            message += `\n📝 *Notas del Pedido:* ${formData.notes}\n`;
        }
        
        message += `\n--------------------------------\n`;
        message += `Espero confirmación para realizar el pago (Bizum/Transferencia). ¡Gracias!`;

        // Número de teléfono de Vellaperfumeria
        const phoneNumber = "34600000000"; 
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Opcional: Limpiar carrito después de enviar
        // onClearCart(); 
    };

    const handleExternalCheckout = () => {
        // Redirigir a la página de finalizar compra externa
        window.location.href = 'https://vellaperfumeria.com/finalizar-compra/';
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="mb-8 text-center md:text-left border-b pb-4">
                <h1 className="text-3xl font-extrabold text-brand-primary">Finalizar Pedido</h1>
                <p className="text-gray-600 mt-2">Completa tus datos para enviarnos tu pedido por WhatsApp o ir a la web oficial.</p>
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
                                        placeholder="Para contactar por WhatsApp"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Opcional)</label>
                                    <input 
                                        type="email" name="email" value={formData.email} onChange={handleInputChange}
                                        className={`w-full border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all`} 
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notas del pedido (Opcional)</label>
                                    <p className="text-xs text-gray-500 mb-1">Añade aquí cualquier detalle especial para tu pedido.</p>
                                    <textarea 
                                        name="notes" value={formData.notes} onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-brand-purple focus:border-brand-purple transition-all"
                                        rows={3}
                                        placeholder="Instrucciones especiales, preferencias de envío, etc."
                                    />
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

                            <div className="space-y-4">
                                <button 
                                    type="button" 
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#20bd5a] hover:shadow-xl transition-all text-lg flex justify-center items-center gap-2 transform active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
                                    </svg>
                                    Enviar Pedido por WhatsApp
                                </button>

                                <button 
                                    type="button" 
                                    onClick={handleExternalCheckout}
                                    className="w-full bg-black text-white font-bold py-3 rounded-lg shadow hover:bg-gray-800 transition-all flex justify-center items-center gap-2 transform active:scale-95"
                                >
                                    Pagar en Web Oficial
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="mt-4 flex justify-center items-center gap-2 text-xs text-gray-400 font-medium text-center">
                                <p>Al enviar el pedido por WhatsApp, nos pondremos en contacto contigo para confirmar el pago y el envío.</p>
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
            `}</style>
        </div>
    );
};

export default CheckoutPage;