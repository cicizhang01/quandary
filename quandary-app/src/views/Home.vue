<template>
<div class="home">
  <div v-if="!$auth.loading">
    <section v-if="!$auth.isAuthenticated" class="hero">
      <div class="hero-body">
        <div class="container">
          <div  id="login-button" class="button is-white is-outlined is-rounded" @click="login"> <strong> Log in </strong> </div>
        </div>
      </div>
      <div class="form-button">
        <router-link to="/form">
          <button class="button is-rounded">
            Form
          </button>
        </router-link>
      </div>
    </section>
    <section v-if="$auth.isAuthenticated">
      <div class = "listing">
        <Forum />
      </div>
    </section>
  </div>
</div>
</template>
<script>
import Forum from '../views/Forum';
export default {
  name: 'home',
  components: {
    Forum
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    }
  }
}
</script>
<style lang="scss" scoped>
  .hero {
    text-align: center;
    background-image: url('../images/neon-background-circle.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 800px;
  }
  #login-button {
    margin: 300px;
  }
  .form-button {
    text-align: center;
    margin: 40px 200px 0px 200px;
  }
</style>
