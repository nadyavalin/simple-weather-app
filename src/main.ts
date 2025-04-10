import { getPointWeather, getWeather, getWeatherForecast } from "./api";

import "./style.css";
import "./components/WeatherCard.css";
import { createWeatherCard } from "./components/weatherCard";
import { CardData } from "./types/interfaces";
import { loadCardsFromStorage, saveCardsToStorage } from "./utils/utils";
import { defaultLocations } from "./constants";

const app = document.querySelector<HTMLDivElement>("#app");

function removeCard(cardToRemove: CardData) {
  const cards = loadCardsFromStorage();
  const updatedCards = cards.filter(
    (card) =>
      card.name !== cardToRemove.name ||
      card.lat !== cardToRemove.lat ||
      card.lon !== cardToRemove.lon ||
      card.city !== cardToRemove.city,
  );
  saveCardsToStorage(updatedCards);
  displayCards(updatedCards);
}

async function displayCards(cards: CardData[]) {
  const weatherOutput = document.getElementById("weatherOutput");
  if (!weatherOutput) return;

  weatherOutput.innerHTML = "";

  for (const cardData of cards) {
    try {
      let currentData;
      let forecastData;
      if (cardData.lat !== undefined && cardData.lon !== undefined) {
        currentData = await getPointWeather(cardData.lat, cardData.lon);
        forecastData = await getWeatherForecast(cardData.lat, cardData.lon);
      } else if (cardData.city) {
        currentData = await getWeather(cardData.city);
        forecastData = await getWeatherForecast(currentData.coord.lat, currentData.coord.lon);
      } else {
        throw new Error("Неверные данные карточки");
      }

      const card = createWeatherCard({
        city: cardData.name,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        forecast: forecastData.hourly,
        onRemove: () => removeCard(cardData),
      });
      weatherOutput.appendChild(card);
    } catch (error) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = `Ошибка для ${cardData.name}: ${(error as Error).message}`;
      errorMessage.className = "error";
      weatherOutput.appendChild(errorMessage);
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
    const currentData = await getWeather(city);
    const newCard: CardData = {
      name: currentData.name,
      lat: currentData.coord.lat,
      lon: currentData.coord.lon,
    };
    const cards = loadCardsFromStorage();
    cards.push(newCard);
    saveCardsToStorage(cards);
    displayCards(cards);
    cityInput.value = "";
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = `Ошибка: ${(error as Error).message}`;
    errorMessage.className = "error";
    weatherOutput.appendChild(errorMessage);
    setTimeout(() => errorMessage.remove(), 3000);
  }
}

if (app) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const input = document.createElement("input");
  input.id = "cityInput";
  input.placeholder = "Введи город";

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addNewCityWeather();
    }
  });

  const addButton = document.createElement("button");
  addButton.textContent = "Добавить город";
  addButton.addEventListener("click", addNewCityWeather);

  const resetButton = document.createElement("button");
  resetButton.textContent = "Восстановить дефолт";
  resetButton.className = "reset-btn";
  resetButton.addEventListener("click", () => {
    saveCardsToStorage(defaultLocations);
    displayCards(defaultLocations);
  });

  inputContainer.append(input, addButton, resetButton);

  const weatherOutput = document.createElement("div");
  weatherOutput.id = "weatherOutput";

  app.append(inputContainer, weatherOutput);

  const savedCards = loadCardsFromStorage();
  displayCards(savedCards);
}
