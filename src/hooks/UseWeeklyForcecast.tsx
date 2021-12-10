import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forecasts } from '../misc/meteo-mock';
import { Day } from '../model/Day';
import { Forecast } from '../model/Forecast';

const mapForecastToDay = (forecast: Forecast): Day => {
  return {
    weather: forecast.weather.description.toLowerCase().replace(' ', '-'),
    temperature: forecast.temp,
    unit: 'celsius',
    date: new Date(forecast.valid_date).toLocaleString('fr-FR', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
};

const useWeeklyForecast = (lat: string, lon: string): Day[] => {
  const navigate = useNavigate();

  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    if (lat == '' || lon == '') {
      navigate('/');
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
      params: { lat, lon },
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': '746af305a0mshaa29d35974425cdp1b5a4djsndf18ecf5f0a5',
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        const forecasts: Day[] = response.data.data
          .splice(0, 7)
          .map((forecast: Forecast) => mapForecastToDay(forecast));
        setDays(forecasts);
      })
      .catch(() => {
        setDays(forecasts.map((forecast) => mapForecastToDay(forecast)));
      });
  }, []);

  return days;
};

export default useWeeklyForecast;
