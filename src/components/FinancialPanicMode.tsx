
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Skull, Radiation, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import './FinancialPanicMode.css';

interface FinancialPanicModeProps {
    amount: number;
    onReset: () => void;
}

// Memoized to prevent unnecessary re-renders
export const FinancialPanicMode: React.FC<FinancialPanicModeProps> = memo(({ amount, onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full panic-container"
        >
            <Card className="relative overflow-hidden border-4 border-amber-500/50 bg-black shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                {/* CRT Scanline Effect - Pure CSS */}
                <div className="panic-scanlines" />
                <div className="panic-glow" />

                <div className="p-8 md:p-12 relative z-10 text-center space-y-8 font-mono">

                    {/* Icon with CSS animation instead of Framer Motion */}
                    <div className="flex justify-center">
                        <div className="relative panic-icon-wobble">
                            <Radiation className="w-24 h-24 text-amber-500 panic-spin" />
                            <Skull className="w-12 h-12 text-amber-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-amber-500 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] panic-flicker">
                            CRITICAL ERROR
                        </h2>

                        <h3 className="text-2xl text-amber-300/80 font-bold border-b-2 border-amber-500/30 pb-4 inline-block">
                            RILEVATA ANOMALIA FINANZIARIA
                        </h3>
                    </div>

                    <div className="space-y-6 max-w-2xl mx-auto">
                        <p className="text-xl md:text-2xl text-amber-100 leading-relaxed font-bold">
                            "Hey Campione, piano con quegli zeri!"
                        </p>

                        <div className="bg-amber-950/40 border border-amber-500/30 p-6 rounded-lg text-left font-mono text-amber-200 shadow-inner">
                            <p className="mb-4">
                                <span className="text-amber-500 mr-2">{'>'}</span>
                                SISTEMA: Rilevato importo di <span className="text-red-500 font-bold bg-black/50 px-2">€{amount.toLocaleString('it-IT')}</span>
                            </p>
                            <p className="mb-4">
                                <span className="text-amber-500 mr-2">{'>'}</span>
                                ANALISI: Il tuo portafogli sta piangendo sangue? 🩸
                            </p>
                            <p className="mb-4">
                                <span className="text-amber-500 mr-2">{'>'}</span>
                                PROBABILITÀ DI BANCAROTTA: 99.9%
                            </p>
                            <p>
                                <span className="text-amber-500 mr-2">{'>'}</span>
                                CONSIGLIO: Spegni i termosifoni e brucia i mobili vecchi.
                            </p>
                        </div>
                    </div>

                    <motion.div
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={onReset}
                            size="lg"
                            className="mt-4 bg-amber-600 hover:bg-amber-500 text-black font-black text-xl px-8 py-6 rounded-none border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] uppercase tracking-wider items-center gap-3 transition-colors"
                        >
                            <RotateCcw className="w-6 h-6" />
                            Ritorna alla Realtà
                        </Button>
                    </motion.div>

                    <div className="absolute top-4 left-4 text-xs text-amber-500/50">
                        PIP-BOY 3000 v.2.4
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-amber-500/50">
                        VAULT-TEC APPROVED
                    </div>
                </div>
            </Card>

            {/* Glitch Overlay - Pure CSS */}
            <div className="panic-glitch-overlay" />
        </motion.div>
    );
});
