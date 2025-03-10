import { useWeather } from "@/app/context";
import React from "react";
import { RenderWeatherIcon } from "../util/RenderWatherIcon";
import SelectedCityStats from "./SelectedCityStats";
import ForecastDataComponent from "./ForecastData";

const SelectedCity = () => {
  const { data, forecastData } = useWeather();

  if (!data)
    return (
      <div className="items-center justify-center w-full border border-solid rounded-md hidden md:flex min-h-[360px]">
        Add City ^
      </div>
    );

  return (
    <div className="flex flex-col gap-2 p-4 border border-solid rounded-md w-full">
      {data ? (
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-start justify-between w-full">
            <div>
              <p className="font-semibold text-2xl">{`${data.name}, ${data.sys.country}`}</p>
              <p className="font-light text-sm capitalize">
                {data.weather[0].description}
              </p>
            </div>
            <RenderWeatherIcon iconCode={data.weather[0].icon} size={50} />
          </div>
          <SelectedCityStats data={data} />
        </div>
      ) : null}
      {forecastData ? (
        <div className="flex flex-col gap-1 w-full mt-5">
          <p>Next 5 Days Forecast</p>
          <ForecastDataComponent forecastData={forecastData} />
        </div>
      ) : null}
    </div>
  );
};

export default SelectedCity;
