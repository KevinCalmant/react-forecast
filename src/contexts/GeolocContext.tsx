import { createContext } from 'react';

const GeolocContext = createContext({
  lat: '',
  lon: '',
});

export default GeolocContext;
