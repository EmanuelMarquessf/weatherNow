import { apiKey } from "../config/config";
export async function fetchData(tipedCity, country){
  const data = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${tipedCity},${country}&limit=10&appid=03a697de3ffb3a5a79da8c382631b852`)
  .then(response => response.json())
  console.log(country)
  return data;
}


export async function fetchWeather(lat, lon){
  const data = 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=03a697de3ffb3a5a79da8c382631b852`)
  .then(response => response.json())
  console.log(data)
  return data

}