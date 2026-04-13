import { useState, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData, getWeatherInfo, loadWeather } from "@/components/Hero";

interface GeoResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

interface Props {
  initialCity: WeatherData;
}

export default function CityCompare({ initialCity }: Props) {
  const [cities, setCities] = useState<WeatherData[]>([initialCity]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [addingLoading, setAddingLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchCities = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      setGeoLoading(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}&count=5&language=ru`
        );
        const data = await res.json();
        setSuggestions(data.results ?? []);
      } finally {
        setGeoLoading(false);
      }
    }, 350);
  }, []);

  async function addCity(geo: GeoResult) {
    setSuggestions([]);
    setQuery("");
    if (cities.length >= 4) return;
    if (cities.find((c) => c.city === geo.name)) return;
    setAddingLoading(true);
    try {
      const w = await loadWeather(geo.name, geo.latitude, geo.longitude);
      setCities((prev) => [...prev, w]);
    } finally {
      setAddingLoading(false);
    }
  }

  function removeCity(idx: number) {
    if (idx === 0 && cities.length === 1) return;
    setCities((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="p-4">
      {cities.length < 4 && (
        <div className="relative mb-4">
          <div className="flex gap-2 items-center bg-white/10 border border-white/30 px-3 py-2">
            <Icon name="Plus" size={14} className="text-white/50 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => searchCities(e.target.value)}
              placeholder="Добавить город для сравнения..."
              className="bg-transparent text-white placeholder-white/40 text-xs flex-1 focus:outline-none"
            />
            {(geoLoading || addingLoading) && (
              <Icon name="Loader2" size={13} className="animate-spin text-white/50 shrink-0" />
            )}
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white z-30 shadow-xl">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => addCity(s)}
                  className="w-full text-left px-4 py-2.5 text-xs text-neutral-800 hover:bg-neutral-100 transition-colors border-b border-neutral-100 last:border-0 flex items-center gap-2"
                >
                  <Icon name="MapPin" size={12} className="text-neutral-400 shrink-0" />
                  <span className="font-medium">{s.name}</span>
                  {s.admin1 && <span className="text-neutral-400">{s.admin1},</span>}
                  <span className="text-neutral-400">{s.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={`grid gap-3 ${cities.length === 1 ? "grid-cols-1" : cities.length === 2 ? "grid-cols-2" : cities.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {cities.map((city, i) => (
          <div key={city.city + i} className="bg-white/10 border border-white/20">
            <WeatherCard
              weather={city}
              info={getWeatherInfo(city.weathercode)}
              compact
              onRemove={cities.length > 1 ? () => removeCity(i) : undefined}
            />
          </div>
        ))}
      </div>
      {cities.length >= 4 && (
        <p className="text-white/40 text-xs text-center mt-3">Максимум 4 города</p>
      )}
    </div>
  );
}
