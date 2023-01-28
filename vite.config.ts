import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // github pages root
  base: "/react-gametest/",
  plugins: [react()],
});
