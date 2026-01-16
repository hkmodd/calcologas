

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertCircle, CheckCircle, Euro, Crown, Award, Sparkles, Gem, Star } from 'lucide-react';
import { LuxuryIcon } from './LuxuryIcon';

interface Result {
  id: string;
  name: string;
  consumption: number;
  amount: number;
}

interface ResultDisplayProps {
  results: Result[];
  totalCalculated: number;
  totalBill: number;
  actualTotalConsumption: number;
  totalConsumption: number;
}


export const ResultDisplay: React.FC<ResultDisplayProps> = React.memo(({
  results,
  totalCalculated,
  totalBill,
  actualTotalConsumption,
  totalConsumption
}) => {
  const difference = Math.abs(totalCalculated - totalBill);
  const isBalanced = difference < 0.01;
  const consumptionMatches = Math.abs(actualTotalConsumption - totalConsumption) < 0.1;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 200 }
    }
  };

  return (
    <Card className="glass-ultra luxury-border overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-4 md:pb-6">
        <CardTitle className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl">
          <LuxuryIcon icon={TrendingUp} size="md" variant="gold" />
          <span className="luxury-title font-display">Risultati Premium</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Gem className="w-5 h-5 md:w-6 md:h-6 text-italian-gold" />
          </motion.div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 md:p-8 space-y-6 md:space-y-8">
        {/* Avviso consumo non corrispondente */}
        <AnimatePresence>
          {!consumptionMatches && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sunset-orange via-italian-gold to-sunset-orange opacity-90" />
              <div className="relative p-4 md:p-6 flex flex-col md:flex-row items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden md:block"
                >
                  <AlertCircle className="w-7 h-7 text-white flex-shrink-0" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-5 h-5 text-white flex-shrink-0 md:hidden" />
                    <p className="text-white font-bold text-lg font-display">Attenzione Premium!</p>
                  </div>
                  <p className="text-white/90 text-sm md:text-base">
                    I consumi individuali ({actualTotalConsumption.toFixed(1)}m³) non corrispondono
                    al totale della bolletta ({totalConsumption}m³)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista risultati per persona */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Crown className="w-5 h-5 md:w-6 md:h-6 text-italian-gold" />
            <h3 className="text-xl md:text-2xl font-bold garda-title font-display">Importo per Persona</h3>
          </div>

          <motion.div
            className="space-y-3 md:space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.01 }}
                className="relative group"
              >
                <div className="absolute inset-0 garda-gradient opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />

                <div className="garda-card luxury-border p-4 md:p-6 rounded-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Numero con effetto premium */}
                      <motion.div
                        className="relative flex-shrink-0"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                      >
                        <div className="absolute inset-0 garda-gradient rounded-full blur-sm opacity-60" />
                        <div className="relative garda-gradient w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-lg md:text-xl font-bold text-white font-display">{index + 1}</span>
                        </div>
                        {index === 0 && (
                          <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Star className="w-5 h-5 md:w-6 md:h-6 text-italian-gold fill-italian-gold drop-shadow-lg" />
                          </motion.div>
                        )}
                      </motion.div>

                      <div className="min-w-0">
                        <p className="text-lg md:text-xl font-bold text-foreground font-display truncate">{result.name}</p>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
                          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-italian-gold animate-pulse" />
                          <span>{result.consumption}m³ di consumo</span>
                        </div>
                      </div>
                    </div>

                    {/* Importo */}
                    <div className="flex items-center gap-2 md:gap-3 self-end md:self-auto bg-white/5 rounded-xl px-3 py-1 md:bg-transparent md:p-0">
                      <Euro className="w-5 h-5 md:w-7 md:h-7 text-italian-gold" />
                      <span className="text-2xl md:text-3xl font-bold luxury-title font-display">
                        {formatCurrency(result.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Totale grande */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 garda-sunset" />
          <div className="absolute inset-0 animate-shimmer-slide" />

          <div className="relative p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              {/* Totale calcolato */}
              <div className="text-center md:text-left w-full md:w-auto">
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <Award className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  <p className="text-white/90 text-base md:text-lg">Totale Calcolato</p>
                </div>
                <motion.div
                  className="flex items-center justify-center md:justify-start gap-2 md:gap-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Euro className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  <span className="text-4xl md:text-6xl font-black text-white font-display text-glow-gold break-all">
                    {formatCurrency(totalCalculated)}
                  </span>
                </motion.div>
              </div>

              {/* Separatore */}
              <div className="hidden md:block w-px h-24 bg-white/20" />
              <div className="block md:hidden w-24 h-px bg-white/20" />

              {/* Bolletta originale */}
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-white/90 text-base md:text-lg mb-2">Bolletta Originale</p>
                <div className="flex items-center gap-2 justify-center md:justify-end">
                  <Euro className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                  <span className="text-2xl md:text-4xl font-bold text-white/90 font-display break-all">
                    {formatCurrency(totalBill)}
                  </span>
                </div>
              </div>
            </div>

            {/* Differenza */}
            {difference > 0.01 && (
              <motion.div
                className="mt-6 md:mt-8 pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 justify-center text-center">
                  <Sparkles className="w-5 h-5 text-white animate-pulse hidden md:block" />
                  <p className="text-white text-base md:text-lg">
                    Differenza: <span className="font-bold">€{formatCurrency(difference)}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Status finale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`relative overflow-hidden rounded-2xl ${isBalanced
            ? 'bg-gradient-to-r from-emerald-500/20 via-garda-blue/20 to-emerald-500/20'
            : 'bg-gradient-to-r from-red-500/20 via-sunset-orange/20 to-red-500/20'
            }`}
        >
          <div className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-5 text-center md:text-left">
            {isBalanced ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 garda-gradient rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-emerald-400 font-bold text-lg md:text-xl mb-1 font-display">Perfetto Equilibrio!</p>
                  <p className="text-emerald-300/80 text-sm md:text-lg">
                    I conti tornano alla perfezione, stile Lago di Garda Premium!
                  </p>
                </div>
                <motion.div
                  className="hidden md:block ml-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Gem className="w-8 h-8 text-emerald-400" />
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-red-500 to-sunset-orange rounded-full flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-red-400 font-bold text-lg md:text-xl mb-1 font-display">Differenza Rilevata</p>
                  <p className="text-red-300/80 text-sm md:text-lg">
                    C'è una differenza di €{formatCurrency(difference)} tra il totale calcolato e la bolletta
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
});
