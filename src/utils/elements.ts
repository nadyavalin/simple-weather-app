import { snackbarContainer } from "../main";
import { SnackbarType } from "../types/interfaces";

export function createElement<T extends keyof HTMLElementTagNameMap>({
  tagName,
  classNames,
  textContent,
  innerHTML,
  attributes,
}: {
  tagName: T;
  classNames?: string[];
  textContent?: string;
  innerHTML?: string;
  attributes?: Record<string, string>;
}): HTMLElementTagNameMap[T] {
  const element = document.createElement(tagName);
  if (classNames) {
    element.classList.add(...classNames);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  return element;
}

export function createSnackbar(type: SnackbarType, text: string) {
  const snackbar = createElement({
    tagName: "div",
    classNames: ["snackbar", `snackbar_${type}`],
    textContent: text,
  });
  snackbarContainer.prepend(snackbar);
  setTimeout(() => {
    snackbarContainer.removeChild(snackbar);
  }, 3900);
}
