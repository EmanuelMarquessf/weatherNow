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
        {{ props.loadedCity[0].name }} <span v-if="props.loadedCity[0].state">
        - {{ props.loadedCity[0].state }}</span>
      </span>
      <div class="tempInfo">
        <img
          :src="`./weatherIcons/${props.loadedWeather.weather[0].icon}.png`"
          alt="Weather Icon"
        />
        <span class="temp">
          {{ Math.ceil(temperatureConvert(props.loadedWeather.main.temp)) }}°
        </span>
      </div>
    </div>
    <div class="resultInfo">
      <div class="resultItem">
        Min:
        {{ Math.ceil(temperatureConvert(props.loadedWeather.main.temp_min)) }}°C
      </div>
      <div class="resultItem">
        Max:
        {{ Math.ceil(temperatureConvert(props.loadedWeather.main.temp_max)) }}°C
      </div>
      <div class="resultItem">
        Feels Like:
        {{ Math.ceil(temperatureConvert(props.loadedWeather.main.feels_like)) }}°C
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../src/styles/_colors.scss";

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
  height: 250px;
  padding: 1rem 4rem;

  .topContainer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    text-align: center;
    flex-grow: 1;
    color: $textBlack;
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
        color: $textBlack
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
  }

  .resultItem {
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