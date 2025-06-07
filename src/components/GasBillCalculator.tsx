
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Flame, Users, Euro, Plus, Waves, Mountain } from 'lucide-react';
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
    <div className="min-h-screen garda-gradient relative overflow-hidden">
      {/* Elementi decorativi animati */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <Mountain className="w-16 h-16 text-white transform rotate-12" />
      </div>
      <div className="absolute top-40 right-20 animate-garda-wave opacity-30">
        <Waves className="w-12 h-12 text-white" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float opacity-25" style={{ animationDelay: '2s' }}>
        <Waves className="w-8 h-8 text-white transform -rotate-45" />
      </div>
      
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header elegante */}
          <div className="text-center py-12 animate-elegant-slide">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 animate-glow-pulse rounded-full"></div>
                <div className="relative garda-sunset p-4 rounded-full animate-italian-bounce">
                  <Flame className="w-10 h-10 text-white animate-garda-wave" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold garda-title mb-4 italian-shadow animate-shimmer">
              Calcolatore Gas
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 italian-shadow">
              Lago di Garda Style
            </h2>
            <p className="text-xl text-white/90 italic animate-fade-in" style={{ animationDelay: '0.5s' }}>
              L'eleganza italiana incontra la funzionalità moderna
            </p>
          </div>

          {/* Input principale con stile Garda */}
          <Card className="italian-glass border-0 shadow-2xl animate-elegant-slide italian-hover" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl garda-title">
                <div className="garda-sunset p-2 rounded-full animate-garda-wave">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                Dati della Bolletta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 animate-elegant-slide" style={{ animationDelay: '0.4s' }}>
                  <Label htmlFor="totalBill" className="text-lg font-semibold text-garda-deep">
                    Totale Bolletta (€)
                  </Label>
                  <div className="relative group">
                    <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-garda-blue transition-all duration-300 group-hover:scale-110" />
                    <Input
                      id="totalBill"
                      type="number"
                      value={totalBill}
                      onChange={(e) => setTotalBill(Number(e.target.value))}
                      className="pl-12 text-xl h-14 number-input border-2 border-garda-light focus:border-garda-blue transition-all duration-300 hover:shadow-lg"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-3 animate-elegant-slide" style={{ animationDelay: '0.6s' }}>
                  <Label htmlFor="totalConsumption" className="text-lg font-semibold text-garda-deep">
                    Consumo Totale (m³)
                  </Label>
                  <div className="relative group">
                    <Flame className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-italian-sunset transition-all duration-300 group-hover:scale-110 animate-garda-wave" />
                    <Input
                      id="totalConsumption"
                      type="number"
                      value={totalConsumption}
                      onChange={(e) => setTotalConsumption(Number(e.target.value))}
                      className="pl-12 text-xl h-14 number-input border-2 border-garda-light focus:border-garda-blue transition-all duration-300 hover:shadow-lg"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {pricePerCubicMeter > 0 && (
                <div className="garda-sunset p-6 rounded-2xl border-2 border-italian-gold/30 animate-elegant-slide" style={{ animationDelay: '0.8s' }}>
                  <p className="text-center text-xl font-bold text-white mb-2">
                    Prezzo per m³: <span className="text-3xl font-black animate-shimmer">{pricePerCubicMeter.toFixed(4)}€</span>
                  </p>
                  <p className="text-center text-white/90 text-lg">
                    {totalBill}€ ÷ {totalConsumption}m³ = {pricePerCubicMeter.toFixed(4)}€/m³
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Persone con animazioni */}
          <Card className="italian-glass border-0 shadow-2xl animate-elegant-slide italian-hover" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-2xl garda-title">
                  <div className="garda-gradient p-2 rounded-full animate-float">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  Consumi Individuali
                </CardTitle>
                <Button 
                  onClick={addPerson}
                  className="garda-sunset hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 text-lg px-6 py-3 animate-italian-bounce"
                  size="sm"
                >
                  <Plus className="w-5 h-5 mr-2 animate-garda-wave" />
                  Aggiungi Persona
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {people.map((person, index) => (
                <div 
                  key={person.id} 
                  className="animate-elegant-slide" 
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <PersonConsumption
                    person={person}
                    index={index}
                    pricePerCubicMeter={pricePerCubicMeter}
                    onUpdate={updatePerson}
                    onRemove={removePerson}
                    canRemove={people.length > 1}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risultati */}
          <div className="animate-elegant-slide" style={{ animationDelay: '0.8s' }}>
            <ResultDisplay
              results={results}
              totalCalculated={totalCalculated}
              totalBill={totalBill}
              actualTotalConsumption={actualTotalConsumption}
              totalConsumption={totalConsumption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasBillCalculator;
