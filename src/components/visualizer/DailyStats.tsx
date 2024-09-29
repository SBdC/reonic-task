import { useSimulation } from "../../provider/useSimulation";

const DailyStats = () => {

    const {
        dailyEnergyConsumed,
        dailyMaxPowerDemand,
   
      } = useSimulation();

  return (
    <div className="daily-stats">
      <h2>Exemplarary Daily Simulation Results</h2>
      <p>Daily Energy Consumed: {dailyEnergyConsumed.toFixed(2)} kWh</p>
      <p>Daily Max Power Demand: {dailyMaxPowerDemand.toFixed(2)} kW</p>
    </div>
  );
};


export default DailyStats;