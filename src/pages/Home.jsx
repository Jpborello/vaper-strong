import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />

            <section id="products" className="products-section container">
                <div className="section-header">
                    <h2 className="section-title neon-text">NUEVOS ARRIBOS</h2>
                    <div className="section-line"></div>
                </div>

                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section id="about" className="about-section container">
                <div className="about-content glass-panel">
                    <h2 className="about-title">SOBRE NOSOTROS</h2>
                    <p>
                        En <strong>Vape Strong</strong>, nos dedicamos a traer los mejores productos de vapeo del mercado.
                        Desde dispositivos desechables de alta duración hasta los e-liquids más sabrosos.
                        Calidad, estilo y potencia en cada calada.
                    </p>
                </div>
            </section>

            <footer className="footer">
                <p>© 2026 Vape Strong. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
