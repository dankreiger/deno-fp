import { DONE } from "./symbols.ts";

export const createInterval = (time) =>
  (listener) => {
    const id = setInterval(listener, time);
    return () => {
      clearInterval(id);
    };
  };

export const createTimeout = (time) =>
  (listener) => {
    const id = setTimeout(listener, time);
    return () => {
      setTimeout(id);
    };
  };

export const createEventListener = (selector) =>
  (eventType) =>
    (listener) => {
      const element = document.querySelector(selector);
      element.addEventListener(eventType, listener);
      return () => {
        element.removeEventListener(eventType, listener);
      };
    };

export const forOf = (iterable) =>
  (listener) => {
    const id = setTimeout(() => {
      for (let i of iterable) {
        listener(i);
      }
      listener(DONE);
    }, 0);

    return () => {
      clearTimeout(id);
    };
  };

export const merge = (b1, b2) =>
  (listener) => {
    let cancel1 = b1(listener);
    let cancel2 = b2(listener);
    return () => {
      cancel1();
      cancel2();
    };
  };

export const zip = (b1, b2) =>
  (listener) => {
    let cancelBoth;

    let buffer1 = [];
    let cancel1 = b1((value) => {
      buffer1.push(value);
      if (buffer2.length) {
        listener([buffer1.shift(), buffer2.shift()]);
      }
      if (buffer1[0] === DONE || buffer2[0] === DONE) {
        listener(DONE);
        cancelBoth();
      }
    });

    let buffer2 = [];
    let cancel2 = b2((value) => {
      buffer2.push(value);

      if (buffer1.length) {
        listener([buffer1.shift(), buffer2.shift()]);
      }
      if (buffer1[0] === DONE || buffer2[0] === DONE) {
        listener(DONE);
        cancelBoth();
      }
    });

    cancelBoth = () => {
      cancel1();
      cancel2();
    };

    return cancelBoth;
  };
