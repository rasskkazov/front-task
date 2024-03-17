import * as yup from "yup";

export const nameSchema = yup.object({
  name: yup
    .string()
    .required("Введите имя")
    .min(2, "Мин 2 буквы")
    .max(10, "Макс 10 символов")
    .matches(/^[a-zA-Z]*$/, "Используйте латинские буквы"),
});
