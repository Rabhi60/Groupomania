<template>
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
        <h1 >Modifier mon profil</h1>
      </b-jumbotron>
    </div>

    <!-- section modify qui contient notre formulaire pour modifier notre profil -->
    <section id='modify' class="col-md-8 mx-auto my-5">
      <h2>Modifier mes coordonnées</h2>
  
      <!-- formulaire de modification -->
      <b-form @submit="onSubmit"  class=" mx-auto left">
        <!-- e-mail -->
        <b-form-group id="Email" label="Email:" label-for="email" >
          <b-form-input v-model="form.email" id="email" type="email" required   placeholder="you@example.com"   ></b-form-input>
        </b-form-group>

        <!-- Pseudo -->
        <b-form-group id="Username" label="Pseudo :" label-for="username" >
          <b-form-input v-model="form.username" id="username" type="text" required  placeholder="Pseudo"   ></b-form-input>
        </b-form-group>

        <!-- Nom -->
        <b-form-group id="Firstname" label="Nom :" label-for="firstname" >
          <b-form-input v-model="form.firstname" id="firstname" type="text" required   placeholder="Dupont"   ></b-form-input>
        </b-form-group>

        <!-- Prénom -->
        <b-form-group id="Lastname" label="Prénom:" label-for="lastname" >
          <b-form-input v-model="form.lastname" id="lastname" type="text" required   placeholder="Alain"   ></b-form-input>
        </b-form-group>

        <!-- password -->
        <b-form-group id="Password" label="Password" label-for="password">
          <b-form-input type="password" id="password" aria-describedby="password-help-block" v-model="form.password" placeholder="*********"  required></b-form-input>
          <b-form-text id="password-help-block">
              Votre mot de passe doit contenir au moins 8 caractères, 1 lettre en minuscule, 1 lettre en majuscule, 2 chiffres, 
              ne doit pas contenir d'espaces, de caractères spéciaux, ou d'emoji.
          </b-form-text>
        </b-form-group>

        <!-- Valider -->
        <b-button id="button" type="submit" variant="warning" class="col">Modifier</b-button>
      </b-form>
    
      <hr class="col-8">
    </section>
       
    <!-- section image  -->
    <section id="image" >
      <img src="../../assets/edit.png" width='300' alt="image d'un crayon qui signifie la modification ">
    </section>
  </div>
</template>

<script>
// on importe axios pour  nos requêtes 
import axios from 'axios'

//regex pour le contrôle des inputs côté client
const nameRegex = /^[a-zÀ-ÿ\d\-.'\s]{2,30}$/i;
const emailRegex    = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.{2,}\d)([-+!*$@%_\w]{8,100})$/;
export default {
  name: 'ModifyProfile',// nom de la page
   data() {//données
      return {
        form: {
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            userId: null,
            isAdmin: false,
            sessionToken: null,
        }
      }
    },
  mounted(){
    // constantes qui contiennent nos données
    this.form.sessionToken = JSON.parse(localStorage.getItem('session'));
    this.form.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    this.form.userId = JSON.parse(localStorage.getItem('userId'));// on vérifie si l'utilisateur est connecté
      if(this.form.userId === undefined || this.form.userId === null){
      this.$router.push('/')
    }
  },
  methods: {
    
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
      if(!nameRegex.test(this.form.username)|| !nameRegex.test(this.form.firstname) || !nameRegex.test(this.form.lastname)) {// nameRegex permet de vérifier les caractères utilisés
        return this.$swal("un ou plusieurs champs suivant ne sont pas rempli correctement : ",  "nom, prenom, pseudo" , "error"); 
      }
      if (!passwordRegex.test(this.form.password) || !emailRegex.test(this.form.email)) {// email validator permet d'accepter un mail valide, idem pour le regex
        return this.$swal("un ou plusieurs champs suivant ne sont pas rempli correctement : ", "email, password" ,  "error");       
      }
      if(this.form.isAdmin == 0 || this.form.isAdmin == 1 || this.form.isAdmin === true || this.form.isAdmin === false ){
        axios.put('http://localhost:3000/api/users/me/',{
          id: this.form.userId,
          email: this.form.email,
          username: this.form.username, 
          firstname: this.form.firstname, 
          lastname: this.form.lastname, 
          password: this.form.password, 
          isAdmin: this.form.isAdmin,
        },
        {
        headers: {
          'Authorization': `Barer ${this.form.sessionToken}` 
        }})
        .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        self.$swal("Compte modifié :) ", " " , "success");
        self.$router.push('/Home')
        })
        .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
        });
      } else {// si le champs est incorrect on envoie une erreur
        return this.$swal( "le champ Admin est incorrect !  ", "" , "error");
      }
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
    text-align: left;
}
.left{
  text-align: left;
  font-size: 1.5rem;
}

#button{
  font-weight: bold;
  font-size: 1.5rem;
}
#password-help-block{
  font-size: 1.5rem;
  font-weight: bold;
}
#Password, #Lastname, #Firstname, #Username, #Email{
  font-weight: bold;
}
</style>