<template>
  <div class="events container">
    <div class="columns is-multiline">
      <div v-for="event in events" :event="event" :key="event.question_id" class="column is-full">
        <router-link :to="`/event/${event.question_id}`">
          <QuestionCard :event="event" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionCard from "@/components/QuestionCard";
import QuandaryService from '@/services/QuandaryService.js';
export default {
  name: "QuestionsList",
  components: {
    QuestionCard
  },
  data() {
    return {
      event: {},
      events: []
    };
  }, 
  created() {
      this.getData();
  },
  methods : {
      async getData() {
      QuandaryService.getQuestionsData()
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
  margin-top: 50px;
  text-align: left;
}
</style>
