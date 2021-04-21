<template>
<div class="form">
  <section class="main">
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
  <section class="form-block">
    <QuandaryList />
  </section>
</div>
</template>
<script>
import QuandaryList from '../components/QuandaryList';
export default {
  name: 'form',
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
  .form-block {
    text-align: center;
    height: 350px;
    // margin: auto;
  }
</style>
