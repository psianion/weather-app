import { CurrentWeather, ForecastData } from "@/lib/types";
import { createContext, useState, useContext, ReactNode } from "react";

interface WeatherContextType {
  data: CurrentWeather | null;
  setData: (data: CurrentWeather | null) => void;
  forecastData: ForecastData | null;
  setForecastData: (data: ForecastData | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CurrentWeather | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <WeatherContext.Provider
      value={{
        data,
        setData,
        forecastData,
        setForecastData,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
