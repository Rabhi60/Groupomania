<template>
<div class="container-fluid">
    <!-- Section contenant la navbar et notre h1 -->
    <div >
      <b-navbar toggleable type="dark" variant="dark" fixed='top'>
        <b-navbar-brand > <img alt="Groupomania logo" width='50' src="../../assets/iconbis.png">Groupomania</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
        </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item ><router-link to='/Home/NewMessage'>Nouveau message</router-link></b-nav-item>
            <b-nav-item ><router-link to='/Home/MyProfile' >Mon profil</router-link></b-nav-item>
            <b-nav-item  ><router-link to='/Home' exact >Accueil</router-link></b-nav-item>
            <b-nav-item   @click="deconnexion"  class="deconnexion">Déconnexion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      
      <!-- jumbotron met le contenu dans un background gris -->
      <b-jumbotron>
        <h1 id="title1" >{{messageUnique.title}}</h1>
      </b-jumbotron>
    </div>

    <!-- Section contenant la card message, avec le bouton supprimer, le bouton modifier et le bouton nouveau commentaire -->
    <section class="col-md-10 col-lg-8  mx-auto  cardMessage " >
      <b-card :img-src="messageUnique.attachment" :img-alt="messageUnique.title" img-top :header="'by ' + User.username" tag="article" style="width: 100%" bg-variant="dark" text-variant="white" class="h2 text-center mb-2 col-12 mx-auto ">
        <b-card-text > 
          <h3>{{messageUnique.title}}</h3>
            <p>{{messageUnique.content}}</p> <!-- contenu texte si ajouté à la création du message  -->
            <span id="dateMessage">{{messageUnique.createdAt | moment("from", "now")}}</span>
        </b-card-text>

        <!-- bouton likes et dislikes avec leurs icones -->
        <div id="likesAndDislikes">
          <b-button variant="success" @click='onLike' class="mx-1 my-1">
            <b-icon  icon="hand-thumbs-up"></b-icon>
            <span id="green"> {{messageUnique.likes}} </span>
          </b-button>
           
          <b-button variant="danger " @click='onDislike' class="mx-1 my-1">
            <b-icon  icon="hand-thumbs-down"></b-icon>
            <span id="red"> {{messageUnique.dislikes}} </span>
          </b-button>
           
        </div>
      </b-card>

       <!-- Bouton pour modifier le message -->
      <router-link :to='`/Home/ModifyMessage/${messageId}`'>
        <b-button  type="submit" variant="warning" class="col-md-4 mx-2 my-2 button" v-if="userId == User.id || isAdmin === true">Modifier</b-button>
      </router-link>

      <!-- Bouton pour supprimer le message -->
      <b-button  @click="onSubmit" type="submit" variant="danger" class="col-md-4 mx-2 my-2 button" v-if="userId == User.id || isAdmin === true">Supprimer</b-button>
      
      <!-- Bouton pour écrire un nouveau commentaire -->
      <b-button v-b-modal.modal-prevent-closing  class="mx-2 col col-md-6 button">Nouveau commentaire</b-button>

       <!-- contient notre modal -->
      <b-modal id="modal-prevent-closing" ref="modal" title="Nouveau commentaire" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group :state="commentState" label="Commentaire" label-for="comment" invalid-feedback="Comment is required">
            <b-form-input id="comment" v-model="submit.comment" :state="commentState" required ></b-form-input>
          </b-form-group>
        </form>
      </b-modal> 
    </section>

    <section >
      <div  :key="index" v-for="(comment, index) in Comments" class="col-10  mx-auto comment">
        
      <b-card  :header='comment.User.username'  bg-variant="dark"   text-variant="white" class="text-center mb-2  mx-auto h3 ">
    
        <b-card-text>
          <p>{{comment.content}}</p>
        </b-card-text>
         <span id="dateComment" class="py-1 px-1">{{comment.createdAt | moment("from", "now")}}</span>
        <router-link :to='`/Home/OneMessage/${messageId}/DeleteComment/${comment.id}`' v-if="userId == comment.User.id || isAdmin === true">
          <b-button  variant='danger' class="float-right " >X</b-button>
        </router-link>
      </b-card>

    </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
