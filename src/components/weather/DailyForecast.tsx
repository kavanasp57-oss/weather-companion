import { Droplet } from "lucide-react";
import type { DailyWeather, TemperatureUnit } from "@/types/weather";
import { getWeatherInfo } from "@/lib/weatherCodes";
import { formatDayName, formatTemp } from "@/lib/weatherUtils";

interface DailyForecastProps {
  days: DailyWeather[];
  unit: TemperatureUnit;
}

export function DailyForecast({ days, unit }: DailyForecastProps) {
  return (
    <section aria-label="7 day forecast" className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">7-Day Forecast</h3>
      <ul className="glass divide-y divide-border rounded-2xl">
        {days.map((day, index) => {
          const info = getWeatherInfo(day.weatherCode, true);
          const Icon = info.icon;
          return (
            <li
              key={day.date}
              className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 sm:grid-cols-[1.2fr_2fr_auto_auto]"
            >
              <span className="text-sm font-medium text-foreground">
                {formatDayName(day.date, index)}
              </span>
              <span className="col-span-2 flex items-center gap-2 text-sm text-muted-foreground sm:col-span-1">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                {info.label}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Droplet className="size-3" aria-hidden="true" />
                {day.precipitationProbability}%
              </span>
              <span className="text-right text-sm font-semibold text-foreground">
                <span className="text-muted-foreground">
                  {formatTemp(day.minTemperature, unit)}
                </span>{" "}
                / {formatTemp(day.maxTemperature, unit)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
