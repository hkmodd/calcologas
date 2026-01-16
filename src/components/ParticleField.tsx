
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'star' | 'glow' | 'diamond';
}

export const ParticleField: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      type: (['star', 'glow', 'diamond'] as const)[Math.floor(Math.random() * 3)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora boreale animata */}
      <motion.div
        className="absolute -top-1/2 left-0 right-0 h-full opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(59, 180, 246, 0.3) 0%, transparent 70%)',
            'radial-gradient(ellipse 120% 60% at 40% 0%, rgba(255, 200, 50, 0.2) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 40% at 60% 0%, rgba(59, 180, 246, 0.3) 0%, transparent 70%)',
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Particelle luminose */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.9, 0],
            scale: [0.5, 1.2, 0.8, 1, 0.5],
            y: [0, -30, -10, -40, 0],
            x: [0, 10, -5, 15, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {particle.type === 'star' && (
            <svg
              width={particle.size * 4}
              height={particle.size * 4}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill={`rgba(255, 200, 50, ${0.6 + Math.random() * 0.4})`}
              />
            </svg>
          )}
          {particle.type === 'glow' && (
            <div
              className="rounded-full"
              style={{
                width: particle.size * 3,
                height: particle.size * 3,
                background: `radial-gradient(circle, rgba(59, 180, 246, 0.8) 0%, transparent 70%)`,
                boxShadow: `0 0 ${particle.size * 4}px rgba(59, 180, 246, 0.5)`,
              }}
            />
          )}
          {particle.type === 'diamond' && (
            <div
              className="rotate-45"
              style={{
                width: particle.size * 2,
                height: particle.size * 2,
                background: `linear-gradient(135deg, rgba(255, 200, 50, 0.9), rgba(255, 255, 255, 0.6))`,
                boxShadow: `0 0 ${particle.size * 3}px rgba(255, 200, 50, 0.4)`,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Cerchi di luce che si espandono */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-yellow-400/20"
          style={{
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: 100, height: 100, opacity: 0.5 }}
          animate={{
            width: [100, 800],
            height: [100, 800],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 8,
            delay: i * 2.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};
