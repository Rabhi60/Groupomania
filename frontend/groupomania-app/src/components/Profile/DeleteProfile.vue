<template>
  <!-- Div container-fluid qui permet de gerer tout le contenu en prenant tout l'espace visuel -->
  <div class="container-fluid">
    <!-- div qui contient notre navbar et notre titre important h1 -->
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Home' exact>Accueil</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/ModifyProfile' >Modifier mon profil</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/DeleteProfile' >Supprimer mon profil</router-link></b-nav-item>
            <b-nav-item  ><router-link to='/' exact>Déconnexion</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <!-- jumbotron met le contenu dans un background gris -->
      <b-jumbotron  >
        <h1 >Supprimer mon profil</h1>
      </b-jumbotron>
    </div>
 
    <!-- section delete, cette section contient un titre h2, un paragraphe, un hr qui permet de faire une séparation et  du bouton pour supprimer le compte -->
    <section @submit="onSubmit" id='delete' class="col-md-6 mx-auto my-5 " >
        <h2>Supprimer mon compte</h2>
        <p>Etes-vous sûr(e) de vouloir supprimer votre compte ? ;) </p>
        <hr class="col-8">
        <b-button  type="submit" variant="danger" class="col">Supprimer</b-button>
    </section>

    <!-- section image, cette section contient une image  -->
    <section id="image">
      <img src="../../assets/delete.png" width='300' alt="image d'une poubelle qui signifie la suppression ">
    </section>
  </div>
</template>

<script>
// on importe axios pour nos requêtes et un regex pour bloquer un contenu autre que des chiffres
import axios from 'axios'
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId')); 
const regexNumber = /^\d+$/;

export default {
  name: 'DeleteProfile',
   data() {
       return{
          txt:''
       }
    },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
      if ( !regexNumber.test(userId) ) {// on vérifie si le contenu est correct
         return this.$swal( "Votre requêtes n'est pas correcte !  ", "" , "error");
      }
      axios.delete(`http://localhost:3000/api/users/me/${userId}` ,
        {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Barer ${sessionToken}`
      }})
      .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        localStorage.clear();
        self.$router.push('/')
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div{
  padding: 0;
}

p{
  font-size: 1.5rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
}

</style>