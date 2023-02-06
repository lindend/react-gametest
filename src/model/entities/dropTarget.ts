import { players } from "../gameSlice";

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

  player: (player: players) => `${playerPrefix}${player}`,
  parsePlayer: (target: string): players | undefined => {
    if (target.startsWith(playerPrefix)) {
      const whichPlayer = target.substring(playerPrefix.length);
      return whichPlayer as players;
    } else {
      return undefined;
    }
  },
};
