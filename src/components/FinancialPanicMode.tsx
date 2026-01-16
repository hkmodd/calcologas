
import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Radiation, Wallet, RotateCcw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FinancialPanicModeProps {
    amount: number;
    onReset: () => void;
}

export const FinancialPanicMode: React.FC<FinancialPanicModeProps> = ({ amount, onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: [-1, 1, -1, 0],
                transition: { type: "spring", bounce: 0.5 }
            }}
            className="w-full"
        >
            <Card className="relative overflow-hidden border-4 border-amber-500/50 bg-black shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                {/* CRT Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_4px,3px_100%] pointer-events-none" />
                <div className="absolute inset-0 bg-amber-500/5 pointer-events-none animate-pulse z-[4]" />

                <div className="p-8 md:p-12 relative z-10 text-center space-y-8 font-mono">

                    <motion.div
                        className="flex justify-center"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <div className="relative">
                            <Radiation className="w-24 h-24 text-amber-500 animate-[spin_10s_linear_infinite]" />
                            <Skull className="w-12 h-12 text-amber-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-amber-500 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                            animate={{ opacity: [1, 0.8, 1] }}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                        >
                            CRITICAL ERROR
                        </motion.h2>

                        <h3 className="text-2xl text-amber-300/80 font-bold border-b-2 border-amber-500/30 pb-4 inline-block">
                            RILEVATA ANOMALIA FINANZIARIA
                        </h3>
                    </div>

                    <div className="space-y-6 max-w-2xl mx-auto">
                        <p className="text-xl md:text-2xl text-amber-100 leading-relaxed font-bold">
                            "Hey Campione, piano con quegli zeri!"
                        </p>

                        <div className="bg-amber-950/40 border border-amber-500/30 p-6 rounded-lg text-left font-mono text-amber-200 shadow-inner">
                            <p className="mb-4 typing-effect">
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={onReset}
                            size="lg"
                            className="mt-4 bg-amber-600 hover:bg-amber-500 text-black font-black text-xl px-8 py-6 rounded-none border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] uppercase tracking-wider items-center gap-3 transition-all"
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

            {/* Glitch Overlay */}
            <motion.div
                className="fixed inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none z-[60]"
                animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
        </motion.div>
    );
};
