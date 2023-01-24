import { useDispatch } from "react-redux";
import CardHand from "../../components/card/CardHand";
import "./gameboard.css";
import { PlayerBoard } from "../../components/card/PlayerBoard";
import { MouseSlotPositionTracker } from "../../components/card/MouseSlotPositionTracker";
import { Lifebar } from "../../components/player/Lifebar";
import { card } from "../../model/entities/card";
import { beginGame, endTurn } from "../../model/gameSlice";
import { element } from "../../model/entities/element";
import CardsRenderer from "../../components/card/CardsRenderer";
import { players } from "../../model/gameSlice";

const randomCard = (): card => ({
  id: Math.floor(Math.random() * 100000),
  costGold: Math.floor(Math.random() * 10),
  costSpirit: Math.floor(Math.random() * 10),
  name: `Card${Math.floor(Math.random() * 100)}`,
  description: "Yes, this is test.",
  icon: "dowar_arch_wolf",
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

  const endTurnAction = () => {
    dispatch(endTurn());
  };

  return (
    <>
      <MouseSlotPositionTracker />
      <div className="gameboard w-full h-full">
        <button onClick={newGameAction}>New game</button>
        <div
          style={{ gridArea: "mid-divider" }}
          className="rounded-md bg-slate-900"
        />
        <button style={{ gridArea: "end-turn" }} onClick={endTurnAction}>
          End turn
        </button>
        <Lifebar player={players.player} style={{ gridArea: "player-hp" }} />
        <div style={{ gridArea: "player-energy" }}>100%</div>
        <PlayerBoard style={{ gridArea: "player-board" }} />
        <CardHand style={{ gridArea: "player-hand" }}></CardHand>
        <CardsRenderer />
      </div>
    </>
  );
};

export default GameBoard;
