<template>
  <div class="container-fluid"  >

    <!-- navbar créé par bootstrap-vue avec le logo de Groupomania  qui contient des liens vers la page nouveau message, Mon profil, Compte Admin si on l'est, l'Accueil et la Déconnexion -->
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand >  <router-link to='/Home' ><img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</router-link></b-navbar-brand>
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
    <div :key="index" v-for="(message, index) in messages " class="col-10 col-md-6 col-xl-5 mx-auto cardMarginBottom" >
      <!-- v-router va nous permettre d'acceder a notre page image unique avec le numero de l'id de l'image en paramètre -->
      <router-link :to='`/Home/OneMessage/${message.id}`'  >
        <!-- notre carte comprend un titre, alt pour le descriptif de l'image, un header pour mettre le pseudo, si on a ajouté une image -->
        <b-card  :img-src="message.attachment" :img-alt="message.title" img-top :header='message.User.username' tag="article"  bg-variant="dark" text-variant="white" class="text-center mb-2 col-12 mx-auto h2 ">
          <!-- le contenu de notre message s'il existe -->
          <b-card-text>
            <h2 id="title2">{{message.title}}</h2>
            {{message.content}}
          </b-card-text>
          <!-- moment va nous permettre de transformer la date de création du message en temps de la création à maintenant  -->
          <span>{{message.createdAt | moment("from", "now")}}</span>
        </b-card>
      </router-link>
    </div>
  </div>
</template>

<script>
//on importe axios pour les requêtes 
import axios from 'axios'

export default {
  name: 'Home',
   data() {
      return{// ici on récupère les données des réponses des requêtes ci-dessous axios.
        data: [],
        messages: [],
        isAdmin: false,
        userId: null,
        sessionToken: null,
      }
    },
  
    mounted(){// mounted permet avant la création de la page de faire la requête pour récuperer les données de l'utilisateur et les messages
      let self = this;
      // on récupère les données dans le localStorage pour maintenir la connexion 
      this.userId = JSON.parse(localStorage.getItem('userId'));
      this.sessionToken = JSON.parse(localStorage.getItem('session'));
      this.isAdmin  = JSON.parse(localStorage.getItem('isAdmin'));
          
      if(this.userId === undefined || this.userId === null){// si l'utilisateur n'est pas connecté on le renvoie vers la page de connexion
        return self.$router.push('/')
      }
      setTimeout(() => {// setTimeout va permettre de d'executer la fonction après 500 ms
        axios.get(`http://localhost:3000/api/users/me/${this.userId}`,// axios nous permet de faire des requêtes, ici nous avons des requêtes get pour récuperer(ou Lire/Read)
        {headers: {
        'Authorization': `Barer ${this.sessionToken}`//nous envoyons notre token a notre serveur pour l'authentification
        }})
        .then(function (response) {// on récupère la réponse
          self.data = response.data;
        })
        .catch(function (erreur) {// on récupère l'erreur si elle se produit
          console.log(erreur);
        });

        axios.get(`http://localhost:3000/api/messages/`,// requête pour tout les messages
          {headers: {
          'Content-Type': 'application/x-www-form-urlencoded',// entête de notre requête
          'Authorization': `Barer ${this.sessionToken}`//nous envoyons notre token a notre serveur pour l'authentification
        }})
        .then(function (response) {// on récupère la réponse
          self.messages = response.data;
          console.log(response.data);
        })
        .catch(function (erreur) {// on récupère l'erreur si elle se produit
          console.log(erreur);
        })
      }, 500);
    },
 
    methods: {// methods va nous permettre de mettre des fonctions pour l'executer au momment voulu, ici lors de la déconnexion
      deconnexion: function(){//Permet de supprimer les données de connexion et de renvoyer l'utilisateur vers la page de connexion
        localStorage.clear();// on vide notre localStorage
        this.$router.push('/');// retour à l'identification
    },
  }
}
</script>

<!-- la partie style nous permet de modifier le style css/scss, scoped nous permet d'excuter ce code en sur cette page seulement  -->
<style scoped lang="scss">

img{
  max-height: 50vh;
}

div{
  padding: 0;
}

#title2{
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.cardMarginBottom{
  margin-bottom: 8rem;
}
</style>