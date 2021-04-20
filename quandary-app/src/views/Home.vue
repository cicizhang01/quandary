<template>
<div class="home">
  <section class="main is-dark">
    <div class="main-body">
      <div class="container">
        <h1 class="title">
          Welcome to Quandary
        </h1>
        <h2 class="subtitle">
          Fill out your profile details below
        </h2>
      </div>
    </div>
  </section>
  <section class="form">
    <h1 class="form-body">
      <QuandaryList />
    </h1>
    <h2 class="button-block">
        <button class="button is-dark is-rounded">
          Next
        </button>
    </h2>
  </section>
</div>
</template>
<script>
import QuandaryList from '../components/QuandaryList';
export default {
  name: 'home',
  components: {
    QuandaryList
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
  .main {
    text-align: center;
    height: 250px;
  }
  .main-body .title {
    padding: 60px 0 20px 0;
    font-size: 55px;
  }
  .subtitle {
    font-size: 27px;
  }
  .is-xl {
    font-size: 1.7rem;
  }
  .form {
    text-align: center;
    height: 350px;
    padding: 0px 200px 0px 200px;
  }
  .form-body {
    padding: 20px 20px 20px 20px;
  }
</style>
