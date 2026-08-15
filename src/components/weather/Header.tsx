import { CloudSun, MapPin } from "lucide-react";

interface HeaderProps {
  onUseLocation: () => void;
  locating: boolean;
}

export function Header({ onUseLocation, locating }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="glow-ring flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
          <CloudSun className="size-6 text-primary-foreground" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-xl font-semibold tracking-[0.2em] text-foreground">WEATHER</h1>
          <p className="text-xs text-muted-foreground">Live weather, wherever you are.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onUseLocation}
        disabled={locating}
        className="glass focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card/80 disabled:opacity-60"
      >
        <MapPin className="size-4" aria-hidden="true" />
        {locating ? "Locating..." : "Use My Location"}
      </button>
    </header>
  );
}
