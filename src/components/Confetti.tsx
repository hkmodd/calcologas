
import React, { useEffect, useState, memo } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
}

interface ConfettiProps {
    active: boolean;
    onComplete?: () => void;
}

const COLORS = [
    '#FFD700', // Gold
    '#FF6B6B', // Coral
    '#4ECDC4', // Teal
    '#45B7D1', // Sky
    '#96CEB4', // Sage
    '#FFEAA7', // Cream
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
];

const PARTICLE_COUNT = 50;
const DURATION = 3000;

export const Confetti: React.FC<ConfettiProps> = memo(({ active, onComplete }) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        if (!active) {
            setParticles([]);
            return;
        }

        // Generate particles
        const newParticles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            newParticles.push({
                id: i,
                x: 50 + (Math.random() - 0.5) * 20, // Start near center
                y: 30,
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 3 - 2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 20,
            });
        }
        setParticles(newParticles);

        // Animation loop
        let frame = 0;
        const gravity = 0.1;
        const friction = 0.99;

        const animate = () => {
            frame++;
            setParticles(prev =>
                prev.map(p => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    vx: p.vx * friction,
                    vy: p.vy + gravity,
                    rotation: p.rotation + p.rotationSpeed,
                }))
            );

            if (frame < DURATION / 16) {
                requestAnimationFrame(animate);
            } else {
                setParticles([]);
                onComplete?.();
            }
        };

        requestAnimationFrame(animate);

        return () => {
            setParticles([]);
        };
    }, [active, onComplete]);

    if (particles.length === 0) return null;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            style={{ willChange: 'transform' }}
        >
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        transform: `rotate(${p.rotation}deg)`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        opacity: Math.max(0, 1 - p.y / 120),
                        willChange: 'transform, opacity',
                    }}
                />
            ))}
        </div>
    );
});

Confetti.displayName = 'Confetti';