let sessionToken = JSON.parse(localStorage.getItem('session'));
let userId = JSON.parse(localStorage.getItem('userId'));
let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
const contentRegex = /^[a-zÀ-ÿ\d\-.':);,!\s]{0,250}$/i;// regex pour le contenu de nos messages
const regexNumber = /^\d+$/;
export default {
  name: 'OneMessage',
  data() {
       return{
        messageId: this.$route.params.messageId,
        isAdmin: isAdmin,
        userId: userId,
        messageUnique: [],
        User: [],
        usernameComment: '',
        commentState: null,
        Comments:[],
 
        submit:{
          messageId: this.$route.params.messageId,
          comment: '',
          commentId: '',
        }
       }
    },
  mounted(){
      let self = this;
      if(userId === undefined){
      this.$router.push('/')
      }
       if ( !regexNumber.test(this.messageId) ) {// on vérifie si le contenu est correct
           this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
           window.location.replace('/Home')
        }
    axios.get(`http://localhost:3000/api/messages/${this.messageId}`,
      {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Barer ${sessionToken}`
    }})
      .then(function (response) {
        self.messageUnique = response.data;
        self.User = response.data.User;
        self.Comments = response.data.Comments;
        self.likes = response.data.likes;
        
        console.log(response.data);
        
      })
      .catch(function (erreur) {
        console.log(erreur);
        window.location.reload();
      })
    
  },
  methods: {
    
    onSubmit(evt) {
      evt.preventDefault()
      const self = this;
      if ( !regexNumber.test(this.submit.messageId) ) {// on vérifie si le contenu est correct
          return this.$swal( "Votre requête ne peut contenir que des chiffres !  ", "" , "error");// la requête ne peut contenir que des chiffres
        }
      axios.delete(`http://localhost:3000/api/messages/delete/${this.submit.messageId}`,
        { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Barer ${sessionToken}`
  }})
      .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        self.$router.push('/Home');
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });
    },
    deconnexion: function(){
        localStorage.clear();
        this.$router.push('/');
    },
     checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.commentState = valid
        return valid
      },
      resetModal() {
        this.comment = '',
        this.commentState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return 
        }
        if (!contentRegex.test(this.submit.content) || !regexNumber.test(this.userId) || !regexNumber.test(this.submit.messageId) ) {// on vérifie si le contenu est correct
         return this.$swal( "Votre contenu doit contenir entre 2 et de 250 caractères !  ", "" , "error");
        }
        axios.post(`http://localhost:3000/api/messages/${this.submit.messageId}/newComment/`,{ userId: this.userId, content: this.submit.comment },
      {headers: {
      'Authorization': `Barer ${sessionToken}`
    }}).then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        window.location.reload();
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      onLike() {
       if ( !regexNumber.test(userId) || !regexNumber.test(this.submit.messageId) ) {// on vérifie si le contenu est correct
         return this.$swal( "Votre requêtes n'est pas correcte !  ", "" , "error");
        }
        axios.post(`http://localhost:3000/api/messages/${this.submit.messageId}/like`, { userId: userId},
      {headers: {
      
      'Authorization': `Barer ${sessionToken}`
    }}).then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        window.location.reload();
      })
      .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });
      },
      onDislike(){
         if ( !regexNumber.test(userId) || !regexNumber.test(this.submit.messageId) ) {// on vérifie si le contenu est correct
         return this.$swal( "Votre requêtes n'est pas correcte !  ", "" , "error");
        }
          axios.post(`http://localhost:3000/api/messages/${this.submit.messageId}/dislike`, { userId: userId},
      {headers: {
 
      'Authorization': `Barer ${sessionToken}`
    }}).then(function (response) {
        //On traite la suite une fois la réponse obtenue 
        console.log(response);
        window.location.reload();
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

img{
  max-height: 50vh;
}
div{
  padding: 0;
}
.cardMessage{
  margin-top: 2rem;
  padding-bottom: 8rem;
}
.comment{
 margin : 0 auto 5em auto;
}
.container-fluid{
  margin-bottom: 10rem;
  
}
#likesAndDislikes{
  float: right;
}
#red{
  font-weight: bold;
  font-size: 2rem;
}
#green{
  font-weight: bold;
  font-size: 2rem;
}
#dateMessage{
  font-size: 1.2rem;
}
#dateComment{
  font-size: 1.2rem;
  float: left;
}
.button{
  font-weight: bold;
  font-size: 1.5rem;
}
</style>