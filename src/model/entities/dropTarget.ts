import { PlayerType } from "./Player";

const cardPrefix = "card-";
const playerPrefix = "player-";
export const dropTarget = {
  playerBoard: "playerboard",

  card: (id: number) => `${cardPrefix}${id}`,
  parseCard: (target: string): number | undefined => {
    if (target.startsWith(cardPrefix)) {
      return parseInt(target.substring(cardPrefix.length));
    } else {
      return undefined;
    }
  },

  player: (player: PlayerType) => `${playerPrefix}${player}`,
  parsePlayer: (target: string): PlayerType | undefined => {
    if (target.startsWith(playerPrefix)) {
      const whichPlayer = target.substring(playerPrefix.length);
      return whichPlayer as PlayerType;
    } else {
      return undefined;
    }
  },
};
