
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Flame, Euro, Trash2 } from 'lucide-react';

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
    <Card className="p-4 bg-gradient-to-r from-white to-blue-50/30 border border-blue-200/50 hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-lg">Persona {index + 1}</span>
          </div>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(person.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${person.id}`} className="text-sm font-medium">
              Nome
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id={`name-${person.id}`}
                type="text"
                value={person.name}
                onChange={(e) => onUpdate(person.id, 'name', e.target.value)}
                className="pl-10 h-10"
                placeholder="Nome persona"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`consumption-${person.id}`} className="text-sm font-medium">
              Consumo (m³)
            </Label>
            <div className="relative">
              <Flame className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id={`consumption-${person.id}`}
                type="number"
                value={person.consumption}
                onChange={(e) => onUpdate(person.id, 'consumption', Number(e.target.value))}
                className="pl-10 h-10 number-input"
                step="0.1"
                min="0"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {pricePerCubicMeter > 0 && person.consumption > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {pricePerCubicMeter.toFixed(4)}€ × {person.consumption}m³
              </div>
              <div className="flex items-center gap-1 text-lg font-bold text-green-700">
                <Euro className="w-4 h-4" />
                {amount.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
