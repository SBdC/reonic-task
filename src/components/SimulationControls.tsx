import React from "react";
import { useSimulation } from "../provider/useSimulation";

interface SimulationControlsProps {
  onSimulate: () => void;
  runYearlySimulation: () => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  onSimulate,
  runYearlySimulation
}) => {
  const {

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

      <button onClick={onSimulate}>Simulate Day</button>
      <button onClick={runYearlySimulation}>Simulate Year</button>
    </div>
  );
};

export default SimulationControls;
