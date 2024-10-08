import { useEffect } from "react";
import { Outlet } from "../../types/simulation";
import { useSimulation } from "../../provider/useSimulation";
import eletricIcon from "../../assets/eletricIcon.svg";

const ChargerOutlets = ({ numberOfOutlets }: { numberOfOutlets: number }) => {
  const {
    chargepointPower,
    outlets,
    setOutlets,
    kWhPer100km,
  } = useSimulation();

  useEffect(() => {
    const newOutlets: Outlet[] = Array.from(
      { length: numberOfOutlets },
      (_, i) => ({
        id: i,
        power: chargepointPower,
        ev: null,
      })
    );
    setOutlets(newOutlets);

  }, [
    numberOfOutlets,
    chargepointPower,
    setOutlets,
   
  ]);

  const getChargingPercentage = (outlet: Outlet) => {
    if (!outlet.ev) return 0;
    return (outlet.ev.energyCharged / outlet.ev.chargingNeed) * 100;
  };


  return (
    <>

      <div className="charger-outlets-container">
      
        <div className="charger-outlets">
          <ul>
            {outlets.map((outlet: Outlet) => (
              <li
                key={outlet.id}
                style={{
                  backgroundColor: outlet.ev
                    ? "rgba(255, 0, 0, 0.5)"
                    : "rgba(146, 208, 80, 0.7)",
                }}
              >
                <div className="outlet-id">
                  <img src={eletricIcon} alt="eletric icon" />{" "}
                  <p>{outlet.id}</p>
                </div>

                <p>{chargepointPower} kW</p>

                {outlet.ev && (
                <>
                  <p>{getChargingPercentage(outlet).toFixed(2)}%</p>
                  {/* <p>{(outlet.ev.chargingNeed / kWhPer100km * 100).toFixed(0)} km</p> */}
                </>
              )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ChargerOutlets;
