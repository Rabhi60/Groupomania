<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <router-link to='/Home' ><img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</router-link></b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item  ><router-link to='/Home' exact >Accueil</router-link></b-nav-item>
            <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <!-- jumbotron met le contenu dans un background gris -->
      <b-jumbotron>
        <h1>Compte Admin</h1>
      </b-jumbotron>
    </div>
    
    <!-- section qui donne accès au données des utilisateurs pour l'admin avec un lien vers le CNIL qui explique le RGPD -->
    <section>
      <h2>Voir tout les utilisateurs</h2>
      <b-card bg-variant="dark" text-variant="white" src="../../assets/icon-above-font.png" img-alt="Image groupomania" class="my-5 mx-auto py-5" style="max-width: 80vw;" img-top >
        <b-card-text>
            Veulliez à manipuler les données avec prudences selon les consignes du RGPD.
        </b-card-text>
        <a id="white"  href="https://www.cnil.fr/fr/comprendre-le-rgpd">Comprendre le RGPD</a><br>
        <router-link to="/Home/AdminHome/AllUsers" v-if="isAdmin === true">
          <b-button  variant="success" class="button my-3" >Valider</b-button> 
        </router-link>
      </b-card>
    </section>
  </div>
</template>

<script>
export default {
    name: 'AdminHome', 
    data() {
      return{
        isAdmin: false,
        userId : null
      }
    },

    mounted(){
      // on récupère nos données via le localStorage
      this.userId = JSON.parse(localStorage.getItem('userId'));
      this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
      if(this.userId === undefined || this.userId === null){
        this.$router.push('/')
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
img{
  max-height: 50vh;
}

div{
  padding: 0;
}

.button{
  font-size: 2rem;
  font-weight: bold;
}

#white{
  color: white;
  font-size: 2rem;
  &:hover{
    border-bottom: 2px solid white;
  }
}

</style>