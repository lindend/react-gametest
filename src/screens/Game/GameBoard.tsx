import { useDispatch, useSelector } from "react-redux";
import CardHand from "../../components/card/CardHand";
import { SlotPositionTracker } from "../../components/card/SlotPositionTracker";
import type { RootState } from "../../store";
import { addCard } from "../../model/cardSlice";
import "./gameboard.css";
import { PlayerBoard } from "../../components/card/PlayerBoard";
import { MouseSlotPositionTracker } from "../../components/card/MouseSlotPositionTracker";

const randomCard = () => ({
  id: Math.floor(Math.random() * 100000),
  costGold: Math.floor(Math.random() * 10),
  costSpirit: Math.floor(Math.random() * 10),
  name: `Card${Math.floor(Math.random() * 100)}`,
});

const GameBoard = () => {
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();
  const addCardAction = () =>
    dispatch(
      addCard({
        card: randomCard(),
        slot: {
          area: "hand",
          position: `${Math.floor(Math.random() * 10000)}`,
        },
      })
    );
  return (
    <>
      <SlotPositionTracker />
      <MouseSlotPositionTracker />
      <div className="gameboard w-full h-full">
        <button onClick={addCardAction}>Add card</button>
        <div
          style={{ gridArea: "mid-divider" }}
          className="rounded-md bg-slate-900"
        />
        <button style={{ gridArea: "end-turn" }}>End turn</button>
        <div style={{ gridArea: "player-hp" }}>20</div>
        <div style={{ gridArea: "player-energy" }}>100%</div>
        <PlayerBoard style={{ gridArea: "player-board" }} />
        <CardHand style={{ gridArea: "player-hand" }}></CardHand>
      </div>
    </>
  );
};

export default GameBoard;
