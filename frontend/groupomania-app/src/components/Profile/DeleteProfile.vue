<template>
  <!-- Div container-fluid qui permet de gerer tout le contenu en prenant tout l'espace visuel -->
  <div class="container-fluid">
    <!-- div qui contient notre navbar et notre titre important h1 -->
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <router-link to='/Home' ><img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</router-link></b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Home' exact>Accueil</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/ModifyProfile' >Modifier mon profil</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/DeleteProfile' >Supprimer mon profil</router-link></b-nav-item>
            <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <!-- jumbotron met le contenu dans un background gris -->
      <b-jumbotron  >
        <h1 >Supprimer mon profil</h1>
      </b-jumbotron>
    </div>
 
    <!-- section delete, cette section contient un titre h2, un paragraphe, un hr qui permet de faire une séparation et  du bouton pour supprimer le compte -->
    <section  id='delete' class="col-md-6 mx-auto my-5 " >
        <h2>Supprimer mon compte</h2>
        <p>Etes-vous sûr(e) de vouloir supprimer votre compte ? ;) </p>
        <hr class="col-8">
        <b-button @click="onSubmit"  type="submit" variant="danger" class="col button">Supprimer</b-button>
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

const regexNumber = /^\d+$/;

export default {
  name: 'DeleteProfile',// nom de la page 
   data() {
       return{
          userId: null,
          sessionToken: null
       }
    },
  mounted(){
    this.sessionToken = JSON.parse(localStorage.getItem('session'));
    this.userId = JSON.parse(localStorage.getItem('userId'));// si l'utilisateur n'est pas connecté on le renvoie vers la page de connexion
      if(this.userId === undefined || this.userId === null){
      this.$router.push('/')
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
      if ( !regexNumber.test(this.userId) ) {// on vérifie si le contenu est correct
         return this.$swal( "Votre requêtes n'est pas correcte !  ", "" , "error");
      }
      axios.delete(`http://localhost:3000/api/users/me/${this.userId}` ,
        {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Barer ${this.sessionToken}`
      }})
      .then(function (response) {
        //On traite la suite une fois la réponse obtenue, on supprime le localStorage et on est redirigé vers la page de connexion
        console.log(response);
        localStorage.clear();
        self.$router.push('/')
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });
    },
    
    deconnexion: function(){//Permet de supprimer les données de connexion et de renvoyer l'utilisateur vers la page de connexion
      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>

<!-- la partie style nous permet de modifier le style css/scss, scoped nous permet d'excuter ce code en sur cette page seulement  -->
<style scoped lang="scss">
div{
  padding: 0;
}

p{
  font-size: 1.5rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.button{
  font-size: 1.5rem;
  font-weight: bold;
}

</style>