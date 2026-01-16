
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

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
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
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="flex items-center gap-4 text-2xl">
          <LuxuryIcon icon={TrendingUp} size="md" variant="gold" />
          <span className="luxury-title font-display">Risultati Premium</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Gem className="w-6 h-6 text-italian-gold" />
          </motion.div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
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
              <div className="relative p-6 flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertCircle className="w-7 h-7 text-white flex-shrink-0" />
                </motion.div>
                <div>
                  <p className="text-white font-bold text-lg mb-1 font-display">Attenzione Premium!</p>
                  <p className="text-white/90">
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
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6 text-italian-gold" />
            <h3 className="text-2xl font-bold garda-title font-display">Importo per Persona</h3>
          </div>
          
          <motion.div 
            className="space-y-4"
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
                
                <div className="garda-card luxury-border p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Numero con effetto premium */}
                      <motion.div 
                        className="relative"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                      >
                        <div className="absolute inset-0 garda-gradient rounded-full blur-sm opacity-60" />
                        <div className="relative garda-gradient w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white font-display">{index + 1}</span>
                        </div>
                        {index === 0 && (
                          <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Star className="w-6 h-6 text-italian-gold fill-italian-gold drop-shadow-lg" />
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <div>
                        <p className="text-xl font-bold text-foreground font-display">{result.name}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Sparkles className="w-4 h-4 text-italian-gold animate-pulse" />
                          <span>{result.consumption}m³ di consumo</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Importo */}
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Euro className="w-7 h-7 text-italian-gold" />
                      <span className="text-3xl font-bold luxury-title font-display">
                        {formatCurrency(result.amount)}
                      </span>
                    </motion.div>
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
          
          <div className="relative p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Totale calcolato */}
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                  <Award className="w-7 h-7 text-white" />
                  <p className="text-white/90 text-lg">Totale Calcolato</p>
                </div>
                <motion.div 
                  className="flex items-center gap-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Euro className="w-10 h-10 text-white drop-shadow-lg" />
                  <span className="text-5xl md:text-6xl font-black text-white font-display text-glow-gold">
                    {formatCurrency(totalCalculated)}
                  </span>
                </motion.div>
              </div>
              
              {/* Separatore */}
              <div className="hidden md:block w-px h-24 bg-white/20" />
              
              {/* Bolletta originale */}
              <div className="text-center md:text-right">
                <p className="text-white/90 text-lg mb-3">Bolletta Originale</p>
                <div className="flex items-center gap-3 justify-center md:justify-end">
                  <Euro className="w-8 h-8 text-white/80" />
                  <span className="text-4xl font-bold text-white/90 font-display">
                    {formatCurrency(totalBill)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Differenza */}
            {difference > 0.01 && (
              <motion.div 
                className="mt-8 pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 justify-center">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <p className="text-white text-lg">
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
          className={`relative overflow-hidden rounded-2xl ${
            isBalanced 
              ? 'bg-gradient-to-r from-emerald-500/20 via-garda-blue/20 to-emerald-500/20' 
              : 'bg-gradient-to-r from-red-500/20 via-sunset-orange/20 to-red-500/20'
          }`}
        >
          <div className="p-6 flex items-center gap-5">
            {isBalanced ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-16 h-16 garda-gradient rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-emerald-400 font-bold text-xl mb-1 font-display">Perfetto Equilibrio!</p>
                  <p className="text-emerald-300/80 text-lg">
                    I conti tornano alla perfezione, stile Lago di Garda Premium!
                  </p>
                </div>
                <motion.div
                  className="ml-auto"
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
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-sunset-orange rounded-full flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-red-400 font-bold text-xl mb-1 font-display">Differenza Rilevata</p>
                  <p className="text-red-300/80 text-lg">
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
};
