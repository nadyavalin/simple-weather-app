export const PRESSURE_COEFFICIENT = 0.7500637554192;

export const defaultLocations = [
  { name: "Санкт-Петербург, проспект Ветеранов", lat: 59.8411, lon: 30.2514 },
  { name: "Санкт-Петербург, площадь Мужества", lat: 59.9983, lon: 30.3639 },
  { name: "Санкт-Петербург, Пупышево", lat: 59.6833, lon: 29.8333 },
  { name: "Санкт-Петербург, Стрельна", lat: 59.8519, lon: 30.0358 },
  { name: "Москва", lat: 55.7512, lon: 37.6184 },
  { name: "Волгоград", lat: 48.708, lon: 44.5133 },
  { name: "Курск", lat: 51.73733, lon: 36.18735 },
  { name: "Переславль-Залесский", lat: 56.7361, lon: 38.8492 },
];

export const iconMap: { [key: string]: string } = {
  "01d": "/icons/clear-day.svg",
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
  "10n": "/icons/partly-cloudy-day-rain.svg",
  "11d": "/icons/thunderstorms-day.svg",
  "11n": "/icons/thunderstorms-night.svg",
  "13d": "/icons/snow.svg",
  "13n": "/icons/snow.svg",
  "50d": "/icons/mist.svg",
  "50n": "/icons/mist.svg",
};
