
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertCircle, CheckCircle, Euro, Calculator } from 'lucide-react';

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

  return (
    <Card className="glass-effect border-0 shadow-xl animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TrendingUp className="w-6 h-6 text-primary" />
          Risultati del Calcolo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avvisi */}
        {!consumptionMatches && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-amber-800 font-medium">Attenzione ai consumi!</p>
              <p className="text-amber-700 text-sm">
                I consumi individuali ({actualTotalConsumption.toFixed(1)}m³) non corrispondono 
                al totale della bolletta ({totalConsumption}m³)
              </p>
            </div>
          </div>
        )}

        {/* Risultati per persona */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4">Importo da pagare per persona:</h3>
          {results.map((result, index) => (
            <div
              key={result.id}
              className="bg-gradient-to-r from-white to-blue-50/50 p-4 rounded-lg border border-blue-200/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{result.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.consumption}m³ di consumo
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                    <Euro className="w-5 h-5" />
                    {result.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Totale */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Totale Calcolato</p>
              <div className="flex items-center gap-2 text-3xl font-bold">
                <Euro className="w-6 h-6" />
                {totalCalculated.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-1">Bolletta Originale</p>
              <div className="flex items-center gap-2 text-2xl font-semibold">
                <Euro className="w-5 h-5" />
                {totalBill.toFixed(2)}
              </div>
            </div>
          </div>
          
          {difference > 0.01 && (
            <div className="mt-4 pt-4 border-t border-blue-400/30">
              <p className="text-blue-100 text-sm">
                Differenza: €{difference.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Status */}
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          isBalanced 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {isBalanced ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-green-800 font-medium">Calcolo bilanciato!</p>
                <p className="text-green-700 text-sm">
                  I conti tornano perfettamente
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-red-800 font-medium">Differenza rilevata</p>
                <p className="text-red-700 text-sm">
                  C'è una differenza di €{difference.toFixed(2)} tra il totale calcolato e la bolletta
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
