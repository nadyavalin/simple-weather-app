import { PRESSURE_COEFFICIENT } from "../constants";
import { WeatherCardProps } from "../types/interfaces";
import { getWindDirection } from "../utils/utils";

const iconMap: { [key: string]: string } = {
  "01d": "../../public/icons/clear-sky.svg",
  "01n": "../../public/icons/clear-night.svg",
  "02d": "../../public/icons/partly-cloudy-day.svg",
  "02n": "../../public/icons/partly-cloudy-night.svg",
  "03d": "../../public/icons/cloudy.svg",
  "03n": "../../public/icons/cloudy.svg",
  "04d": "../../public/icons/overcast-day.svg",
  "04n": "../../public/icons/overcast-night.svg",
  "09d": "../../public/icons/rain.svg",
  "09n": "../../public/icons/rain.svg",
  "10d": "../../public/icons/partly-cloudy-day-rain.svg",
  "10n": "../../public/icons/partly-cloudy-day-rain.svg",
  "11d": "../../public/icons/thunderstorms-day.svg",
  "11n": "../../public/icons/thunderstorms-night.svg",
  "13d": "../../public/icons/snow.svg",
  "13n": "../../public/icons/snow.svg",
  "50d": "../../public/icons/mist.svg",
  "50n": "../../public/icons/mist.svg",
};

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
}: WeatherCardProps): HTMLElement {
  const card = document.createElement("div");
  card.className = "weather-card";

  const cardHeader = document.createElement("div");
  cardHeader.className = "weather-card__header";
  const cardContent = document.createElement("div");
  cardContent.className = "weather-card__content";

  const cityName = document.createElement("h2");
  cityName.textContent = city;

  const iconImg = document.createElement("img");
  iconImg.src = iconMap[icon];
  iconImg.alt = description;
  iconImg.className = "weather-icon";

  const temperature = document.createElement("p");
  temperature.className = "temperature";
  temperature.textContent = `${temp}°C`;

  const feels = document.createElement("p");
  feels.className = "fills-like";
  feels.textContent = `Ощущается: ${feels_like}°C`;

  const humid = document.createElement("p");
  humid.className = "humidity";
  humid.textContent = `${humidity}%`;

  const press = document.createElement("p");
  press.className = "pressure";
  press.textContent = `${Math.round(pressure * PRESSURE_COEFFICIENT)} мм.рт.ст`;

  const windSpeed = document.createElement("p");
  windSpeed.className = "wind-speed";
  windSpeed.textContent = `${wind_speed} м/с `;

  const span = document.createElement("span");
  span.className = "wind-direction";
  span.textContent = getWindDirection(wind_deg);
  windSpeed.appendChild(span);

  const weatherDesc = document.createElement("p");
  weatherDesc.className = "description";
  weatherDesc.textContent = description;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Удалить";
  removeButton.className = "remove-btn";
  removeButton.addEventListener("click", () => card.remove());

  card.append(cardHeader, cardContent);
  cardHeader.append(cityName, iconImg, weatherDesc);
  cardContent.append(temperature, feels, humid, press, windSpeed, removeButton);
  return card;
}
