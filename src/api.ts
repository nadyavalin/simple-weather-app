import { WeatherData } from "./types/interfaces";

export async function getWeather(city: string): Promise<WeatherData> {
  const apiKey = "f9b9027af9501033a49827ffa96c6cb9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Город не найден");
  return response.json();
}
