import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Icon from "@/components/ui/icon";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import CityCompare from "@/components/CityCompare";
import { fetchWeatherData, searchGeo, getWeatherInfo, WeatherData, GeoResult } from "@/lib/weather";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"now" | "hourly" | "compare">("now");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      setGeoLoading(true);
      try {
        const results = await searchGeo(value);
        setSuggestions(results);
      } finally {
        setGeoLoading(false);
      }
    }, 350);
  }, []);

  async function selectCity(geo: GeoResult) {
    setSuggestions([]);
    setQuery(`${geo.name}${geo.admin1 ? `, ${geo.admin1}` : ""}, ${geo.country}`);
    setLoading(true);
    try {
      const w = await fetchWeatherData(geo.name, geo.latitude, geo.longitude);
      setWeather(w);
      setTab("now");
    } finally {
      setLoading(false);
    }
  }

  const info = weather ? getWeatherInfo(weather.weathercode) : null;

  return (
    <div ref={container} className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img
          src="/images/mountain-landscape.jpg"
          alt="Горный пейзаж"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-4 w-full max-w-2xl mx-auto py-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          SKYWATCH
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base opacity-70 mb-10 uppercase tracking-widest"
        >
          Погода в реальном времени
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative"
        >
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Введите название города..."
              className="w-full bg-white/15 backdrop-blur-md border border-white/40 text-white placeholder-white/50 px-5 py-4 text-sm focus:outline-none focus:border-white pr-12"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {geoLoading || loading
                ? <Icon name="Loader2" size={16} className="animate-spin text-white/60" />
                : <Icon name="Search" size={16} className="text-white/40" />
              }
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white z-20 shadow-2xl">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => selectCity(s)}
                  className="w-full text-left px-5 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0 flex items-center gap-2"
                >
                  <Icon name="MapPin" size={14} className="text-neutral-400 shrink-0" />
                  <span className="font-medium">{s.name}</span>
                  {s.admin1 && <span className="text-neutral-400">{s.admin1},</span>}
                  <span className="text-neutral-400">{s.country}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {weather && (
          <motion.div
            key={weather.city}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-white/10 backdrop-blur-md border border-white/25"
          >
            <div className="flex border-b border-white/20">
              {(["now", "hourly", "compare"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex-1 py-2.5 text-xs uppercase tracking-widest transition-colors ${
                    tab === key ? "bg-white/20 text-white" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {key === "now" ? "Сейчас" : key === "hourly" ? "24 часа" : "Сравнить"}
                </button>
              ))}
            </div>

            {tab === "now" && <WeatherCard weather={weather} info={info!} />}
            {tab === "hourly" && <HourlyForecast hourly={weather.hourly} />}
            {tab === "compare" && <CityCompare initialCity={weather} />}
          </motion.div>
        )}
      </div>
    </div>
  );
}
