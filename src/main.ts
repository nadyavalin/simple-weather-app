import { getPointWeather, getWeather, getWeatherForecast } from "./api";
import "./style.css";
import "./components/weatherCard/WeatherCard.css";
import {
  CardData,
  HourlyForecast,
  SnackbarType,
  WeatherData,
  WeatherForecastData,
} from "./types/interfaces";
import { loadCardsFromStorage, saveCardsToStorage } from "./utils/utils";
import { defaultLocations } from "./constants";
import { createElement, createSnackbar } from "./utils/elements";
import { createWeatherCard } from "./components/weatherCard/weatherCard";
import handleAsyncButtonAction from "./handlers/handleAsyncButtonAction";

export const snackbarContainer = createElement({
  tagName: "div",
  classNames: ["snackbar-container"],
});

const app = document.querySelector<HTMLDivElement>("#app");

function getHourlyForecast(forecastData: WeatherForecastData): HourlyForecast[] {
  return forecastData.list.map((item) => ({
    dt: item.dt,
    temp: item.main.temp,
    weather: item.weather,
  }));
}

function buildWeatherCard(
  cardData: CardData,
  currentData: WeatherData,
  forecastData: WeatherForecastData,
): HTMLElement {
  const hourlyForecast = getHourlyForecast(forecastData);
  return createWeatherCard({
    city: cardData.name,
    temp: currentData.main.temp,
    feels_like: currentData.main.feels_like,
    humidity: currentData.main.humidity,
    pressure: currentData.main.pressure,
    wind_speed: currentData.wind.speed,
    wind_deg: currentData.wind.deg,
    description: currentData.weather[0].description,
    icon: currentData.weather[0].icon,
    forecast: hourlyForecast,
    onRemove: () => removeCard(cardData),
  });
}

function showNoDataMessage(container: HTMLElement) {
  const noDataMessage = createElement({
    tagName: "p",
    classNames: ["no-data"],
    textContent: "Нет данных для отображения",
  });
  container.innerHTML = "";
  container.appendChild(noDataMessage);
}

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

  const weatherOutput = document.getElementById("weatherOutput");
  if (weatherOutput) {
    const cardElement = weatherOutput.querySelector(
      `[data-city="${cardToRemove.name}"]`,
    ) as HTMLElement | null;
    if (cardElement) {
      cardElement.style.opacity = "0";

      cardElement.remove();
      if (!weatherOutput.querySelector(".weather-card")) {
        showNoDataMessage(weatherOutput);
      }
    }
  }
}

async function displayCards(cards: CardData[]): Promise<void> {
  const weatherOutput = document.getElementById("weatherOutput");
  if (!weatherOutput) {
    return;
  }

  weatherOutput.innerHTML = "";

  if (cards.length === 0) {
    showNoDataMessage(weatherOutput);
    return;
  }

  const promises = cards.map(async (cardData) => {
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

      const card = buildWeatherCard(cardData, currentData, forecastData);
      weatherOutput.appendChild(card);
    } catch (error) {
      const errorMessage = createElement({
        tagName: "p",
        classNames: ["error"],
        textContent: `Невозможно загрузить ${cardData.name}: ${(error as Error).message}`,
      });
      weatherOutput.appendChild(errorMessage);
    }
  });

  await Promise.all(promises);
}

async function addNewCityWeather() {
  const cityInput = document.getElementById("cityInput") as HTMLInputElement;
  const weatherOutput = document.getElementById("weatherOutput");

  if (!cityInput || !weatherOutput) return;

  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const currentData = await getWeather(city);
    const forecastData = await getWeatherForecast(currentData.coord.lat, currentData.coord.lon);
    const newCard: CardData = {
      name: currentData.name,
      lat: currentData.coord.lat,
      lon: currentData.coord.lon,
    };
    const cards = loadCardsFromStorage();

    const cityExists = cards.some(
      (card) => card.name.trim().toLowerCase() === newCard.name.trim().toLowerCase(),
    );
    if (cityExists) {
      createSnackbar(SnackbarType.error, `Город ${newCard.name} уже есть в списке!`);
      cityInput.value = "";
      cityInput.focus();
      return;
    }

    const card = buildWeatherCard(newCard, currentData, forecastData);
    if (!weatherOutput.querySelector(".weather-card")) {
      weatherOutput.innerHTML = "";
    }
    weatherOutput.insertBefore(card, weatherOutput.firstChild);

    cards.unshift(newCard);
    saveCardsToStorage(cards);

    cityInput.value = "";
  } catch (error) {
    createSnackbar(SnackbarType.error, `Ошибка: ${(error as Error).message}`);
    throw error;
  }
}

if (app) {
  const inputContainer = createElement({ tagName: "div", classNames: ["input-container"] });
  const input = createElement({
    tagName: "input",
    attributes: { id: "cityInput", placeholder: "Введи город" },
  });
  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const addButton = inputContainer.querySelector("button:not(.reset-btn)") as HTMLButtonElement;
      addButton.disabled = true;
      addButton.innerHTML = '<div class="spinner"></div>';
      try {
        await addNewCityWeather();
      } catch (error) {
        console.error("Ошибка при добавлении города:", error);
      } finally {
        addButton.disabled = false;
        addButton.textContent = "Добавить город";
      }
    }
  });

  const cross = createElement({ tagName: "span", classNames: ["cross"] });
  cross.addEventListener("click", () => {
    input.value = "";
  });

  const addButton = createElement({ tagName: "button", textContent: "Добавить город" });
  addButton.addEventListener("click", async () => {
    await handleAsyncButtonAction(
      addButton,
      addNewCityWeather,
      "Добавить город",
      "Ошибка при добавлении города",
    );
  });

  const resetButton = createElement({
    tagName: "button",
    classNames: ["reset-btn"],
    textContent: "Восстановить",
    attributes: { title: "Восстановить исходные карточки" },
  });
  resetButton.addEventListener("click", async () => {
    await handleAsyncButtonAction(
      resetButton,
      async () => {
        saveCardsToStorage(defaultLocations);
        await displayCards(defaultLocations);
      },
      "Восстановить",
      "Ошибка при восстановлении дефолтных городов",
    );
  });

  inputContainer.append(input, cross, addButton, resetButton);

  const weatherOutput = createElement({ tagName: "div", attributes: { id: "weatherOutput" } });

  app.append(snackbarContainer, inputContainer, weatherOutput);

  const savedCards = loadCardsFromStorage();
  displayCards(savedCards);
}
