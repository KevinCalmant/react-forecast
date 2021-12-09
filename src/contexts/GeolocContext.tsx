import { createContext } from 'react';

const GeolocContext = createContext({
  lat: '',
  lon: '',
  location: '',
});

export default GeolocContext;
