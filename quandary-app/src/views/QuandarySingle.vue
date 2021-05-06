<template>
  <div class="quandary-single">
    
      <div class="question-body">
        <div class="columns">
          <div class="column is-1" id="upvotes">
            {{ question.count }}
          </div>
          <div class="column is-11">
            <h1 class="title">
            {{ question.question_body }}
          </h1>
          <h2 class="subtitle">
            Anonymous | {{ question.date_modified }}
          </h2>
          <span class="tag is-primary is-medium" id="question-topic" v-for="topic in topics" v-bind:key="topic">
            {{ topic }}
          </span>
         </div>
        </div>          
      </div>
    
      <div class="answer-body">
        <div class="is-divider"></div>
        <div v-for="answer in answers" v-bind:key="answer">
          <div class="columns">
            <div class="column is-1" id="upvotes">
              {{ answer.count }}
            </div>
            <div class="column is-11">
              <section class="answer-header">
                Anonymous <span class="date">| {{ answer.date_modified }}</span> 
              </section>
              <section class="answer-text">
                {{ answer.answer_body }}
              </section>
            </div>
          </div>
          <div class="is-divider"></div>
        </div>
      </div>
  </div>
</template>
<script>
import QuandaryService from '@/services/QuandaryService.js';
export default {
  name: 'QuandarySingle',
  data() {
    return {
      question: {
        question_id: 1,
        question_body: 'Where is your favorite place to go eat?',
        user_id: 2,
        is_anon: true,
        date_created: '12/25/2019',
        date_modified: '12/25/2019',
        count: 17, 
      }
      ,
      answers: [
        {
          answer_id: 1,
          answer_body: 'Chandler',
          date_created: '12/25/2019',
          date_modified: '12/25/2019',
          count: 3,
        },
        {
          answer_id: 2,
          answer_body: 'Broad',
          date_created: '12/27/2019',
          date_modified: '12/27/2019',
          count: 5,
        }
      ],
      topics: ['Campus Info', 'Food']
      ,
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

<style lang="scss">
@import "../assets/colors";
  .quandary-single {
    background-color: $lighter-gray;
    border-radius: 25px;
    width: 900px;
    margin: auto;
    padding: 40px 40px 30px 40px;
  }
  .question-body {
    background-color: white;
    padding: 50px 50px 50px 50px;
    border-radius: 1rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    .subtitle {
      font-size: 1rem;
      color: $light-gray;
    }
  }
  #question-topic {
    margin: -1rem 0.75rem 0 0;
  }
  .answer-body {
    background-color: white;
    padding: 25px 50px;
    margin: 20px 0;
    border-radius: 1rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    .answer-header {
      font-size: 0.8rem;
      color: $light-gray;
      .date {
        color: $lighter-gray;
      }
    }
    .answer-text {
      padding: 0.4rem 0 0 0;
    }
  }
  #upvotes {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
