<template>
<div class="container-fluid">
    <!-- div contenant la navbar et notre h1 -->
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
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

      <b-jumbotron>
        <h1>Supprimer mon commentaire</h1>
      </b-jumbotron>
    </div>

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
import axios from 'axios'
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));
let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
const regexNumber = /^\d+$/;
export default {
  name: 'OneMessage',
  data() {
       return{
        commentId: this.$route.params.commentId,
        isAdmin: isAdmin,
        userId: userId,
        commentUnique: [],
        User: [],
        submit:{
          commentId: this.$route.params.commentId,
        }
       }
    },
  mounted(){
    let self = this;
    if ( !regexNumber.test(this.commentId) ) {// on vérifie si le contenu est correct
      this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
      window.location.replace('/Home');
    }
    axios.get(`http://localhost:3000/api/messages/comment/${this.commentId}/${userId}`, 
      {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Barer ${sessionToken}`
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
      axios.delete(`http://localhost:3000/api/messages/comment/${this.submit.commentId}/${userId}`,
      {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Barer ${sessionToken}`
      }})
      .then(function (response) {
        console.log(response.data);
        self.$router.push('/Home');
      })
      .catch(function (erreur) {
        console.log(erreur);
      })
    },
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

.cardMessage{
  margin-top: 2rem;
  padding-bottom: 6rem;
}

.comment{
 margin : 0 auto 5em auto;
}
</style>