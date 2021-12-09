import { Forecast } from '../model/Forecast';

export const forecasts: Forecast[] = [
  {
    weather: {
      description: 'light-rain',
    },
    temp: '5.9',
    valid_date: new Date('12/09/2021'),
  },
  {
    weather: {
      description: 'heavy-rain',
    },
    temp: '9.1',
    valid_date: new Date('12/10/2021'),
  },
  {
    weather: {
      description: 'overcast-clouds',
    },
    temp: '7.5',
    valid_date: new Date('12/11/2021'),
  },
  {
    weather: {
      description: 'broken-clouds',
    },
    temp: '8.1',
    valid_date: new Date('12/12/2021'),
  },
  {
    weather: {
      description: 'few-clouds',
    },
    temp: '8.3',
    valid_date: new Date('12/13/2021'),
  },
  {
    weather: {
      description: 'few-clouds',
    },
    temp: '7.7',
    valid_date: new Date('12/14/2021'),
  },
  {
    weather: {
      description: 'few-clouds',
    },
    temp: '7.7',
    valid_date: new Date('12/15/2021'),
  },
];
