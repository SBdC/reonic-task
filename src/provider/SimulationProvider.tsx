import React, { createContext, useState, ReactNode } from 'react';
import { Outlet, SimulationContextType  } from '../components/types/simulation';


export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [numberOfOutlets, setNumberOfOutlets] = useState<number>(20);
  const [chargepointPower, setChargepointPower] = useState<number>(11);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [theoreticalMaximumTotalPower, setTheoreticalMaximumTotalPower] = useState<number>(0);
  const [dailyEnergyConsumed, setDailyEnergyConsumed] = useState<number>(0);
  const [dailyMaxPowerDemand, setDailyMaxPowerDemand] = useState<number>(0);


  const simulateDay = () => {
    let totalEnergyConsumed = 0;
    let maxPowerDemand = 0;

    const updatedOutlets = outlets.map(outlet => ({ ...outlet, isOccupied: false }));

    for (let interval = 0; interval < 96; interval++) {
      let currentPowerDemand = 0;

      updatedOutlets.forEach((outlet, index) => {
        if (!outlet.isOccupied) {
          // Arrival probability (35-55%)
          if (Math.random() < (Math.random() * 0.2 + 0.35)) {
            updatedOutlets[index].isOccupied = true;
          }
        }

        if (outlet.isOccupied) {
          // Charging for 15 minutes
          const energyCharged = outlet.power * 0.25; // kWh
          totalEnergyConsumed += energyCharged;
          currentPowerDemand += outlet.power;

          // 50% chance of departure after charging
          if (Math.random() < 0.5) {
            updatedOutlets[index].isOccupied = false;
          }
        }
      });

      maxPowerDemand = Math.max(maxPowerDemand, currentPowerDemand);
    }

    setOutlets(updatedOutlets);
    setDailyEnergyConsumed(totalEnergyConsumed);
    setDailyMaxPowerDemand(maxPowerDemand);
  };
  return (
    <SimulationContext.Provider
      value={{
        numberOfOutlets,
        setNumberOfOutlets,
        chargepointPower,
        setChargepointPower,
        outlets,
        setOutlets,
        theoreticalMaximumTotalPower,
        setTheoreticalMaximumTotalPower,
        dailyEnergyConsumed,
        dailyMaxPowerDemand,
        simulateDay,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
