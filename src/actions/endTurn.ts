import { endTurn } from "../model/actionsSlice";
import { getCardEntry } from "../model/entities/cardDb";
import { drawCard, gainEnergy, resetEnergy } from "../model/gameSlice";
import { AppListenerEffectAPI } from "../store";

export const endTurnAction = {
  actionCreator: endTurn,
  effect: async (
    { payload: { player } }: ReturnType<typeof endTurn>,
    api: AppListenerEffectAPI
  ) => {
    const { dispatch, getState } = api;
    const rootState = getState();
    const state = rootState.game;
    if (player != state.currentTurn) {
      return;
    }

    const p = state.players[state.currentTurn];

    // Handle end turn actions
    const cards = p.board;
    for (let card of cards) {
      const cardEntry = getCardEntry(card.templateId);
      if (cardEntry.onEndTurn) {
        await cardEntry.onEndTurn(card, api);
      }
    }

    dispatch(drawCard({ player: state.currentTurn }));

    dispatch(gainEnergy({ player: state.currentTurn }));
    dispatch(resetEnergy({ player: state.currentTurn }));
  },
};
