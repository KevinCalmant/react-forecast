import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GeolocContext from '../contexts/GeolocContext';

const AppDayForecast = () => {
  const geolocContext = useContext(GeolocContext);

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
        <p>Test</p>
      </div>
    </div>
  );
};

export default AppDayForecast;
