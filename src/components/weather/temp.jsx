import React, { useEffect, useState } from 'react'
import WeatherCard from './weatherCard';
import './style.css';

const Temp = () => {
  const [searchValue,setSearchValue] = useState("pune");
  const[tempInfo,setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=902b81f5b1e2c1f5f52cc8bbca541bb6`;

      const res = await fetch(url);
      const data = await res.json();
      const {temp,humidity,pressure} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} =data;      
      const {speed} = data.wind;
      const {country,sunset} = data.sys;

      const myWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        sunset,
        country,
      };
      setTempInfo(myWeatherInfo);
      console.log(country);
      

      
    } catch (error) {
      console.log(error);
      
    }
  };
  
  useEffect(()=>{
    getWeatherInfo();
  },[]);
  return (<>
    <div className="wrap">
      <div className="search">
        <input type="search" placeholder='search ...' id='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="searchTerm" />
        <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
      </div>
    </div>
    
    {/* temp card */}
    <WeatherCard tempInfo={tempInfo}/>
  </>
  )
}

export default Temp
