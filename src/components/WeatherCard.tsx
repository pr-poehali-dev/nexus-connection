import Icon from "@/components/ui/icon";
import { WeatherData, getWeatherInfo } from "@/components/Hero";

interface Props {
  weather: WeatherData;
  info: { label: string; icon: string };
  compact?: boolean;
  onRemove?: () => void;
}

export default function WeatherCard({ weather, info, compact, onRemove }: Props) {
  return (
    <div className={`relative ${compact ? "p-4" : "p-6"}`}>
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
        >
          <Icon name="X" size={14} />
        </button>
      )}
      <div className={`flex items-center justify-center gap-3 ${compact ? "mb-1" : "mb-2"}`}>
        <Icon name={info.icon as "Sun"} size={compact ? 22 : 32} className="text-white" />
        <span className={`font-bold text-white ${compact ? "text-3xl" : "text-5xl"}`}>
          {weather.temp}°C
        </span>
      </div>
      <p className={`opacity-80 text-white uppercase tracking-wider ${compact ? "text-xs mb-3" : "text-sm mb-4"}`}>
        {info.label} · {weather.city}
      </p>
      <div className={`flex justify-center gap-6 text-white/60 ${compact ? "text-xs" : "text-sm"}`}>
        <div className="flex items-center gap-1.5">
          <Icon name="Wind" size={compact ? 12 : 14} />
          <span>{weather.windspeed} км/ч</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon name="Droplets" size={compact ? 12 : 14} />
          <span>{weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
}

export { getWeatherInfo };
