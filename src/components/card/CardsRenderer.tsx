import { Fragment } from "react";
import { useSelector } from "react-redux";
import { players } from "../../model/gameSlice";
import { RootState } from "../../store";
import CardPositioning from "./CardPositioning";

const CardsRenderer = () => {
  const handCards = useSelector(
    (state: RootState) => state.game.players[players.player].hand
  );
  const playerBoardCards = useSelector(
    (state: RootState) => state.game.players[players.player].board
  );
  const opponentBoardCards = useSelector(
    (state: RootState) => state.game.players[players.opponent].board
  );

  const cards = handCards.concat(playerBoardCards).concat(opponentBoardCards);

  return (
    <div id="cards-renderer">
      {cards.map((card, i) => (
        <CardPositioning key={card.id} card={card}></CardPositioning>
      ))}
    </div>
  );
};

export default CardsRenderer;
