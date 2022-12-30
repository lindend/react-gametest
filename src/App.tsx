import GameBoard from "./screens/Game/GameBoard";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
}

export default App;
