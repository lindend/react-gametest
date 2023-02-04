import { AppListenerEffectAPI } from "../../store";
import { dragType } from "../cardSlotSlice";
import { getCardEntry } from "../entities/cardDb";
import { dropCard, playCard } from "../gameSlice";

export const dropCardAction = {
  actionCreator: dropCard,
  effect: async (
    { payload: { card, drag, dropTargets } }: ReturnType<typeof dropCard>,
    api: AppListenerEffectAPI
  ) => {
    const { getState, dispatch } = api;
    const rootState = getState();
    const state = rootState.game;
    const player = state.players[state.currentTurn];

    if (drag == dragType.card) {
      // Check current energy
      for (let cost of card.cost) {
        const e = player.elements.find((e) => e.element == cost.element);
        if (!e || e.energy < cost.amount) {
          return;
        }
      }

      dispatch(playCard({ card }));
    } else if (drag == dragType.target) {
    }
  },
};
