
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Flame, Users, Euro, Plus, Waves, Mountain, Crown, Sparkles } from 'lucide-react';
import { PersonConsumption } from './PersonConsumption';
import { ResultDisplay } from './ResultDisplay';
import { ParticleField } from './ParticleField';
import { LuxuryIcon } from './LuxuryIcon';
import { FinancialPanicMode } from './FinancialPanicMode';

interface Person {
  id: string;
  name: string;
  consumption: number;
}


const GasBillCalculator = () => {
  const [totalBill, setTotalBill] = useState<number | string>("");
  const [totalConsumption, setTotalConsumption] = useState<number | string>(353);
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'Bruno', consumption: 190 },
    { id: '2', name: 'Daniele', consumption: 163 }
  ]);

  const pricePerCubicMeter = useMemo(() => {
    const bill = Number(totalBill) || 0;
    const consumption = Number(totalConsumption) || 0;
    return consumption > 0 ? bill / consumption : 0;
  }, [totalBill, totalConsumption]);

  const addPerson = useCallback(() => {
    setPeople(currentPeople => [
      ...currentPeople,
      {
        id: Date.now().toString(),
        name: `Persona ${currentPeople.length + 1}`,
        consumption: 0
      }
    ]);
  }, []);

  const removePerson = useCallback((id: string) => {
    setPeople(currentPeople => {
      if (currentPeople.length > 1) {
        return currentPeople.filter(person => person.id !== id);
      }
      return currentPeople;
    });
  }, []);

  const updatePerson = useCallback((id: string, field: 'name' | 'consumption', value: string | number) => {
    setPeople(currentPeople => currentPeople.map(person =>
      person.id === id
        ? { ...person, [field]: value }
        : person
    ));
  }, []);

  const results = useMemo(() => {
    return people.map(person => ({
      ...person,
      amount: person.consumption * pricePerCubicMeter
    }));
  }, [people, pricePerCubicMeter]);

  const totalCalculated = useMemo(() => {
    return results.reduce((sum, result) => sum + result.amount, 0);
  }, [results]);

  const actualTotalConsumption = useMemo(() => {
    return people.reduce((sum, person) => sum + person.consumption, 0);
  }, [people]);

  useEffect(() => {
    console.log('Calcolo bolletta gas:', {
      totale: totalBill,
      consumoTotale: totalConsumption,
      prezzoAlMetroCubo: pricePerCubicMeter,
      persone: people,
      risultati: results
    });
  }, [totalBill, totalConsumption, people, pricePerCubicMeter, results]);

  const isPanicMode = Number(totalBill) > 2000;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Sfondo premium con particelle */}
      <ParticleField />

      {/* Effetti di luce ambientali */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-garda-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-italian-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-garda-deep/5 rounded-full blur-3xl" />
      </div>

      {/* Decorazioni animate premium */}
      <motion.div
        className="absolute top-20 left-10 z-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mountain className="w-20 h-20 text-garda-light/30" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-16 z-10"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Waves className="w-16 h-16 text-garda-blue/40" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 z-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -15, 0],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Crown className="w-14 h-14 text-italian-gold/40" />
      </motion.div>

      {/* Contenuto principale */}
      <motion.div
        className="relative z-10 p-4 md:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Header Ultra Premium */}
          <motion.div
            className="text-center py-16 relative"
            variants={itemVariants}
          >
            {/* Badge Premium */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-4 h-4 text-italian-gold animate-pulse" />
              <span className="text-sm font-medium text-italian-gold tracking-widest uppercase">
                Premium Edition 2025
              </span>
              <Sparkles className="w-4 h-4 text-italian-gold animate-pulse" />
            </motion.div>

            {/* Icona principale */}
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 12 }}
            >
              <LuxuryIcon icon={Flame} size="xl" variant="sunset" />
            </motion.div>

            {/* Titolo principale */}
            <motion.h1
              className="text-5xl md:text-8xl font-display font-bold luxury-title mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Calcolatore Gas
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-4xl font-display font-medium text-garda-light mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Lago di Garda Luxury Edition
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              L'eccellenza italiana incontra la tecnologia più raffinata
            </motion.p>
          </motion.div>

          {/* Card Input Principale */}
          <motion.div variants={itemVariants}>
            <Card className="glass-ultra luxury-border overflow-hidden">
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center gap-4 text-2xl">
                  <LuxuryIcon icon={Calculator} size="md" variant="garda" />
                  <span className="garda-title font-display">Dati della Bolletta</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    className="space-y-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >

                    <Label htmlFor="totalBill" className="text-lg font-semibold text-garda-light flex items-center gap-2">
                      <Euro className="w-5 h-5 text-italian-gold" />
                      Totale Bolletta
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-italian-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      <Input
                        id="totalBill"
                        type="number"
                        value={totalBill}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTotalBill(val === '' ? '' : Number(val));
                        }}
                        className="relative text-xl h-16 number-input bg-white/5 border-white/10 focus:border-italian-gold/50 focus:ring-italian-gold/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="totalConsumption" className="text-lg font-semibold text-garda-light flex items-center gap-2">
                      <Flame className="w-5 h-5 text-sunset-orange" />
                      Consumo Totale (m³)
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-garda-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      <Input
                        id="totalConsumption"
                        type="number"
                        value={totalConsumption}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTotalConsumption(val === '' ? '' : Number(val));
                        }}
                        className="relative text-xl h-16 number-input bg-white/5 border-white/10 focus:border-garda-blue/50 focus:ring-garda-blue/20 transition-all duration-300 text-foreground"
                        step="0.1"
                        min="0"
                        placeholder="0.0"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Prezzo al metro cubo */}
                <AnimatePresence>
                  {!isPanicMode && pricePerCubicMeter > 0 && (
                    <motion.div
                      className="relative overflow-hidden rounded-2xl"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="absolute inset-0 garda-sunset opacity-90" />
                      <div className="absolute inset-0 animate-shimmer-slide" />
                      <div className="relative p-8 text-center">
                        <motion.p
                          className="text-xl font-medium text-white/90 mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          Prezzo per metro cubo
                        </motion.p>
                        <motion.p
                          className="text-4xl md:text-5xl font-display font-bold text-white text-glow-gold"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        >
                          {pricePerCubicMeter.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
                        </motion.p>

                        <motion.p
                          className="mt-3 text-white/80 text-lg"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {Number(totalBill).toLocaleString('it-IT')}€ ÷ {totalConsumption}m³
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <AnimatePresence mode="wait">
            {isPanicMode ? (
              <motion.div
                key="panic"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                variants={itemVariants}
                className="my-10"
              >
                <FinancialPanicMode
                  amount={Number(totalBill)}
                  onReset={() => setTotalBill(0)}
                />
              </motion.div>
            ) : (
              <>
                {/* Card Persone */}
                <motion.div variants={itemVariants} key="people">
                  <Card className="glass-ultra luxury-border overflow-hidden">
                    <CardHeader className="border-b border-white/5 pb-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <CardTitle className="flex items-center gap-4 text-2xl">
                          <LuxuryIcon icon={Users} size="md" variant="garda" />
                          <span className="garda-title font-display">Consumi Individuali</span>
                        </CardTitle>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={addPerson}
                            className="garda-sunset border-0 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-italian-gold/20 transition-all duration-300"
                            size="lg"
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Aggiungi Persona
                          </Button>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <AnimatePresence mode="popLayout">
                        {people.map((person, index) => (
                          <motion.div
                            key={person.id}
                            layout
                            initial={{ opacity: 0, x: -50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 50, scale: 0.9 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                              delay: index * 0.05
                            }}
                          >
                            <PersonConsumption
                              person={person}
                              index={index}
                              pricePerCubicMeter={pricePerCubicMeter}
                              onUpdate={updatePerson}
                              onRemove={removePerson}
                              canRemove={people.length > 1}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>


                {/* Risultati */}
                <motion.div variants={itemVariants} key="results">
                  <ResultDisplay
                    results={results}
                    totalCalculated={totalCalculated}
                    totalBill={Number(totalBill) || 0}
                    actualTotalConsumption={actualTotalConsumption}
                    totalConsumption={Number(totalConsumption) || 0}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Footer Premium */}
          <motion.footer
            className="text-center py-12 space-y-4"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-italian-gold" />
              </motion.div>
              <span className="text-muted-foreground tracking-widest uppercase text-sm">
                Crafted with Italian Excellence
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-italian-gold" />
              </motion.div>
            </div>
            <p className="text-muted-foreground/60 text-sm">
              Lago di Garda • Italia • {new Date().getFullYear()}
            </p>
          </motion.footer>
        </div>
      </motion.div>
    </div>
  );
};
export default GasBillCalculator;
