import { RefreshCw, Star } from "lucide-react";
import type { GeoLocation, TemperatureUnit, WeatherResponse } from "@/types/weather";
import { getWeatherInfo } from "@/lib/weatherCodes";
import { formatLocalClock, formatTemp, locationLabel } from "@/lib/weatherUtils";

interface CurrentWeatherCardProps {
  location: GeoLocation;
  weather: WeatherResponse;
  unit: TemperatureUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  updatedLabel: string;
}

export function CurrentWeatherCard({
  location,
  weather,
  unit,
  isFavorite,
  onToggleFavorite,
  onRefresh,
  refreshing,
  updatedLabel,
}: CurrentWeatherCardProps) {
  const { current } = weather;
  const info = getWeatherInfo(current.weatherCode, current.isDay);
  const Icon = info.icon;

  return (
    <section
      aria-label="Current weather"
      className="glass animate-rise relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="weather-aura" aria-hidden="true" />
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{location.name}</h2>
            <p className="text-sm text-muted-foreground">{locationLabel(location) || "—"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Local time: {formatLocalClock(current.time)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavorite}
              className="glass focus-ring rounded-xl p-2.5 transition-colors hover:bg-card/80"
            >
              <Star
                className={`size-5 ${isFavorite ? "fill-warning text-warning" : "text-muted-foreground"}`}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              aria-label="Refresh weather data"
              className="glass focus-ring rounded-xl p-2.5 transition-colors hover:bg-card/80 disabled:opacity-60"
            >
              <RefreshCw
                className={`size-5 text-muted-foreground ${refreshing ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Icon className="size-24 text-accent drop-shadow-[0_0_28px_var(--accent-glow)] sm:size-28" aria-hidden="true" />
          <div>
            <p className="text-7xl leading-none font-light tracking-tight text-foreground sm:text-8xl">
              {formatTemp(current.temperature, unit)}
            </p>
            <p className="mt-2 text-lg font-medium text-foreground">{info.label}</p>
            <p className="text-sm text-muted-foreground">
              Feels like {formatTemp(current.apparentTemperature, unit)}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{updatedLabel}</p>
      </div>
    </section>
  );
}
