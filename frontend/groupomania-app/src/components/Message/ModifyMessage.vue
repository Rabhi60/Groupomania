<template>
    <div class="container-fluid">
      <div>
        <b-navbar toggleable type="dark" variant="dark" fixed='top'>
            <b-navbar-brand> <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
            <b-navbar-toggle target="navbar-toggle-collapse">
            </b-navbar-toggle>
            <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item ><router-link to='/Home' exact>Accueil</router-link></b-nav-item>
                <b-nav-item ><router-link to='/Home/MyProfile' >Mon Profil</router-link></b-nav-item>
                <b-nav-item   @click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-jumbotron>
          <h1 >Modifier mon message</h1>
        </b-jumbotron>
      </div>
    
     <b-form @submit="onSubmit" class="col-md-8 mx-auto form" >
        <b-form-group label="Votre nouveau titre:" label-for="title">
            <b-form-input v-model="form.title"  id="title" type="text" required placeholder="Mon titre"></b-form-input>
        </b-form-group>

        <b-form-group label="Image" label-for="attachment" label-cols-sm="2" >
            <b-form-file type='file' id="attachment"  placeholder="Insérez une image"  accept="image" v-on:change="onImageChange"></b-form-file>
        </b-form-group>

        <b-form-group label="Votre texte:" label-for="textarea">
            <b-form-textarea v-model="form.content"  id="textarea" type="text"  placeholder="Votre texte" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
        <hr class="col-8">
        <b-button type="submit" variant="success" class="col">Valider</b-button>
      </b-form>
  </div>
</template>

<script>
  // on importe axios pour nos requêtes
  import axios from 'axios'

  //  constante avec nos données de connexion et nos regex pour bloquer le mauvais contenu
  let sessionToken = JSON.parse(localStorage.getItem('session'));
  let userId = JSON.parse(localStorage.getItem('userId'));
  let image = 'undefined';
  const titleRegex = /^[a-zÀ-ÿ\d\-.'!\s]{2,30}$/i;
  const contentRegex = /^[a-zÀ-ÿ\d\-.'!\s]{0,250}$/i;
  const regexNumber = /^\d+$/;

  export default {
    name: 'ModifyMessage',

    data() {
        return {
      form: {
        messageId: this.$route.params.messageId,
        userId: userId,
        title: '',
        attachment: '',
        content: '',
        likes: 0,
        dislikes: 0,
        }
      }
    },
    
    methods: {
      
      onSubmit(evt) {
        evt.preventDefault()
        if (!titleRegex.test(this.form.title)) {// regex pour avoir un titre qui contient entre 2 et 30 caractères
            return this.$swal( "Votre titre doit faire entre 2 et 30 caractères !  ", "" , "error");
        }

        if (!contentRegex.test(this.form.content)) { // regex pour avoir un contenu qui contient entre 2 et 30 caractères
          return this.$swal( "Votre contenu ne peut contenir plus de 250 caractères !  ", "" , "error");
        }

        if(!regexNumber.test(this.form.userId) || !regexNumber.test(this.form.dislikes) || !regexNumber.test(this.form.likes) || !regexNumber.test(this.form.messageId) ){
           return this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
        }
        
        const fd = new FormData();
        fd.append("userId", this.form.userId);
        fd.append("title", this.form.title);
        fd.append("image", image);
        fd.append("content", this.form.content);
        fd.append("likes", this.form.likes);
        fd.append("dislikes", this.form.dislikes);
        axios.put(`http://localhost:3000/api/messages/modify/${this.form.messageId}`, fd
        , {
            headers: {
              "Content-Type": "multipart/form-data", 
              'Authorization': `Bearer ${sessionToken}`
            }
        })
        .then(function (reponse) {
          //On traite la suite une fois la réponse obtenue 
          console.log(reponse);
        })
        .catch(function (erreur) {
          //On traite ici les erreurs éventuellement survenues
          console.log(erreur);
        });
      },
      
      onImageChange(e){
      console.log(e.target.files[0]);
      image = e.target.files[0];
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
.form{
  text-align: left;
  font-weight: bold;
}
</style>
