import { useSelector } from "react-redux";
import { players } from "../../model/gameSlice";
import { RootState } from "../../store";
import { cardFacing } from "./Card";
import CardPositioning, { cardArea } from "./CardPositioning";

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

  const opponentHandCards = useSelector(
    (state: RootState) => state.game.players[players.opponent].hand
  );

  return (
    <div id="cards-renderer">
      {handCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={true}
          area={cardArea.hand}
          facing={cardFacing.front}
        />
      ))}
      {playerBoardCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={true}
          area={cardArea.board}
          facing={cardFacing.front}
        />
      ))}
      {opponentBoardCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={false}
          area={cardArea.board}
          facing={cardFacing.front}
        />
      ))}
      {opponentHandCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={false}
          area={cardArea.hand}
          facing={cardFacing.back}
        />
      ))}
    </div>
  );
};

export default CardsRenderer;
