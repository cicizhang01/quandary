<template>
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="../../images/cat.png">
    </a>
    <!-- Navbar burger: hamburger menu that only appears on mobile devices -->
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbar" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/about" class="navbar-item">About</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <!-- Check that the SDK client is not currently loading before accessing is methods -->
          <div v-if="!$auth.loading">
            <!-- show login when not authenticated -->
            <a v-if="!$auth.isAuthenticated" @click="login" class="button is-dark is-rounded"><strong>Sign in</strong></a>
            <!-- show logout when authenticated -->
            <a v-if="$auth.isAuthenticated" @click="logout" class="button is-dark is-rounded"><strong>Log out</strong></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  name: 'Nav',
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
  nav {
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left: 25px;
    margin-right: 25px;
    a {
      font-weight: bold;
      color: $dark;
      &.router-link-exact-active {
        color: $primary;
      }
    }
  }
</style>
