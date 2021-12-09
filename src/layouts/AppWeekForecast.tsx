import axios, { AxiosRequestConfig } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { forecasts } from '../misc/meteo-mock';
import GeolocContext from '../contexts/GeolocContext';
import { Day, Unit } from '../model/Day';
import { Forecast } from '../model/Forecast';
import { Link } from 'react-router-dom';

const AppWeekForecast = () => {
  const navigate = useNavigate();

  const geolocContext = useContext(GeolocContext);

  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getUnitSymbol = (unit: Unit): string => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  const handleActive = (date: string): void => {
    geolocContext.date = date;
    navigate('/day');
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
      {loading ? (
        <>
          <h1 className='week-title skeleton'></h1>
          <div className='days'>
            {[0, 1, 2, 3, 4, 5, 6].map((mock) => {
              return <div className='day skeleton' key={mock}></div>;
            })}
          </div>
        </>
      ) : (
        <>
          <h1 className='week-title'>
            <span className={'icon-location ' + (loading && 'skeleton')}></span>
            {geolocContext.location}
            <Link className='back-button' to='/'>
              <span className='icon-undo'></span>
            </Link>
          </h1>
          <div className='days'>
            {days.map((day) => {
              return (
                <div
                  className='day'
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
        </>
      )}
    </div>
  );
};

export default AppWeekForecast;
