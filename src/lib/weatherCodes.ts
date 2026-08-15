import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";

export type WeatherCategory =
  | "clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunder";

export interface WeatherInfo {
  label: string;
  category: WeatherCategory;
  icon: LucideIcon;
}

const MAP: Record<number, { label: string; category: WeatherCategory }> = {
  0: { label: "Clear Sky", category: "clear" },
  1: { label: "Mainly Clear", category: "clear" },
  2: { label: "Partly Cloudy", category: "cloudy" },
  3: { label: "Overcast", category: "cloudy" },
  45: { label: "Fog", category: "fog" },
  48: { label: "Rime Fog", category: "fog" },
  51: { label: "Light Drizzle", category: "drizzle" },
  53: { label: "Drizzle", category: "drizzle" },
  55: { label: "Dense Drizzle", category: "drizzle" },
  56: { label: "Freezing Drizzle", category: "drizzle" },
  57: { label: "Freezing Drizzle", category: "drizzle" },
  61: { label: "Light Rain", category: "rain" },
  63: { label: "Rain", category: "rain" },
  65: { label: "Heavy Rain", category: "rain" },
  66: { label: "Freezing Rain", category: "rain" },
  67: { label: "Freezing Rain", category: "rain" },
  71: { label: "Light Snow", category: "snow" },
  73: { label: "Snow", category: "snow" },
  75: { label: "Heavy Snow", category: "snow" },
  77: { label: "Snow Grains", category: "snow" },
  80: { label: "Rain Showers", category: "rain" },
  81: { label: "Rain Showers", category: "rain" },
  82: { label: "Violent Rain Showers", category: "rain" },
  85: { label: "Snow Showers", category: "snow" },
  86: { label: "Snow Showers", category: "snow" },
  95: { label: "Thunderstorm", category: "thunder" },
  96: { label: "Thunderstorm with Hail", category: "thunder" },
  99: { label: "Thunderstorm with Hail", category: "thunder" },
};

const ICONS: Record<WeatherCategory, LucideIcon> = {
  clear: Sun,
  cloudy: Cloudy,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  thunder: CloudLightning,
};

export function getWeatherInfo(code: number, isDay = true): WeatherInfo {
  const entry = MAP[code] ?? { label: "Unknown", category: "cloudy" as WeatherCategory };
  let icon = ICONS[entry.category];
  if (entry.category === "clear") icon = isDay ? Sun : Moon;
  if (code === 2) icon = isDay ? CloudSun : Cloud;
  return { label: entry.label, category: entry.category, icon };
}
