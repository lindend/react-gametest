import { useSelector } from "react-redux";
import { players } from "../../model/gameSlice";
import { RootState } from "../../store";
import { ElementIcon } from "../card/icons/ElementIcon";

export interface EnergyMeterProps {
  player: players;
}

export const EnergyMeter = ({ player }: EnergyMeterProps) => {
  const surgingElement = useSelector(
    (state: RootState) => state.game.players[player].surgingElement
  );

  const elements = useSelector(
    (state: RootState) => state.game.players[player].elements
  );

  return (
    <div>
      {elements.map((e, i) => (
        <div key={i} className="flex flex-row">
          <ElementIcon e={e.element} />
          {e.energy}/{e.maxEnergy}
          {surgingElement == i && <p>Surging</p>}
        </div>
      ))}
    </div>
  );
};
