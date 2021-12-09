import axios, { AxiosRequestConfig } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { forecasts } from '../misc/meteo-mock';
import GeolocContext from '../contexts/GeolocContext';
import { Day, Unit } from '../model/Day';
import { Forecast } from '../model/Forecast';

const AppWeekForecast = () => {
  const navigate = useNavigate();

  const geolocContext = useContext(GeolocContext);

  const [days, setDays] = useState<Day[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    if (geolocContext.lat == '' || geolocContext.lon == '') {
      navigate('/');
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
      params: { lat: geolocContext.lat, lon: geolocContext.lon },
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': '746af305a0mshaa29d35974425cdp1b5a4djsndf18ecf5f0a5',
      },
    };

    axios
      .request(options)
      .then((response) => {
        const forecasts: Day[] = response.data.data
          .splice(0, 7)
          .map((forecast: Forecast) => mapForecastToDay(forecast));
        setDays(forecasts);
      })
      .catch(() => {
        setDays(forecasts.map((forecast) => mapForecastToDay(forecast)));
      });
  }, [geolocContext.lat, geolocContext.lon]);

  const getUnitSymbol = (unit: Unit): string => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  const handleActive = (date: string): void => {
    setSelectedDay(date);
  };

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

  return (
    <div className='week-forecast'>
      <h1>
        <span className='icon-location'></span>
        {geolocContext.location}
      </h1>
      <div className='days'>
        {days.map((day) => {
          return (
            <div
              className={
                'day ' +
                (selectedDay == '' || selectedDay === day.date
                  ? 'active'
                  : 'inactive')
              }
              key={day.date}
              onClick={() => handleActive(day.date)}
            >
              <span className={`icon-${day.weather} weather`}></span>
              <span className='temperature'>{`${
                day.temperature
              }  ${getUnitSymbol(day.unit)}`}</span>
              <span className='date'>{day.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppWeekForecast;
