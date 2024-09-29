interface ChargingDemand {
  chargingDemandinKm: number;
  probability: number;
}

const chargingDemands: ChargingDemand[] = [
  { chargingDemandinKm: 0, probability: 34.31 },  
  { chargingDemandinKm: 5.0, probability: 4.90 },  
  { chargingDemandinKm: 10, probability: 9.8 }, 
  { chargingDemandinKm: 20, probability: 11.76 },
  { chargingDemandinKm: 30, probability: 8.82 },
  { chargingDemandinKm: 50, probability: 11.76 }, 
  { chargingDemandinKm: 100, probability: 10.78 },
  { chargingDemandinKm: 200, probability: 4.9 },
  { chargingDemandinKm: 300, probability: 2.94 }
];
export const getChargingNeed = (kWhPer100km: number): number => {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const demand of chargingDemands) {
    cumulativeProbability += demand.probability;
    if (random <= cumulativeProbability) {
      return (demand.chargingDemandinKm / 100) * kWhPer100km;
    }
  }

  return 0;
}