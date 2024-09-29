import React from 'react';
import { useSimulation } from '../../provider/useSimulation';

const YearStats: React.FC = () => {
  const { yearlySimulationResult } = useSimulation();

  if (!yearlySimulationResult) {
    return <div>No yearly simulation data available. Please run a simulation first.</div>;
  }

  const {
    yearlyEnergyConsumed,
    yearlyMaxPowerDemand,
    totalChargingEvents,
  } = yearlySimulationResult;

  const averageDailyEnergyConsumed = yearlyEnergyConsumed / 365;
  const averageDailyChargingEvents = totalChargingEvents / 365;

  return (
    <div className="year-stats">
      <h2>Yearly Simulation Results</h2>
      <p>Total Energy Consumed: {yearlyEnergyConsumed.toFixed(2)} kWh</p>
      <p>Max Power Demand: {yearlyMaxPowerDemand.toFixed(2)} kW</p>
      <p>Total Charging Events: {totalChargingEvents}</p>
      <p>Average Daily Energy Consumed: {averageDailyEnergyConsumed.toFixed(2)} kWh</p>
      <p>Average Daily Charging Events: {averageDailyChargingEvents.toFixed(2)}</p>
{/*       
      <h3>Monthly Breakdown</h3>
      {Array.from({ length: 12 }, (_, i) => {
        const monthStart = i * 30;
        const monthEnd = Math.min((i + 1) * 30, 365);
        const monthlyStats = dailyStats.slice(monthStart, monthEnd);
        const monthlyEnergyConsumed = monthlyStats.reduce((sum, day) => sum + day.energyConsumed, 0);
        const monthlyChargingEvents = monthlyStats.reduce((sum, day) => sum + day.chargingEvents, 0);
        
        return (
          <div key={i}>
            <h4>Month {i + 1}</h4>
            <p>Energy Consumed: {monthlyEnergyConsumed.toFixed(2)} kWh</p>
            <p>Charging Events: {monthlyChargingEvents}</p>
          </div>
        );
      })} */}
    </div>
  );
};

export default YearStats;