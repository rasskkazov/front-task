import {
  Panel,
  PanelHeader,
  Button,
  Text,
  Search,
  FormItem,
  NavIdProps,
  CellButton,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AgeData } from "../../types";
import { debounce } from "../../utils/index";
import { getData } from "./api";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Ages: FC<NavIdProps> = memo((props: NavIdProps) => {
  const [name, setName] = useState<string>("");
  const [ageData, setAgeData] = useState<AgeData>();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateAgeData = useCallback((nameToget: string) => {
    getData(nameToget).then(setAgeData).catch(console.log);
  }, []);

  const updateAgeDateBounced = useMemo(
    () => debounce(updateAgeData, 3000),
    [updateAgeData]
  );

  useEffect(() => {
    updateAgeDateBounced(name);
  }, [name, updateAgeDateBounced]);

  const routeNavigator = useRouteNavigator();
  const onCounterClick = useCallback(() => {
    routeNavigator.push(`/`);
  }, [routeNavigator]);
  return (
    <Panel id="ages" {...props}>
      <PanelHeader>VKUI</PanelHeader>
      <CellButton onClick={onCounterClick}>Узнать факт</CellButton>
      <FormItem
        top="Имя"
        htmlFor="searchName"
        style={{ maxWidth: "50%", margin: "auto" }}
      >
        <Search
          onChange={onChangeName}
          placeholder={"Введите имя"}
          id="searchName"
          type="text"
        />
      </FormItem>
      {ageData?.age && (
        <Text style={{ padding: "24px", margin: "auto" }}>
          {`Ваш возраст: ${ageData?.age}`}{" "}
        </Text>
      )}
      <Button
        style={{ width: "200px", maxHeight: "40px", margin: "auto" }}
        size="l"
        appearance="accent"
        stretched
        onClick={() => {
          updateAgeData(name);
        }}
      >
        Узнать возраст
      </Button>
    </Panel>
  );
});
