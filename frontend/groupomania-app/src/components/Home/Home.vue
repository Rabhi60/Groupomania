<template>
  <div class="container-fluid">

    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand href="#"> <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
        </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Home/newMessage'>Nouveau message</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
            <b-nav-item  ><router-link to='/Home' exact >Accueil</router-link></b-nav-item>
            <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-jumbotron>
        <h1>Hello {{data.username}}</h1>
      </b-jumbotron>
    </div>
    

    
    <div :key="index" v-for="(message, index) in messages " class="col-10 col-md-7 mx-auto my-5" >
      <router-link :to='`/Home/OneMessage/${message.id}`'  >
      <b-card 
        :title="message.title"
        :img-src="message.attachment"
        img-alt="Image"
        img-top
        :header='message.User.username'
        tag="article"
        bg-variant="dark" 
        text-variant="white" 
        class="text-center mb-2 col-12 mx-auto  "
        >
        <b-card-text>
            {{message.content}}
        </b-card-text>
      </b-card>
       </router-link>
    </div>
   
  </div>
</template>

<script>
import axios from 'axios'

let sessionToken = JSON.parse(localStorage.getItem('session'));
let id = JSON.parse(localStorage.getItem('userId'));


export default {
  name: 'Home',
   data() {
       return{
          data: [],
          messages: [],
       }
    },
  
  mounted(){
      let self = this;
    axios.get(`http://localhost:3000/api/users/me/${id}`,
      {headers: {
      'Authorization': `Barer ${sessionToken}`
    }})
      .then(function (response) {
        self.data = response.data;
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
    axios.get(`http://localhost:3000/api/messages/`,
      {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Barer ${sessionToken}`
    }})
      .then(function (response) {
        self.messages = response.data;
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