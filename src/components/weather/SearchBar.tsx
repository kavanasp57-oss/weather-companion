import { Loader2, MapPin, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { GeoLocation } from "@/types/weather";
import { locationLabel } from "@/lib/weatherUtils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onUseLocation: () => void;
  loading: boolean;
  locating: boolean;
  matches: GeoLocation[];
  onPickMatch: (loc: GeoLocation) => void;
}

export function SearchBar({
  onSearch,
  onUseLocation,
  loading,
  locating,
  matches,
  onPickMatch,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    onSearch(value);
  }

  return (
    <section aria-label="Search for a location" className="space-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="glass focus-within:glow-ring relative flex flex-1 items-center rounded-2xl px-4 transition-shadow">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="city-search" className="sr-only">
            Search for a city
          </label>
          <input
            id="city-search"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for a city..."
            autoComplete="off"
            className="w-full bg-transparent px-3 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:flex-none"
          >
            {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            Search
          </button>
          <button
            type="button"
            onClick={onUseLocation}
            disabled={locating}
            className="glass focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-card/80 disabled:opacity-60 sm:flex-none"
          >
            <MapPin className="size-4" aria-hidden="true" />
            <span className="whitespace-nowrap">Use My Location</span>
          </button>
        </div>
      </form>

      {matches.length > 1 ? (
        <ul className="glass animate-rise space-y-1 rounded-2xl p-2" aria-label="Matching locations">
          {matches.map((loc) => (
            <li key={`${loc.id}-${loc.latitude}`}>
              <button
                type="button"
                onClick={() => onPickMatch(loc)}
                className="focus-ring flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-card/80"
              >
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                <span>
                  <span className="font-medium">{loc.name}</span>
                  <span className="text-muted-foreground">
                    {locationLabel(loc) ? `, ${locationLabel(loc)}` : ""}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
