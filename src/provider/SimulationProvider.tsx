import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Outlet, SimulationContextType, YearlySimulationResult } from '../types/simulation';
import { simulateDay } from './utils/simulateDay';
import { simulateYear } from './utils/simulateYear';

export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [numberOfOutlets, setNumberOfOutlets] = useState<number>(20);
    const [chargepointPower, setChargepointPower] = useState<number>(11);
    const [arrivalProbabilityMultiplier, setArrivalProbabilityMultiplier] = useState<number>(1);
    const [carConsumption, setCarConsumption] = useState<number>(18);
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [dailyEnergyConsumed, setDailyEnergyConsumed] = useState<number>(0);
    const [dailyMaxPowerDemand, setDailyMaxPowerDemand] = useState<number>(0);
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
          carConsumption
        );
    
        setYearlySimulationResult(result);
        console.log("Yearly simulation result:", result);
      }, [numberOfOutlets, chargepointPower, arrivalProbabilityMultiplier, carConsumption]);


    const runSimulation = useCallback(() => {
      const { updatedOutlets, totalEnergyConsumed, maxPowerDemand } = simulateDay(
        outlets, 
        chargepointPower, 
        arrivalProbabilityMultiplier, 
        carConsumption
      );
      setOutlets(updatedOutlets);
      setDailyEnergyConsumed(totalEnergyConsumed);
      setDailyMaxPowerDemand(maxPowerDemand);
    }, [outlets, chargepointPower, arrivalProbabilityMultiplier, carConsumption]);
  
    return (
      <SimulationContext.Provider
        value={{
          numberOfOutlets,
          setNumberOfOutlets,
          chargepointPower,
          setChargepointPower,
          simulateYear: runYearlySimulation,
          arrivalProbabilityMultiplier,
          setArrivalProbabilityMultiplier,
          carConsumption,
          setCarConsumption,
          outlets,
          setOutlets,
          dailyEnergyConsumed,
          dailyMaxPowerDemand,
          simulateDay: runSimulation,
          runYearlySimulation,
          yearlySimulationResult,
        }}
      >
        {children}
      </SimulationContext.Provider>
    );
  };