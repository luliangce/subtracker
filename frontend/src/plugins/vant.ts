import { Button } from "vant";
import { App } from "vue";
export const registerVant = (app: App) => {
  app.use(Button);
  return app;
};
