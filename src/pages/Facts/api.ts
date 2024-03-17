import { Fact } from "../../types";

const uri = "https://catfact.ninja/fact";

export const getFactData = () => {
  return fetch(uri)
    .then((response) => response.json())
    .then((res: Fact) => res);
};
