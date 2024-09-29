export interface EV {
  chargingNeed: number;
  energyCharged: number;
}

export interface Outlet {
  id: number;
  power: number;  // in kW
  ev: EV | null;
}

export interface DailyStats {
  energyConsumed: number;
  maxPowerDemand: number;
  evChargedCount: number;
  averageChargingTime: number;
  chargingEvents: number;
  finalOutletState: Outlet[];
}

export interface YearlySimulationResult {
  dailyStats: DailyStats[];
  totalEnergyConsumed: number;
  averageDailyEnergyConsumed: number;
  maxPowerDemand: number;
  totalEvCharged: number;
  averageChargingTime: number;
  yearlyEnergyConsumed: number;
  yearlyMaxPowerDemand: number;
  totalChargingEvents: number;
}

export interface SimulationContextType {
  numberOfOutlets: number;
  setNumberOfOutlets: React.Dispatch<React.SetStateAction<number>>;
  chargepointPower: number;
  setChargepointPower: React.Dispatch<React.SetStateAction<number>>;
  outlets: Outlet[];
  setOutlets: React.Dispatch<React.SetStateAction<Outlet[]>>;
  dailyEnergyConsumed: number;
  dailyMaxPowerDemand: number;
  arrivalProbabilityMultiplier: number;
  setArrivalProbabilityMultiplier: React.Dispatch<React.SetStateAction<number>>;
  simulateDay: () => void;
  dailyStats: DailyStats;
  setDailyStats: React.Dispatch<React.SetStateAction<DailyStats>>;
  yearlySimulationResult: YearlySimulationResult | null;
  setYearlySimulationResult: React.Dispatch<React.SetStateAction<YearlySimulationResult | null>>;
  simulateYear: () => void;
  getChargingNeed: () => number;
  kWhPer100km: number;
  setKWhPer100km: React.Dispatch<React.SetStateAction<number>>;
}