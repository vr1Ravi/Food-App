import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://recipe-app-r3om.onrender.com",
        secure: true,
      },
    },
  },
  plugins: [react()],
});
