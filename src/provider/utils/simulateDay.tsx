import { Outlet } from '../../types/simulation';

export const simulateDay = (
  outlets: Outlet[],
  chargepointPower: number,
  arrivalProbabilityMultiplier: number,
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
    let currentPowerDemand = 0;

    updatedOutlets.forEach((outlet, index) => {
      if (!outlet.ev) {
        // Adjusted arrival probability (35-55%) * multiplier
        const baseArrivalProbability = Math.random() * 0.2 + 0.35;
        if (Math.random() < baseArrivalProbability * arrivalProbabilityMultiplier) {
          const chargingNeed = Math.random() * (121 - carConsumption) + carConsumption; // Random between carConsumption and 121 kW
          updatedOutlets[index].ev = { chargingNeed, energyCharged: 0 };
          chargingEvents++;
        }
      }

      if (outlet.ev) {
        // Charging for 15 minutes
        const energyCharged = Math.min(chargepointPower * 0.25, outlet.ev.chargingNeed - outlet.ev.energyCharged);
        outlet.ev.energyCharged += energyCharged;
        totalEnergyConsumed += energyCharged;
        currentPowerDemand += chargepointPower;

        // Check if charging is complete
        if (outlet.ev.energyCharged >= outlet.ev.chargingNeed) {
          updatedOutlets[index].ev = null; // EV departs
        }
      }
    });

    maxPowerDemand = Math.max(maxPowerDemand, currentPowerDemand);
  }

  return { updatedOutlets, totalEnergyConsumed, maxPowerDemand, chargingEvents };
};