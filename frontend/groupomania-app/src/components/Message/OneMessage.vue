<template>
<div class="container-fluid">
    <!-- Section contenant la navbar et notre h1 -->
    <div>
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
      
      <b-jumbotron>
        <h1>Message n°{{messageId}}</h1>
      </b-jumbotron>
    </div>

    <!-- Section contenant la card message, avec le bouton supprimer, le bouton modifier et le bouton nouveau commentaire -->
    <section class="col-md-8 mx-auto  cardMessage " >
      <b-card :title="messageUnique.title" :img-src="messageUnique.attachment" img-alt="Image" img-top :header="'by ' + User.username" tag="article"  bg-variant="dark" text-variant="white" class="text-center mb-2 col-12 mx-auto ">
        <b-card-text> 
            {{messageUnique.content}} <!-- contenu texte si ajouté à la création du message  -->
        </b-card-text>

        <div>
          <b-button variant="success" @click='onLike' class="mx-1 my-1">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
            </svg>
            <span> {{messageUnique.likes}} </span>
          </b-button>
           
          <b-button variant="danger " @click='onDislike' class="mx-1 my-1">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
            </svg>
            <span> {{messageUnique.dislikes}} </span>
          </b-button>
        </div>
      </b-card>

       <!-- Bouton pour modifier le message -->
      <router-link :to='`/Home/ModifyMessage/${messageId}`'>
        <b-button  type="submit" variant="warning" class="col-md-4 mx-2 my-2" v-if="userId == User.id || isAdmin === true">Modifier</b-button>
      </router-link>

      <!-- Bouton pour supprimer le message -->
      <b-button  @click="onSubmit" type="submit" variant="danger" class="col-md-4 mx-2 my-2" v-if="userId == User.id || isAdmin === true">Supprimer</b-button>
      
      <!-- Bouton pour écrire un nouveau commentaire -->
      <b-button v-b-modal.modal-prevent-closing  class="mx-2">Nouveau commentaire</b-button>

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
      <div  :key="index" v-for="(comment, index) in Comments" class="col-10 col-md-7 mx-auto comment">
        
      <b-card  :header='comment.User.username'  bg-variant="dark"   text-variant="white" class="text-center mb-2 col-md-8 mx-auto  ">
        <b-card-text>
          {{comment.content}}
        </b-card-text>
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
const contentRegex = /^[a-zÀ-ÿ\d\-.'!\s]{2,250}$/i;// regex pour le contenu de nos messages
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
      axios.delete(`http://localhost:3000/api/messages/delete/${this.submit.messageId}/${userId}`,
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
</style>