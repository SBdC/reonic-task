import { Outlet } from '../../types/simulation';

export const simulateDay = (
  outlets: Outlet[],
  chargepointPower: number
): {
  updatedOutlets: Outlet[];
  totalEnergyConsumed: number;
  maxPowerDemand: number;
} => {
  let totalEnergyConsumed = 0;
  let maxPowerDemand = 0;

  const updatedOutlets = outlets.map(outlet => ({ ...outlet }));

  for (let interval = 0; interval < 96; interval++) {
    let currentPowerDemand = 0;

    updatedOutlets.forEach((outlet, index) => {
      if (!outlet.ev) {
        // Arrival probability (35-55%)
        if (Math.random() < (Math.random() * 0.2 + 0.35)) {
          const chargingNeed = Math.random() * (121 - 18) + 18; // Random between 18 and 121 kW
          updatedOutlets[index].ev = { chargingNeed, energyCharged: 0 };
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

  return { updatedOutlets, totalEnergyConsumed, maxPowerDemand };
};