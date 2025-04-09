interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  humidity: number;
}

export interface WeatherData {
  main: Main;
  weather: Weather[];
  name: string;
}
