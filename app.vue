<script setup>
  import  { fetchData, fetchWeather } from "./src/services/openWeatherAPI"

  const tipedCity = ref();
  const tipedState = ref();
  const loadedCity = ref();
  const loadadedWeather = ref();

  const loadCountry = async () => {
    const data = await fetchData(tipedCity.value, tipedState.value);
    loadedCity.value = data;
    console.log(loadedCity.value);

    loadWeather();
  }

  const loadWeather = async () => {
    const data = await fetchWeather(loadedCity.value[0].lat, loadedCity.value[0].lon)
    loadadedWeather.value = data;
    console.log(Math.ceil(temperatureConvert(loadadedWeather.value.main.temp)))
  }

  const temperatureConvert = (temp) => {
    return (temp - 273.15)
  }

</script>

<template>
  <div>
    <label for="">City name</label>
    <input v-model="tipedCity" type="text">
    <label for="">Estado</label>
    <input v-model="tipedState" type="text">
    <button @click="loadCountry()">pesquisar</button>
    <p v-if="loadadedWeather">{{ Math.ceil(temperatureConvert( loadadedWeather.main.temp))}}°C</p>

  </div>
</template>

<style lang="scss">

</style>
