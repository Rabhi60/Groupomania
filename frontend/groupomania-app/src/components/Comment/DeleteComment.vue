<template>
<div class="container-fluid">
    <!-- div contenant la navbar et notre h1 -->
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand >  <router-link to='/Home' ><img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</router-link></b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Home/NewMessage'>Nouveau message</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
            <b-nav-item  ><router-link to='/Home' exact >Accueil</router-link></b-nav-item>
            <b-nav-item   @click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <!-- jumbotron permet d'avoir un background gris en fond -->
      <b-jumbotron>
        <h1>Supprimer mon commentaire</h1>
      </b-jumbotron>
    </div>

    <!-- contient notre card/commentaire a supprimer -->
    <div  class="col-10 col-md-7 mx-auto comment">
      <b-card :header='User.username' bg-variant="dark" text-variant="white" class="text-center mb-2 col-12 mx-auto  ">
        <b-card-text>
          {{commentUnique.content}}
        </b-card-text>
        <b-button  @click="deleteComment" variant='danger' class="float-right" v-if="userId == User.id || isAdmin === true">X</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
// on importe axios pour nos requêtes
import axios from 'axios'

const regexNumber = /^\d+$/;// regex pour les nombres
export default {
  name: 'DeleteComment',//nom de notre page
  data() {// données
       return{
        commentId: this.$route.params.commentId,
        isAdmin: false,
        userId: null,
        sessionToken: null,
        commentUnique: [],
        User: [],

        submit:{
          commentId: this.$route.params.commentId,
        }
      }
    },
  mounted(){
    let self = this;
    this.sessionToken = JSON.parse(localStorage.getItem('session'));
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    this.userId = JSON.parse(localStorage.getItem('userId'));// on vérifie si l'utilisateur est connecté
      if(this.userId === undefined || this.userId === null){
        this.$router.push('/')
      }
    if ( !regexNumber.test(this.commentId) ) {// on vérifie si le contenu est correct
      this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
      window.location.replace('/Home');
    }
    // requête get pour lire notre commentaire
    axios.get(`http://localhost:3000/api/messages/comment/${this.commentId}/`, 
      {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Barer ${this.sessionToken}`
    }})
    .then(function (response) {
      self.commentUnique = response.data;
      self.User = response.data.User;
      console.log(response.data);
    })
    .catch(function (erreur) {
      console.log(erreur);
      window.location.reload();
    })
  },
  methods: {
    deleteComment() {
      const self = this;
      if ( !regexNumber.test(this.submit.commentId) ) {// on vérifie si le contenu est correct
        this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
        window.location.replace('/Home')
      }
      //requête delete pour supprimer notre commentaire
      axios.delete(`http://localhost:3000/api/messages/comment/${this.submit.commentId}/`,
      {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Barer ${this.sessionToken}`
      }})
      .then(function (response) {
        console.log(response.data);
        self.$swal("Commentaire supprimé :) ", " " , "success");
        self.$router.push('/Home');
      })
      .catch(function (erreur) {
        console.log(erreur);
      })
    },

    deconnexion: function(){// permet de déconecter l'utilisateur, de supprimer ses données de connexion et de renvoyer vers la page de connexion
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

.cardMessage{
  margin-top: 2rem;
  padding-bottom: 6rem;
}

.comment{
 margin : 15rem auto 5em auto;
}
</style>