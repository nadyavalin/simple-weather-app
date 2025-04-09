import { getWeather } from "./api";

import "./style.css";
import "./components/WeatherCard.css";
import { createWeatherCard } from "./components/weatherCard";

const app = document.querySelector<HTMLDivElement>("#app");

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

  displayDefaultCities();
} else {
  console.error("Элемент #app не найден");
}

async function displayDefaultCities() {
  const cities = ["Санкт-Петербург", "Пупышево", "Волгоград"];
  const weatherOutput = document.getElementById("weatherOutput");

  if (!weatherOutput) return;

  for (const city of cities) {
    try {
      const data = await getWeather(city);
      const card = createWeatherCard({
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      weatherOutput.appendChild(card);
    } catch (error) {
      console.error(`Ошибка для ${city}: ${(error as Error).message}`);
    }
  }
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
