import { Navigation } from "lucide-react";
import { compassDirection } from "@/lib/weatherUtils";

interface WindCardProps {
  speed: number;
  direction: number;
}

export function WindCard({ speed, direction }: WindCardProps) {
  return (
    <section aria-label="Wind information" className="glass rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-foreground">Wind</h3>
      <div className="mt-4 flex items-center gap-6">
        <div
          className="relative flex size-24 items-center justify-center rounded-full border border-border"
          role="img"
          aria-label={`Wind blowing from ${compassDirection(direction)}, ${Math.round(direction)} degrees`}
        >
          <span className="absolute top-1 text-[10px] text-muted-foreground">N</span>
          <span className="absolute bottom-1 text-[10px] text-muted-foreground">S</span>
          <span className="absolute left-1.5 text-[10px] text-muted-foreground">W</span>
          <span className="absolute right-1.5 text-[10px] text-muted-foreground">E</span>
          <Navigation
            className="size-8 text-accent transition-transform duration-500"
            style={{ transform: `rotate(${direction + 180}deg)` }}
            aria-hidden="true"
          />
        </div>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Speed</dt>
            <dd className="text-lg font-semibold text-foreground">{Math.round(speed)} km/h</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Direction</dt>
            <dd className="text-lg font-semibold text-foreground">
              {compassDirection(direction)} · {Math.round(direction)}°
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
