import { Sunrise, Sunset } from "lucide-react";
import { formatLocalClock } from "@/lib/weatherUtils";

interface SunriseSunsetProps {
  sunrise: string;
  sunset: string;
}

export function SunriseSunset({ sunrise, sunset }: SunriseSunsetProps) {
  return (
    <section aria-label="Sunrise and sunset" className="glass rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-foreground">Sun</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-warning/15">
            <Sunrise className="size-5 text-warning" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Sunrise</p>
            <p className="text-lg font-semibold text-foreground">{formatLocalClock(sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-accent/15">
            <Sunset className="size-5 text-accent" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Sunset</p>
            <p className="text-lg font-semibold text-foreground">{formatLocalClock(sunset)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
