import { createContext } from 'react';

const GeolocContext = createContext({
  lat: '',
  lon: '',
  location: '',
  date: '',
});

export default GeolocContext;
