
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Flame, Users, Euro, Plus, Trash2 } from 'lucide-react';
import { PersonConsumption } from './PersonConsumption';
import { ResultDisplay } from './ResultDisplay';

interface Person {
  id: string;
  name: string;
  consumption: number;
}

const GasBillCalculator = () => {
  const [totalBill, setTotalBill] = useState<number>(550);
  const [totalConsumption, setTotalConsumption] = useState<number>(353);
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'Bruno', consumption: 190 },
    { id: '2', name: 'Daniele', consumption: 163 }
  ]);

  const pricePerCubicMeter = totalConsumption > 0 ? totalBill / totalConsumption : 0;

  const addPerson = () => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: `Persona ${people.length + 1}`,
      consumption: 0
    };
    setPeople([...people, newPerson]);
  };

  const removePerson = (id: string) => {
    if (people.length > 1) {
      setPeople(people.filter(person => person.id !== id));
    }
  };

  const updatePerson = (id: string, field: 'name' | 'consumption', value: string | number) => {
    setPeople(people.map(person => 
      person.id === id 
        ? { ...person, [field]: value }
        : person
    ));
  };

  const results = people.map(person => ({
    ...person,
    amount: person.consumption * pricePerCubicMeter
  }));

  const totalCalculated = results.reduce((sum, result) => sum + result.amount, 0);
  const actualTotalConsumption = people.reduce((sum, person) => sum + person.consumption, 0);

  useEffect(() => {
    console.log('Calcolo bolletta gas:', {
      totale: totalBill,
      consumoTotale: totalConsumption,
      prezzoAlMetroCubo: pricePerCubicMeter,
      persone: people,
      risultati: results
    });
  }, [totalBill, totalConsumption, people]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <Flame className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Calcolatore Bolletta Gas
          </h1>
          <p className="text-lg text-muted-foreground">
            Dividi facilmente i costi del gas tra coinquilini
          </p>
        </div>

        {/* Input principale */}
        <Card className="glass-effect border-0 shadow-xl animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="w-6 h-6 text-primary" />
              Dati della Bolletta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="totalBill" className="text-base font-medium">
                  Totale Bolletta (€)
                </Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="totalBill"
                    type="number"
                    value={totalBill}
                    onChange={(e) => setTotalBill(Number(e.target.value))}
                    className="pl-10 text-lg h-12 number-input"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalConsumption" className="text-base font-medium">
                  Consumo Totale (m³)
                </Label>
                <div className="relative">
                  <Flame className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="totalConsumption"
                    type="number"
                    value={totalConsumption}
                    onChange={(e) => setTotalConsumption(Number(e.target.value))}
                    className="pl-10 text-lg h-12 number-input"
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {pricePerCubicMeter > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <p className="text-center text-lg font-semibold text-primary">
                  Prezzo per m³: <span className="text-2xl font-bold">{pricePerCubicMeter.toFixed(4)}€</span>
                </p>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  {totalBill}€ ÷ {totalConsumption}m³ = {pricePerCubicMeter.toFixed(4)}€/m³
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Persone */}
        <Card className="glass-effect border-0 shadow-xl animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="w-6 h-6 text-primary" />
                Consumi Individuali
              </CardTitle>
              <Button 
                onClick={addPerson}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {people.map((person, index) => (
              <PersonConsumption
                key={person.id}
                person={person}
                index={index}
                pricePerCubicMeter={pricePerCubicMeter}
                onUpdate={updatePerson}
                onRemove={removePerson}
                canRemove={people.length > 1}
              />
            ))}
          </CardContent>
        </Card>

        {/* Risultati */}
        <ResultDisplay
          results={results}
          totalCalculated={totalCalculated}
          totalBill={totalBill}
          actualTotalConsumption={actualTotalConsumption}
          totalConsumption={totalConsumption}
        />
      </div>
    </div>
  );
};

export default GasBillCalculator;
