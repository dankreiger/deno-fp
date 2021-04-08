import type { UnaryListener } from "./UnaryListener.ts";

export type UnaryBroadcaster<T> = (listener: UnaryListener<T>) => void;
