
import { useEffect, useState } from 'react';
// import './App.css';
import cssmod from './App.module.css';
import Clear from './background/clear.jpg';
import Cloudy from './background/cloudy.jpg';
import Snow from './background/snow.jpg';
import Overcast from './background/overcast.jpg';
import Rainy from './background/rainy.jpg';
import SearchIcon from '@mui/icons-material/Search';

function App() {

  const [place,setPlace] = useState('New Delhi');
  const [placeInfo , setPlaceInfo] = useState({});

   useEffect(() =>{
    handleFetch();
  } , [])
  
  //Fetching data from weather Api
  const handleFetch = ()=>{
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=94a3316d890b489d968163829222211&q=${place}&days=1&aqi=no&alerts=no`)
    .then((response) => response.json())
    .then((data) => 
    //  console.log(data)
    setPlaceInfo(
      {
      name : data.location.name,
      country : data.location.country,
      celcius : {
        current : data.current.temp_c,
        high : data.forecast.forecastday[0].day.maxtemp_c,
        low : data.forecast.forecastday[0].day.mintemp_c,
        pressure : data.current.pressure_mb,
        humidity : data.current.humidity,
        wind : data.current.wind_mph
      },

      condition : data.current.condition.text

    }
    )
    );

    setPlace('');
  }

  //console.log(placeInfo)
  return (
    <div className={cssmod.app} 
    style= {
            placeInfo.condition?.toLowerCase() === "clear" || 
            placeInfo.condition?.toLowerCase() === "sunny"
             ? {backgroundImage: `url(${Clear})`} 
             :  placeInfo.condition?.includes('cloudy') 
             ? {backgroundImage: `url(${Cloudy})`}
             : placeInfo.condition?.toLowerCase().includes('rainy')
             ? {backgroundImage: `url(${Rainy})`}
             : placeInfo.condition?.toLowerCase().includes('snow') 
             ? {backgroundImage: `url(${Snow})`}
             : {backgroundImage: `url(${Overcast})`}
            }
    >

      <div className={cssmod.searchinput}>
      <input type='text' value={place} onChange={(e) => setPlace(e.target.value)} />
      <SearchIcon onClick={handleFetch} fontSize="large" className={cssmod.searchbtn}/>
      </div>

      <div className={cssmod.weathercontainer}>
        <div className={cssmod.toppart}>
          <h1>{placeInfo.celcius?.current}° C</h1>

          <div className={cssmod.conditionhighlow}>
            <h1>{placeInfo.condition}</h1>
            <h1>Max : {placeInfo.celcius?.high}° C</h1>
            <h1>Min : {placeInfo.celcius?.low}° C</h1>
          </div>
        </div>

        <h2>{placeInfo.name}, {placeInfo.country}</h2>
        
        <div className={cssmod.lowerpart}>
            <h1>humidity : {placeInfo.celcius?.humidity}</h1>
            <h1>Pressure (mb) : {placeInfo.celcius?.pressure}</h1>
            <h1>Wind (mph) : {placeInfo.celcius?.wind}</h1>
        </div>
      </div>  
    </div>
  );
}

export default App;
