import { View, SplitLayout, SplitCol } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Ages, Facts } from "./pages/index";
import { TestPanel, TestView } from "./routes";

export const App = () => {
  const { panel: activePanel = TestView.Main } = useActiveVkuiLocation();
  return (
    <SplitLayout>
      <SplitCol>
        <View nav={TestView.Main} activePanel={activePanel}>
          <Facts nav={TestPanel.Facts} />
          <Ages nav={TestPanel.Ages} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
