import React, { createContext, useState, ReactNode } from 'react';
import { Outlet, SimulationContextType  } from '../components/types/simulation';


export const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [numberOfOutlets, setNumberOfOutlets] = useState<number>(20);
  const [chargepointPower, setChargepointPower] = useState<number>(11);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [theoreticalMaximumTotalPower, setTheoreticalMaximumTotalPower] = useState<number>(0);

  return (
    <SimulationContext.Provider
      value={{
        numberOfOutlets,
        setNumberOfOutlets,
        chargepointPower,
        setChargepointPower,
        outlets,
        theoreticalMaximumTotalPower,
        setTheoreticalMaximumTotalPower,
        setOutlets,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
