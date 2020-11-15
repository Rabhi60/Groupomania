<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item ><router-link to='/Home' exact>Accueil</router-link></b-nav-item>
          <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
      </b-navbar>
  
      <b-jumbotron  >
          <h1 >Compte Admin</h1>
      </b-jumbotron>
    </div>
 
    <section id='modify' class="col-md-10 mx-auto my-5 ">
      <h2>Modifier le compte</h2>

      <!-- formulaire de modification -->
      <b-form @submit="onSubmit"  class=" mx-auto left">
        <!-- Changement de rôle-->
        <b-form-group id="IsAdmin" label="Changer le rôle :" label-for="isAdmin" >
          
          <b-form-input v-model="form.isAdmin" id="isAdmin" type="text" required   placeholder="0 ou 1"   ></b-form-input>
          <p class="text-align-left">Entrez 1 pour changer le rôle en Admin et 0 pour perdre ce rôle.</p>
        </b-form-group>

        <!-- Valider -->
        <b-button type="submit" variant="warning" class="col button">Modifier</b-button>
      </b-form>

      
     
    </section>

    <hr class="col-8">

    <section id="delete">
      <h2>Supprimer le compte</h2>

      <!-- Bouton pour supprimer le message -->
      <b-button  @click="onDelete" type="submit" variant="danger" class="col-4 mx-2 my-2 button" >Supprimer</b-button>
    </section>
  </div>
</template>

<script>
// on importe axios pour nos requêtes
import axios from 'axios'
//nos constantes avec nos données et un regex
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));
const regexNumber = /^\d+$/;
export default {
  name: 'ModifyProfile',
   data() {
      return {
        form: {
            isAdmin: '',
        }
      }
    },
  methods: {
    onDelete(evt) {
      evt.preventDefault()
      const self = this;
      if( !regexNumber.test(this.params.id) || !regexNumber.test(userId) ){
           return this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
        }
      axios.delete(`http://localhost:3000/api/messages/deleteUser/${this.params.id}/${userId}`, 
        { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Barer ${sessionToken}`
      }})
      .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        self.$router.push('/AdminHome');
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });
    },
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
      if(this.form.isAdmin == 0 || this.form.isAdmin == 1 || this.form.isAdmin === true || this.form.isAdmin === false ){
        axios.put(`http://localhost:3000/api/admin/updateUser/${this.params.id}/`,{
          userId: userId,
          isAdmin: this.form.isAdmin
        },
        {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Barer ${sessionToken}` 
        }})
        .then(function (response) {
          //On traite la suite une fois la réponse obtenue 
          console.log(response);
          self.$router.push('/AdminHome')
          
    
        })
        .catch(function (erreur) {
          //On traite ici les erreurs éventuellement survenues
          console.log(erreur);
        });
      } else {
        return this.$swal( "le champ Admin est incorrect !  ", "" , "error");
      }
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

div{
    padding: 0;
}

p{
    text-align: left;
}
.button{
  font-weight: bold;
}
.left{
    text-align: left;
    font-weight: bold;
}
#delete{
  margin-bottom: 8rem;
}
</style>