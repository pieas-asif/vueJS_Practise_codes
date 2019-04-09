<template>
  <div id="home-view-container">
    <h1 class="tracking-in-expand main-head">Weather</h1>
    <b-form @submit.prevent="getWeatherData" class="weather-input-form">
      <b-form-group id="input-group-1">
        <b-form-input
          id="input-1"
          class="weather-input-form__input"
          v-model="form.location"
          required
          placeholder="Enter Location"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="weather-input-form__btn">Submit</b-button>
    </b-form>
    <hr>
    <div class="weather-data">
      <div class="weather-data__information">
        <h3>{{ placename }}</h3>
        <p>{{ dailySummary }}</p>
        <p>Humidity: {{ humidity }}</p>
        <p>Pressure: {{ pressure }}</p>
        <p>Visibility: {{ visibility }}</p>
      </div>
      <div class="weather-data__icons">
        <skycon v-if="icon !== null" :condition="icon" width="112" height="112" />
        <h2><strong>{{ temperature }} &#176;F</strong></h2>
        <p>{{ summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return{
      weather: {},
      temperature: NaN,
      icon: null,
      summary: 'Undefined',
      dailySummary: 'Undefined',
      humidity: NaN,
      pressure: NaN,
      visibility: NaN,
      locationData: null,
      form: {
        location: ''
      },
      lat: null,
      lng: null,
      placename: 'Search or Give Location Access',
      placeData: {}
    }
  },
  methods: {
    async getWeatherData() {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.form.location}.json?reverseMode&access_token=pk.eyJ1IjoicGllYXMtYXNpZiIsImEiOiJjanU0aXI4aDkweTZmM3luN2dieWZ4ejNuIn0.WXlwaQdmZFbwj1x3tsdUug`);
      this.locationData = response.data;
      this.lat = this.locationData.features[1].geometry.coordinates[1];
      this.lng = this.locationData.features[1].geometry.coordinates[0];
      this.placename = this.locationData.features[1].place_name;
      const esponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9d8085c603211b722d79831ec5a25f1b/${this.lat},${this.lng}`);
      this.weather = esponse.data;
      this.temperature = this.weather.currently.apparentTemperature;
      this.summary = this.weather.currently.summary;
      this.dailySummary = this.weather.daily.summary;
      this.humidity = this.weather.currently.humidity;
      this.pressure = this.weather.currently.pressure;
      this.visibility = this.weather.currently.visibility;
      this.icon = this.weather.currently.icon;
    },
    getCoordinates() {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
  },
  mounted: async function() {
    const position = await this.getCoordinates();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9d8085c603211b722d79831ec5a25f1b/${this.lat},${this.lng}`);
    this.weather = response.data;
    this.temperature = this.weather.currently.apparentTemperature;
    this.summary = this.weather.currently.summary;
    this.dailySummary = this.weather.daily.summary;
    this.humidity = this.weather.currently.humidity;
    this.pressure = this.weather.currently.pressure;
    this.visibility = this.weather.currently.visibility;
    this.icon = this.weather.currently.icon
    const esponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.lng},${this.lat}.json?access_token=pk.eyJ1IjoicGllYXMtYXNpZiIsImEiOiJjanU0aXI4aDkweTZmM3luN2dieWZ4ejNuIn0.WXlwaQdmZFbwj1x3tsdUug`);
    this.placeData = esponse.data;
    this.placename = this.placeData.features[0].place_name;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Bitter');
.main-head {
  font-family: 'Bitter', serif;
}
.weather-input-form {
  max-width: 25rem;
  display: grid;
  margin: 0 auto;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
  align-items: start;
  max-height: 100%;
}
.weather-input-form__btn,
.weather-input-form__input {
  padding: auto auto;
}
.weather-data {
  display: grid;
  grid-template-columns: calc(50% - 2rem) calc(50% - 2rem);
  grid-gap: 4rem;
  margin: 0 auto;
}
@media (max-width: 600px) {
  .weather-data {
    display: grid;
    grid-template-columns: auto;
    margin: 0 auto;
    grid-gap: 0;
  }
  .weather-data__icons {
    grid-row: 1;
  }
}
.weather-data__information p {
  font-size: 1.2rem;
}
.tracking-in-expand {
	-webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1s both;
	        animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1s both;
}
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
