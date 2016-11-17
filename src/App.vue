<template>
  <div id="app">
    <messenger></messenger>
  </div>
</template>

<script>
import Messenger from './components/Messenger'

export default {
  name: 'app',
  components: {
    Messenger
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
