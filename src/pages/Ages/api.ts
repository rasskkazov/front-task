import { AgeData } from "../../types";

const uri = "https://api.agify.io?name=";

const cache: Map<string, AgeData> = new Map();
let ac = new AbortController();
export const getData = async (name: string): Promise<AgeData> => {
  ac.abort();
  ac = new AbortController();

  return (
    cache.get(name) ??
    fetch(`${uri}${name}`, {
      signal: ac.signal,
    })
      .then((response) => response.json())
      .then((res: AgeData) => {
        cache.set(name, res);
        console.log(res);

        return res;
      })
  );
};
