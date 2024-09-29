import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Outlet, SimulationContextType, YearlySimulationResult, DailyStats } from '../types/simulation';
import { simulateDay } from './utils/simulateDay';
import { simulateYear } from './utils/simulateYear';

export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [numberOfOutlets, setNumberOfOutlets] = useState<number>(20);
    const [chargepointPower, setChargepointPower] = useState<number>(11);
    const [arrivalProbabilityMultiplier, setArrivalProbabilityMultiplier] = useState<number>(1);
    const [kWhPer100km, setKWhPer100km] = useState<number>(18);
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [dailyStats, setDailyStats] = useState<DailyStats>({
      energyConsumed: 0,
      maxPowerDemand: 0,
      evChargedCount: 0,
      averageChargingTime: 0,
      chargingEvents: 0,
      finalOutletState: []
    });
    const [yearlySimulationResult, setYearlySimulationResult] = useState<YearlySimulationResult | null>(null);

    const runYearlySimulation = useCallback(() => {
        console.log("Running yearly simulation");
        const initialOutlets: Outlet[] = Array.from({ length: numberOfOutlets }, (_, i) => ({
          id: i,
          power: chargepointPower,
          ev: null
        }));
    
        const result = simulateYear(
          initialOutlets,
          chargepointPower,
          arrivalProbabilityMultiplier,
          kWhPer100km
        );
    
        setYearlySimulationResult(result);
        console.log("Yearly simulation result:", result);
      }, [numberOfOutlets, chargepointPower, arrivalProbabilityMultiplier, kWhPer100km]);


    const runSimulation = useCallback(() => {
      const { updatedOutlets, totalEnergyConsumed, maxPowerDemand } = simulateDay(
        outlets, 
        chargepointPower, 
        arrivalProbabilityMultiplier, 
        kWhPer100km,
      );
      setOutlets(updatedOutlets);
      setDailyStats({
        energyConsumed: totalEnergyConsumed,
        maxPowerDemand,
        evChargedCount: 0,
        averageChargingTime: 0,
        chargingEvents: 0,
        finalOutletState: updatedOutlets
      });
    }, [outlets, chargepointPower, arrivalProbabilityMultiplier, kWhPer100km]);
  
    const contextValue: SimulationContextType = {
      numberOfOutlets,
      setNumberOfOutlets,
      chargepointPower,
      setChargepointPower,
      kWhPer100km,
      setKWhPer100km,
      outlets,
      setOutlets,
      dailyEnergyConsumed: dailyStats.energyConsumed,
      dailyMaxPowerDemand: dailyStats.maxPowerDemand,
      arrivalProbabilityMultiplier,
      setArrivalProbabilityMultiplier,
    
      simulateDay: runSimulation,
      dailyStats,
      setDailyStats,
      yearlySimulationResult,
      setYearlySimulationResult,
      simulateYear: runYearlySimulation,
      getChargingNeed: function (): number {
        throw new Error('Function not implemented.');
      }
    };
  
    return (
      <SimulationContext.Provider value={contextValue}>
        {children}
      </SimulationContext.Provider>
    );
  
  };