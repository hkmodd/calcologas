
import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { gardesaniSayings } from '@/data/gardesaniSayings';

export const GardesanoQuote: React.FC = memo(() => {
    const [currentIndex, setCurrentIndex] = useState(() =>
        Math.floor(Math.random() * gardesaniSayings.length)
    );

    useEffect(() => {
        // Change quote every 12 seconds
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % gardesaniSayings.length);
        }, 12000);

        return () => clearInterval(interval);
    }, []);

    const currentSaying = gardesaniSayings[currentIndex];

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Glass container */}
                    <div className="glass-subtle rounded-2xl p-4 md:p-6 border border-white/5">
                        <div className="flex items-start gap-3">
                            {/* Quote icon */}
                            <Quote className="w-5 h-5 md:w-6 md:h-6 text-italian-gold/60 flex-shrink-0 mt-1" />

                            <div className="flex-1 min-w-0">
                                {/* Main quote in dialect */}
                                <p className="text-base md:text-lg font-medium text-garda-light italic leading-relaxed">
                                    "{currentSaying.text}"
                                </p>

                                {/* Translation/meaning */}
                                <p className="text-sm text-muted-foreground mt-2 opacity-75">
                                    — {currentSaying.meaning}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Subtle indicator dots */}
                    <div className="flex justify-center mt-3 gap-1">
                        {[0, 1, 2].map((dot) => (
                            <div
                                key={dot}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${dot === currentIndex % 3
                                        ? 'bg-italian-gold/60 w-4'
                                        : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
});
