import { cardTemplate, cardType } from "../cardTemplate";
import { element } from "../element";
import fireElementalPictureUrl from "../../../../art/cards/fireelemental.png";
import { cardDbEntry } from "../cardDb";
import { AppListenerEffectAPI } from "../../../store";
import { damageCard } from "../../gameSlice";
import { card } from "../card";

const endOfTurnDamage = 1;

export const fireElemental: cardTemplate = {
  templateId: "fire_elemental",
  name: "Fire elemental",
  cost: [{ element: element.fire, amount: 2 }],
  picture: fireElementalPictureUrl,
  type: cardType.creature,
  health: 4,
  attack: 4,
};

function applyDamage(index: number, board: card[], api: AppListenerEffectAPI) {
  if (
    index >= 0 &&
    index < board.length &&
    !board[index].cost.find((c) => c.element == element.fire)
  ) {
    api.dispatch(
      damageCard({
        cardId: board[index].id,
        amount: endOfTurnDamage,
      })
    );
  }
}

export const fireElementalCard: cardDbEntry = {
  description: () => (
    <>
      At the end of each turn, deals <b>{endOfTurnDamage}</b> damage to adjacent
      non-fire units.
    </>
  ),
  async onEndTurn(c, api: AppListenerEffectAPI) {
    const state = api.getState();
    const board = state.game.players[c.owner].board;
    const cardIndex = board.findIndex((boardCard) => boardCard.id == c.id);
    applyDamage(cardIndex - 1, board, api);
    applyDamage(cardIndex + 1, board, api);
  },
};
