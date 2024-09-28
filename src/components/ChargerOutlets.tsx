import { useEffect } from 'react'
import { Outlet } from '../types/simulation';
import { useSimulation } from '../provider/useSimulation';

function ChargerOutlets({numberOfOutlets}: {numberOfOutlets: number}) {
    const {
        chargepointPower,
        outlets,
        setOutlets,
        setTheoreticalMaximumTotalPower,
        theoreticalMaximumTotalPower,
        dailyEnergyConsumed,
        dailyMaxPowerDemand,
        simulateDay
      } = useSimulation();

    useEffect(() => {
        const newOutlets: Outlet[] = Array.from({ length: numberOfOutlets }, (_, i) => ({
            id: i,
            power: 11,  // default power set to 11 kW
            isOccupied: false
        }));
        setOutlets(newOutlets);
        setTheoreticalMaximumTotalPower(newOutlets.reduce((acc, outlet) => acc + outlet.power, 0));
    }, [numberOfOutlets, chargepointPower, setOutlets, setTheoreticalMaximumTotalPower]);

    return (
        <>
             <p>Theoretical Maximum Total Power: {theoreticalMaximumTotalPower} kW</p>
            <p>Daily Energy Consumed: {dailyEnergyConsumed.toFixed(2)} kWh</p>
            <p>Daily Max Power Demand: {dailyMaxPowerDemand.toFixed(2)} kW</p>
            <button onClick={simulateDay}>Simulate Day</button>
            <p>Theoretical Maximum Total Power: {theoreticalMaximumTotalPower} kW</p>
            <ul className="charger-outlets">
                {outlets.map((outlet: Outlet) => (
                    <li key={outlet.id}>
                        <p>Outlet ID: {outlet.id}</p>
                        <p>Chargepoint Power: {chargepointPower} kW</p>
                        <p>Status: {outlet.isOccupied ? 'Occupied' : 'Available'}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ChargerOutlets;