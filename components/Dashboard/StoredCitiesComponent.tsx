// src/components/RecentCitiesWeather.tsx
import { useEffect, useState } from "react";
import { fetchCurrentWeather, fetchForecast } from "@/services/weatherService";
import { CurrentWeather, ForecastData } from "@/lib/types";
import { useLocalStorageCities } from "../hooks/useLocalStorageCities";
import ForecastDataComponent from "./ForecastData";
import { RenderWeatherIcon } from "../util/RenderWatherIcon";
import { Thermometer, Trash, Waves, Wind } from "lucide-react";

interface CityWeather {
  city: string;
  currentData: CurrentWeather;
  forecastData: ForecastData;
}

const SideStatsForCity = ({ cityWeather }: { cityWeather: CurrentWeather }) => {
  const CityStatsData = [
    {
      title: "Temp",
      value: cityWeather?.main.temp,
      unit: "°C",
      icon: <Thermometer size={16} />,
    },
    {
      title: "Humidity",
      value: cityWeather?.main.humidity,
      unit: "%",
      icon: <Waves size={16} />,
    },
    {
      title: "Wind",
      value: cityWeather?.wind.speed,
      unit: "m/s",
      icon: <Wind size={16} />,
    },
  ];
  return (
    <div className="flex gap-2 w-full mt-4">
      {CityStatsData.map((item, index) => (
        <div key={index} className="flex flex-col items-center w-1/3">
          <p className="text-xs font-light flex items-center gap-1">
            {item.title} {item.icon}
          </p>
          <p>{`${item.value} ${item.unit}`}</p>
        </div>
      ))}
    </div>
  );
};

export function RecentCitiesWeather() {
  const cities = useLocalStorageCities();
  const [data, setData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteCity = (city: string) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("recentCities");
      let citiesArray: string[] = stored ? JSON.parse(stored) : [];
      citiesArray = citiesArray.filter(
        (c) => c.toLowerCase() !== city.toLowerCase()
      );
      localStorage.setItem("recentCities", JSON.stringify(citiesArray));
      window.dispatchEvent(new Event("recentCitiesChanged"));
    }
  };

  useEffect(() => {
    if (cities.length === 0) {
      setData([]);
      return;
    }
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          cities.map(async (city) => {
            const current = await fetchCurrentWeather(city);
            const forecast = await fetchForecast(city);
            return {
              city,
              currentData: current,
              forecastData: forecast,
            };
          })
        );
        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [cities]);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        There is some error, refresh the page
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      {data.map((cityWeather, index) => (
        <div
          key={index}
          className="flex items-center gap-2 w-full border border-solid rounded-sm p-2 lg:flex-row flex-col"
        >
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <div className="flex gap-2 items-center">
                <RenderWeatherIcon
                  iconCode={cityWeather.currentData.weather[0].icon}
                  size={40}
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-xl">{`${cityWeather.city}, ${cityWeather.currentData.sys.country}`}</p>
                  <p className="font-light capitalize text-sm">
                    {cityWeather.currentData.weather[0].description}
                  </p>
                </div>
              </div>
              <div
                onClick={() => handleDeleteCity(cityWeather.city)}
                className="p-2 border border-solid rounded-md border-red-500 h-fit cursor-pointer"
              >
                <Trash className=" text-red-500" size={20} />
              </div>
            </div>
            {/* <SelectedCityStats data={cityWeather.currentData} /> */}
            <SideStatsForCity cityWeather={cityWeather.currentData} />
          </div>
          <ForecastDataComponent forecastData={cityWeather.forecastData} />
        </div>
      ))}
    </div>
  );
}
