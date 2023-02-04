import { Unsubscribe } from "@reduxjs/toolkit";
import { AppStartListening } from "../../store";
import { dropCardAction } from "./dropCard";
import { endTurnAction } from "./endTurn";

export function setupListeners(startListening: AppStartListening): Unsubscribe {
  const subscriptions = [
    startListening(endTurnAction),
    startListening(dropCardAction),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
