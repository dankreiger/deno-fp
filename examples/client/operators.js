import { compose, head, tap, toUpper } from "../deps.ts";
import { DONE } from "./symbols.ts";

const createOperator = (operator) =>
  (broadcaster) =>
    (listener) =>
      operator(
        (behaviorListener) =>
          broadcaster((value) => {
            if (value === DONE) {
              listener(DONE);
              return;
            }

            behaviorListener(value);
          }),
        listener,
      );

export const map = (transform) =>
  createOperator((broadcaster, listener) =>
    broadcaster((value) => listener(transform(value)))
  );

export const filter = (pred) =>
  createOperator((broadcaster, listener) =>
    broadcaster((value) => {
      if (pred(value)) {
        listener(value);
      }
    })
  );

export const modify = createOperator((broadcaster, listener) => {
  let str = "";
  broadcaster((value) => {
    listener((str += value));
  });
});

export const first = map(head);
export const growup = map(toUpper);
export const debug = (tag) =>
  compose(map, tap)((val) => console.log(tag + ": ", val));

export const split = (splitter) =>
  (broadcaster) =>
    (listener) => {
      let buffer = [];
      broadcaster((value) => {
        switch (value) {
          case splitter:
            listener(buffer);
            buffer = [];
            break;
          case DONE:
            listener(buffer);
            buffer = [];
            listener(DONE);
            break;
          default:
            buffer.push(value);
            break;
        }
      });
    };
