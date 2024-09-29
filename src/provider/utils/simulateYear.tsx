import { Outlet, YearlySimulationResult, DailyStats } from '../../types/simulation';
import { simulateDay } from './simulateDay';

export const simulateYear = (
    initialOutlets: Outlet[],
    chargepointPower: number,
    arrivalProbabilityMultiplier: number,
    carConsumption: number
  ): YearlySimulationResult => {
    let yearlyEnergyConsumed = 0;
    let yearlyMaxPowerDemand = 0;
    let totalChargingEvents = 0;
    const dailyStats: DailyStats[] = [];
  
    let currentOutlets = initialOutlets;
  
    for (let day = 0; day < 365; day++) {
      const daySimulation = simulateDay(
        currentOutlets,
        chargepointPower,
        arrivalProbabilityMultiplier,
        carConsumption
      );
  
      yearlyEnergyConsumed += daySimulation.totalEnergyConsumed;
      yearlyMaxPowerDemand = Math.max(yearlyMaxPowerDemand, daySimulation.maxPowerDemand);
      totalChargingEvents += daySimulation.chargingEvents;
  
      dailyStats.push({
        energyConsumed: daySimulation.totalEnergyConsumed,
        maxPowerDemand: daySimulation.maxPowerDemand,
        chargingEvents: daySimulation.chargingEvents,
        finalOutletState: daySimulation.updatedOutlets,
        evChargedCount: daySimulation.evChargedCount,
        averageChargingTime: daySimulation.averageChargingTime
      });
  
      currentOutlets = daySimulation.updatedOutlets;
    }
  
    return { 
      yearlyEnergyConsumed, 
      yearlyMaxPowerDemand, 
      totalChargingEvents, 
      dailyStats,
      totalEnergyConsumed: yearlyEnergyConsumed,
      averageDailyEnergyConsumed: yearlyEnergyConsumed / 365,
      maxPowerDemand: yearlyMaxPowerDemand,
      totalEvCharged: dailyStats.reduce((sum, day) => sum + day.evChargedCount, 0),
      averageChargingTime: dailyStats.reduce((sum, day) => sum + day.averageChargingTime, 0) / dailyStats.length
    };
  };