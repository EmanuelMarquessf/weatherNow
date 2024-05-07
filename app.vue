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
  <main>
    <div class="formContainer flexRow">
      <div id="cityInput"class="inputContainer flexCol">
        <label for="">City name</label>
        <input v-model="tipedCity" type="text">
      </div>
      <div id="stateInput" class="inputContainer flexCol">
        <label for="">Estado</label>
        <input v-model="tipedState" type="text">
      </div>
      <button @click="loadCountry()"><img src="/icons/search.svg" alt=""></button>
    </div>
    <span v-if="loadadedWeather">{{ Math.ceil(temperatureConvert( loadadedWeather.main.temp))}}°C</span>
    <span v-else>Escolha sua localização!</span>
  </main>
</template>

<style scoped lang="scss">
@import './src/styles/_colors';

main{
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 4rem;
  background-color: $windowColor;
  font-family: sans-serif;
  border-radius: 15px;
  gap: 4rem;
  span{
    font-size: larger;
    text-align: center
  }
  .formContainer{
    gap: 1rem;
    justify-content: space-between;
    align-items: end;
    .inputContainer{
      gap:0.5rem;
      label{
        font-size: medium;
      }
      input{
        padding: 0.5rem;
        font-size: x-large;
        color: #2a2a2a;
      }
    }
    #cityInput{
      width: 90%;
    }
    #stateInput{
      width: 10%;
    }
    button{
      padding: 0rem 0.5rem;
      height: 50px;
      font-size: medium;
    }
  }
}

.flexCol{
  display: flex;
  flex-direction: column;
}
.flexRow{
  display: flex;
  flex-direction: row;
}
</style>
