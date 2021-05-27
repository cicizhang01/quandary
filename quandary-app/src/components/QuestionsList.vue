<template>
  <div class="events container">
    <div class="columns is-multiline">
      <div v-for="question in questions" :question="question" :key="question.question_id" class="column is-full">
        <div class="question-card">
          <div class="card">
            <div class="columns">
              <div class="column is-1" id="upvotes">
                <div>
                  <button class="button is-white is-medium" v-if="user_question_upvotes.includes(question.question_id)" v-on:click="onUpdateQuestionCount(question)">
                    <span class="icon is-small">
                      <i class="fas fa-heart" id="solid-heart"></i>
                    </span>
                  </button>

                  <button class="button is-white is-medium" v-else v-on:click="onUpdateQuestionCount(question)">
                    <span class="icon is-small">
                      <i class="far fa-heart" id="regular-heart"></i>
                    </span>
                  </button>
                  
                  <div class="upvotes-text">{{question.question_upvotes}}</div>
                </div>
              </div>
                        
              <div class= "column is-11">
                <h2 class="question-date">{{ displayDate(question.date_modified) }}</h2>
                  <div class = "test">
                    <router-link :to="`/${question.question_id}`">
                      <h1 class="title">{{ question.question_body }}</h1>
                    </router-link>
                  </div>

                  <div :key="trigger">
                    <div class="tag is-primary is-medium" id="question-topic" v-for="topic in topics[question.question_id]" :topic="topic" :key="topic.topic_id">
                      {{ topic.topic_name }}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuandaryService from '@/services/QuandaryService.js';

export default {
  name: "QuestionsList",
  components: {
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  data() {
    return {
      question: {},
      questions: [],
      topics: {},
      topic: {},
      trigger: 0,

      user_question_upvotes: [],

      user: {
        user_id: 4, // Replace with some method to find current user's user_id
        first_name: 'Sandy', // Replace with current user's first and last name
        last_name: 'Hamster',
      }
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
            questions.forEach(q => {
              QuandaryService.getQuestionTopics(q.question_id)
                .then(
                  (topics => {
                    this.trigger += 1;
                    this.topics[q.question_id] = topics; 
                  }).bind(this)
                );
            });
            this.$set(this, "questions", questions);
          }).bind(this)
        );

      QuandaryService.getQuestionsData()
        .then(
          (questions => {
            this.$set(this, "questions", questions);
            this.testing = questions;
          }).bind(this)
        );

      QuandaryService.getQuestionUpvotes(this.user.user_id)
        .then(
          (upvotes => {
            this.$set(this, "user_question_upvotes", upvotes);
          }).bind(this)
        );
    },

    displayDate(currDate) {
      var datetime = currDate.split(" ");
      var date = datetime[0].split("-");
      var time = datetime[1].split(":");
      var month = date[1];
      var day = date[2];
      var year = date[0];
      var hour = time[0];
      var minutes = time[1];
      
      return month + "/" + day + "/" + year + " " + hour + ":" + minutes;
    },

    getDateTime() {
      var time = new Date();
      var month = ('0' + (time.getMonth() + 1)).slice(-2);
      var date = ('0' + time.getDate()).slice(-2);
      var year = time.getFullYear();
      var hour = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
            
      return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds;
    },

    onUpdateQuestionCount(question) {
      const index = this.user_question_upvotes.indexOf(question.question_id);
      if (index > -1) {
        this.user_question_upvotes.splice(index, 1);
        question.question_upvotes -= 1;
      }
      else {
        this.user_question_upvotes.push(question.question_id);
        question.question_upvotes += 1;
      }
      QuandaryService.updateQuestionCount(this.user.user_id, question.question_id);
    },
  },      
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
.questions {
  margin-top: 50px;
  text-align: left;
}
.card {
  text-align: left;
  background-color: rgba(128, 128, 128, 0.021);
  padding: 50px 50px 50px 50px;
  border-radius: 1rem;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  .question-date {
    font-size: 1rem;
    color: gray;
  }
  .title {
    margin: 0.5rem 0 1rem 0;
  }
}
.question-date {
  color: rgb(0, 0, 0);
  font-size: 0.75em;
  top: 0;
  right: 0;
}
#question-topic {
  margin: -1rem 0.75rem 0 0;
}
#upvotes {
  display: flex;
  text-align: center;
  padding: 1rem 0.5rem 0.5rem;
  .upvotes-text {
    color: $light-gray;
  }
  #solid-heart {
    color: $pink;
  }
  #regular-heart {
    color: $light-gray;
  }
}
</style>
