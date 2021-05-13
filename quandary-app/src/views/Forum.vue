<template>
  <div class="about">
    <div class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-3">Ask a Question</h1>
        </div>
      </div>
    </div>
    <QuestionsList />
  </div>
</template>
<script>
import QuestionsList from '../components/QuestionsList';
export default {
  name: 'home',
  components: {
    QuestionsList
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
  .org-description {
    margin-top: 50px;
  }
</style>
