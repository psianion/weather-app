import { useState, useEffect } from "react";

export function useLocalStorageCities() {
  const getCities = () => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("recentCities");
    return stored ? JSON.parse(stored) : [];
  };

  const [cities, setCities] = useState<string[]>(getCities);

  useEffect(() => {
    const handleStorageChange = () => {
      setCities(getCities());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("recentCitiesChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("recentCitiesChanged", handleStorageChange);
    };
  }, []);

  return cities;
}
