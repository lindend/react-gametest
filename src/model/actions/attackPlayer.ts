import { AppListenerEffectAPI } from "../../store";
import { attackPlayer } from "../actionsSlice";
import { damagePlayer } from "../gameSlice";

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
