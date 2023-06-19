import {defineConfig} from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3001",
  },
  env: {
    BACKEND: "http://localhost:3001/api",
  },
  video: false,
});
