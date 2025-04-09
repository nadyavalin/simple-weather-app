import { WeatherData } from "./types/interfaces";

export async function getWeather(city: string): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error("API key is missing");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Город не найден");
  return response.json();
}
