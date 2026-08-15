import { CloudRain, Compass, Droplets, Gauge, Thermometer, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CurrentWeather, TemperatureUnit } from "@/types/weather";
import { getWeatherInfo } from "@/lib/weatherCodes";
import { compassDirection, formatTemp } from "@/lib/weatherUtils";

interface WeatherDetailsProps {
  current: CurrentWeather;
  unit: TemperatureUnit;
}

function DetailCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
      <div className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
        <Icon className="size-4 text-accent" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function WeatherDetails({ current, unit }: WeatherDetailsProps) {
  const info = getWeatherInfo(current.weatherCode, current.isDay);
  return (
    <section aria-label="Weather details" className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <DetailCard icon={Droplets} label="Humidity" value={`${Math.round(current.humidity)}%`} />
      <DetailCard icon={Wind} label="Wind" value={`${Math.round(current.windSpeed)} km/h`} />
      <DetailCard icon={CloudRain} label="Precipitation" value={`${current.precipitation} mm`} />
      <DetailCard
        icon={Thermometer}
        label="Feels Like"
        value={formatTemp(current.apparentTemperature, unit)}
      />
      <DetailCard
        icon={Compass}
        label="Wind Direction"
        value={compassDirection(current.windDirection)}
      />
      <DetailCard icon={Gauge} label="Condition" value={info.label} />
    </section>
  );
}
