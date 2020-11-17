<template>
  <div class="container-fluid">
    <!-- div contenant la partie navbar qui contient un lien vers l'inscription  et la page actuelle -->
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Signup'>Inscription</router-link></b-nav-item>
            <b-nav-item ><router-link to='/' exact>Connexion</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron  >
        <h1 >Connexion</h1>
      </b-jumbotron>
    </div>

    <!-- formulaire de connexion -->
    <b-form @submit="onSubmit"   class="col-md-8 mx-auto left">
      <!-- La partie e-mail du formulaire de connexion -->
      <b-form-group id="email" label="Email:" label-for="email" >
        <b-form-input v-model="form.email" id="email" type="email" required   placeholder="you@example.com"   ></b-form-input>
      </b-form-group>

      <!-- la partie password du formilaire de connexion-->
      <b-form-group id="input-group-2" label="Password" label-for="password">
        <b-form-input type="password" id="password" aria-describedby="password-help-block"  v-model="form.password" required></b-form-input>
        <b-form-text id="password-help-block">
          Votre mot de passe doit contenir au moins 8 caractères, 1 lettre en minuscule, 1 lettre en majuscule, 2 chiffres, 
          ne doit pas contenir d'espaces, de caractères spéciaux, ou d'emoji.
        </b-form-text>
      </b-form-group>

      <!-- Valider le formulaire de connexion-->
      <b-button type="submit" variant="success" class="col button">Valider</b-button>
    </b-form>

    <!-- hr permet de faire une séparation  -->
    <hr class='col-8'>

    <!-- Mot de passe oublié, on est redirigé vers la page pour demander un nouveau mot de passe -->
    <div>
      <router-link to="/ResetPassword/">
        <p>Mot de passe oublie / connexion impossible ?</p>
      </router-link>
    </div>
  </div>
</template>

<script>
//import axios pour nos requêtes
 import axios from 'axios'

//regex pour le contrôle des inputs côté client
const emailRegex    = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.{2,}\d)([-+!*$@%_\w]{8,100})$/;
export default {
  
  name: 'Login',
  data() {
      return {
        form: {
          email: '',
          password: '',
        }
          
      }
    },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
       if (!passwordRegex.test(this.form.password) || !emailRegex.test(this.form.email)) {// email validator permet d'accepter un mail valide, idem pour le regex
       return this.$swal(
                "un ou plusieurs champs suivant ne sont pas rempli correctement : ",
                "email, password" ,
                "error");
    }
      axios.post('http://localhost:3000/api/users/login/',{
         email: this.form.email, password: this.form.password
      })
      .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
         console.log(response);
         localStorage.setItem('session', JSON.stringify(response.data.token));
         localStorage.setItem('userId', JSON.stringify(response.data.userId));
         localStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin));
        setTimeout(function() {
             self.$router.push('/Home')
        }, 1000);
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

div{
  padding: 0;
  margin: 0;
}
.left{
  text-align: left;
  font-weight: bold;
}
.button{
  font-size: 1.5rem;
}
</style>
