import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT FOR GITHUB PAGES:
// If you deploy to https://<username>.github.io/succession-tracker/
// the `base` must match your repo name, e.g. "/succession-tracker/".
// If you deploy to a custom domain or a user/org root page, set base to "/".
export default defineConfig({
  plugins: [react()],
  base: "/succession-tracker/",
});
