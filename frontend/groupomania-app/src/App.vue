<template>
  <div id="app">
    <router-view></router-view>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer'

export default {
  name: 'App',
  components: {
    'footer-bottom' : Footer,
  
    
  }
}
</script>

<style lang="scss">
#app {
  html, body{
    font-size: 62.5%;
  }
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
