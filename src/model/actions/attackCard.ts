import { AppListenerEffectAPI } from "../../store";
import { attackCard } from "../actionsSlice";
import { damageCard } from "../gameSlice";

export const attackCardAction = {
  actionCreator: attackCard,
  effect: async (
    { payload: { source, target } }: ReturnType<typeof attackCard>,
    api: AppListenerEffectAPI
  ) => {
    const { dispatch } = api;
    dispatch(damageCard({ cardId: target.id, amount: source.attack }));
    dispatch(damageCard({ cardId: source.id, amount: target.attack }));
  },
};
