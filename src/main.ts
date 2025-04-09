import { getPointWeather, getWeather } from "./api";

import "./style.css";
import "./components/WeatherCard.css";
import { createWeatherCard } from "./components/weatherCard";

const app = document.querySelector<HTMLDivElement>("#app");

async function displayDefaultLocations() {
  const defaultLocations = [
    { name: "Санкт-Петербург, проспект Ветеранов", lat: 59.8411, lon: 30.2514 },
    { name: "Санкт-Петербург, Пупышево", lat: 59.6833, lon: 29.8333 },
    { name: "Санкт-Петербург, площадь Мужества", lat: 59.9983, lon: 30.3639 },
    { name: "Санкт-Петербург, Стрельна", lat: 59.8519, lon: 30.0358 },
    { name: "Волгоград", lat: 48.708, lon: 44.5133 },
  ];

  const weatherOutput = document.getElementById("weatherOutput");
  if (!weatherOutput) {
    console.error("weatherOutput не найден");
    return;
  }

  for (const location of defaultLocations) {
    try {
      const data = await getPointWeather(location.lat, location.lon);
      const card = createWeatherCard({
        city: location.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      weatherOutput.appendChild(card);
    } catch (error) {
      console.error(`Ошибка для ${location.name}: ${(error as Error).message}`);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = `Ошибка для ${location.name}: ${(error as Error).message}`;
      errorMessage.className = "error";
      weatherOutput.appendChild(errorMessage);
    }
  }
}

if (app) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const input = document.createElement("input");
  input.id = "cityInput";
  input.placeholder = "Введи город";

  const button = document.createElement("button");
  button.textContent = "Добавить город";
  button.addEventListener("click", addNewCityWeather);

  inputContainer.append(input, button);

  const weatherOutput = document.createElement("div");
  weatherOutput.id = "weatherOutput";

  app.append(inputContainer, weatherOutput);

  displayDefaultLocations();
} else {
  console.error("Элемент #app не найден");
}

async function addNewCityWeather() {
  const cityInput = document.getElementById("cityInput") as HTMLInputElement;
  const weatherOutput = document.getElementById("weatherOutput");

  if (!cityInput || !weatherOutput) return;

  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const data = await getWeather(city);
    const card = createWeatherCard({
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
    weatherOutput.appendChild(card);
    cityInput.value = "";
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = `Ошибка: ${(error as Error).message}`;
    errorMessage.className = "error";
    weatherOutput.appendChild(errorMessage);
    setTimeout(() => errorMessage.remove(), 3000);
  }
}
