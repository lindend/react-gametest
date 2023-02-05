const cardPrefix = "card-";

export const dropTarget = {
  playerBoard: "player-board",
  card: (id: number) => `${cardPrefix}${id}`,

  parseCard: (target: string): number | undefined => {
    if (target.startsWith(cardPrefix)) {
      return parseInt(target.substring(cardPrefix.length));
    } else {
      return undefined;
    }
  },
};
