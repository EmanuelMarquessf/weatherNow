<script setup>
import { compileScript } from "vue/compiler-sfc";
import { fetchData, fetchWeather } from "./src/services/openWeatherAPI";

const tipedCity = ref("campos do jordao");
const tipedCountry = ref("BRA");
const loadedCity = ref(0);
const loadadedWeather = ref();

const loadCountry = async () => {
  const data = await fetchData(tipedCity.value, tipedCountry.value);
  loadedCity.value = data;
  console.log(loadedCity.value);
  if (loadedCity.value.length > 0) loadWeather();
  else {
    loadedCity.value = "inv";
  }
};

const loadWeather = async () => {
  const data = await fetchWeather(
    loadedCity.value[0].lat,
    loadedCity.value[0].lon
  );
  loadadedWeather.value = data;
  console.log(Math.ceil(temperatureConvert(loadadedWeather.value.main.temp)));
  console.log(loadedCity.value[0].name);
};

const temperatureConvert = (temp) => {
  return temp - 273.15;
};
</script>

<template>
  <main>
    <form @submit.prevent="loadCountry()" class="formContainer flexRow">
      <div id="cityInput" class="inputContainer flexCol">
        <label for="">City name</label>
        <input v-model="tipedCity" type="text" required />
      </div>
      <div id="CountryInput" class="inputContainer flexCol">
        <label for="CountrySelect">Country</label>
        <select v-model="tipedCountry" id="CountrySelect" required>
          <option value=""></option>
          <option value="RUS">Russia</option>
          <option value="CAN">Canada</option>
          <option value="CHN">China</option>
          <option value="USA">United States</option>
          <option value="BRA" selected>Brazil</option>
          <option value="AUS">Australia</option>
          <option value="IND">India</option>
          <option value="ARG">Argentina</option>
          <option value="KAZ">Kazakhstan</option>
          <option value="ALG">Algeria</option>
          <option value="SUD">Sudan</option>
          <option value="GRL">Greenland</option>
          <option value="YEM">Yemen</option>
          <option value="MEX">Mexico</option>
          <option value="IRN">Iran</option>
          <option value="PER">Peru</option>
          <option value="CHL">Chile</option>
          <option value="IDN">Indonesia</option>
          <option value="MNG">Mongolia</option>
        </select>
      </div>
      <button type="submit" @click="">
        <img src="/icons/search.svg" alt="" />
      </button>
    </form>
    <div class="resultContainer flexRow" v-if="loadadedWeather">
      <div class="topContainer resultItem">
        <span class="cityName">
          {{ loadedCity[0].name }} - {{ loadedCity[0].state }}
        </span>
        <div>
          <span class="temp">
            {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp)) }}°
          </span>
          <img
            :src="`./weatherIcons/${loadadedWeather.weather[0].icon}.png`"
            alt="Weather Icon"
          />
        </div>
      </div>
      <div class="resultInfo">
        <div class="resultItem">
          <strong>Mínima:</strong>
          {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp_min)) }}°C
        </div>
        <div class="resultItem">
          <strong>Máxima:</strong>
          {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp_max)) }}°C
        </div>
        <div class="resultItem">
          <strong>Sensação Térmica:</strong>
          {{ Math.ceil(temperatureConvert(loadadedWeather.main.feels_like)) }}°C
        </div>
      </div>
      <!-- <div class="conditionContainer flexCol">
        <strong>{{ loadadedWeather.weather[0].main }}</strong>
        <img :src="`./weatherIcons/${loadadedWeather.weather[0].icon}.png`" alt="Weather Icon">
      </div> -->
    </div>
    <span v-else-if="loadedCity == 'inv'">Invalid Location</span>
    <span v-else>Choose you location!</span>
  </main>
</template>

<style scoped lang="scss">
@import "./src/styles/_colors";

main {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 4rem;
  background-color: $windowColor;
  font-family: sans-serif;
  border-radius: 15px;
  gap: 4rem;
  span {
    font-size: larger;
    text-align: center;
  }
  .formContainer {
    gap: 1rem;
    justify-content: space-between;
    align-items: end;
    .inputContainer {
      gap: 0.5rem;
      label {
        font-size: medium;
      }
      input,
      select {
        padding: 0.5rem;
        font-size: x-large;
        color: #2a2a2a;
      }
    }
    #cityInput {
      width: 250px;
    }
    #CountryInput {
      width: 100px;
    }
    button {
      padding: 0rem 0.5rem;
      height: 50px;
      font-size: medium;
    }
  }
  .resultContainer {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    gap: 2rem;
    .topContainer {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      justify-content: center;
      text-align: center;
      flex-grow: 1;
      
    }
  }
  .resultInfo {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    justify-content: center;
  }
  .resultItem {
    margin-bottom: 10px;
    .cityName {
      font-size: larger;
      font-weight: 700;
    }
    .temp {
      font-size: 90px;
    }
    img {
      width: 150px;
    }
  }

  .conditionContainer {
    text-align: center;
    margin-bottom: 10px;
  }
}

.flexCol {
  display: flex;
  flex-direction: column;
}
.flexRow {
  display: flex;
  flex-direction: row;
}
</style>
