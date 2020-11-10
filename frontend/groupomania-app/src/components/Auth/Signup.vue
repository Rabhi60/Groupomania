<template>
    <div class="container-fluid">
      <div>
        <b-navbar toggleable type="dark" variant="dark">
          <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
          <b-navbar-toggle target="navbar-toggle-collapse">
          </b-navbar-toggle>
            <b-collapse id="navbar-toggle-collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item ><router-link to='/Signup'>Inscription</router-link></b-nav-item>
                <b-nav-item ><router-link to='/' exact>Connexion</router-link></b-nav-item>
              </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-jumbotron  >
                <h1 class="py-3">Inscription</h1>
        </b-jumbotron>
      </div>

       
      <!-- formulaire d'inscription -->
      <b-form @submit="onSubmit"  class="col-8 mx-auto left">
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
          <b-button type="submit" variant="success" class="col">Valider</b-button>
      </b-form>
   </div>
  
</template>


<script>
import axios from 'axios'

export default {
  name: 'Signup',
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
      axios.post('http://localhost:3000/api/users/signup/',{
        email: this.form.email,
        username: this.form.username, 
        firstname: this.form.firstname, 
        lastname: this.form.lastname, 
        password: this.form.password, 
        isAdmin: this.form.isAdmin
      })
      .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        localStorage.setItem('session', JSON.stringify(response.data.token));
        localStorage.setItem('userId', JSON.stringify(response.data.userId));
        // var self = this;
        setTimeout(function() {
             self.$router.push('/Home')
        }, 3000);
        
        
  
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
}
ul{
    padding: 0;
    li{
    list-style-type: none;
    margin: 1em ;
    color: black;
    display: inline;
    }
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
.left{
  text-align: left;
  font-weight: bold;

}


</style>