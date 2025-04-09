import { WeatherCardProps } from "../types/interfaces";

export function createWeatherCard({
  city,
  temp,
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

  const weatherDesc = document.createElement("p");
  weatherDesc.className = "description";
  weatherDesc.textContent = description;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Удалить";
  removeButton.className = "remove-btn";
  removeButton.addEventListener("click", () => card.remove());

  card.append(cityName, iconImg, temperature, weatherDesc, removeButton);
  return card;
}
