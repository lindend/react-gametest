import { useDispatch } from "react-redux";
import CardHand from "../../components/card/CardHand";
import "./gameboard.css";
import { PlayerBoard } from "../../components/board/PlayerBoard";
import { MouseSlotPositionTracker } from "../../components/card/MouseSlotPositionTracker";
import { card } from "../../model/entities/card";
import { beginGame } from "../../model/gameSlice";
import { element } from "../../model/entities/element";
import CardsRenderer from "../../components/card/CardsRenderer";
import { EndTurnButton } from "../../components/board/EndTurnButton";
import { Button } from "../../components/common/Button";
import boardBackgroundUrl from "../../../art/board/board_pxl.png";
import cardIcon from "../../../art/cards/dowar_arch_wolf_pxl.png";

const randomCard = (): card => ({
  id: Math.floor(Math.random() * 100000),
  costGold: Math.floor(Math.random() * 10),
  costSpirit: Math.floor(Math.random() * 10),
  name: `Card${Math.floor(Math.random() * 100)}`,
  description: "Yes, this is test.",
  icon: cardIcon,
});

function randomDeck(size: number) {
  return Array.from({ length: size }, randomCard);
}

const GameBoard = () => {
  const dispatch = useDispatch();
  const newGameAction = () =>
    dispatch(
      beginGame({
        player: {
          health: 20,
          board: randomDeck(2),
          deck: randomDeck(15),
          hand: randomDeck(3),
          elementEnergy: [1, 1],
          elements: [element.fire, element.life],
          surgingElement: 0,
        },
        opponent: {
          health: 20,
          board: [],
          deck: [],
          hand: [],
          elementEnergy: [],
          elements: [],
          surgingElement: 0,
        },
      })
    );

  return (
    <>
      <MouseSlotPositionTracker />
      <div
        className="gameboard w-full h-full bg-[length:800px_800px] pixelated"
        style={{ backgroundImage: `url(${boardBackgroundUrl})` }}
      >
        <div>
          <Button onClick={newGameAction} text="New game" />
        </div>
        <div
          style={{ gridArea: "mid-divider" }}
          className="rounded-md bg-slate-900"
        />
        <EndTurnButton style={{ gridArea: "end-turn" }} />
        {/* <Lifebar player={players.player} style={{ gridArea: "player-hp" }} /> */}
        <div style={{ gridArea: "player-energy" }}>100%</div>
        <PlayerBoard style={{ gridArea: "player-board" }} />
        <CardHand style={{ gridArea: "player-hand" }}></CardHand>
        <CardsRenderer />
      </div>
    </>
  );
};

export default GameBoard;
