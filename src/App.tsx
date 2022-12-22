import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Shop from "./screens/shop/Shop";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Shop></Shop>
      </div>
    </DndProvider>
  );
}

export default App;
