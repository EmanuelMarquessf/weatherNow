export async function fetchData(tipedCity, state){
  const data = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${tipedCity},${state},BR&limit=10&appid=03a697de3ffb3a5a79da8c382631b852`)
  .then(response => response.json())
  console.log(state)
  return data;
}

export async function fetchWeather(lat, lon){
  const data = 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=03a697de3ffb3a5a79da8c382631b852`)
  .then(response => response.json())
  return data

}