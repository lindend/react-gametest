import { useDispatch } from "react-redux";
import { CardHand } from "../../components/card/CardHand";
import "./gameboard.css";
import { PlayerBoard } from "../../components/board/PlayerBoard";
import { MouseSlotPositionTracker } from "../../components/card/MouseSlotPositionTracker";
import { card } from "../../model/entities/card";
import { beginGame, players } from "../../model/gameSlice";
import { element } from "../../model/entities/element";
import CardsRenderer from "../../components/card/CardsRenderer";
import { EndTurnButton } from "../../components/board/EndTurnButton";
import { Button } from "../../components/common/Button";
import boardBackgroundUrl from "../../../art/board/board_pxl.png";
import cardIcon from "../../../art/cards/dowar_arch_wolf_pxl.png";
import { PlayerPortrait } from "../../components/board/PlayerPortrait";
import defaultPortraitUrl from "../../../art/portraits/flamebender.png";
import { CardStack } from "../../components/board/Cardstack";
import { EnergyMeter } from "../../components/board/EnergyMeter";

const randomElement = (): element =>
  Math.random() > 0.5 ? element.fire : element.life;

const randomCard = (): card => ({
  id: Math.floor(Math.random() * 100000),
  cost: [
    { amount: Math.floor(Math.random() * 3 + 1), element: randomElement() },
  ],
  name: `Card${Math.floor(Math.random() * 100)}`,
  description: "Yes, this is test.",
  icon: cardIcon,
});

function randomDeck(size: number) {
  return Array.from({ length: size }, randomCard);
}

function getDeckEnergy(deck: card[]): element[] {
  let elements: Array<[element, number]> = [];
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

  return elements.map((e) => e[0]);
}

const GameBoard = () => {
  const dispatch = useDispatch();

  const playerDeck = randomDeck(15);
  const playerDeckEnergy = getDeckEnergy(playerDeck);
  const opponentDeck = randomDeck(15);
  const opponentDeckEnergy = getDeckEnergy(opponentDeck);

  const newGameAction = () =>
    dispatch(
      beginGame({
        player: {
          health: 20,
          maxHealth: 20,
          portraitUrl: defaultPortraitUrl,
          board: randomDeck(2),
          deck: playerDeck,
          hand: randomDeck(3),
          elementEnergy: playerDeckEnergy.map((_) => 0),
          elements: playerDeckEnergy,
          surgingElement: 0,
        },
        opponent: {
          health: 20,
          maxHealth: 20,
          portraitUrl: defaultPortraitUrl,
          board: randomDeck(1),
          deck: opponentDeck,
          hand: randomDeck(4),
          elementEnergy: opponentDeckEnergy.map((_) => 0),
          elements: opponentDeckEnergy,
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
        {/* Opponent stuff */}
        <CardHand
          style={{ gridArea: "opp-hand" }}
          player={players.opponent}
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
          <PlayerPortrait player={players.opponent} />
        </div>
        <div style={{ gridArea: "opp-energy" }}>
          <EnergyMeter player={players.opponent} />
        </div>
        <PlayerBoard
          style={{ gridArea: "opp-board" }}
          player={players.opponent}
        />
        <div
          style={{ gridArea: "mid-divider" }}
          className="rounded-md bg-slate-900"
        />
        {/* Player stuff */}
        <PlayerBoard
          style={{ gridArea: "player-board" }}
          player={players.player}
        />
        <div style={{ gridArea: "player-deck" }} className="flex flex-col">
          <EndTurnButton style={{ gridArea: "end-turn" }} />
          <CardStack className="mt-3" />
        </div>
        <div
          style={{ gridArea: "player-portrait" }}
          className="justify-self-center w-full"
        >
          <PlayerPortrait player={players.player} />
        </div>
        <div style={{ gridArea: "player-energy" }}>
          <EnergyMeter player={players.player} />
        </div>
        <CardHand
          style={{ gridArea: "player-hand" }}
          player={players.player}
          flipped={false}
        />
        <CardsRenderer />
      </div>
    </>
  );
};

export default GameBoard;
