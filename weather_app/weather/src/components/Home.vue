<template>
  <div id="home-view-container">
    <h1>Weather</h1>
    <b-form @submit.prevent="getWeatherData">
      <b-form-group id="input-group-1" label="Enter Location:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.location"
          required
          placeholder="Dhaka"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <hr>
    <h3>Current Weather</h3>
    <p>Temperature: {{ weather.currently.apparentTemperature }} F</p>
    <p>{{ weather.currently.summary }}</p>
    <p>Humidity: {{ weather.currently.humidity }}</p>
    <p>Pressure: {{ weather.currently.pressure }}</p>
    <p>Visibility: {{ weather.currently.visibility }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return{
      weather: {},
      locationData: null,
      form: {
        location: ''
      },
      lat: null,
      lng: null
    }
  },
  methods: {
    async getWeatherData() {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.form.location}.json?access_token=pk.eyJ1IjoicGllYXMtYXNpZiIsImEiOiJjanU0aXI4aDkweTZmM3luN2dieWZ4ejNuIn0.WXlwaQdmZFbwj1x3tsdUug`);
      this.locationData = response.data;
      this.lat = this.locationData.features[0].geometry.coordinates[1];
      this.lng = this.locationData.features[0].geometry.coordinates[0];
      const esponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9d8085c603211b722d79831ec5a25f1b/${this.lat},${this.lng}`);
      this.weather = esponse.data;
    }
  },
  mounted: async function() {
    const response = await axios.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9d8085c603211b722d79831ec5a25f1b/37.8267,-122.4233");
    this.weather = response.data;
  }
}
</script>

