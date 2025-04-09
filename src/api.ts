import { WeatherData } from "./types/interfaces";

const apiKey = import.meta.env.VITE_API_KEY;
const lang = "ru";

export async function getWeather(city: string): Promise<WeatherData> {
  if (!apiKey) throw new Error("API key is missing");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Город не найден");
  return response.json();
}

export async function getPointWeather(lat: number, lon: number): Promise<WeatherData> {
  if (!apiKey) throw new Error("API key is missing");
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Место не найдено");
  return response.json();
}
