import { Outlet } from '../../types/simulation';
import { getConcurrencyFactor } from './getConcurrencyFactor';

export const simulateDay = (
  outlets: Outlet[],
  chargepointPower: number,
  concurrencyMultiplier: number,
  carConsumption: number
): {
  updatedOutlets: Outlet[];
  totalEnergyConsumed: number;
  maxPowerDemand: number;
  chargingEvents: number;
} => {
  let totalEnergyConsumed = 0;
  let maxPowerDemand = 0;
  let chargingEvents = 0;

  const updatedOutlets = outlets.map(outlet => ({ ...outlet }));

  for (let interval = 0; interval < 96; interval++) {
    const hour = Math.floor(interval / 4);
    let currentPowerDemand = 0;

    const targetOccupancy = Math.round(outlets.length * getConcurrencyFactor(hour) * concurrencyMultiplier);
    const currentOccupancy = updatedOutlets.filter(outlet => outlet.ev !== null).length;

    // Add new EVs if needed
    if (currentOccupancy < targetOccupancy) {
      const newEVs = targetOccupancy - currentOccupancy;
      updatedOutlets.forEach((outlet, index) => {
        if (!outlet.ev && newEVs > 0) {
          const chargingNeed = Math.random() * (121 - carConsumption) + carConsumption;
          updatedOutlets[index].ev = { chargingNeed, energyCharged: 0 };
          chargingEvents++;
        }
      });
    }

    // Process charging and departures
    updatedOutlets.forEach((outlet, index) => {
      if (outlet.ev) {
        const energyCharged = Math.min(chargepointPower * 0.25, outlet.ev.chargingNeed - outlet.ev.energyCharged);
        outlet.ev.energyCharged += energyCharged;
        totalEnergyConsumed += energyCharged;
        currentPowerDemand += chargepointPower;

        if (outlet.ev.energyCharged >= outlet.ev.chargingNeed) {
          updatedOutlets[index].ev = null; // EV departs
        }
      }
    });

    maxPowerDemand = Math.max(maxPowerDemand, currentPowerDemand);
  }

  return { updatedOutlets, totalEnergyConsumed, maxPowerDemand, chargingEvents };
};