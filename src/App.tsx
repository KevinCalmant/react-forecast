import { Route, Routes } from 'react-router';
import './App.scss';
import AppWeekForecast from './layouts/AppWeekForecast';
import AppSearchCity from './layouts/AppSearchCity';
import AppDayForecast from './layouts/AppDayForecast';

function App() {
  return (
    <div className='meteo-container'>
      <Routes>
        <Route path='/' element={<AppSearchCity />}></Route>
        <Route path='/week' element={<AppWeekForecast />}></Route>
        <Route path='/day' element={<AppDayForecast />}></Route>
      </Routes>
    </div>
  );
}

export default App;
