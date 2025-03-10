import { DailyForecast, ForecastData } from "@/lib/types";
import React from "react";
import { aggregateDailyForecast } from "../util/FiveDayForecast";
import dayjs from "dayjs";
import { RenderWeatherIcon } from "../util/RenderWatherIcon";
import { ThermometerSnowflake, ThermometerSun } from "lucide-react";

const ForecastDataComponent = ({
  forecastData,
}: {
  forecastData: ForecastData;
}) => {
  const aggregatedForecasts: DailyForecast[] =
    aggregateDailyForecast(forecastData);
  return (
    <div className="flex items-center w-full gap-1 flex-wrap sm:flex-nowrap">
      {aggregatedForecasts.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center border border-solid rounded-sm p-2 w-[48%] sm:w-1/5"
        >
          <p className="text-md font-light">
            {dayjs(item.date).format("DD MMM")}
          </p>
          <RenderWeatherIcon iconCode={item.icon} size={40} />
          <div className="flex items-center gap-2 justify-between w-full mt-2">
            <ThermometerSnowflake size={16} />
            <p className="text-sm">{item.minTemp}</p>
            <p className="text-xs">°C</p>
          </div>
          <div className="flex items-center gap-2 justify-between w-full">
            <ThermometerSun size={16} />
            <p className="text-sm">{item.maxTemp}</p>
            <p className="text-xs">°C</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastDataComponent;
