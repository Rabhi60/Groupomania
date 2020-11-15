<template>
  <div class="container-fluid">

    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
            <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
            <b-navbar-toggle target="navbar-toggle-collapse">
            </b-navbar-toggle>
            <b-collapse id="navbar-toggle-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item  ><router-link to='/Home' exact >Accueil</router-link></b-nav-item>
                    <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-jumbotron>
            <h1>Compte Admin</h1>
        </b-jumbotron>
    </div>
    
    <div>
        <b-card bg-variant="dark" text-variant="white" src="../../assets/icon-above-font.png" img-alt="Image groupomania" class="my-5 mx-auto py-5" style="max-width: 80vw;" img-top title="Voir tout les utilisateurs">
            <b-card-text>
                Veulliez à manipuler les données avec prudences selon les consignes du RGPD.
            </b-card-text>
            <router-link to="/Home/AdminHome/AllUsers" v-if="isAdmin === true">
            <b-button  variant="success" >Valider</b-button> 
            </router-link>
        </b-card>
    </div>
    
   
  </div>
</template>

<script>



let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));


export default {
  name: 'AdminHome', 
   data() {
     return{
        isAdmin: isAdmin
     }
  
    },

  methods: {
    deconnexion: function(){
        localStorage.clear();
        this.$router.push('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h1{
  margin: 1.5em;
  font-size: 2.5rem;
  font-weight: bold;
  padding-top: 1em;
  padding-bottom: 1em;
}
img{
  max-height: 50vh;
}
.deconnexion{
  color: red;
  font-size: 1.2em;
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
div{
  padding: 0;
}

</style>