import Icon from "@/components/ui/icon";
import { getWeatherInfo } from "@/components/Hero";

interface HourlyItem {
  time: string;
  temp: number;
  code: number;
}

interface Props {
  hourly: HourlyItem[];
}

export default function HourlyForecast({ hourly }: Props) {
  if (!hourly.length) return (
    <div className="p-6 text-white/50 text-sm text-center">Нет данных</div>
  );

  const maxTemp = Math.max(...hourly.map((h) => h.temp));
  const minTemp = Math.min(...hourly.map((h) => h.temp));

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex gap-3 min-w-max pb-1">
        {hourly.map((h, i) => {
          const info = getWeatherInfo(h.code);
          const date = new Date(h.time);
          const hour = date.getHours();
          const heightPct = maxTemp === minTemp
            ? 50
            : Math.round(((h.temp - minTemp) / (maxTemp - minTemp)) * 60 + 20);

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 w-12"
            >
              <span className="text-white/50 text-xs">{hour}:00</span>
              <Icon name={info.icon as "Sun"} size={16} className="text-white/80" />
              <div className="flex flex-col items-center justify-end h-16">
                <div
                  className="w-1.5 bg-white/40 rounded-full"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="text-white text-xs font-medium">{h.temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
