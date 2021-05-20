<template>
  <div class="events container">
    <div class="columns is-multiline">
      <div v-for="question in questions" :question="question" :key="question.question_id" class="column is-full">
        <router-link :to="`/quandary/${question.question_id}`">
          <QuestionCard :question="question" />
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
      question: {},
      questions: []
    };
  }, 
  created() {
      this.getData();
  },
  methods : {
      async getData() {
      QuandaryService.getQuestionsData()
      .then(
        (questions => {
          this.$set(this, "questions", questions);
        }).bind(this)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.questions {
  margin-top: 50px;
  text-align: left;
}
</style>
