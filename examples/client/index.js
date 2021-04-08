import { pipe } from "../deps.ts";
import { createInterval, forOf, zip } from "./broadcasters.js";
import { debug, first, growup, modify } from "./operators.js";
import { callUntilDone } from "./listeners.js";

const puppy = (initial) => ({
  pipe: (...fns) => pipe(...fns)(initial),
});
const zippedBroadcasters = [
  forOf("my name is puppy and I like to woof"),
  createInterval(200),
];

puppy(zip(...zippedBroadcasters)).pipe(
  debug("after zip"),
  first,
  debug("after first"),
  growup,
  debug("after growup"),
  modify,
  debug("after modify"),
)(
  callUntilDone((i) => {
    console.log({ i });
    document.querySelector("#root").innerHTML = i;
  }),
);
