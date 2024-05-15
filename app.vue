<script setup>
import { compileScript } from "vue/compiler-sfc";
import { fetchData, fetchWeather } from "./src/services/openWeatherAPI";

const tipedCity = ref();
const tipedCountry = ref("");
const loadedCity = ref(0);
const loadadedWeather = ref();

const loadCountry = async () => {
  const data = await fetchData(tipedCity.value, tipedCountry.value);
  loadedCity.value = data;
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
          <option value="BRA">Brazil</option>
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
        <div class="tempInfo">
          <img
            :src="`./weatherIcons/${loadadedWeather.weather[0].icon}.png`"
            alt="Weather Icon"
          />
          <span class="temp">
            {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp)) }}°
          </span>
        </div>
      </div>
      <div class="resultInfo">
        <div class="resultItem">
          Mínima:
          {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp_min)) }}°C
        </div>
        <div class="resultItem">
          Máxima:
          {{ Math.ceil(temperatureConvert(loadadedWeather.main.temp_max)) }}°C
        </div>
        <div class="resultItem">
          Sensação Térmica:
          {{ Math.ceil(temperatureConvert(loadadedWeather.main.feels_like)) }}°C
        </div>
      </div>
      <!-- <div class="conditionContainer flexCol">
        <strong>{{ loadadedWeather.weather[0].main }}</strong>
        <img :src="`./weatherIcons/${loadadedWeather.weather[0].icon}.png`" alt="Weather Icon">
      </div> -->
    </div>
    <span v-else-if="loadedCity == 'inv'">Invalid Location</span>
  </main>
</template>

<style scoped lang="scss">
@import "./src/styles/_colors";

@mixin box-shadow($shadow) {
  box-shadow: $shadow;
}

// Estilos base
main {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 4rem;
  background-color: $windowColor;
  font-family: 'Roboto', sans-serif;
  border-radius: 15px;
  gap: 1rem;

  span {
    font-size: larger;
    text-align: center;
  }

  .formContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    gap: 1rem;

    .inputContainer {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      label {
        font-size: medium;
        font-weight: 700;
      }
      input,
      select {
        padding: 0.5rem;
        font-size: larger;
        color: $textBlack;
        border: 1px solid $detailColor3;
        border-radius: 5px;
        background-color: $backgroundColor;
      }
    }
    
    #cityInput {
      width: 250px;

    }

    #CountryInput {
      width: 150px;
    }

    button {
      border-radius: 5px;
      padding: 0rem 0.5rem;
      height: 40px;
      font-size: medium;
      border: 1px solid $detailColor3;
      background-color: $backgroundColor;
      cursor: pointer;
    }
  }

  .resultContainer {
    background-color: $backgroundColor;
    display: flex;
    flex-direction: column;
    border: 1px solid $detailColor3;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    gap: 2rem;
    height: 250px;
    .topContainer {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      justify-content: center;
      text-align: center;
      flex-grow: 1;

      .cityName {
        font-size:larger;
        font-weight: 600;
      }

      .tempInfo {
        display: flex;
        align-content: center;
        gap: 2rem;
        justify-content: center;

        .temp {
          font-size: 100px;
          font-weight: 100;
          font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
      }

      img {
        width: 150px;
        height: 100px;
      }
    }

    .resultInfo {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 400;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      color: $textGrey;
      padding: 0px 0.5rem;
    }

    .resultItem {
      margin-bottom: 10px;
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
