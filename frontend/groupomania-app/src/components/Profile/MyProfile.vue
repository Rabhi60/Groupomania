<template>
  <div class="container-fluid">
      
        <b-navbar toggleable type="dark" variant="dark" fixed='top'>
            <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
            <b-navbar-toggle target="navbar-toggle-collapse">
            </b-navbar-toggle>
            <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item ><router-link to='/Home' exact>Accueil</router-link></b-nav-item>
                <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
                <b-nav-item ><router-link to='/Home/ModifyProfile' >Modifier mon profil</router-link></b-nav-item>
                <b-nav-item ><router-link to='/Home/DeleteProfile' >Supprimer mon profil</router-link></b-nav-item>
                <b-nav-item  >Déconnexion</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-jumbotron  >
            <h1>Mon profil</h1>
        </b-jumbotron>
        
        
      
            <section id='coordonnées' class="col-md-6 mx-auto ">
                <h2>Mes coordonnées</h2>
                <p>Email: {{data.email}}</p>
                <p>Pseudo: {{data.username}}</p>
                <p>Nom: {{data.firstname}}</p>
                <p>Prénom: {{data.lastname}}</p>
                <hr class='col-8'>
            </section>
              <section id="image">
                <img src="../../assets/ok.png" width='300' alt="image ok qui signifie que tout est correct ">
            </section>

  </div>
</template>


<script>
import axios from 'axios'

let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));
const regexNumber = /^\d+$/;

export default {
  name: 'MyProfile',
   data() {
       return{
          data: [],
       }
    },
  mounted(){
    let self = this;
    if ( !regexNumber.test(userId) ) {// on vérifie si le contenu est correct
      return this.$swal( "Votre requêtes n'est pas correcte !  ", "" , "error");
    }
    axios.get(`http://localhost:3000/api/users/me/${userId}` ,
      {headers: {
      'Authorization': `Barer ${sessionToken}`
    }})
    .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        self.data = response.data;
        
    })
    .catch(function (erreur) {
      //On traite ici les erreurs éventuellement survenues
      console.log(erreur);
      window.location.reload();
    })
 }, 
 methods:{
    deconnexion: function(){
      localStorage.clear();
      this.$router.push('/');
    } 
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div{
  padding: 0;
}
</style>