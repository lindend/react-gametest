import { AppListenerEffectAPI } from "../../store";
import { endTurn } from "../actionsSlice";
import { getCardEntry } from "../entities/cardDb";
import { drawCard, gainEnergy, resetEnergy } from "../gameSlice";

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
