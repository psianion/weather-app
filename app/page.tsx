"use client";
import MainComponent from "@/components/Dashboard/MainComponent";
import { WeatherProvider } from "./context";
import { RecentCitiesWeather } from "@/components/Dashboard/StoredCitiesComponent";

export default function Home() {
  return (
    <div className="flex w-full min-h-[100vh] p-4 lg:p-8 gap-4 justify-center xl:flex-row flex-col mt-4">
      <WeatherProvider>
        <MainComponent />
      </WeatherProvider>
      <div className="xl:w-[900px] w-full border border-solid rounded-md p-2">
        <RecentCitiesWeather />
      </div>
    </div>
  );
}
