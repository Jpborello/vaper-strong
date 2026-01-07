import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate API call
        setTimeout(() => {
            setIsCheckingOut(false);
            setSuccess(true);
            clearCart();
        }, 2000);
    };

    if (success) {
        return (
            <div className="cart-page container success-screen">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="success-content glass-panel"
                >
                    <CheckCircle size={80} color="#00f0ff" />
                    <h2 className="neon-text">¡Compra Exitosa!</h2>
                    <p>Gracias por tu compra en Vape Strong.</p>
                    <Link to="/" className="back-btn" onClick={() => setSuccess(false)}>
                        Volver a la tienda
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h2 className="page-title neon-text">Tu Carrito</h2>

            {cart.length === 0 ? (
                <div className="empty-cart glass-panel">
                    <p>Tu carrito está vacío.</p>
                    <Link to="/" className="back-btn">
                        <ArrowLeft size={20} /> Volver a comprar
                    </Link>
                </div>
            ) : (
                <div className="cart-grid">
                    <div className="cart-items glass-panel">
                        <AnimatePresence>
                            {cart.map(item => (
                                <motion.div
                                    key={item.id}
                                    className="cart-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <img src={item.image} alt={item.name} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <span className="item-price">${item.price.toFixed(2)}</span>
                                    </div>
                                    <div className="cart-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="cart-summary glass-panel">
                        <h3>Resumen</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span className="neon-text">${totalPrice.toFixed(2)}</span>
                        </div>

                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? 'Procesando...' : (
                                <>
                                    <CreditCard size={20} /> PAGAR AHORA
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
