export type Unit = 'celsius' | 'farhenheit';

export interface Day {
  weather: string;
  temperature: string;
  unit: Unit;
  date: string;
  maxTemp?: number;
  minTemp?: number;
  ozone?: number;
  windDir?: string;
  windSpd?: number;
  dewpt?: number;
}
