import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <nav className="navbar glass-panel">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src="/images/logo.png" alt="Vape Strong" className="logo-img" />
                    <span className="logo-text neon-text">VAPE STRONG</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links desktop-only">
                    <Link to="/" className="nav-link">Inicio</Link>
                    <a href="#products" className="nav-link">Productos</a>
                    <a href="#about" className="nav-link">Nosotros</a>
                </div>

                <div className="nav-actions">
                    <Link to="/cart" className="cart-btn">
                        <ShoppingCart size={24} color="#00f0ff" />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>

                    <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu glass-panel">
                    <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
                    <a href="#products" onClick={() => setIsOpen(false)}>Productos</a>
                    <a href="#about" onClick={() => setIsOpen(false)}>Nosotros</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
