<script setup>
  const props = defineProps({
    loadedWeather: Object,
    loadedCity: Object,
  });

  const temperatureConvert = (temp) => {
    return temp - 273.15;
  };
</script>
<template>
  <div class="resultContainer flexCol" v-if="props.loadedWeather">
    <div class="topContainer resultItem">
      <span class="cityName">
        {{ props.loadedCity[0].name }} <span class="cityState" v-if="props.loadedCity[0].state">
        {{ props.loadedCity[0].state }}</span>
      </span>
      <div class="tempInfo">
        <div class="flexCol">
          <img
            :src="`https://openweathermap.org/img/wn/${props.loadedWeather.weather[0].icon}@2x.png`"
            alt="Weather Icon"
          />
        </div>
        <div class="tempContainer">
          <span class="description">{{ props.loadedWeather.weather[0].description }} </span>
          <span class="temp">  
            {{ Math.ceil(temperatureConvert(props.loadedWeather.main.temp)) }}°
          </span>
        </div>
      </div>
      <div class="resultInfo">
        <div class="resultItem">
          <span>Max: {{ Math.ceil(temperatureConvert(props.loadedWeather.main.temp_max)) }}°C</span>
        </div>
        <div class="resultItem">
          <span>Min: {{ Math.ceil(temperatureConvert(props.loadedWeather.main.temp_min)) }}°C</span>
        </div>
        <div class="resultItem">
          Feels Like:
          {{ Math.ceil(temperatureConvert(props.loadedWeather.main.feels_like)) }}°C
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../src/styles/_colors.scss";
@import './src/styles/_mediaQueries';


@mixin box-shadow($shadow) {
  box-shadow: $shadow;
}
.resultContainer {
  background-color: $backgroundColor;
  display: flex;
  flex-direction: column;
  border: 1px solid $detailColor3;
  border-radius: 5px;
  gap: 1rem;
  padding: 1rem 4rem;
  overflow: hidden;
  transition: opacity 1s ease-in-out;
  @include tablet {
    padding: 1rem;
  }
  .topContainer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    text-align: center;
    flex-grow: 1;
    color: $textBlack;
    @include tablet {
      justify-content: space-between;
    };
    .cityName {
      font-size:x-large;
      font-weight: 600;
      @include mobile {
        display: flex;
        flex-direction: column;
      };
      .cityState{
        font-size:small;
        color: $textGrey;
      }
    }

    .tempInfo {
      display: flex;
      align-content: center;
      gap: 2rem;
      justify-content: center;
      align-items: center;
      @include mobile {
        gap: 0rem;
        flex-direction: column;
      }
      .tempContainer{
        display: flex;
        flex-direction: column;
        text-align: left;
        font-weight: 700;
        .description{
          color: $textGrey;
          text-transform: capitalize;
        }
      }
      .temp {
        font-size: 90px;
        font-weight: 100;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: $textBlack
      }
    }

    img {
      height: 170px;
      @include tablet {
        height: 130px
      }
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

  }

  .resultItem {
    display: flex;
    gap: 1rem;
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