export type TemperatureUnit = "C" | "F";

export interface GeoLocation {
  id: string;
  name: string;
  admin1?: string;
  country: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  isDay: boolean;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  isDay: boolean;
}

export interface DailyWeather {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
  precipitationProbability: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherResponse {
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  fetchedAt: number;
}

export interface StoredLocation {
  id: string;
  name: string;
  admin1?: string;
  country: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export type RecentLocation = StoredLocation;
export type FavoriteLocation = StoredLocation;
