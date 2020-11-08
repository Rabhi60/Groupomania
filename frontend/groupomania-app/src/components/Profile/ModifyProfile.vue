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
                     <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        
            <b-jumbotron  >
                <h1 class="py-3">Modifier mon profil</h1>
            </b-jumbotron>
        </div>
 
        <section id='modify' class="col-md-8 mx-auto my-5">
            <h2>Modifier mes coordonnées</h2>
        
            <!-- formulaire de modification -->
            <b-form @submit="onSubmit"  class=" mx-auto left">
            <!-- e-mail -->
            <b-form-group id="email" label="Email:" label-for="email" >
                <b-form-input v-model="form.email" id="email" type="email" required  pattern="[A-z0-9._+-]+[@]{1}[A-z0-9._-]+[.]{1}[A-z]{2,15}" placeholder="you@example.com"   ></b-form-input>
            </b-form-group>

            <!-- Pseudo -->
            <b-form-group id="username" label="Pseudo :" label-for="username" description=" Entrez un pseudo valide">
                <b-form-input v-model="form.username" id="username" type="text" required  pattern="[a-zA-ZÀ-ÿ0-9' -]{1,32}" placeholder="Pseudo"   ></b-form-input>
            </b-form-group>

            <!-- Nom -->
            <b-form-group id="firstname" label="Nom :" label-for="firstname" description=" Un nom de famille valide est requis.">
                <b-form-input v-model="form.firstname" id="firstname" type="text" required  pattern="[a-zA-ZÀ-ÿ' -]{1,32}" placeholder="Dupont"   ></b-form-input>
            </b-form-group>

            <!-- Prénom -->
            <b-form-group id="lastname" label="Prénom:" label-for="lastname" description=" Entrez un prénom valide">
                <b-form-input v-model="form.lastname" id="lastname" type="text" required  pattern="[a-zA-ZÀ-ÿ' -]{1,32}" placeholder="Alain"   ></b-form-input>
            </b-form-group>

            <!-- password -->
            <b-form-group id="input-group-2" label="Password" label-for="password">
                <b-form-input type="password" id="password" aria-describedby="password-help-block" v-model="form.password" required></b-form-input>
                <b-form-text id="password-help-block">
                    Votre mot de passe doit contenir au moins 8 caractères, 1 lettre en minuscule, 1 lettre en majuscule, 2 chiffres, 
                    ne doit pas contenir d'espaces, de caractères spéciaux, ou d'emoji.
                </b-form-text>
            </b-form-group>

            <!-- Valider -->
            <b-button type="submit" variant="warning" class="col">Modifier</b-button>
        </b-form>
           
      
            <hr class="col-8">
           
        </section>
       
        <section id="image" class="my-5">
            <img src="../../assets/edit.png" width='300' alt="image d'un crayon qui signifie la modification ">
        </section>
  </div>
</template>

<script>
import axios from 'axios'
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userIdToken = JSON.parse(localStorage.getItem('userId'));

export default {
  name: 'ModifyProfile',
   data() {
      return {
        form: {
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            isAdmin: false,
        }
      }
    },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
      axios.put('http://localhost:3000/api/users/me/',{
        id: userIdToken,
        email: this.form.email,
        username: this.form.username, 
        firstname: this.form.firstname, 
        lastname: this.form.lastname, 
        password: this.form.password, 
        isAdmin: this.form.isAdmin
      },
      {
  headers: {
    'Authorization': `Barer ${sessionToken}` 
  }})
      .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        self.$router.push('/Home')
        
  
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });
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
p{
    text-align: left;
}
.left{
    text-align: left;
}
</style>