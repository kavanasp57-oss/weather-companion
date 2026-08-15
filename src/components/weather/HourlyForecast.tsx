import { Droplet } from "lucide-react";
import type { HourlyWeather, TemperatureUnit } from "@/types/weather";
import { getWeatherInfo } from "@/lib/weatherCodes";
import { formatLocalHour, formatTemp } from "@/lib/weatherUtils";

interface HourlyForecastProps {
  hours: HourlyWeather[];
  unit: TemperatureUnit;
}

function HourlyCard({ hour, unit, index }: { hour: HourlyWeather; unit: TemperatureUnit; index: number }) {
  const Icon = getWeatherInfo(hour.weatherCode, hour.isDay).icon;
  return (
    <li className="glass flex min-w-[92px] shrink-0 flex-col items-center gap-2 rounded-2xl px-4 py-4">
      <span className="text-xs text-muted-foreground">
        {index === 0 ? "Now" : formatLocalHour(hour.time)}
      </span>
      <Icon className="size-7 text-accent" aria-hidden="true" />
      <span className="text-lg font-semibold text-foreground">
        {formatTemp(hour.temperature, unit)}
      </span>
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Droplet className="size-3" aria-hidden="true" />
        {hour.precipitationProbability}%
      </span>
    </li>
  );
}

export function HourlyForecast({ hours, unit }: HourlyForecastProps) {
  return (
    <section aria-label="Hourly forecast" className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Hourly Forecast</h3>
      <ul className="scrollbar-thin flex gap-3 overflow-x-auto pb-2">
        {hours.map((hour, index) => (
          <HourlyCard key={hour.time} hour={hour} unit={unit} index={index} />
        ))}
      </ul>
    </section>
  );
}
