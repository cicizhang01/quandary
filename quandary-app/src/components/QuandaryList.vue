<template>
  <div class="field">
    <label class="label is-medium">First Name</label>
    <div class="control">
      <input class="input" type="text" placeholder="e.g Jane ">
    </div>
    <label class="label is-medium">Last Name</label>
    <div class="control">
      <input class="input" type="text" placeholder="e.g Doe">
    </div>
  </div>
  
</template>

<style lang="scss">
  .label {
    padding: 20px 0px 0px 0px;
  }
  .control {
    padding: 0px 300px 20px 300px;
  }
</style>

<!--
<template>
  <div class="events container">
    <h2 class="subtitle is-3">
    Check out our upcoming events
    </h2>
    <div class="columns is-multiline">
      <div v-for="event in events" :event="event" :key="event.id" class="column is-one-quarter">
        <router-link :to="'/quandary/' + event.id">
          <QuandaryCard :event="event" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import QuandaryCard from "@/components/QuandaryCard";
import QuandaryService from '@/services/QuandaryService.js'; // NEW
export default {
  name: "QuandaryList",
  components: {
    QuandaryCard
  },
  data() {
    return {
      event: {},
      events: []
    };
  },
  created() {
    this.getQuandaryData();
  },
  // NEW
  methods: {
    async getQuandaryData() {
      QuandaryService.getQuandary()
      .then(
        (events => {
          this.$set(this, "events", events);
        }).bind(this)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
  .events {
    margin-top: 100px;
    text-align: center;
  }
</style>
-->