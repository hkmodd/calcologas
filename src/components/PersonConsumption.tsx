

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Flame, Euro, Trash2, Sparkles, Crown, Zap } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  consumption: number | string;
}

interface PersonConsumptionProps {
  person: Person;
  index: number;
  pricePerCubicMeter: number;
  onUpdate: (id: string, field: 'name' | 'consumption', value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  isAutoCalculated?: boolean;
}


export const PersonConsumption: React.FC<PersonConsumptionProps> = React.memo(({
  person,
  index,
  pricePerCubicMeter,
  onUpdate,
  onRemove,
  canRemove,
  isAutoCalculated = false
}) => {
  const amount = (Number(person.consumption) || 0) * pricePerCubicMeter;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="garda-card luxury-border overflow-hidden group">
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Header della persona */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              {/* Avatar con numero */}
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 garda-gradient rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" />

                {/* Avatar principale */}
                <div className="relative w-12 h-12 md:w-14 md:h-14 garda-gradient rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg md:text-xl font-bold text-white font-display">
                    {index + 1}
                  </span>
                </div>

                {/* Badge animato */}
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 gold-gradient rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                </motion.div>
              </motion.div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl font-bold garda-title font-display">
                    Persona {index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                  <Sparkles className="w-3 h-3 text-italian-gold animate-pulse" />
                  <span>Stile Gardesano Premium</span>
                </div>
              </div>
            </div>

            {/* Bottone rimuovi */}
            {canRemove && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(person.id)}
                  className="text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 rounded-full w-8 h-8 md:w-10 md:h-10 p-0"
                >
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div
              className="space-y-2 md:space-y-3"
              whileHover={{ scale: 1.01 }}
            >
              <Label
                htmlFor={`name-${person.id}`}
                className="text-sm md:text-base font-semibold text-garda-light flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-garda-blue" />
                Nome
              </Label>
              <div className="relative group/input">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-garda-blue/10 to-transparent opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 blur-lg" />
                <Input
                  id={`name-${person.id}`}
                  type="text"
                  value={person.name}
                  onChange={(e) => onUpdate(person.id, 'name', e.target.value)}
                  className="relative h-12 md:h-14 bg-white/5 border-white/10 focus:border-garda-blue/50 focus:ring-garda-blue/20 transition-all duration-300 text-foreground text-base md:text-lg"
                  placeholder="Nome persona"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2 md:space-y-3"
              whileHover={{ scale: isAutoCalculated ? 1 : 1.01 }}
            >
              <Label
                htmlFor={`consumption-${person.id}`}
                className="text-sm md:text-base font-semibold text-garda-light flex items-center gap-2"
              >
                <Flame className="w-3.5 h-3.5 md:w-4 md:h-4 text-sunset-orange" />
                Consumo (m³)
                {isAutoCalculated && (
                  <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-italian-gold/20 text-italian-gold text-xs font-medium">
                    <Zap className="w-3 h-3" />
                    AUTO
                  </span>
                )}
              </Label>
              <div className="relative group/input">
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${isAutoCalculated ? 'from-italian-gold/10' : 'from-sunset-orange/10'} to-transparent opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 blur-lg`} />
                <Input
                  id={`consumption-${person.id}`}
                  type="number"
                  value={person.consumption}
                  onChange={(e) => !isAutoCalculated && onUpdate(person.id, 'consumption', e.target.value)}
                  readOnly={isAutoCalculated}
                  className={`relative h-12 md:h-14 number-input border-white/10 transition-all duration-300 text-foreground text-base md:text-lg ${isAutoCalculated
                    ? 'bg-italian-gold/10 border-italian-gold/30 cursor-not-allowed text-italian-gold font-semibold'
                    : 'bg-white/5 focus:border-sunset-orange/50 focus:ring-sunset-orange/20'
                    }`}
                  step="0.1"
                  min="0"
                  placeholder="0"
                />
              </div>
            </motion.div>
          </div>

          {/* Risultato importo */}
          <AnimatePresence>
            {pricePerCubicMeter > 0 && Number(person.consumption) > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 garda-sunset opacity-90" />
                <div className="absolute inset-0 animate-shimmer-slide" />

                <div className="relative p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
                  <div className="text-white/90 font-medium text-xs md:text-sm order-2 md:order-1">
                    <span className="opacity-80">Formula: </span>
                    <span className="font-mono">
                      {pricePerCubicMeter.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€ × {person.consumption}m³
                    </span>
                  </div>

                  <motion.div
                    className="flex items-center gap-2 md:gap-3 order-1 md:order-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Euro className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
                    <span className="text-2xl md:text-3xl font-bold text-white font-display text-glow-gold">
                      {amount.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
});
