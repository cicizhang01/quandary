<template>
  <div class="quandary-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ event.name }}
          </h1>
          <h2 class="subtitle ">
            <strong>Date:</strong> {{ event.date }}
            <br>
            <strong>Time:</strong> {{ event.time }}
          </h2>
        </div>
      </div>
    </section>
    <section class="quandary-content">
      <div class="container">
        <p class="is-size-4 description">{{ event.description }}</p>
        <p class="is-size-5"><strong>Location:</strong> {{ event.location }}</p>
        <p class="is-size-5"><strong>Category:</strong> {{ event.category }}</p>
        <div class="event-images columns is-multiline has-text-centered">
          <div v-for="image in event.images" :key="image.id" class="column is-one-third">
            <img :src="image" :alt="event.name"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import QuandaryService from '@/services/QuandaryService.js';
export default {
  name: 'QuandarySingle',
  data() {
    return {
      event: {}
    }
  },
  created() {
    this.getQuandaryData();
  },
  methods: {
    async getQuandaryData() {
      // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently()

      // Use the quandaryService to call the getQuandarySingle method
      QuandaryService.getQuandarySingle(this.$route.params.id, accessToken)
      .then(
        (event => {
          this.$set(this, "event", event);
        }).bind(this)
      );
    }
  }
}
</script>
