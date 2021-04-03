import type { UnaryBroadcaster } from './UnaryBroadcaster.ts';

export type ConfigurableUnaryBroadcaster<C, T> = (
  config: C
) => UnaryBroadcaster<T>;
