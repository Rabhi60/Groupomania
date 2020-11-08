<template>
    <div class="container-fluid">
        
     <div class="container-fluid">
      <div>
        <b-navbar toggleable type="dark" variant="dark">
            <b-navbar-brand href="#"> <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
            <b-navbar-toggle target="navbar-toggle-collapse">
            </b-navbar-toggle>
            <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item ><router-link to='/Home' exact>Accueil</router-link></b-nav-item>
                <b-nav-item ><router-link to='/Home/MyProfile' >Mon Profil</router-link></b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <h1 >Modifier mon message</h1>
      </div>
    
      <b-form @submit="onSubmit" class="col-8 mx-auto form" >
        <b-form-group label="Votre nouveau titre:" label-for="title">
            <b-form-input v-model="form.title"  id="title" type="text" required placeholder="Mon titre"></b-form-input>
        </b-form-group>

        <b-form-group label="Votre nouvelle image" label-for="attachment" label-cols-sm="2" label-size="lg">
            <b-form-file id="attachment" size="lg" placeholder="Insérez une image"></b-form-file>
        </b-form-group>
        <hr class="col-8">
        <b-button type="submit" variant="success" class="col">Valider</b-button>
      </b-form>
  </div>
  </div>
</template>

<script>
 import axios from 'axios'

export default {
  
  name: 'newMessage',
  data() {
      return {
        form: {
        idUSERS: '',
        email: '',
        attachment: null,
        likes: 0
        }
          
      }
    },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
    //   const self = this;
    
      axios.post('http://localhost:3000/api/messages/new/',{
         idUSERS: this.form.idUSERS, title: this.form.title, password: this.form.attachment, likes: this.form.likes
      })
      .then(function (reponse) {
        //On traite la suite une fois la réponse obtenue 
         console.log(reponse);
       
        
  
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
margin-top: 2em;
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

</style>
