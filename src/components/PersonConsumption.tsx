
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Flame, Euro, Trash2, Sparkles, Crown } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  consumption: number;
}

interface PersonConsumptionProps {
  person: Person;
  index: number;
  pricePerCubicMeter: number;
  onUpdate: (id: string, field: 'name' | 'consumption', value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export const PersonConsumption: React.FC<PersonConsumptionProps> = ({
  person,
  index,
  pricePerCubicMeter,
  onUpdate,
  onRemove,
  canRemove
}) => {
  const amount = person.consumption * pricePerCubicMeter;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="garda-card luxury-border overflow-hidden group">
        <div className="p-6 space-y-6">
          {/* Header della persona */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar con numero */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 garda-gradient rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                
                {/* Avatar principale */}
                <div className="relative w-14 h-14 garda-gradient rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white font-display">
                    {index + 1}
                  </span>
                </div>
                
                {/* Badge animato */}
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 gold-gradient rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold garda-title font-display">
                    Persona {index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
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
                  className="text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 rounded-full w-10 h-10 p-0"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="space-y-3"
              whileHover={{ scale: 1.01 }}
            >
              <Label 
                htmlFor={`name-${person.id}`} 
                className="text-base font-semibold text-garda-light flex items-center gap-2"
              >
                <User className="w-4 h-4 text-garda-blue" />
                Nome
              </Label>
              <div className="relative group/input">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-garda-blue/10 to-transparent opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 blur-lg" />
                <Input
                  id={`name-${person.id}`}
                  type="text"
                  value={person.name}
                  onChange={(e) => onUpdate(person.id, 'name', e.target.value)}
                  className="relative h-14 bg-white/5 border-white/10 focus:border-garda-blue/50 focus:ring-garda-blue/20 transition-all duration-300 text-foreground text-lg"
                  placeholder="Nome persona"
                />
              </div>
            </motion.div>

            <motion.div 
              className="space-y-3"
              whileHover={{ scale: 1.01 }}
            >
              <Label 
                htmlFor={`consumption-${person.id}`} 
                className="text-base font-semibold text-garda-light flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-sunset-orange" />
                Consumo (m³)
              </Label>
              <div className="relative group/input">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sunset-orange/10 to-transparent opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 blur-lg" />
                <Input
                  id={`consumption-${person.id}`}
                  type="number"
                  value={person.consumption}
                  onChange={(e) => onUpdate(person.id, 'consumption', Number(e.target.value))}
                  className="relative h-14 number-input bg-white/5 border-white/10 focus:border-sunset-orange/50 focus:ring-sunset-orange/20 transition-all duration-300 text-foreground text-lg"
                  step="0.1"
                  min="0"
                  placeholder="0"
                />
              </div>
            </motion.div>
          </div>

          {/* Risultato importo */}
          <AnimatePresence>
            {pricePerCubicMeter > 0 && person.consumption > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 garda-sunset opacity-90" />
                <div className="absolute inset-0 animate-shimmer-slide" />
                
                <div className="relative p-5 flex items-center justify-between">
                  <div className="text-white/90 font-medium">
                    <span className="text-sm opacity-80">Formula: </span>
                    <span className="font-mono">
                      {pricePerCubicMeter.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€ × {person.consumption}m³
                    </span>
                  </div>
                  
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Euro className="w-7 h-7 text-white drop-shadow-lg" />
                    <span className="text-3xl font-bold text-white font-display text-glow-gold">
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
};
