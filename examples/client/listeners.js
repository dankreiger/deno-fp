import { DONE } from "./symbols.ts";

export const callUntilDone = (fn) =>
  (i) => {
    if (i === DONE) {
      console.log("shutting down");
      return;
    }
    fn(i);
  };
