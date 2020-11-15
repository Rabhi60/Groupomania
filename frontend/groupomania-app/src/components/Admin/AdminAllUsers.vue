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
    

    <!-- pour chaque utilisateur on a ses données -->
    <div :key="index" v-for="(user, index) in users " class="col-10 col-md-7 mx-auto my-5" >
        <b-card 
        :header='user.username'
        tag="article"
        bg-variant="dark" 
        text-variant="white" 
        class="text-center mb-2 col-12 mx-auto"
        >
            <!-- On a dans le nom et prénom de l'utilisateur s'ils ont été renseigner -->
            <b-card-text>
                <p> Nom: {{user.firstname}} </p> 
                <p> Prénom {{user.lastname}} </p> 
            </b-card-text>
        </b-card>
       
        <!-- Bouton pour aller dans la page avec un utilisateur -->
        <router-link :to='`/Home/AdminHome/OneUser/${user.id}`'>
            <b-button  type="submit" variant="warning" class="col-md-6  my-2 button" >Modifier ou Supprimer</b-button>
        </router-link>
    </div>
   
  </div>
</template>

<script>
import axios from 'axios'

let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));


export default {
  name: 'Home',
   data() {
       return{
          users: [],
          userId: userId
       }
    },
  
  mounted(){
      let self = this;

    axios.get(`http://localhost:3000/api/admin/allUsers/${userId}`, 
      {headers: {
   
      'Authorization': `Barer ${sessionToken}`
    }})
      .then(function (response) {
        self.users = response.data.users;
        console.log(response.data);
      })
      .catch(function (erreur) {
        console.log(erreur);
      })
    
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
.button{
  font-weight: bold;
}
div{
  padding: 0;
}
.container-fluid{
  margin-bottom: 8rem;
}
</style>