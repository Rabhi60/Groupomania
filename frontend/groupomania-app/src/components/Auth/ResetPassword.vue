<template>
<div class="container-fluid">
      <div>
        <b-navbar toggleable type="dark" variant="dark">
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
                <h1 class="py-3">Nouveau password</h1>
        </b-jumbotron>
      </div>

       
      <!-- formulaire de recupération du mot de passe -->
      <b-form @submit="onSubmit"  class="col-8 mx-auto left">
          <!-- e-mail -->
          <b-form-group id="email" label="Email:" label-for="email" >
              <b-form-input v-model="form.email" id="email" type="email" required  pattern="[A-z0-9._+-]+[@]{1}[A-z0-9._-]+[.]{1}[A-z]{2,15}" placeholder="you@example.com"   ></b-form-input>
          </b-form-group>

          <!-- Valider -->
          <b-button type="submit" variant="success" class="col">Valider</b-button>
      </b-form>


  </div>
</template>

<script>


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
h1{
  font-size: 2.5em;
  font-weight: bold;
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
