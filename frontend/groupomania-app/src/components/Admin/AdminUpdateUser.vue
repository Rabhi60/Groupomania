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
                     <b-nav-item   v-on:click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        
            <b-jumbotron  >
                <h1 class="py-3">Compte Admin</h1>
            </b-jumbotron>
        </div>
 
        <section id='modify' class="col-md-8 mx-auto my-5">
            <h2>Modifier un compte</h2>
    
            <!-- formulaire de modification -->
            <b-form @submit="onSubmit"  class=" mx-auto left">
                <!-- Changement de rôle-->
                <b-form-group id="isAdmin" label="Changer le rôle :" label-for="isAdmin" description=" Entrez un pseudo valide">
                    <b-form-input v-model="form.isAdmin" id="isAdmin" type="text" required   placeholder="0 ou 1"   ></b-form-input>
                </b-form-group>

                <!-- Valider -->
                <b-button type="submit" variant="warning" class="col">Modifier</b-button>
            </b-form>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));

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
    
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
      axios.put(`http://localhost:3000/api/admin/updateUser/${this.params.id}/`,{
        userId: userId,
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