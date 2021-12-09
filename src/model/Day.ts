export type Unit = 'celsius' | 'farhenheit';

export interface Day {
  weather: string;
  temperature: string;
  unit: Unit;
  date: string;
}
