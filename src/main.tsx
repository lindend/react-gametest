import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerCards } from "./cards/cardRegistration";
import { registerActionAnimations } from "./actions/animationRegistration";

registerCards();
registerActionAnimations();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
