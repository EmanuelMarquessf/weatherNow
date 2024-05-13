<script setup>
  import { compileScript } from "vue/compiler-sfc";
import  { fetchData, fetchWeather } from "./src/services/openWeatherAPI"

  const tipedCity = ref();
  const tipedState = ref();
  const loadedCity = ref(0);
  const loadadedWeather = ref();

  const loadCountry = async () => {
    const data = await fetchData(tipedCity.value, tipedState.value);
    loadedCity.value = data;
    console.log(loadedCity.value);
    if (loadedCity.value.length > 0)
      loadWeather();
    else{
      loadedCity.value = 'inv'
    }
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
    <form @submit.prevent="loadCountry()" class="formContainer flexRow">
      <div id="cityInput"class="inputContainer flexCol">
        <label for="">City name</label>
        <input v-model="tipedCity" type="text" required>
      </div>
      <div id="stateInput" class="inputContainer flexCol">
        <label for="stateSelect">State</label>
        <select v-model="tipedState" id="stateSelect" required>
          <option value=""></option>
          <option value="AC">AC</option>
          <option value="AL">AL</option>
          <option value="AP">AP</option>
          <option value="AM">AM</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MT">MT</option>
          <option value="MS">MS</option>
          <option value="MG">MG</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PR">PR</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="RJ">RJ</option>
          <option value="RN">RN</option>
          <option value="RS">RS</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="SC">SC</option>
          <option value="SP">SP</option>
          <option value="SE">SE</option>
          <option value="TO">TO</option>
        </select>
      </div>
      <button type="submit" @click=""><img src="/icons/search.svg" alt=""></button>
    </form>
    <div class="resultContainer flexRow" v-if="loadadedWeather">
      <div class="flexCol">
        <div class="resultItem">
          <strong>Temperatura:</strong> {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp)) }}°C
        </div>
        <div class="resultItem">
          <strong>Mínima:</strong> {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp_min)) }}°C
        </div>
        <div class="resultItem">
          <strong>Máxima:</strong> {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp_max)) }}°C
        </div>
        <div class="resultItem">
          <strong>Sensação Térmica:</strong> {{ Math.ceil(temperatureConvert(loadadedWeather.main.feels_like)) }}°C
        </div>
        <div class="resultItem">
        </div>
      </div>
      <div class="conditionContainer flexCol">
        <strong>{{ loadadedWeather.weather[0].main }}</strong>
        <img :src="'https://openweathermap.org/img/wn/' + loadadedWeather.weather[0].icon + '@2x.png'" alt="Weather Image">
      </div>
    </div>
    <span v-else-if="loadedCity == 'inv'">Invalid Location</span>
    <span v-else>Choose you location!</span>
    
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
      input, select{
        padding: 0.5rem;
        font-size: x-large;
        color: #2a2a2a;
      }
    }
    #cityInput{
      width: 80%;
    }
    #stateInput{
      width: 20%;
    }
    button{
      padding: 0rem 0.5rem;
      height: 50px;
      font-size: medium;
    }
  }
  .resultContainer {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    justify-content:space-between;
  }
  
  .resultItem {
    margin-bottom: 10px;
  }

  .conditionContainer{
    text-align: center;
    margin-bottom: 10px;
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
