import type { GeoLocation, StoredLocation, TemperatureUnit } from "@/types/weather";

export function toUnit(celsius: number, unit: TemperatureUnit): number {
  return unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  return `${Math.round(toUnit(celsius, unit))}°`;
}

export function compassDirection(degrees: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round((((degrees % 360) + 360) % 360) / 22.5) % 16] as string;
}

export function formatTimeInZone(iso: string, timezone: string): string {
  if (!iso) return "--:--";
  const date = iso.length <= 16 ? new Date(`${iso}:00`) : new Date(iso);
  if (Number.isNaN(date.getTime())) return "--:--";
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone,
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
  }
}

/** Open-Meteo returns local-time strings for the location; render them as-is. */
export function formatLocalHour(iso: string): string {
  const date = new Date(iso.length <= 16 ? `${iso}:00` : iso);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(date);
}

export function formatLocalClock(iso: string): string {
  const date = new Date(iso.length <= 16 ? `${iso}:00` : iso);
  if (Number.isNaN(date.getTime())) return "--:--";
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
}

export function formatDayName(dateStr: string, index: number): string {
  if (index === 0) return "Today";
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export function relativeTime(timestamp: number, now: number = Date.now()): string {
  const diff = Math.max(0, Math.floor((now - timestamp) / 1000));
  if (diff < 60) return "Updated just now";
  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `Updated ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
}

export function locationLabel(loc: { admin1?: string | undefined; country: string }): string {
  return [loc.admin1, loc.country].filter(Boolean).join(", ");
}

export function toStored(loc: GeoLocation): StoredLocation {
  return {
    id: loc.id,
    name: loc.name,
    admin1: loc.admin1,
    country: loc.country,
    countryCode: loc.countryCode,
    latitude: loc.latitude,
    longitude: loc.longitude,
    timezone: loc.timezone,
  };
}

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export const STORAGE_KEYS = {
  unit: "weather.unit",
  recent: "weather.recent",
  favorites: "weather.favorites",
  last: "weather.last",
} as const;
