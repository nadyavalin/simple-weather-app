import { iconMap, PRESSURE_COEFFICIENT } from "../../utils/constants";
import { WeatherCardProps } from "../../types/interfaces";
import { createElement } from "../../utils/elements";
import { getWindDirection } from "../../utils/utils";

export function createWeatherCard({
  city,
  temp,
  feels_like,
  humidity,
  pressure,
  wind_speed,
  wind_deg,
  description,
  icon,
  forecast = [],
  onRemove,
}: WeatherCardProps & { onRemove?: () => void }): HTMLElement {
  const card = createElement({ tagName: "div", classNames: ["weather-card"] });
  const cardHeader = createElement({ tagName: "div", classNames: ["weather-card__header"] });
  const cardContent = createElement({ tagName: "div", classNames: ["weather-card__content"] });
  const cityName = createElement({ tagName: "h2", textContent: city });
  const iconImg = createElement({
    tagName: "img",
    classNames: ["weather-icon"],
    attributes: { src: iconMap[icon], alt: description },
  });
  const weatherDesc = createElement({
    tagName: "p",
    classNames: ["description"],
    textContent: description,
  });
  const temperature = createElement({
    tagName: "p",
    classNames: ["temperature"],
    textContent: `${temp}°C `,
  });
  const feels = createElement({
    tagName: "span",
    classNames: ["fills-like"],
    textContent: `(${feels_like}°C)`,
  });
  temperature.appendChild(feels);

  const humid = createElement({
    tagName: "p",
    classNames: ["humidity"],
    textContent: `${humidity}%`,
  });
  const press = createElement({
    tagName: "p",
    classNames: ["pressure"],
    textContent: `${Math.round(pressure * PRESSURE_COEFFICIENT)} мм.рт.ст`,
  });
  const windSpeed = createElement({
    tagName: "p",
    classNames: ["wind-speed"],
    textContent: `${wind_speed} м/с `,
  });
  const windDirection = createElement({
    tagName: "span",
    classNames: ["wind-direction"],
    textContent: getWindDirection(wind_deg),
  });
  windSpeed.appendChild(windDirection);

  const forecastContainer = createElement({ tagName: "div", classNames: ["forecast"] });
  if (forecast.length > 0) {
    const forecastTitle = createElement({ tagName: "h4", textContent: "Через 3 часа:" });
    forecastContainer.appendChild(forecastTitle);

    const nextHour = forecast[1];
    if (nextHour) {
      const time = new Date(nextHour.dt * 1000).toLocaleTimeString("ru", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const hourElement = createElement({
        tagName: "p",
        textContent: `${time}: ${nextHour.temp}°C, ${nextHour.weather[0].description}`,
      });
      forecastContainer.appendChild(hourElement);
    }
  }

  const removeButton = createElement({
    tagName: "button",
    classNames: ["remove-btn"],
    textContent: "Удалить",
  });
  removeButton.addEventListener("click", () => {
    if (onRemove) {
      onRemove();
    } else {
      console.warn("onRemove не определён");
    }
  });

  card.append(cardHeader, cardContent);
  cardHeader.append(cityName, iconImg, weatherDesc);
  cardContent.append(temperature, humid, press, windSpeed, forecastContainer, removeButton);
  card.setAttribute("data-city", city);
  return card;
}
