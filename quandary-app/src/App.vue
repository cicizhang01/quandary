<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>
<script>
import Nav from './components/partials/Nav.vue';

export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>
<style lang="scss">
@import "assets/colors";

#app {
  font-family: 'Muli', 'Source Sans', 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $dark;
}
</style>
