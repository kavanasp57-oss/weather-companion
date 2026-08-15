import type { GeoLocation, WeatherResponse } from "@/types/weather";

export class WeatherError extends Error {
  kind: "network" | "notfound" | "api" | "timeout";
  constructor(kind: WeatherError["kind"], message: string) {
    super(message);
    this.kind = kind;
  }
}

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new WeatherError("api", "Unable to fetch weather right now. Please try again.");
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof WeatherError) throw err;
    if (controller.signal.aborted && !signal?.aborted) {
      throw new WeatherError("timeout", "The request took too long. Please try again.");
    }
    if (signal?.aborted) throw err;
    throw new WeatherError("network", "Check your internet connection and try again.");
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

interface GeoApiResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
}

export async function searchLocations(query: string, signal?: AbortSignal): Promise<GeoLocation[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query.trim(),
  )}&count=5&language=en&format=json`;
  const data = await request<{ results?: GeoApiResult[] }>(url, signal);
  const results = data.results ?? [];
  if (results.length === 0) {
    throw new WeatherError("notfound", "Location not found. Try another city.");
  }
  return results.map((r) => ({
    id: String(r.id),
    name: r.name,
    admin1: r.admin1,
    country: r.country ?? "",
    countryCode: r.country_code,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone ?? "auto",
  }));
}

export async function reverseGeocode(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<GeoLocation> {
  const fallback: GeoLocation = {
    id: `${latitude.toFixed(3)},${longitude.toFixed(3)}`,
    name: "Current Location",
    country: "",
    latitude,
    longitude,
    timezone: "auto",
  };
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;
    const data = await request<{ results?: GeoApiResult[] }>(url, signal);
    const r = data.results?.[0];
    if (!r) return fallback;
    return {
      id: String(r.id),
      name: r.name,
      admin1: r.admin1,
      country: r.country ?? "",
      countryCode: r.country_code,
      latitude,
      longitude,
      timezone: r.timezone ?? "auto",
    };
  } catch {
    return fallback;
  }
}

interface ForecastApi {
  timezone: string;
  current: Record<string, number | string>;
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: (number | null)[];
    is_day: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
    sunrise: string[];
    sunset: string[];
  };
}

const num = (v: unknown): number => (typeof v === "number" && Number.isFinite(v) ? v : 0);

export async function fetchWeather(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,is_day",
    hourly: "temperature_2m,weather_code,precipitation_probability,is_day",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
    timezone: "auto",
    forecast_days: "7",
  });
  const data = await request<ForecastApi>(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
    signal,
  );

  if (!data?.current || !data.hourly?.time || !data.daily?.time) {
    throw new WeatherError("api", "Unable to fetch weather right now. Please try again.");
  }

  const nowIndex = (() => {
    const now = Date.now();
    const idx = data.hourly.time.findIndex((t) => new Date(t).getTime() >= now - 3600_000);
    return idx < 0 ? 0 : idx;
  })();

  const hourly = data.hourly.time.slice(nowIndex, nowIndex + 12).map((time, i) => {
    const k = nowIndex + i;
    return {
      time,
      temperature: num(data.hourly.temperature_2m[k]),
      weatherCode: num(data.hourly.weather_code[k]),
      precipitationProbability: num(data.hourly.precipitation_probability[k]),
      isDay: num(data.hourly.is_day[k]) === 1,
    };
  });

  const daily = data.daily.time.map((date, i) => ({
    date,
    weatherCode: num(data.daily.weather_code[i]),
    maxTemperature: num(data.daily.temperature_2m_max[i]),
    minTemperature: num(data.daily.temperature_2m_min[i]),
    precipitationProbability: num(data.daily.precipitation_probability_max[i]),
    sunrise: data.daily.sunrise[i] ?? "",
    sunset: data.daily.sunset[i] ?? "",
  }));

  return {
    timezone: data.timezone,
    current: {
      time: String(data.current["time"] ?? ""),
      temperature: num(data.current["temperature_2m"]),
      apparentTemperature: num(data.current["apparent_temperature"]),
      humidity: num(data.current["relative_humidity_2m"]),
      precipitation: num(data.current["precipitation"]),
      weatherCode: num(data.current["weather_code"]),
      windSpeed: num(data.current["wind_speed_10m"]),
      windDirection: num(data.current["wind_direction_10m"]),
      isDay: num(data.current["is_day"]) === 1,
    },
    hourly,
    daily,
    fetchedAt: Date.now(),
  };
}
