import type { UnaryBroadcaster } from '../types/UnaryBroadcaster.ts';
import type { ConfigurableUnaryBroadcaster } from '../types/ConfigurableUnaryBroadcaster.ts';
import type { UnaryListener } from '../types/UnaryListener.ts';

const nest = <C, T>(mapInner: ConfigurableUnaryBroadcaster<C, T>) => (
  outer: UnaryBroadcaster<C>
) => (listener: UnaryListener<T>) => {
  outer(config => {
    const inner = mapInner(config);
    inner(listener);
  });
};

export default nest;
