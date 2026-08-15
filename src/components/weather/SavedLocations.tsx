import { Clock, Star, X } from "lucide-react";
import type { StoredLocation } from "@/types/weather";

interface SavedLocationsProps {
  title: string;
  variant: "recent" | "favorite";
  items: StoredLocation[];
  onSelect: (loc: StoredLocation) => void;
  onRemove: (id: string) => void;
}

export function SavedLocations({ title, variant, items, onSelect, onRemove }: SavedLocationsProps) {
  if (items.length === 0) return null;
  const Icon = variant === "recent" ? Clock : Star;

  return (
    <section aria-label={title} className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((loc) => (
          <li key={loc.id} className="glass flex items-center rounded-full pr-1 pl-3">
            <button
              type="button"
              onClick={() => onSelect(loc)}
              className="focus-ring flex items-center gap-2 rounded-full py-2 pr-2 text-sm text-foreground"
            >
              <Icon
                className={`size-3.5 ${variant === "favorite" ? "fill-warning text-warning" : "text-accent"}`}
                aria-hidden="true"
              />
              {loc.name}
              <span className="text-muted-foreground">{loc.country}</span>
            </button>
            <button
              type="button"
              onClick={() => onRemove(loc.id)}
              aria-label={`Remove ${loc.name}`}
              className="focus-ring rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
