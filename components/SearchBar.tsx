import { useWeather } from "@/app/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCurrentWeather, fetchForecast } from "@/services/weatherService";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const { setData, setError, setLoading, loading, error, setForecastData } =
    useWeather();
  const [city, setCity] = useState("");

  const updateRecentCities = (city: string) => {
    let cities: string[] = [];
    const stored = localStorage.getItem("recentCities");
    if (stored) {
      cities = JSON.parse(stored);
    }
    cities = cities.filter((c) => c.toLowerCase() !== city.toLowerCase());
    cities.unshift(city);
    if (cities.length > 5) {
      cities = cities.slice(0, 5);
    }
    localStorage.setItem("recentCities", JSON.stringify(cities));
    window.dispatchEvent(new Event("recentCitiesChanged"));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const _data = await fetchCurrentWeather(city);
      if (_data) {
        setData(_data);
        updateRecentCities(_data.name);
      }

      const _forecastData = await fetchForecast(city);
      if (_forecastData) {
        setForecastData(_forecastData);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Invalid City: Error fetching data");
    } finally {
      setCity("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full items-center space-x-2">
        <Input
          placeholder="Mumbai"
          disabled={loading}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="submit"
          disabled={loading}
          onClick={fetchData}
          className="w-[160px]"
        >
          <CirclePlus size={20} /> Add City
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
