<template>
    <div class="container-fluid">
        <div>
            <b-navbar toggleable type="dark" variant="dark">
                <b-navbar-brand href="#"> <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
                <b-navbar-toggle target="navbar-toggle-collapse">
                </b-navbar-toggle>
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
        
            <b-jumbotron  >
                <h1 class="py-3">Supprimer mon profil</h1>
            </b-jumbotron>
        </div>
 
        <b-form @submit="onSubmit" id='delete' class="col-md-6 mx-auto my-5 " >
            <h2>Supprimer mon compte</h2>
            <p>Etes-vous sûr(e) de vouloir supprimer votre compte ? ;) </p>
            <hr class="col-8">
            <b-button  type="submit" variant="danger" class="col">Supprimer</b-button>
        </b-form>

        <section id="image">
            <img src="../../assets/delete.png" width='300' alt="image d'une poubelle qui signifie la suppression ">
        </section>
  </div>
</template>

<script>
import axios from 'axios'
let sessionToken = JSON.parse(localStorage.getItem('session'));
let id = JSON.parse(localStorage.getItem('userId'));


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
       axios.delete(`http://localhost:3000/api/users/me/${id}` ,
    {headers: {
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
h1{

  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 1em;

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
 h2{
    text-align: center;
}

</style>