import { ConfigProvider, AppRoot } from "@vkontakte/vkui";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import "@vkontakte/vkui/dist/vkui.css";

import { router } from "./routes";
import { App } from "./App";

export const AppConfig = () => {
  return (
    <ConfigProvider hasCustomPanelHeaderAfter={true}>
      <AppRoot mode="full">
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AppRoot>
    </ConfigProvider>
  );
};
