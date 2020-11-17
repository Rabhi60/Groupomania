<template>
  <div class="container-fluid">

    <!-- navbar créé par bootstrap-vue avec le logo de Groupomania  qui contient des liens vers la page nouveau message, Mon profil, Compte Admin si on l'est, l'Accueil et la Déconnexion -->
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
        </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Home/AdminHome'  v-if="isAdmin === true">Compte Admin</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/NewMessage'>Nouveau message</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
            <b-nav-item  ><router-link to='/Home' exact >Accueil</router-link></b-nav-item>
            <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <!-- Jumbotron nous permet d'avoir un titre avec un background en fond, et nous avons notre h1 -->
      <b-jumbotron>
        <h1>Hello {{data.username}}</h1>
      </b-jumbotron>
    </div>
    

    <!-- Nous avons les cartes pour nos images, en utilisant un v-for on fait une boucle pour récuperer toute les cartes -->
    <div :key="index" v-for="(message, index) in messages " class="col-10 col-md-8 mx-auto cardMarginBottom" >
      <!-- v-router va nous permettre d'acceder a notre page image unique avec le numero de l'id de l'image en paramètre -->
      <router-link :to='`/Home/OneMessage/${message.id}`'  >
      <!-- notre carte comprend un titre, alt pour le descriptif de l'image, un header pour mettre le pseudo, si on a ajouté une image -->
      <b-card 
        :title="message.title"
        :img-src="message.attachment"
        :img-alt="message.title"
        img-top
        :header='message.User.username'
        tag="article"
        bg-variant="dark" 
        text-variant="white" 
        class="text-center mb-2 col-12 mx-auto  "
        >
        <!-- le contenu de notre message s'il existe -->
        <b-card-text>
            {{message.content}}
        </b-card-text>
        <span>{{message.createdAt | moment("from", "now")}}</span>
      </b-card>
       </router-link>
    </div>
   
  </div>
</template>

<script>
//on importe axios pour les requêtes 
import axios from 'axios'

// on récupère les données dans le localStorage pour maintenir la connexion 
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));
let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));


export default {
  name: 'Home',
   data() {
       return{// ici on récupère les données des réponses des requêtes ci-dessous axios.
          data: [],
          messages: [],
          isAdmin: isAdmin,
       }
    },
  
  mounted(){// mounted permet avant la création de la page de faire la requête pour récuperer les données de l'utilisateur et les messages
      let self = this;
     
      
    axios.get(`http://localhost:3000/api/users/me/${userId}`,// axios nous permet de faire des requêtes, ici nous avons des requêtes get pour récuperer(ou Lire/Read)
      {headers: {
      'Authorization': `Barer ${sessionToken}`//nous envoyons notre token
    }})
      .then(function (response) {// on récupère la réponse
        self.data = response.data;
      })
      .catch(function (erreur) {
        console.log(erreur);
        window.location.reload();
      });
    axios.get(`http://localhost:3000/api/messages/`,// requête pour tout les messages
      {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',// entête de notre requête
      'Authorization': `Barer ${sessionToken}`
    }})
      .then(function (response) {
        self.messages = response.data;
        console.log(response.data);
      })
      .catch(function (erreur) {
        console.log(erreur);
        window.location.reload();
      })
      
      
  },
  created(){
    if(userId === undefined){
        this.$router.push('/')
      } 
  },
  methods: {// methods va nous permettre de mettre des fonctions pour l'executer au momment voulu, ici lors de la déconnexion
    deconnexion: function(){
        localStorage.clear();// on vide notre localStorage
        this.$router.push('/');// retour à l'identification
    },
    
  }
}
</script>

<!-- la partie style nous permet de modifier le style css/scss  -->
<style scoped lang="scss">

img{
  max-height: 50vh;
}
div{
  padding: 0;
}
.cardMarginBottom{
  margin-bottom: 8rem;
}
</style>