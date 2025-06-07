
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Flame, Euro, Trash2, Sparkles } from 'lucide-react';

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
    <Card className="garda-card border-2 border-garda-light/50 hover:border-garda-blue/70 italian-hover shadow-xl hover:shadow-2xl transition-all duration-500">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 garda-gradient rounded-full animate-glow-pulse"></div>
              <div className="relative garda-gradient p-3 rounded-full">
                <User className="w-5 h-5 text-white animate-garda-wave" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold garda-title">Persona {index + 1}</span>
              <div className="flex items-center gap-1 text-sm text-garda-blue">
                <Sparkles className="w-3 h-3 animate-shimmer" />
                <span>Stile Gardesano</span>
              </div>
            </div>
          </div>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(person.id)}
              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 transition-all duration-300 hover:scale-110"
            >
              <Trash2 className="w-5 h-5 animate-italian-bounce" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor={`name-${person.id}`} className="text-base font-semibold text-garda-deep">
              Nome
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-garda-blue transition-all duration-300 group-hover:scale-110" />
              <Input
                id={`name-${person.id}`}
                type="text"
                value={person.name}
                onChange={(e) => onUpdate(person.id, 'name', e.target.value)}
                className="pl-11 h-12 border-2 border-garda-light focus:border-garda-blue transition-all duration-300 hover:shadow-md"
                placeholder="Nome persona"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor={`consumption-${person.id}`} className="text-base font-semibold text-garda-deep">
              Consumo (m³)
            </Label>
            <div className="relative group">
              <Flame className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-italian-sunset transition-all duration-300 group-hover:scale-110 animate-garda-wave" />
              <Input
                id={`consumption-${person.id}`}
                type="number"
                value={person.consumption}
                onChange={(e) => onUpdate(person.id, 'consumption', Number(e.target.value))}
                className="pl-11 h-12 number-input border-2 border-garda-light focus:border-garda-blue transition-all duration-300 hover:shadow-md"
                step="0.1"
                min="0"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {pricePerCubicMeter > 0 && person.consumption > 0 && (
          <div className="garda-sunset p-4 rounded-xl border-2 border-italian-gold/30 animate-elegant-slide">
            <div className="flex items-center justify-between">
              <div className="text-white/90 font-medium">
                {pricePerCubicMeter.toFixed(4)}€ × {person.consumption}m³
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-white">
                <Euro className="w-6 h-6 animate-float" />
                <span className="animate-shimmer">{amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
