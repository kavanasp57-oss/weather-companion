import type { TemperatureUnit } from "@/types/weather";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div
      role="group"
      aria-label="Temperature unit"
      className="glass inline-flex items-center rounded-full p-1"
    >
      {(["C", "F"] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={unit === value}
          onClick={() => onChange(value)}
          className={`focus-ring rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            unit === value
              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          °{value}
        </button>
      ))}
    </div>
  );
}
