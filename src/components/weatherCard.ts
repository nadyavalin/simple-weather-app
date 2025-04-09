interface WeatherCardProps {
  city: string;
  temp: number;
  description: string;
}

export function createWeatherCard({ city, temp, description }: WeatherCardProps): HTMLElement {
  const card = document.createElement("div");
  card.className = "weather-card";

  const cityName = document.createElement("h2");
  cityName.textContent = city;

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

  card.append(cityName, temperature, weatherDesc, removeButton);
  return card;
}
