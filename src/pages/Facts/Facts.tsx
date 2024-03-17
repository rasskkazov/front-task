import {
  Panel,
  PanelHeader,
  Button,
  Textarea,
  NavIdProps,
  CellButton,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { Fact } from "../../types";
import { getFactData } from "./api";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { TestPanel } from "../../routes";
export const Facts: FC<NavIdProps> = memo((props: NavIdProps) => {
  const [factData, setFactData] = useState<Fact>({ fact: "" });

  const updateFact = () => {
    getFactData().then(setFactData);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(
      factData.fact.indexOf(" "),
      factData.fact.indexOf(" ")
    );
  }, [factData]);

  const routeNavigator = useRouteNavigator();
  const onCounterClick = useCallback(() => {
    routeNavigator.push(`/${TestPanel.Ages}`);
  }, [routeNavigator]);

  return (
    <Panel id="facts" {...props}>
      <PanelHeader>VKUI</PanelHeader>
      <CellButton onClick={onCounterClick}>Узнать возраст</CellButton>
      <Button
        style={{ width: "200px", maxHeight: "40px", margin: "auto" }}
        size="l"
        appearance="accent"
        stretched
        onClick={() => {
          updateFact();
        }}
      >
        Узнать факт
      </Button>
      <Textarea
        style={{ width: "60%", minHeight: "100px", margin: "auto" }}
        value={factData.fact}
        getRef={textareaRef}
      />
    </Panel>
  );
});
