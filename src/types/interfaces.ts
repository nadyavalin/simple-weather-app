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
}
