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
  h1{
  margin-top: 4rem;
  font-size: 3.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  }
  h2{
  margin-top: 1em;
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 1em;
  text-align: center;
  }
  p{
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  }
  .router-link-active{
  color:white;
   font-weight: bold;
  }
  a{
    color: grey;
    font-size: 1.2em;
    text-decoration: none;
  }
  #image{
    margin-bottom: 6rem;
  }
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
