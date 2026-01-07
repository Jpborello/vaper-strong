import React, { useRef, useEffect } from 'react';
import { noise } from '../utils/noise';

const SmokeEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Configuration
        const particleCount = 60; // Slightly lower count, bigger particles
        const spawnRate = 2; // Particles per frame (maybe less frequently)

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                // Spawn from the right side, varying heights
                this.x = canvas.width + 100; // Start off-screen right
                this.y = (window.innerHeight * 0.4) + (Math.random() * window.innerHeight * 0.4); // Middle-ish vertical

                // Initial scatter if starting
                if (initial) {
                    this.x = Math.random() * canvas.width;
                }

                this.vx = -1.5 - Math.random() * 1.5; // Move left
                this.vy = (Math.random() - 0.5) * 0.5; // Slight drift up/down

                this.size = 50 + Math.random() * 100; // Large particles
                this.growth = 0.2 + Math.random() * 0.3; // Grow over time

                this.life = 0;
                this.maxLife = 300 + Math.random() * 200; // Long life

                this.alpha = 0;
                this.maxAlpha = 0.1 + Math.random() * 0.15; // Subtle opacity
            }

            update() {
                this.life++;
                if (this.life > this.maxLife) {
                    this.reset();
                }

                // Noise influence for fluid motion
                // Use time/position to sample noise
                const time = Date.now() * 0.0005;
                const noiseVal = noise(this.x * 0.002, this.y * 0.002, time);

                // Add noise to velocity (swirl)
                this.vx += (noiseVal - 0.5) * 0.05;
                this.vy += (noiseVal - 0.5) * 0.05;

                // Apply movement
                this.x += this.vx;
                this.y += this.vy;

                // Grow
                this.size += this.growth;

                // Fade in / Fade out
                if (this.life < 100) {
                    this.alpha = (this.life / 100) * this.maxAlpha;
                } else if (this.life > this.maxLife - 100) {
                    this.alpha = ((this.maxLife - this.life) / 100) * this.maxAlpha;
                } else {
                    this.alpha = this.maxAlpha;
                }
            }

            draw(ctx) {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();

                // Soft gradient for "puff" look
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                gradient.addColorStop(0.5, 'rgba(230, 230, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 5, // Above background, below text/interactive if fine-tuned, or above for "fog"
                mixBlendMode: 'screen'
            }}
        />
    );
};

export default SmokeEffect;
