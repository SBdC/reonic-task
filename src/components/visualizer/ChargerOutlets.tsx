import { useEffect } from "react";
import { Outlet } from "../../types/simulation";
import { useSimulation } from "../../provider/useSimulation";
import eletricIcon from "../../assets/eletricIcon.svg";

const ChargerOutlets = ({ numberOfOutlets }: { numberOfOutlets: number }) => {
  const {
    chargepointPower,
    outlets,
    setOutlets,
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
                  <p>
                    {(
                      (outlet.ev.energyCharged / outlet.ev.chargingNeed) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
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
