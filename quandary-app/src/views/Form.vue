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

    <div class="container-form has-background-grey-lighter">
        <FormGeneral/>
        <div class="next-button">
            <button class="button is-dark is-rounded">
            Next
            </button>
        </div>
    </div>
  </section>
</div>
</template>
<script>
import FormGeneral from '../components/FormGeneral';

// import FormTopics from '../components/FormTopics';

export default {
  name: 'form',
  components: {
    FormGeneral
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
  }
  .container-form {
    margin: 0px 100px 40px 100px;
    padding: 60px 0px 60px 0px;
    border-radius: 25px;
  }
</style>
