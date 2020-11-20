<template>
  <!-- section qui contient notre footer -->
  <section class="container-fluid footer">
   <h3> {{ copyright }} </h3>
  </section>
</template>

<script>
export default {
  name: 'Footer',// nom de notre page
  data() {// données
    return{
      name: "Groupomania",
    }
  },
  computed: {
    copyright() {// fonction qui contient le mot copyright avec le nom de l'entreprise et l'année actuel
    const currentYear = new Date().getFullYear()
    return `Copyright - ${this.name} -  ${currentYear}`
    }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5.5rem;
  padding-top: 1rem;
  background: #212121;
  color: white;
  font-size: 1.5rem;
}
</style>