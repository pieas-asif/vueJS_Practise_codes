<template>
  <div id="home">
    <h1>{{ text }}</h1>
    <Pad />
    <Pad />
    <Pad />
    <Pad />
  </div>
</template>

<script>
import Pad from './Pad.vue'

export default {
  name: 'app',
  components: {
    Pad
  },
  data() {
    return {
      text: "MuPad"
    }
  }
}
</script>

<style scoped>

</style>
