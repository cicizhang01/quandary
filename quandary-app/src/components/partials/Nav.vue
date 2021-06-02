<template>
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-logo" href="/" id="logo">
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
      <!-- Check that the SDK client is not currently loading before accessing is methods -->
      <div v-if="!$auth.loading">
        <!-- show login when not authenticated -->
        <div v-if="!$auth.isAuthenticated" @click="login" class="navbar-item">
          <div class="button is-dark is-rounded">Sign in</div>
        </div>
        <!-- show logout when authenticated -->
        <div v-if="$auth.isAuthenticated" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>
          
          <div class="navbar-dropdown is-right is-boxed">
            <a class="navbar-item" @click="profile">
              <span class="menu-item">Profile</span>
            </a>
            <a class="navbar-item">
              <span class="menu-item">Settings</span>
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              <div class="button is-dark is-rounded is-outlined" @click="logout">Log out</div>
            </a>
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
    },
    profile() {
      this.$router.push({ name: 'profile' });
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
    height: 80px;
    a {
      font-weight: bold;
      color: $dark;
      &.router-link-exact-active {
        color: $blue;
      }
    }
  }
  .navbar-logo {
    background-image: url('../../images/quandary.png');
    background-size: 50px;
    background-position: center;
    background-repeat: no-repeat;
    width: 50px;
    padding: 0 3rem;
  }
  .navbar-end {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-item {
    font-size: medium;
  }
</style>
