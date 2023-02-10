import { queueAnimation } from "../animation/queueAnimation";
import { attackCard } from "../model/actionsSlice";
import { getCardPosition } from "../model/cardSlotSlice";
import { cardSlotId } from "../model/entities/card";
import { damageEntity } from "../model/gameSlice";
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
      dispatch(damageEntity({ target: target, amount: source.attack }));
      dispatch(damageEntity({ target: source, amount: target.attack }));
    }
  },
};
