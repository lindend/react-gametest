import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameBoard from "./screens/Game/GameBoard";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <GameBoard />
      </Provider>
    </DndProvider>
  );
}

export default App;
