import { pipe } from './helpers/fp.ts';

import type { ConfigurableUnaryBroadcaster } from '../types/ConfigurableUnaryBroadcaster.ts';
import nest from '../functions/nest.ts';

const getDocument = () => ((window as any).document as any) || undefined;

const getElement = (selector: string) => {
  const document = getDocument();
  return (
    (!!document &&
      typeof document === 'object' &&
      typeof document.querySelector === 'function' &&
      document.querySelector(selector)) ||
    undefined
  );
};

const render = (html: string, elType = 'h1', rootEl = '#root') => {
  const style = 'padding: 20px; display: grid;';
  const element = getElement(rootEl);
  if (element && 'innerHTML' in element) {
    element.innerHTML = `
    <div style="${style}">
      <${elType}>${html}</${elType}>
    </div>
    `;
  }
};

const doEvent: ConfigurableUnaryBroadcaster<
  Parameters<typeof addEventListener>[0],
  Event
> = config => listener => {
  const element = getElement('body');
  if (element) {
    element.addEventListener(config, listener);
  }
};

const getURL: ConfigurableUnaryBroadcaster<
  number,
  string
> = config => listener => {
  console.log({ config });
  fetch(`https://api.github.com/user/${config}`)
    .then(response => response.json())
    .then(listener);
};
const timeout: ConfigurableUnaryBroadcaster<
  number,
  number
> = config => listener => {
  setTimeout(() => {
    listener(config);
  }, config);
};

const timeoutUrl = pipe(
  nest<number, number>(timeout),
  nest((ev: { clientX: number }) => getURL(ev.clientX))
);

timeoutUrl(doEvent('click'))((x: object) => render(JSON.stringify(x, null, 4)));
