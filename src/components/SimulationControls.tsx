import React from 'react';
import { useSimulation } from '../provider/useSimulation';

interface SimulationControlsProps {
  onSimulate: () => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({ onSimulate }) => {
  const { dailyEnergyConsumed, dailyMaxPowerDemand } = useSimulation();

  return (
    <div className="simulation-controls">
      <p>Daily Energy Consumed: {dailyEnergyConsumed.toFixed(2)} kWh</p>
      <p>Daily Max Power Demand: {dailyMaxPowerDemand.toFixed(2)} kW</p>
      <button onClick={onSimulate}>Simulate Day</button>
    </div>
  );
};

export default SimulationControls;