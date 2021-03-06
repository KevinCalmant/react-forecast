import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import GeolocContext from "../contexts/GeolocContext";

const AutoCompleteInput = () => {
  const navigate = useNavigate();

  const geolocContext = useContext(GeolocContext);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });

  const [error, setError] = useState("");

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(async ({ lat, lng }) => {
          geolocContext.lat = lat.toString();
          geolocContext.lon = lng.toString();
          geolocContext.location = description;
          navigate("/week");
        })
        .catch(() => {
          setError("Une erreur est survenue veuillez réessayer plus tard");
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion: google.maps.places.AutocompletePrediction) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        geolocContext.lat = position.coords.latitude.toString();
        geolocContext.lon = position.coords.longitude.toString();

        getGeocode({
          location: {
            lat: +geolocContext.lat,
            lng: +geolocContext.lon,
          },
        }).then((results) => {
          if (results.length) {
            setValue((geolocContext.location = results[0].formatted_address));
          }
        });
      }
    });
  }, []);

  return (
    <div className='auto-complete'>
      <div className='input-icon-wrap'>
        <div className='input-icon'>
          <span className='icon-location'></span>
        </div>
        <input
          type='text'
          className='input-with-icon'
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
      </div>
      {error && (
        <div className='error'>
          <span>{error}</span>
        </div>
      )}
      <div className='suggestions'>
        {status === "OK" && (
          <ul className='suggestion-list'>{renderSuggestions()}</ul>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteInput;
