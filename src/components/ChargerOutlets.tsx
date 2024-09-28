import { useState, useEffect } from 'react'

// Define the type for an individual outlet
type Outlet = {
    id: number;
    status: 'available' | 'occupied';
    chargingSpeed: number;
  };

function ChargerOutlets({numberOfOutlets}: {numberOfOutlets: number}) {

    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [theoreticalMaximumTotalPower, setTheoreticalMaximumTotalPower] = useState<number>(0)

    useEffect(() => {
        const newOutlets: Outlet[] =  Array.from({ length: numberOfOutlets }, (_, i) => ({
          id: i,
          status: 'available',
          chargingSpeed: 11,
        }));
        setOutlets(newOutlets);
        setTheoreticalMaximumTotalPower(newOutlets.reduce((acc, outlet) => acc + outlet.chargingSpeed, 0));
      }, [numberOfOutlets]);


  return (
    <>
            <p>Theoretical Maximum Total Power: {theoreticalMaximumTotalPower} kW</p>
    <div className="charger-outlets">

        {outlets.map((outlet) => (
            <div key={outlet.id}>
                <p>{outlet.status}</p>
                <p>{outlet.chargingSpeed}</p>
            </div>
        ))}
  
    </div>
    </>
  )
}

export default ChargerOutlets;
