import React from "react";
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from "lucide-react";
import { lucideIconMapping } from "@/lib/utils";

export const RenderWeatherIcon = ({
  iconCode,
  size,
}: {
  iconCode: string;
  size?: number;
}) => {
  const iconName = lucideIconMapping[iconCode];
  if (!iconName) return null;

  switch (iconName) {
    case "sun":
      return <Sun size={size} />;
    case "moon":
      return <Moon size={size} />;
    case "cloud-sun":
      return <CloudSun size={size} />;
    case "cloud-moon":
      return <CloudMoon size={size} />;
    case "cloud":
      return <Cloud size={size} />;
    case "cloud-drizzle":
      return <CloudDrizzle size={size} />;
    case "cloud-rain":
      return <CloudRain size={size} />;
    case "cloud-lightning":
      return <CloudLightning size={size} />;
    case "cloud-snow":
      return <CloudSnow size={size} />;
    case "cloud-fog":
      return <CloudFog size={size} />;
    default:
      return null;
  }
};
