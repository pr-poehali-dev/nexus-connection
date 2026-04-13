export interface WeatherData {
  temp: number;
  windspeed: number;
  humidity: number;
  weathercode: number;
  city: string;
  lat: number;
  lon: number;
  hourly: { time: string; temp: number; code: number }[];
}

export interface GeoResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export function getWeatherInfo(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Ясно", icon: "Sun" };
  if (code <= 3) return { label: "Облачно", icon: "Cloud" };
  if (code <= 67) return { label: "Осадки", icon: "CloudRain" };
  if (code <= 77) return { label: "Снег", icon: "Snowflake" };
  if (code <= 99) return { label: "Гроза", icon: "CloudLightning" };
  return { label: "Переменно", icon: "CloudSun" };
}

export async function fetchWeatherData(name: string, lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,temperature_2m,weathercode&timezone=auto&forecast_days=2`;
  const res = await fetch(url);
  const data = await res.json();
  const hour = new Date().getHours();
  const hourly = Array.from({ length: 24 }, (_, i) => ({
    time: data.hourly.time[hour + i] ?? "",
    temp: Math.round(data.hourly.temperature_2m[hour + i] ?? 0),
    code: data.hourly.weathercode[hour + i] ?? 0,
  })).filter((h) => h.time);
  return {
    temp: Math.round(data.current_weather.temperature),
    windspeed: Math.round(data.current_weather.windspeed),
    humidity: data.hourly.relativehumidity_2m[hour] ?? 60,
    weathercode: data.current_weather.weathercode,
    city: name,
    lat,
    lon,
    hourly,
  };
}

export async function searchGeo(query: string): Promise<GeoResult[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=ru`
  );
  const data = await res.json();
  return data.results ?? [];
}
