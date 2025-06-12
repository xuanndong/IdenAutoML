import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["legible-engaged-bluebird.ngrok-free.app", "localhost"],
    port: 5175,
    open: true
  },
});
