import { Unsubscribe } from "@reduxjs/toolkit";
import { AppStartListening } from "../store";
import { attackCardAction } from "./attackCard";
import { attackPlayerAction } from "./attackPlayer";
import { dropCardAction } from "./dropCard";
import { endTurnAction } from "./endTurn";

export function setupListeners(startListening: AppStartListening): Unsubscribe {
  const subscriptions = [
    startListening(endTurnAction),
    startListening(dropCardAction),
    startListening(attackCardAction),
    startListening(attackPlayerAction),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
