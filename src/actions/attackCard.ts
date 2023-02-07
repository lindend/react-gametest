import { queueAnimation } from "../animation/queueAnimation";
import { attackCard } from "../model/actionsSlice";
import { getCardPosition } from "../model/cardSlotSlice";
import { cardSlotId } from "../model/entities/card";
import { damageCard } from "../model/gameSlice";
import { AppListenerEffectAPI } from "../store";
import { cardAttackAnimation } from "./animations/cardattack";

export const attackCardAction = {
  actionCreator: attackCard,
  effect: async (
    { payload: { source, target } }: ReturnType<typeof attackCard>,
    api: AppListenerEffectAPI
  ) => {
    const { dispatch, condition, getState } = api;
    const state = getState();
    if (source.owner != target.owner) {
      const { animationEnded } = queueAnimation(
        cardSlotId(source),
        api,
        cardAttackAnimation,
        {
          cardPosition: getCardPosition(state, source).position,
          targetPosition: getCardPosition(state, target).position,
        }
      );
      await condition(animationEnded);
      dispatch(damageCard({ cardId: target.id, amount: source.attack }));
      dispatch(damageCard({ cardId: source.id, amount: target.attack }));
    }
  },
};
