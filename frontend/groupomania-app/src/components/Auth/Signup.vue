<template>
    <div class="container-fluid">
      <div>
        <b-navbar toggleable type="dark" variant="dark" fixed='top'>
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
          <h1 >Inscription</h1>
        </b-jumbotron>
      </div>

       
      <!-- formulaire d'inscription -->
      <b-form @submit="onSubmit"  class="col-md-8 mx-auto left">
          <!-- e-mail -->
          <b-form-group id="Email" label="Email:" label-for="email" >
              <b-form-input v-model="form.email" id="email" type="email" required   placeholder="you@example.com"   ></b-form-input>
          </b-form-group>

          <!-- Pseudo -->
          <b-form-group id="Username" label="Pseudo :" label-for="username" >
              <b-form-input v-model="form.username" id="username" type="text" required    placeholder="Pseudo"   ></b-form-input>
          </b-form-group>

          <!-- Nom -->
          <b-form-group id="Firstname" label="Nom :" label-for="firstname" >
              <b-form-input v-model="form.firstname" id="firstname"  type="text" required    placeholder="Dupont"   ></b-form-input>
          </b-form-group>

          <!-- Prénom -->
          <b-form-group id="Lastname" label="Prénom:" label-for="lastname" >
              <b-form-input v-model="form.lastname" id="lastname" type="text" required     placeholder="Alain"   ></b-form-input>
          </b-form-group>

          <!-- password -->
          <b-form-group id="Password" label="Password" label-for="password">
              <b-form-input type="password" id="password" aria-describedby="password-help-block"  placeholder='********' v-model="form.password" required></b-form-input>
              <b-form-text id="password-help-block">
                  Votre mot de passe doit contenir au moins 8 caractères, 1 lettre en minuscule, 1 lettre en majuscule, 2 chiffres, 
                  ne doit pas contenir d'espaces, de caractères spéciaux, ou d'emoji.
              </b-form-text>
          </b-form-group>

          <!-- Valider -->
          <b-button type="submit" variant="success" class="col button">Valider</b-button>
      </b-form>
   </div>
  
</template>


<script>
//import
import axios from 'axios'

//regex pour le contrôle des inputs côté client
const nameRegex = /^[a-zÀ-ÿ\d\-.'\s]{2,30}$/i;
const emailRegex    = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.{2,}\d)([-+!*$@%_\w]{8,100})$/;
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
      if(!nameRegex.test(this.form.username)|| !nameRegex.test(this.form.firstname) || !nameRegex.test(this.form.lastname)) {// nameRegex permet de vérifier les caractères utilisés
      return this.$swal(
                "un ou plusieurs champs suivant ne sont pas rempli correctement : ",
                `nom, prenom, pseudo` ,
                "error");
    }
    if (!passwordRegex.test(this.form.password) || !emailRegex.test(this.form.email)) {// email validator permet d'accepter un mail valide, idem pour le regex
       return this.$swal(
                "un ou plusieurs champs suivant ne sont pas rempli correctement : ",
                "email, password" ,
                "error");
    }
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
         localStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin));
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
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

div{
  padding: 0;
}
.left{
  text-align: left;
  font-weight: bold;
}
.container-fluid{
  margin-bottom: 8rem;
}
.button{
  font-size: 1.5rem;
}
</style>