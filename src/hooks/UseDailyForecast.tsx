import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { forecasts } from '../misc/meteo-mock';
import { Day } from '../model/Day';
import { Forecast } from '../model/Forecast';

const mapForecastToDay = (forecast: Forecast | undefined): Day | undefined => {
  if (forecast) {
    return {
      weather: forecast.weather.description,
      temperature: forecast.temp,
      unit: 'celsius',
      date: forecast.valid_date.toDateString(),
      maxTemp: forecast.max_temp,
      minTemp: forecast.min_temp,
      ozone: forecast.ozone,
      windDir: forecast.wind_dir,
      windSpd: forecast.wind_gust_spd,
      dewpt: forecast.dewpt,
    };
  }
};
const useDailyForcast = (lat: string, lon: string): Day | undefined => {
  const [day, setDay] = useState<Day | undefined>(
    mapForecastToDay(forecasts[0])
  );

  useEffect(() => {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
      params: { lon, lat },
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': '746af305a0mshaa29d35974425cdp1b5a4djsndf18ecf5f0a5',
      },
    };

    axios.request(options).then((response) => {});
  }, []);

  return day;
};

export default useDailyForcast;
