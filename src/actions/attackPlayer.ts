import { attackPlayer } from "../model/actionsSlice";
import { damagePlayer } from "../model/gameSlice";
import { AppListenerEffectAPI } from "../store";

export const attackPlayerAction = {
  actionCreator: attackPlayer,
  effect: async (
    { payload: { source, target } }: ReturnType<typeof attackPlayer>,
    api: AppListenerEffectAPI
  ) => {
    const { dispatch } = api;
    if (target != source.owner) {
      dispatch(damagePlayer({ player: target, amount: source.attack }));
    }
  },
};
