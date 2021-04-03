export const pipe = (...fns: ((x: any) => any)[]) => (init: any) =>
  fns.reduce((f, g) => g(f), init);
