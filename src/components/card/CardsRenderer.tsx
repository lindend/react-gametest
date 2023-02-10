import { useSelector } from "react-redux";
import { PlayerType } from "../../model/entities/Player";
import { RootState } from "../../store";
import { cardFacing } from "./Card";
import CardPositioning, { CardArea } from "./CardPositioning";

const CardsRenderer = () => {
  const handCards = useSelector(
    (state: RootState) => state.game.players[PlayerType.player].hand
  );
  const playerBoardCards = useSelector(
    (state: RootState) => state.game.players[PlayerType.player].board
  );
  const opponentBoardCards = useSelector(
    (state: RootState) => state.game.players[PlayerType.opponent].board
  );

  const opponentHandCards = useSelector(
    (state: RootState) => state.game.players[PlayerType.opponent].hand
  );

  return (
    <div id="cards-renderer">
      {handCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={true}
          area={CardArea.hand}
          facing={cardFacing.front}
        />
      ))}
      {playerBoardCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={true}
          area={CardArea.board}
          facing={cardFacing.front}
        />
      ))}
      {opponentBoardCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={false}
          area={CardArea.board}
          facing={cardFacing.front}
        />
      ))}
      {opponentHandCards.map((card) => (
        <CardPositioning
          key={card.id}
          card={card}
          draggable={false}
          area={CardArea.hand}
          facing={cardFacing.back}
        />
      ))}
    </div>
  );
};

export default CardsRenderer;
