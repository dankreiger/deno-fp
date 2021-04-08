import { pipe } from "../../deps.ts";
import type { ConfigurableUnaryBroadcaster } from "../../../types/ConfigurableUnaryBroadcaster.ts";
import nest from "../../../functions/nest.ts";
import type { UnaryBroadcaster } from "../../../types/UnaryBroadcaster.ts";

const getURL: ConfigurableUnaryBroadcaster<number, string> = (config) =>
  (
    listener: any,
  ) => {
    fetch(`https://api.github.com/user/${config}`)
      .then((response) => response.json())
      .then(listener);
  };
const timeout: ConfigurableUnaryBroadcaster<number, number> = (config) =>
  (
    listener: any,
  ) => {
    setTimeout(() => {
      listener(config);
    }, config);
  };

export const timeoutUrl = pipe(
  nest<number, number>(timeout),
  nest((ev: { clientX: number }) => getURL(ev.clientX)),
);

// in progress
export const puppy = (broadcaster: UnaryBroadcaster<any>) => ({
  pipe: (...fns: any[]) => pipe(...fns),
});
