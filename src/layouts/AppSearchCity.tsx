import AutoCompleteInput from '../components/AutoCompleteInput';

const AppSearchCity = () => {
  return (
    <div className='city-search'>
      <label>
        <h1>Indiquez la ville pour laquelle vous souhaitez la météo :</h1>
        <AutoCompleteInput />
      </label>
    </div>
  );
};

export default AppSearchCity;
