export interface Outlet {
    id: number;
    power: number;  // in kW
    isOccupied: boolean;

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
  }