import { attackPlayer } from "../model/actionsSlice";
import { newPlayer } from "../model/entities/Player";
import { damageEntity } from "../model/gameSlice";
import { AppListenerEffectAPI } from "../store";

export const attackPlayerAction = {
  actionCreator: attackPlayer,
  effect: async (
    { payload: { source, target } }: ReturnType<typeof attackPlayer>,
    api: AppListenerEffectAPI
  ) => {
    const { dispatch } = api;
    if (target != source.owner) {
      dispatch(
        damageEntity({
          target: newPlayer({ playerType: target }),
          amount: source.attack,
        })
      );
    }
  },
};
