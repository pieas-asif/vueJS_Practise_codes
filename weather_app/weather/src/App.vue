<template>
<div id="app">
  <b-container>
    <b-row>
      <b-col align-self="center">
          <Home />
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
body {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  min-height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
