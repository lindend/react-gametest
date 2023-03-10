import { useDispatch } from "react-redux";
import { CardHand } from "../../components/card/CardHand";
import "./gameboard.css";
import { PlayerBoard } from "../../components/board/PlayerBoard";
import { MouseSlotPositionTracker } from "../../components/card/MouseSlotPositionTracker";
import { Card, newCard } from "../../model/entities/card";
import { beginGame, ElementEnergy } from "../../model/gameSlice";
import { ElementType } from "../../model/entities/element";
import CardsRenderer from "../../components/card/CardsRenderer";
import { EndTurnButton } from "../../components/board/EndTurnButton";
import { Button } from "../../components/common/Button";
import boardBackgroundUrl from "../../../art/board/board_pxl.png";
import { PlayerPortrait } from "../../components/board/PlayerPortrait";
import defaultPortraitUrl from "../../../art/portraits/flamebender.png";
import { CardStack } from "../../components/board/Cardstack";
import { EnergyMeter } from "../../components/board/EnergyMeter";
import { CardTemplate } from "../../model/entities/cardTemplate";
import { DragTarget } from "../../components/board/DragTarget";
import { DragAndDrop } from "../../components/board/DragAndDrop";
import { fireElemental } from "../../cards/fireElemental/fireElemental";
import { testCard } from "../../cards/testCard/testCard";
import { PlayerType } from "../../model/entities/Player";
import { fireball } from "../../cards/fireball/fireball";

const buildDeck = (
  startId: number,
  owner: PlayerType,
  templates: CardTemplate[]
) => {
  let currentId = startId;
  let deck: Card[] = [];
  for (let template of templates) {
    deck.push(
      newCard({
        id: currentId++,
        owner,
        ...template,
      })
    );
  }
  return deck;
};

function randomDeck(size: number) {
  const testCards = [testCard, fireElemental, fireball];
  return Array.from(
    { length: size },
    () => testCards[Math.floor(Math.random() * testCards.length)]
  );
}

function getDeckEnergy(deck: Card[]): ElementEnergy[] {
  let elements: Array<[ElementType, number]> = [];
  for (let card of deck) {
    for (let cost of card.cost) {
      const idx = elements.findIndex((e) => e[0] == cost.element);
      if (idx < 0) {
        elements.push([cost.element, cost.amount]);
      } else {
        const [_, amount] = elements[idx];
        elements[idx] = [cost.element, amount + cost.amount];
      }
    }
  }

  // sort list descending to find most used element
  elements.sort((a, b) => b[1] - a[1]);

  return elements.map((e) => {
    return { element: e[0], energy: 3, maxEnergy: 3 };
  });
}

const GameBoard = () => {
  const dispatch = useDispatch();

  const playerDeck = buildDeck(1, PlayerType.player, randomDeck(15));
  const playerDeckEnergy = getDeckEnergy(playerDeck);
  const opponentDeck = buildDeck(10000, PlayerType.opponent, randomDeck(15));
  const opponentDeckEnergy = getDeckEnergy(opponentDeck);

  const newGameAction = () =>
    dispatch(
      beginGame({
        player: {
          health: 40,
          maxHealth: 40,
          portraitUrl: defaultPortraitUrl,
          board: buildDeck(100, PlayerType.player, randomDeck(2)),
          deck: playerDeck,
          hand: buildDeck(300, PlayerType.player, randomDeck(3)),
          elements: playerDeckEnergy,
          surgingElement: 0,
        },
        opponent: {
          health: 40,
          maxHealth: 40,
          portraitUrl: defaultPortraitUrl,
          board: buildDeck(100100, PlayerType.opponent, randomDeck(1)),
          deck: opponentDeck,
          hand: buildDeck(100200, PlayerType.opponent, randomDeck(4)),
          elements: opponentDeckEnergy,
          surgingElement: 0,
        },
      })
    );

  return (
    <>
      <MouseSlotPositionTracker />
      <DragAndDrop />
      <DragTarget />
      <div
        className="gameboard w-full h-full bg-[length:800px_800px] pixelated"
        style={{ backgroundImage: `url(${boardBackgroundUrl})` }}
      >
        <div>
          <Button onClick={newGameAction} text="New game" />
        </div>
        {/* Opponent stuff */}
        <CardHand
          style={{ gridArea: "opp-hand" }}
          player={PlayerType.opponent}
          flipped={true}
        />
        <CardStack
          style={{ gridArea: "opp-deck" }}
          className="justify-self-center"
        />
        <div
          style={{ gridArea: "opp-portrait" }}
          className="justify-self-center w-full"
        >
          <PlayerPortrait player={PlayerType.opponent} />
        </div>
        <div style={{ gridArea: "opp-energy" }}>
          <EnergyMeter player={PlayerType.opponent} />
        </div>
        <PlayerBoard
          style={{ gridArea: "opp-board" }}
          player={PlayerType.opponent}
        />
        <div
          style={{ gridArea: "mid-divider" }}
          className="rounded-md bg-slate-900"
        />
        {/* Player stuff */}
        <PlayerBoard
          style={{ gridArea: "player-board" }}
          player={PlayerType.player}
        />
        <div style={{ gridArea: "player-deck" }} className="flex flex-col">
          <EndTurnButton style={{ gridArea: "end-turn" }} />
          <CardStack className="mt-3" />
        </div>
        <div
          style={{ gridArea: "player-portrait" }}
          className="justify-self-center w-full"
        >
          <PlayerPortrait player={PlayerType.player} />
        </div>
        <div style={{ gridArea: "player-energy" }}>
          <EnergyMeter player={PlayerType.player} />
        </div>
        <CardHand
          style={{ gridArea: "player-hand" }}
          player={PlayerType.player}
          flipped={false}
        />
        <CardsRenderer />
      </div>
    </>
  );
};

export default GameBoard;
