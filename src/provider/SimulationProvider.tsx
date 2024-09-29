import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Outlet, SimulationContextType} from '../types/simulation';
import { simulateDay } from './utils/simulateDay';
export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [numberOfOutlets, setNumberOfOutlets] = useState<number>(20);
    const [chargepointPower, setChargepointPower] = useState<number>(11);
    const [arrivalProbabilityMultiplier, setArrivalProbabilityMultiplier] = useState<number>(1);
    const [carConsumption, setCarConsumption] = useState<number>(18);
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [theoreticalMaximumTotalPower, setTheoreticalMaximumTotalPower] = useState<number>(0);
    const [dailyEnergyConsumed, setDailyEnergyConsumed] = useState<number>(0);
    const [dailyMaxPowerDemand, setDailyMaxPowerDemand] = useState<number>(0);
  
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
          arrivalProbabilityMultiplier,
          setArrivalProbabilityMultiplier,
          carConsumption,
          setCarConsumption,
          outlets,
          setOutlets,
          theoreticalMaximumTotalPower,
          setTheoreticalMaximumTotalPower,
          dailyEnergyConsumed,
          dailyMaxPowerDemand,
          simulateDay: runSimulation,
        }}
      >
        {children}
      </SimulationContext.Provider>
    );
  };