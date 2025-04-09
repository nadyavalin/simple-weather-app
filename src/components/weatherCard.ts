import { PRESSURE_COEFFICIENT } from "../constants";
import { WeatherCardProps } from "../types/interfaces";
import { getWindDirection } from "../utils/utils";

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

  const cityName = document.createElement("h2");
  cityName.textContent = city;

  const iconImg = document.createElement("img");
  iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
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

  card.append(
    cityName,
    iconImg,
    temperature,
    feels,
    humid,
    press,
    windSpeed,
    weatherDesc,
    removeButton,
  );
  return card;
}
