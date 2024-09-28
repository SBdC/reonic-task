export interface EV {
    chargingNeed: number;
    energyCharged: number;
  }
  
  export interface Outlet {
    id: number;
    power: number;  // in kW
    ev: EV | null;
  }
  
  export interface SimulationContextType {
    numberOfOutlets: number;
    setNumberOfOutlets: (num: number) => void;
    chargepointPower: number;
    setChargepointPower: (num: number) => void;
    outlets: Outlet[];
    setOutlets: (outlets: Outlet[]) => void;
    theoreticalMaximumTotalPower: number;
    setTheoreticalMaximumTotalPower: (num: number) => void;
    dailyEnergyConsumed: number;
    dailyMaxPowerDemand: number;
    simulateDay: () => void;
  }