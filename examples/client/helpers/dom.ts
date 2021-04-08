export const getDocument = () => ((window as any).document as any) || undefined;

export const getElement = (selector: string) => {
  const document = getDocument();
  return (
    (!!document &&
      typeof document === "object" &&
      typeof document.querySelector === "function" &&
      document.querySelector(selector)) ||
    undefined
  );
};

export const render = (html: string, elType = "h1", rootEl = "#root") => {
  const style = "padding: 20px; display: grid;";
  const element = getElement(rootEl);
  if (element && "innerHTML" in element) {
    element.innerHTML = `
    <div style="${style}">
      <${elType}>${html}</${elType}>
    </div>
    <footer</footer>
    `;
  }
};
