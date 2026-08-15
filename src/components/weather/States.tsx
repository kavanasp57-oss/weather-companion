import { CloudOff, CloudSun, Loader2 } from "lucide-react";

export function WeatherLoading() {
  return (
    <section aria-live="polite" className="space-y-4">
      <div className="glass flex items-center gap-3 rounded-3xl p-8">
        <Loader2 className="size-5 animate-spin text-accent" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">Fetching weather...</p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass h-24 animate-pulse rounded-2xl" />
        ))}
      </div>
      <div className="glass h-40 animate-pulse rounded-3xl" />
    </section>
  );
}

export function WeatherErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section role="alert" className="glass animate-rise rounded-3xl p-8 text-center">
      <CloudOff className="mx-auto size-12 text-muted-foreground" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold text-foreground">Weather unavailable</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="focus-ring mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Try Again
      </button>
    </section>
  );
}

export function EmptyWeatherState() {
  return (
    <section className="glass animate-rise relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
      <div className="weather-aura" aria-hidden="true" />
      <div className="relative">
        <CloudSun
          className="mx-auto size-20 text-accent drop-shadow-[0_0_28px_var(--accent-glow)]"
          aria-hidden="true"
        />
        <h2 className="mt-6 text-2xl font-semibold text-foreground sm:text-3xl">
          What&apos;s the weather like?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Search for a city or use your current location to get live weather information.
        </p>
      </div>
    </section>
  );
}
