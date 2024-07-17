<script setup>
import { fetchData, fetchWeather } from "./src/services/openWeatherAPI";

const tipedCity = ref("Campinas");
const tipedCountry = ref("BRA");
const loadedCity = ref();
const loadedWeather = ref();

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
  loadedWeather.value = data;
};
  loadCountry()
  
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
          <option value="ARG">Argentina</option>
          <option value="AUS">Australia</option>
          <option value="BRA">Brazil</option>
          <option value="CAN">Canada</option>
          <option value="CHN">China</option>
          <option value="EGY">Egypt</option>
          <option value="FRA">France</option>
          <option value="GER">Germany</option>
          <option value="IND">India</option>
          <option value="ITA">Italy</option>
          <option value="JPN">Japan</option>
          <option value="KOR">South Korea</option>
          <option value="MEX">Mexico</option>
          <option value="NGA">Nigeria</option>
          <option value="RUS">Russia</option>
          <option value="SAU">Saudi Arabia</option>
          <option value="ESP">Spain</option>
          <option value="TUR">Turkey</option>
          <option value="UK">United Kingdom</option>
          <option value="USA">United States</option>
        </select>
      </div>
      <button type="submit" @click="">
        <img src="/icons/search.svg" alt="" />
      </button>
    </form>
    <Result :loadedCity="loadedCity" :loadedWeather="loadedWeather" />
    
    <!-- <span v-else-if="loadedCity == 'inv'">Invalid Location</span> -->
  </main>
</template>

<style scoped lang="scss">
@import "./src/styles/_colors";
@import './src/styles/_mediaQueries';


@mixin box-shadow($shadow) {
  box-shadow: $shadow;
}

// Estilos base
main {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: $windowColor;
  font-family: 'Roboto', sans-serif;
  border-radius: 15px;
  gap: 1rem;
  overflow: hidden;
  @include mobile {

  };
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
    @include tablet {
      flex-wrap: wrap;
    };
    .inputContainer {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex-grow: 1;
      label {
        font-size: medium;
        font-weight: 700;
        color: $textBlack
      }
      input,
      select {
        padding: 0.5rem;
        font-size: larger;
        color: $textBlack;
        border: 1px solid $detailColor3;
        border-radius: 5px;
        background-color: $backgroundColor;
        @include tablet {
          font-size: medium
        };
        option{
          font-size:small;
        }
      }
    }

    #cityInput {
      width: 250px;
      @include tablet {
        flex-grow: 1;
      };
    }

    #CountryInput {
      width: 150px;
      @include tablet {
        width: 100px;
      };
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
