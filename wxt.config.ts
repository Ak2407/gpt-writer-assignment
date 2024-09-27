import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    permissions: ["activeTab", "scripting", "sidePanel", "storage", "tabs"],
    action: {},
    name: "assignment",
    description: "assignment for gpt-writer by akshit",
  },

  modules: ["@wxt-dev/module-react"],
});
