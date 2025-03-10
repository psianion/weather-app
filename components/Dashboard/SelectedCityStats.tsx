import { CurrentWeather } from "@/lib/types";
import { Thermometer, Waves, Wind } from "lucide-react";
import React from "react";

const SelectedCityStats = ({ data }: { data: CurrentWeather | null }) => {
  const StatsData = [
    {
      title: "Temperature",
      value: data?.main.temp,
      unit: "°C",
      icon: <Thermometer size={16} />,
    },
    {
      title: "Feels Like",
      value: data?.main.feels_like,
      unit: "°C",
      icon: <Thermometer size={16} />,
    },
    {
      title: "Humidity",
      value: data?.main.humidity,
      unit: "%",
      icon: <Waves size={16} />,
    },
    {
      title: "Wind",
      value: data?.wind.speed,
      unit: "m/s",
      icon: <Wind size={16} />,
    },
  ];

  return (
    <div className="flex items-center gap-1 w-full mt-2 flex-wrap lg:flex-nowrap">
      {StatsData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center border border-solid rounded-sm p-2 w-[48%] lg:w-1/4"
        >
          <div className="flex items-end gap-1">
            <p className="font-semibold text-3xl">{item.value}</p>
            <p>{item.unit}</p>
          </div>
          <div className="flex items-center gap-1">
            {item.icon}
            <p className="font-light text-sm">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedCityStats;
