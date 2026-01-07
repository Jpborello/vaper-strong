import React from 'react';
import { motion } from 'framer-motion';
import SmokeEffect from './SmokeEffect';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-bg"></div>

            {/* Canvas Smoke Effect */}
            <SmokeEffect />

            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="hero-subtitle neon-text">PREMIUM VAPING EXPERIENCE</h2>
                    <h1 className="hero-title">
                        VAPE <br />
                        <span className="stroke-text">STRONG</span>
                    </h1>
                    <p className="hero-desc">
                        Descubre nuestra selección exclusiva de vapers, sales y esencias importadas.
                        Calidad premium para los más exigentes.
                    </p>
                    <motion.button
                        className="cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        VER CATÁLOGO
                    </motion.button>
                </motion.div>

                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="logo-glow"></div>
                    <motion.img
                        src="/images/logo.png"
                        alt="Vape Strong Logo"
                        className="hero-logo animate-float"
                        animate={{
                            filter: ["drop-shadow(0 0 10px rgba(0,240,255,0.3))", "drop-shadow(0 0 30px rgba(0,240,255,0.6))", "drop-shadow(0 0 10px rgba(0,240,255,0.3))"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
