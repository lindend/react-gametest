import GameBoard from "./screens/Game/GameBoard";
import { Provider } from "react-redux";
import { startAppListening, store } from "./store";
import { useEffect } from "react";
import { Unsubscribe } from "@reduxjs/toolkit";
import { setupListeners } from "./model/actions/actions";

function App() {
  useEffect(() => {
    const subscriptions: Unsubscribe[] = [setupListeners(startAppListening)];

    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
}

export default App;
