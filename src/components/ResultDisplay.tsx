
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertCircle, CheckCircle, Euro, Crown, Award, Sparkles } from 'lucide-react';

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
    <Card className="italian-glass border-0 shadow-2xl animate-elegant-slide italian-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl garda-title">
          <div className="relative">
            <div className="absolute inset-0 animate-glow-pulse rounded-full"></div>
            <div className="relative garda-sunset p-3 rounded-full">
              <TrendingUp className="w-7 h-7 text-white animate-garda-wave" />
            </div>
          </div>
          Risultati Eleganti
          <Sparkles className="w-6 h-6 text-italian-gold animate-shimmer" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Avvisi stilizzati */}
        {!consumptionMatches && (
          <div className="bg-gradient-to-r from-italian-sunset to-italian-gold p-5 rounded-2xl border-2 border-italian-gold/30 animate-elegant-slide">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-white mt-1 flex-shrink-0 animate-garda-wave" />
              <div>
                <p className="text-white font-bold text-lg mb-2">Attenzione Elegante!</p>
                <p className="text-white/90 text-base">
                  I consumi individuali ({actualTotalConsumption.toFixed(1)}m³) non corrispondono 
                  al totale della bolletta ({totalConsumption}m³)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Risultati per persona con stile italiano */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6 text-italian-gold animate-float" />
            <h3 className="text-2xl font-bold garda-title">Importo per Persona</h3>
          </div>
          {results.map((result, index) => (
            <div
              key={result.id}
              className="garda-card p-6 rounded-2xl border-2 border-garda-light/50 hover:border-garda-blue/70 italian-hover animate-elegant-slide"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 garda-gradient rounded-full animate-glow-pulse"></div>
                    <div className="relative garda-gradient text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-garda-deep">{result.name}</p>
                    <div className="flex items-center gap-2 text-garda-blue">
                      <Sparkles className="w-4 h-4 animate-shimmer" />
                      <span className="text-base">{result.consumption}m³ di consumo</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-3xl font-bold text-garda-deep">
                    <Euro className="w-7 h-7 text-italian-gold animate-float" />
                    <span className="garda-title animate-shimmer">{result.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Totale elegante */}
        <div className="garda-sunset p-8 rounded-3xl border-2 border-italian-gold/50 shadow-2xl animate-elegant-slide">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-white animate-garda-wave" />
                <p className="text-white/90 text-lg">Totale Calcolato</p>
              </div>
              <div className="flex items-center gap-3 text-4xl font-black text-white">
                <Euro className="w-8 h-8 animate-float" />
                <span className="animate-shimmer">{totalCalculated.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-lg mb-2">Bolletta Originale</p>
              <div className="flex items-center gap-3 text-3xl font-bold text-white/90">
                <Euro className="w-6 h-6" />
                <span>{totalBill.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {difference > 0.01 && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white animate-shimmer" />
                <p className="text-white text-lg">
                  Differenza: €{difference.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status elegante */}
        <div className={`p-6 rounded-2xl border-2 transition-all duration-500 animate-elegant-slide ${
          isBalanced 
            ? 'bg-gradient-to-r from-green-50 to-garda-mist border-green-300/50' 
            : 'bg-gradient-to-r from-red-50 to-italian-sunset/20 border-red-300/50'
        }`}>
          <div className="flex items-center gap-4">
            {isBalanced ? (
              <>
                <div className="garda-gradient p-3 rounded-full animate-glow-pulse">
                  <CheckCircle className="w-6 h-6 text-white animate-italian-bounce" />
                </div>
                <div>
                  <p className="text-green-800 font-bold text-xl mb-1">Perfetto Equilibrio!</p>
                  <p className="text-green-700 text-lg">
                    I conti tornano alla perfezione, stile Lago di Garda!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full animate-glow-pulse">
                  <AlertCircle className="w-6 h-6 text-white animate-garda-wave" />
                </div>
                <div>
                  <p className="text-red-800 font-bold text-xl mb-1">Differenza Rilevata</p>
                  <p className="text-red-700 text-lg">
                    C'è una differenza di €{difference.toFixed(2)} tra il totale calcolato e la bolletta
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
