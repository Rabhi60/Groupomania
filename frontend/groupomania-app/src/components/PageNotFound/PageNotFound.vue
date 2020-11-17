<template>
<div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
        </b-navbar-toggle>
          <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item ><router-link to='/Signup'>Inscription</router-link></b-nav-item>
              <b-nav-item ><router-link to='/' exact>Connexion</router-link></b-nav-item>
            </b-navbar-nav>
          </b-collapse>
      </b-navbar>
      
      <b-jumbotron  >
        <h1 >{{title}}</h1>
      </b-jumbotron>
    </div>

    <section id="main">
        <h2 class="py-3">{{txt}}</h2>
        <img src="../../assets/page_not_found.jpg" alt="image 404 pour le code erreur d'une page introuvable">
    </section>
       
 


  </div>
</template>

<script>



export default {
  name: 'PageNotFound',
  data() {
      return {
        title: '404 Not Found',
        txt: 'Cette page est introuvable pas.'
      }
    },

 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div{
  padding: 0;
}
.left{
  text-align: left;
  font-weight: bold;
}
.button{
  font-size: 1.5rem;
}
img{
    max-width: 100%;
    height: auto;
}
</style>
