<template>
<div class="home">
  <div class="form-button">
    <router-link to="/form">
      <button class="button is-rounded">
        Form
      </button>
    </router-link>
  </div>
</div>
</template>
<script>
export default {
  name: 'home',
  components: {
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
  .form-button {
    text-align: center;
    padding: 0px 200px 0px 200px;
  }
</style>
