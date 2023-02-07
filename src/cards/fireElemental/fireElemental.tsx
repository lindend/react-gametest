import fireElementalPictureUrl from "./fireelemental.png";
import { Card, cardSlotId } from "../../model/entities/card";
import { addCardEntry, cardDbEntry } from "../../model/entities/cardDb";
import { cardTemplate, cardType } from "../../model/entities/cardTemplate";
import { element } from "../../model/entities/element";
import { damageCard, getCardById } from "../../model/gameSlice";
import { AppListenerEffectAPI } from "../../store";
import { fireElementalDamageAnimation } from "./fireElementalDamageAnimation";
import { addAnimation } from "../../animation/animationDb";
import { queueAnimation } from "../../animation/queueAnimation";
import { getCardPosition } from "../../model/cardSlotSlice";

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

async function applyDamage(
  index: number,
  card: Card,
  board: Card[],
  api: AppListenerEffectAPI
) {
  if (
    index >= 0 &&
    index < board.length &&
    !board[index].cost.find((c) => c.element == element.fire)
  ) {
    const cardId = board[index].id;
    const state = api.getState();
    const targetCard = getCardById(cardId, state.game);
    if (targetCard) {
      const { animationEnded } = queueAnimation(
        cardSlotId(card),
        api,
        fireElementalDamageAnimation,
        {
          cardPosition: getCardPosition(state, card).position,
          targetPosition0: getCardPosition(state, targetCard).position,
        }
      );
      await api.condition(animationEnded);
    }
    api.dispatch(
      damageCard({
        cardId,
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
    await applyDamage(cardIndex - 1, c, board, api);
    await applyDamage(cardIndex + 1, c, board, api);
  },
};

export const registerFireElemental = () => {
  addCardEntry(fireElemental.templateId, fireElementalCard);
  addAnimation(fireElementalDamageAnimation);
};
