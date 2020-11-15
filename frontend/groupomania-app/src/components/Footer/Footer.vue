<template>
  <div class="container-fluid footer">
   <p> {{ copyright }} </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return{
      name: "Groupomania",
    }
  },
  computed: {
      copyright() {
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