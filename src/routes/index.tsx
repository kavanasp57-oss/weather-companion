import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/weather/Header";
import { SearchBar } from "@/components/weather/SearchBar";
import { UnitToggle } from "@/components/weather/UnitToggle";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { WeatherDetails } from "@/components/weather/WeatherDetails";
import { HourlyForecast } from "@/components/weather/HourlyForecast";
import { DailyForecast } from "@/components/weather/DailyForecast";
import { SunriseSunset } from "@/components/weather/SunriseSunset";
import { WindCard } from "@/components/weather/WindCard";
import { SavedLocations } from "@/components/weather/SavedLocations";
import { EmptyWeatherState, WeatherErrorCard, WeatherLoading } from "@/components/weather/States";
import { WeatherError, fetchWeather, reverseGeocode, searchLocations } from "@/lib/weatherApi";
import { getWeatherInfo } from "@/lib/weatherCodes";
import {
  STORAGE_KEYS,
  readStorage,
  relativeTime,
  toStored,
  writeStorage,
} from "@/lib/weatherUtils";
import type {
  GeoLocation,
  StoredLocation,
  TemperatureUnit,
  WeatherResponse,
} from "@/types/weather";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Live Weather Dashboard — Real-Time Forecasts" },
      {
        name: "description",
        content:
          "Check live weather, hourly and 7-day forecasts for any city or your current location, powered by Open-Meteo.",
      },
      { property: "og:title", content: "Live Weather Dashboard — Real-Time Forecasts" },
      {
        property: "og:description",
        content:
          "Live conditions, hourly and 7-day forecasts, wind, sunrise and sunset for any city worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeatherPage,
});

function WeatherPage() {
  const [unit, setUnit] = useState<TemperatureUnit>("C");
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [matches, setMatches] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [recent, setRecent] = useState<StoredLocation[]>([]);
  const [favorites, setFavorites] = useState<StoredLocation[]>([]);
  const [now, setNow] = useState(() => Date.now());

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setUnit(readStorage<TemperatureUnit>(STORAGE_KEYS.unit, "C"));
    setRecent(readStorage<StoredLocation[]>(STORAGE_KEYS.recent, []));
    setFavorites(readStorage<StoredLocation[]>(STORAGE_KEYS.favorites, []));
    const last = readStorage<StoredLocation | null>(STORAGE_KEYS.last, null);
    if (last) void load(last, false);
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const changeUnit = useCallback((next: TemperatureUnit) => {
    setUnit(next);
    writeStorage(STORAGE_KEYS.unit, next);
  }, []);

  const rememberRecent = useCallback((loc: GeoLocation) => {
    setRecent((prev) => {
      const next = [toStored(loc), ...prev.filter((r) => r.id !== loc.id)].slice(0, 5);
      writeStorage(STORAGE_KEYS.recent, next);
      return next;
    });
  }, []);

  const load = useCallback(
    async (loc: GeoLocation | StoredLocation, remember = true) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      setError(null);
      setNotice(null);
      setMatches([]);
      setLocation(loc);
      writeStorage(STORAGE_KEYS.last, toStored(loc));
      if (remember) rememberRecent(loc);
      try {
        const data = await fetchWeather(loc.latitude, loc.longitude, controller.signal);
        setWeather(data);
      } catch (err) {
        if (controller.signal.aborted) return;
        setWeather(null);
        setError(
          err instanceof WeatherError
            ? err.message
            : "We couldn't retrieve weather data for this location.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    },
    [rememberRecent],
  );

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setNotice("Please enter a city name.");
        return;
      }
      if (loading) return;
      setLoading(true);
      setError(null);
      setNotice(null);
      setMatches([]);
      try {
        const results = await searchLocations(query);
        if (results.length > 1) {
          setMatches(results);
          setLoading(false);
          return;
        }
        setLoading(false);
        await load(results[0] as GeoLocation);
      } catch (err) {
        setLoading(false);
        setNotice(
          err instanceof WeatherError ? err.message : "Location not found. Try another city.",
        );
      }
    },
    [load, loading],
  );

  const handleUseLocation = useCallback(() => {
    setNotice(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setNotice("Location access was not available. Search for a city to see its weather.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const loc = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
          await load(loc);
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setNotice("Location access was not available. Search for a city to see its weather.");
      },
      { timeout: 10_000, maximumAge: 300_000 },
    );
  }, [load]);

  const toggleFavorite = useCallback(() => {
    if (!location) return;
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === location.id);
      const next = exists
        ? prev.filter((f) => f.id !== location.id)
        : [...prev, toStored(location)];
      writeStorage(STORAGE_KEYS.favorites, next);
      return next;
    });
  }, [location]);

  const removeRecent = useCallback((id: string) => {
    setRecent((prev) => {
      const next = prev.filter((r) => r.id !== id);
      writeStorage(STORAGE_KEYS.recent, next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      writeStorage(STORAGE_KEYS.favorites, next);
      return next;
    });
  }, []);

  const category = useMemo(
    () =>
      weather ? getWeatherInfo(weather.current.weatherCode, weather.current.isDay).category : "clear",
    [weather],
  );

  const updatedLabel = weather ? relativeTime(weather.fetchedAt, now) : "";
  const isFavorite = Boolean(location && favorites.some((f) => f.id === location.id));

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background" data-weather={category}>
      <div className="sky-backdrop" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Header onUseLocation={handleUseLocation} locating={locating} />

        <SearchBar
          onSearch={(q) => void handleSearch(q)}
          onUseLocation={handleUseLocation}
          loading={loading}
          locating={locating}
          matches={matches}
          onPickMatch={(loc) => void load(loc)}
        />

        {notice ? (
          <p role="status" className="glass rounded-2xl px-4 py-3 text-sm text-muted-foreground">
            {notice}
          </p>
        ) : null}

        <div className="flex items-center justify-end">
          <UnitToggle unit={unit} onChange={changeUnit} />
        </div>

        <main className="flex flex-col gap-8">
          {loading && !weather ? <WeatherLoading /> : null}

          {!loading && error ? (
            <WeatherErrorCard
              message={error}
              onRetry={() => {
                if (location) void load(location, false);
              }}
            />
          ) : null}

          {!loading && !error && !weather ? <EmptyWeatherState /> : null}

          {weather && location && !error ? (
            <>
              <CurrentWeatherCard
                location={location}
                weather={weather}
                unit={unit}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onRefresh={() => void load(location, false)}
                refreshing={loading}
                updatedLabel={updatedLabel}
              />
              <WeatherDetails current={weather.current} unit={unit} />
              <HourlyForecast hours={weather.hourly} unit={unit} />
              <DailyForecast days={weather.daily} unit={unit} />
              <div className="grid gap-4 lg:grid-cols-2">
                <SunriseSunset
                  sunrise={weather.daily[0]?.sunrise ?? ""}
                  sunset={weather.daily[0]?.sunset ?? ""}
                />
                <WindCard
                  speed={weather.current.windSpeed}
                  direction={weather.current.windDirection}
                />
              </div>
            </>
          ) : null}

          <SavedLocations
            title="Recent Searches"
            variant="recent"
            items={recent}
            onSelect={(loc) => void load(loc)}
            onRemove={removeRecent}
          />
          <SavedLocations
            title="Favorite Locations"
            variant="favorite"
            items={favorites}
            onSelect={(loc) => void load(loc)}
            onRemove={removeFavorite}
          />
        </main>

        <footer className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Live Weather Dashboard</p>
          <p className="mt-1">Powered by Open-Meteo</p>
          <p className="mt-1">© 2026 Weather App</p>
        </footer>
      </div>
    </div>
  );
}
