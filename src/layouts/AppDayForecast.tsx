import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeolocContext from '../contexts/GeolocContext';
import useDailyForcast from '../hooks/UseDailyForecast';

const AppDayForecast = () => {
  const geolocContext = useContext(GeolocContext);
  const day = useDailyForcast(geolocContext.lat, geolocContext.lon);

  return (
    <div className='day-forecast'>
      <Link to='/week'>
        <h1 className='day-title'>
          <span className='icon-location'></span>
          {geolocContext.location}
        </h1>
      </Link>
      <h1>
        <span className='icon-calendar'></span>
        {geolocContext.date}
      </h1>
      <div className='day-detail'>
        <h4>
          <span className='icon-thermometer'></span>Températures
        </h4>
        <div className='temperature-detail'>
          <p>{`Minima : ${day?.minTemp} °C`}</p>
          <p>{`Maxima : ${day?.maxTemp} °C`}</p>
        </div>
      </div>
    </div>
  );
};

export default AppDayForecast;
