<template>
    <div class="container-fluid">
      <!-- div qui contient notre navbar avec des liens et notre titre important h1 -->
      <div>
        <b-navbar toggleable type="dark" variant="dark" fixed='top'>
          <b-navbar-brand >  <router-link to='/Home' ><img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</router-link></b-navbar-brand>
          <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
          <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item ><router-link to='/Home'>Accueil</router-link></b-nav-item>
              <b-nav-item ><router-link to='/Home/MyProfile' >Mon Profil</router-link></b-nav-item>
              <b-nav-item   @click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        
        <!-- jumbotron met le contenu dans un background gris -->
        <b-jumbotron  >
          <h1 >Nouveau Message</h1>
        </b-jumbotron>
      </div>

      <!-- formulaire pour créer notre nouveau message -->
      <b-form @submit="onSubmit" class="col-md-8 mx-auto form" >
        <!-- titre -->
        <b-form-group label="Votre titre:" label-for="title" class="paddingForm">
          <b-form-input v-model="form.title"  id="title" type="text" required placeholder="Mon titre"></b-form-input>
        </b-form-group>

        <!-- Image -->
        <b-form-group  label-for='attachment' class="paddingForm" >
          <p id="left">Votre Image :</p>
          <b-form-file id="attachment" placeholder="Insérez une image"  accept=" image/png, image/jpg, image/jpeg, image/gif" v-on:change="onImageChange"></b-form-file>
          <p>extensions acceptées : .gif/.jpg/.jpeg/.png</p>
        </b-form-group>

        <!-- texte/contenu -->
        <b-form-group label="Votre texte:" label-for="textarea" class="paddingForm">
          <b-form-textarea v-model="form.content"   id="textarea" type="text"  placeholder="Votre texte" rows="3" max-rows="6"></b-form-textarea>
          <p>les caractères spéciaux acceptés :  -.':)(+;,_!?</p>
        </b-form-group>

        <!-- hr pour la séparation -->
        <hr class="col-8">

        <!-- Valider -->
        <b-button type="submit" variant="success" class="col button">Valider</b-button>
      </b-form>
  </div>
</template>

<script>
  // on importe axios pour nos requêtes
  import axios from 'axios'
  
  // nos constantes pour nos données et des regex pour protéger nos inputs
  const titleRegex = /^[a-zÀ-ÿ\d\-.'!:;)(+?\s]{2,30}$/i;
  const contentRegex = /^[a-zÀ-ÿ\d\-.':)(+;,!?\s]{0,250}$/i;
  const regexNumber = /^\d+$/;
  const regexImg = /\.(gif|jpeg|png|jpg)$/i;

  export default {
  name: 'NewMessage',
  data() {// données
      return {
        form: {
          userId: null,
          title: '',
          attachment: '',
          image: 'undefined',
          content: '',
          likes: 0,
          dislikes: 0,
          sessionToken: null,
        }
      }
    },
  mounted(){
    this.form.sessionToken = JSON.parse(localStorage.getItem('session'));
    this.form.userId = JSON.parse(localStorage.getItem('userId'));// on vérifie si l'utilisateur est connecté 
    if(this.form.userId === undefined || this.form.userId === null){
      this.$router.push('/')
    }
  },
  methods: {
    onImageChange(e){// Dès qu'il y a un changement dans l'input image on récupère les nouvelles données
        console.log(e.target.files[0]);
        this.form.image = e.target.files[0];
        },
    onSubmit(evt) {// On valide notre formulaire pour créé un nouveau message
    console.log(this.form.userId)
    const self = this;
      evt.preventDefault()

      if (!titleRegex.test(this.form.title)) {// regex pour avoir un titre qui contient entre 2 et 30 caractères
          return this.$swal( "Votre titre doit faire entre 2 et 30 caractères !  ", "" , "error");
        }

      if (!contentRegex.test(this.form.content)) { // regex pour avoir un contenu qui contient entre 2 et 30 caractères
        return this.$swal( "Votre contenu ne peut contenir plus de 250 caractères !  ", "" , "error");
      }

      if( !regexNumber.test(this.form.dislikes) || !regexNumber.test(this.form.likes) ){
        return this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
      }

      if(this.form.image == 'undefined'  && this.form.content == '' ){
        return this.$swal("Vous devez remplir au minimum le titre, une image et/ou un texte ", "", "error");
      }

      if (this.form.image != "undefined") {
        if (!regexImg.test(this.form.image.name)) {
          console.log(this.form.image);
          return this.$swal(
            "Devez insérez une image gif/jpg/jpeg/png !  ",
            "",
            "error"
          );
        }
      }
      
      //form data est utilisé pour pouvoir envoyer des images au serveur
      const fd = new FormData();
      fd.append("userId", this.form.userId);
      fd.append("title", this.form.title);
      fd.append("image", this.form.image);
      fd.append("content", this.form.content);
      fd.append("likes", this.form.likes);
      fd.append("dislikes", this.form.dislikes);

    // requête post pour créer un nouveau message
     axios.post('http://localhost:3000/api/messages/new/', fd
      , {
        headers: {
          "Content-Type": "multipart/form-data", // en-tête pour form data
          'Authorization': `Bearer ${this.form.sessionToken}`
        }
      })
      .then(function (reponse) {
        //On traite la suite une fois la réponse obtenue 
        console.log(reponse);
        self.form.image = 'undefined';
        self.$swal("Message ajouté :) ", " " , "success");
        self.$router.push('/Home');
      })
      .catch(function (response) {
        //On traite ici les erreurs éventuellement survenues
        console.log(response);
        window.location.reload();
      });
    },
    deconnexion: function(){//Permet de supprimer les données de connexion et de renvoyer l'utilisateur vers la page de connexion
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
  font-weight: bold;
  text-align: left;
  font-size: 2rem;
  margin-top: 10rem;
}




.button{
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
}

#left{
  text-align: left;
}

nav{
  max-width: 100vw;
}

#textarea{
  font-size: 2rem;
}

</style>