import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const TEST_ROOT = "test";
export const INITIAL_URL = "/";

export enum TestView {
  Main = "main",
}
export enum TestPanel {
  Facts = "/",
  Ages = "ages",
}

export const routes = RoutesConfig.create([
  createRoot(TEST_ROOT, [
    createView(TestView.Main, [
      createPanel(TestPanel.Facts, "/", []),
      createPanel(TestPanel.Ages, `/${TestPanel.Ages}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
