import {
  Panel,
  PanelHeader,
  Button,
  Text,
  FormItem,
  NavIdProps,
  CellButton,
  Div,
  FormStatus,
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { nameSchema } from "./model";
import { yupResolver } from "@hookform/resolvers/yup";

export const Ages: FC<NavIdProps> = memo((props: NavIdProps) => {
  const [name, setName] = useState<string>("");
  const [ageData, setAgeData] = useState<AgeData>();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateAgeData = useCallback((nameToget: string) => {
    getData(nameToget).then(setAgeData).catch(console.error);
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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(nameSchema) });

  const onSubmit: SubmitHandler<FieldValues> = () => {
    updateAgeData(name);
  };
  return (
    <Panel id="ages" {...props}>
      <PanelHeader>VKUI</PanelHeader>
      <CellButton onClick={onCounterClick}>Узнать факт</CellButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          top="Имя"
          htmlFor="searchName"
          style={{ maxWidth: "50%", margin: "auto" }}
        >
          <input
            style={{ width: "100%" }}
            id="searchName"
            placeholder="Введите имя"
            type="text"
            {...register("name", {
              onChange: (e) => {
                onChangeName(e);
              },
            })}
          />
          {errors.name?.message && (
            <Div>
              <FormStatus header="Неверная форма имени" mode="default">
                {errors.name?.message}
              </FormStatus>
            </Div>
          )}
        </FormItem>
        <FormItem>
          <Button
            style={{ width: "200px", maxHeight: "40px", margin: "auto" }}
            size="l"
            appearance="accent"
            stretched
            type="submit"
          >
            Узнать возраст
          </Button>
        </FormItem>
      </form>

      {ageData?.age && (
        <Text style={{ padding: "24px", margin: "auto" }}>
          {`Ваш возраст: ${ageData?.age}`}{" "}
        </Text>
      )}
    </Panel>
  );
});
