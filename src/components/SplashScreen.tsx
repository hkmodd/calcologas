import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
    minDuration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
    onComplete,
    minDuration = 2000
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for exit animation
        }, minDuration);

        return () => clearTimeout(timer);
    }, [onComplete, minDuration]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{
                        background: 'radial-gradient(ellipse at center, #0a1628 0%, #050a12 100%)'
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    {/* Animated rings */}
                    <motion.div
                        className="absolute w-48 h-48 rounded-full border border-garda-blue/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                        className="absolute w-64 h-64 rounded-full border border-italian-gold/15"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                    />

                    {/* Logo */}
                    <motion.div
                        className="relative z-10"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                        <div className="w-24 h-24 rounded-full flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #ff6b35 0%, #ffc832 50%, #ff9500 100%)',
                                boxShadow: '0 0 60px rgba(255, 200, 50, 0.4)'
                            }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Flame className="w-12 h-12 text-white drop-shadow-lg" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="mt-8 text-3xl font-bold text-white font-display"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        style={{
                            background: 'linear-gradient(135deg, #fff 0%, #ffc832 50%, #ff9500 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Calcolatore Gas
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-2 text-garda-light/60 text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        Lago di Garda Luxury Edition
                    </motion.p>

                    {/* Loading bar */}
                    <motion.div
                        className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, #3bb4f6 0%, #ffc832 100%)'
                            }}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: minDuration / 1000 - 0.5, ease: 'easeInOut', delay: 0.5 }}
                        />
                    </motion.div>

                    {/* Version */}
                    <motion.p
                        className="absolute bottom-8 text-white/30 text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Premium Edition 2026
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
