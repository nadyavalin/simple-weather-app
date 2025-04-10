interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherData {
  main: Main;
  weather: Weather[];
  wind: Wind;
  name: string;
  coord: { lat: number; lon: number };
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  weather: Weather[];
}

export interface WeatherForecastData {
  hourly: HourlyForecast[];
}

export interface WeatherCardProps {
  city: string;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  description: string;
  icon: string;
  forecast?: HourlyForecast[];
  onRemove?: () => void;
}

export interface CardData {
  name: string;
  lat?: number;
  lon?: number;
  city?: string; // Для пользовательских городов без координат
}
