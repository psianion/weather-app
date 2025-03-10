import { DailyAccumulator, DailyForecast, ForecastData } from "@/lib/types";
import dayjs from "dayjs";

export function aggregateDailyForecast(
  forecastData: ForecastData
): DailyForecast[] {
  const dailyData = forecastData.list.reduce<Record<string, DailyAccumulator>>(
    (acc, item) => {
      const day = dayjs.unix(item.dt).format("YYYY-MM-DD");

      if (!acc[day]) {
        acc[day] = {
          minTemp: item.main.temp,
          maxTemp: item.main.temp,
          conditions: {},
          icons: {},
        };
      } else {
        acc[day].minTemp = Math.min(acc[day].minTemp, item.main.temp);
        acc[day].maxTemp = Math.max(acc[day].maxTemp, item.main.temp);
      }

      const condition = item.weather[0].main;
      const icon = item.weather[0].icon;

      acc[day].conditions[condition] =
        (acc[day].conditions[condition] || 0) + 1;
      acc[day].icons[icon] = (acc[day].icons[icon] || 0) + 1;

      return acc;
    },
    {}
  );

  const dailyForecasts: DailyForecast[] = Object.entries(dailyData).map(
    ([date, values]) => {
      const condition = Object.entries(values.conditions).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        ["", 0]
      )[0];

      const icon = Object.entries(values.icons).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        ["", 0]
      )[0];

      return {
        date,
        minTemp: values.minTemp,
        maxTemp: values.maxTemp,
        condition,
        icon,
      };
    }
  );

  return dailyForecasts;
}
