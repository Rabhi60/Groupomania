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
        <h1 >Nouveau password</h1>
      </b-jumbotron>
    </div>

       
      <!-- formulaire de recupération du mot de passe -->
      <b-form @submit="onSubmit"  class="col-md-8 mx-auto my-5 left">
          <!-- e-mail -->
          <b-form-group id="Email" label="Email:" label-for="email" >
              <b-form-input v-model="form.email" id="email" type="email" required placeholder="you@example.com"   ></b-form-input>
          </b-form-group>

          <!-- Valider -->
          <b-button type="submit" variant="success" class="col button">Valider</b-button>
      </b-form>


  </div>
</template>

<script>
//constante 
const emailRegex    = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;// regex pour l'email

export default {
  name: 'ResetPassword',
  data() {
      return {
        form: {
          email: '',
        }
      }
    },
    methods: {
      onSubmit(evt){
        evt.preventDefault()
        if ( !emailRegex.test(this.form.email)) {// email validator permet d'accepter un mail valide, idem pour le regex
          return this.$swal(
            "Votre email est incorrect ",
            "" ,
            "error");
        }        
        this.$swal(
            "Nous avons envoyer un mail à l'adresse : ",
            `${this.form.email}` ,
            "success");
        setTimeout(() => {
            this.$router.push('/');
        }, 3000);
      }
    }
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
.button{
  font-size: 1.5rem;
}
</style>
