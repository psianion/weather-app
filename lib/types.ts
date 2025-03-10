export interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  sys: {
    country: string;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
}

export interface ForecastData {
  list: ForecastItem[];
  city: { name: string };
}

export interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
}

export interface DailyAccumulator {
  minTemp: number;
  maxTemp: number;
  conditions: Record<string, number>;
  icons: Record<string, number>;
}
