import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            className="product-card glass-panel"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div className="card-image-container">
                <img src={product.image} alt={product.name} className="card-image" />
                <div className="card-image-overlay"></div>
            </div>

            <div className="card-content">
                <span className="card-type">{product.type}</span>
                <h3 className="card-title">{product.name}</h3>
                <p className="card-description">{product.description}</p>

                <div className="card-footer">
                    <span className="card-price">${product.price.toFixed(2)}</span>
                    <motion.button
                        className="add-btn"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                    >
                        <Plus size={20} /> AGREGAR
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
