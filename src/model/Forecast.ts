export interface Forecast {
  weather: {
    description: string;
  };
  temp: string;
  valid_date: Date;
  max_temp?: number;
  min_temp?: number;
  ozone?: number;
  wind_dir?: string;
  wind_gust_spd?: number;
  dewpt?: number;
}
