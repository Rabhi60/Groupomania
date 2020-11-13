<template>
<div class="container-fluid">
    <!-- Section contenant la navbar et notre h1 -->
    <section>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand href="#"> <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
        </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Home/newMessage'>Nouveau message</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
            <b-nav-item  ><router-link to='/Home' exact >Accueil</router-link></b-nav-item>
            <b-nav-item   @click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <h1>Supprimer mon commentaire</h1>
    </section>

   

    <section >
      <div  class="col-10 col-md-7 mx-auto comment">
      <b-card 
        :header='commentUnique.User.username'
        bg-variant="dark" 
        text-variant="white" 
        class="text-center mb-2 col-12 mx-auto  "
        >
        <b-button  @click="deleteComment" variant='danger' class="float-right" v-if="userId == commentUnique.User.id || isAdmin == 1">X</b-button>
        <b-card-text>
            {{commentUnique.content}}
        </b-card-text>
      </b-card>

    </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));
let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

export default {
  name: 'OneMessage',
  data() {
       return{
        commentId: this.$route.params.commentId,
        isAdmin: isAdmin,
        userId: userId,
        commentUnique: [],
        submit:{
          commentId: this.$route.params.commentId,
        }
       }
    },
  mounted(){
      let self = this;
    axios.get(`http://localhost:3000/api/messages/comment/${this.commentId}`,
      {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Barer ${sessionToken}`
    }})
      .then(function (response) {
        self.commentUnique = response.data;
        console.log(response.data);
      })
      .catch(function (erreur) {
        console.log(erreur);
      })
  },
  methods: {
     
    deleteComment() {
         const self = this;
      axios.delete(`http://localhost:3000/api/messages/comment/${this.submit.commentId}`,
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
h1{
  margin-top: 2em;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1em;
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

.cardMessage{
  margin-top: 2rem;
  padding-bottom: 6rem;
}
.comment{
 margin : 0 auto 5em auto;
}
</style>