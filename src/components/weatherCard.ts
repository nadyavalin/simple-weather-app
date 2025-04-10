import { PRESSURE_COEFFICIENT } from "../constants";
import { WeatherCardProps } from "../types/interfaces";
import { getWindDirection } from "../utils/utils";

const iconMap: { [key: string]: string } = {
  "01d": "/icons/clear-sky.svg",
  "01n": "/icons/clear-night.svg",
  "02d": "/icons/partly-cloudy-day.svg",
  "02n": "/icons/partly-cloudy-night.svg",
  "03n": "/icons/cloudy.svg",
  "03d": "/icons/cloudy.svg",
  "04d": "/icons/overcast-day.svg",
  "04n": "/icons/overcast-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain.svg",
  "10d": "/icons/partly-cloudy-day-rain.svg",
  "10n": "./icons/partly-cloudy-day-rain.svg",
  "11d": "/icons/thunderstorms-day.svg",
  "11n": "/icons/thunderstorms-night.svg",
  "13d": "/icons/snow.svg",
  "13n": "/icons/snow.svg",
  "50d": "/icons/mist.svg",
  "50n": "/icons/mist.svg",
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
  forecast = [],
  onRemove,
}: WeatherCardProps & { onRemove?: () => void }): HTMLElement {
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

  const weatherDesc = document.createElement("p");
  weatherDesc.className = "description";
  weatherDesc.textContent = description;

  const temperature = document.createElement("p");
  temperature.className = "temperature";
  temperature.textContent = `${temp}°C `;

  const feels = document.createElement("span");
  feels.className = "fills-like";
  feels.textContent = `(${feels_like}°C)`;
  temperature.appendChild(feels);

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

  const forecastContainer = document.createElement("div");
  forecastContainer.className = "forecast";
  if (forecast.length > 0) {
    const forecastTitle = document.createElement("h4");
    forecastTitle.textContent = "Через 3 часа:";
    forecastContainer.appendChild(forecastTitle);

    const nextHour = forecast[1];
    if (nextHour) {
      const hourElement = document.createElement("p");
      const time = new Date(nextHour.dt * 1000).toLocaleTimeString("ru", {
        hour: "2-digit",
        minute: "2-digit",
      });
      hourElement.textContent = `${time}: ${nextHour.temp}°C, ${nextHour.weather[0].description}`;
      forecastContainer.appendChild(hourElement);
    }
  }

  const removeButton = document.createElement("button");
  removeButton.textContent = "Удалить";
  removeButton.className = "remove-btn";
  removeButton.addEventListener("click", () => {
    card.remove();
    if (onRemove) onRemove();
  });

  card.append(cardHeader, cardContent);
  cardHeader.append(cityName, iconImg, weatherDesc);
  cardContent.append(temperature, humid, press, windSpeed, forecastContainer, removeButton);
  return card;
}
