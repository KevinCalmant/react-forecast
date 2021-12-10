import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import GeolocContext from '../contexts/GeolocContext';
import { Unit } from '../model/Day';
import { Link } from 'react-router-dom';
import useWeeklyForecast from '../hooks/UseWeeklyForcecast';

const AppWeekForecast = () => {
  const navigate = useNavigate();
  const geolocContext = useContext(GeolocContext);
  const days = useWeeklyForecast(geolocContext.lat, geolocContext.lon);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (days != null) {
      setLoading(false);
    }
  }, []);

  const getUnitSymbol = (unit: Unit): string => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  const handleActive = (date: string): void => {
    geolocContext.date = date;
    navigate('/day');
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
