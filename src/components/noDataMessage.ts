import { createElement } from "../utils/elements";

function showNoDataMessage(container: HTMLElement) {
  const noDataMessage = createElement({
    tagName: "p",
    classNames: ["no-data"],
    textContent: "Нет данных для отображения",
  });
  container.innerHTML = "";
  container.appendChild(noDataMessage);
}

export default showNoDataMessage;
