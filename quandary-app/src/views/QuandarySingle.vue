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
        <div class="comment">
          <div class="comment-label is-grouped">
            Comment as
            <div class="select" id="comment-username">
              <select>
                <option>Username</option> <!-- Replace with current user's username -->
                <option>Anonymous</option>
              </select>
            </div>
            <button class="button is-primary" v-on:click="onSubmit()">Submit</button>
          </div>
          <div class="comment-box has-addons">
            <textarea class="textarea has-fixed-size" placeholder="Any thoughts?" v-model="comment.body"></textarea>
          </div>
          
        </div>

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
      comment: {
        body: "",
        username: ""
      },
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
    },
    getDate() {
      var time = new Date();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var year = time.getFullYear();
      
      return month + "/" + date + "/" + year;
    },
    onSubmit() {
      if (this.comment.body.length != 0) {
        var comment = {
        answer_id: 2,
        answer_body: this.comment.body,
        date_created: this.getDate(),
        date_modified: this.getDate(),
        count: 0,
        };

        // Should insert new answer into database
        this.answers.push(comment);

        // Reset comment body
        this.comment.body = "";
      }
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
    .comment {
      margin: 1rem 0;
      .comment-label {
        color: $light-gray;
        display: flex;
        align-items: center;
        #comment-username {
          margin-left: 0.75rem;
          margin-right: 24.1rem;
        }
      }
      .comment-box {
        margin-top: 1rem;
      }
    }
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
