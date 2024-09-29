import React from "react";
import { useSimulation } from "../provider/useSimulation";

interface SimulationControlsProps {
  onSimulate: () => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  onSimulate,
}) => {
  const {
    dailyEnergyConsumed,
    dailyMaxPowerDemand,
    numberOfOutlets,
    setNumberOfOutlets,
    chargepointPower,
    setChargepointPower,
    arrivalProbabilityMultiplier,
    setArrivalProbabilityMultiplier,
    carConsumption,
    setCarConsumption,
  } = useSimulation();

  return (
    <div className="simulation-controls">
      <div>
        <label>
          Number of Outlets:
          <input
            type="number"
            value={numberOfOutlets}
            onChange={(e) => setNumberOfOutlets(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <div>
        <label>
          Chargepoint Power (kW):
          <input
            type="number"
            value={chargepointPower}
            onChange={(e) => setChargepointPower(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <div>
        <label>
          Arrival Probability Multiplier (%):
          <input
            type="number"
            value={arrivalProbabilityMultiplier * 100}
            onChange={(e) =>
              setArrivalProbabilityMultiplier(Number(e.target.value) / 100)
            }
            min="20"
            max="200"
          />
        </label>
      </div>
      <div>
        <label>
          Car Consumption (kW):
          <input
            type="number"
            value={carConsumption}
            onChange={(e) => setCarConsumption(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <p>Daily Energy Consumed: {dailyEnergyConsumed.toFixed(2)} kWh</p>
      <p>Daily Max Power Demand: {dailyMaxPowerDemand.toFixed(2)} kW</p>
      <button onClick={onSimulate}>Simulate Day</button>
    </div>
  );
};

export default SimulationControls;
