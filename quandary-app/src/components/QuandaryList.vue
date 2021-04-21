<template>
  <div class="container-form has-background-grey-lighter">
    <div class="field is-horizontal is-grouped is-grouped-centered">
      <div class="field">
        <label class="label is-medium">First Name</label>
        <div class="control">
          <input class="input is-light" type="text" placeholder="e.g Jane ">
        </div>
      </div>
      
      <div class="field-last-name">
        <label class="label is-medium">Last Name</label>
        <div class="control">
          <input class="input is-light" type="text" placeholder="e.g Doe ">
        </div>
      </div>

      <div class="field">
        <label class="label is-medium">Pronouns</label>
        <span class="select is-light">
          <select>
            <option selected></option>
            <option>she/her/hers</option>
            <option>he/him/his</option>
            <option>they/them</option>
          </select>
        </span>
      </div>
    </div>
    
    <div class="next-button">
        <button class="button is-dark is-rounded">
          Next
        </button>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/colors";
  .container-form {
    margin: 0px 100px 40px 100px;
    padding: 60px 0px 60px 0px;
    border-radius: 25px;
  }
  .field {
    padding: 0px 30px 0px 30px;
  }
  .field-last-name {
    padding: 0px 70px 0px 0px;
  }
  .control {
    padding: 0px 0px 20px 0px;
  }
  .next-button {
    margin-top: 90px;
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