<template>
  <div class="quandary-single">
      <div class="question-body" v-for="question in question" v-bind:key="question">
        <div class="columns">
          <div class="column is-1" id="upvotes">
            <div>
              <button class="button is-white">
                <span class="icon is-small">
                  <i class="fas fa-heart"></i>
                </span>
              </button>
              <span class="upvotes-text"> {{ question.question_upvotes }} </span>
            </div>
          </div>

          <div class="column is-11">
            <h1 class="title">
            {{ question.question_body }}
            </h1>
            <h2 class="subtitle">
              {{ displayName(question.first_name, question.last_name, question.is_anon) }} <span class="date">| {{ displayDate(question.date_modified) }}</span>
            </h2>
            <span class="tag is-primary is-medium" id="question-topic" v-for="topic in topics" v-bind:key="topic">
              {{ topic }}
            </span>
          </div>
        </div>          
      </div>
    
      <div class="answer-body">
        <div class="comment">
          <div class="columns">
            <div class="column">
              <div class="comment-label is-grouped">
                Comment as
                <div class="select" id="comment-username">
                  <select v-model="comment.is_anon">
                    <option value=0>{{ this.$auth.user.nickname }}</option> <!-- Replace with current user's first and last name; initial selected value has to match v-model-->
                    <option value=1>Anonymous</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column is-2">
              <button class="button is-pulled-right is-primary" v-on:click="onSubmit()">Submit</button>
            </div>
          </div>
          <div class="comment-box has-addons">
            <textarea class="textarea has-fixed-size" placeholder="Any thoughts?" v-model="comment.body"></textarea>
          </div>
          
        </div>

        <div class="is-divider"></div>
        <div v-for="answer in answers" v-bind:key="answer">
          <div class="columns">
            <div class="column is-1" id="upvotes">
              <div>
                <button class="button is-white">
                  <span class="icon is-small">
                    <i class="fas fa-heart"></i>
                  </span>
                </button>
                <span class="upvotes-text"> {{ answer.answer_upvotes }} </span>
              </div>
            </div>

            <div class="column is-11" id="answer">
              <div>
                <section class="answer-header">
                  {{ displayName(answer.first_name, answer.last_name, answer.is_anon) }} <span class="date">| {{ displayDate(answer.date_modified) }}</span> 
                </section>
                <section class="answer-text">
                  {{ answer.answer_body }}
                </section>
              </div>
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
        username: this.$auth.user.nickname, // Replace with current user's first and last name
        is_anon: 0
      },
      question: {},
      answers: {},
      topics: ['Campus Info', 'Food'],
      event: {}
    }
  },
  created() {
    this.getQuandaryData();
  },
  methods: {
    async getQuandaryData() {
      // Get question
      QuandaryService.getQuestion(this.$route.params.id)
      .then(
        (question => {
          this.$set(this, "question", question);
        }).bind(this)
      );
      // Get corresponding answers to the question
      QuandaryService.getQuestionAnswers(this.$route.params.id)
      .then(
        (answers => {
          this.$set(this, "answers", answers);
        }).bind(this)
      );
    },
    displayName(firstName, lastName, isAnon) {
      if (isAnon == 1) {
        return 'Anonymous';
      }
      return firstName + " " + lastName;
    },
    displayDate(currDate) {
      var time = currDate.split(" ");
      var month = time[0].substring(5, 7);
      var date = time[0].substring(8, 10);
      var year = time[0].substring(0, 4);
      var hour = time[1].substring(0, 2);
      var minutes = time[1].substring(3, 5);
      
      return month + "/" + date + "/" + year + " " + hour + ":" + minutes;
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
    onSubmit() {
      if (this.comment.body.length != 0) {
        var comment = {
        answer_id: 2,
        first_name: this.comment.username,
        last_name: '',
        is_anon: this.comment.is_anon, 
        answer_body: this.comment.body,
        date_created: this.getDateTime(),
        date_modified: this.getDateTime(),
        answer_upvotes: 0,
        };

        // Should insert new answer into database
        this.answers.push(comment);

        // Reset comment body
        this.comment.body = "";
      }
    },
    onUpdateCount() {
      
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
      padding: 1.25rem 0;
      padding-bottom: 0.4rem;
      .comment-label {
        color: $light-gray;
        display: flex;
        align-items: center;
        #comment-username {
          margin-left: 0.75rem;
        }
      }
      .comment-box {
        margin-top: 1rem;
      }
    }
    .answer-header {
      font-size: 0.8rem;
      color: $light-gray;
    }
    .answer-text {
      margin: 0.55rem 0 0 0;
    }
    #answer {
      margin-top: .75rem;
      display: flex;
      align-items: center;
      // justify-content: center;
    }
  }
  .date {
        color: $lighter-gray;
  }
  #upvotes {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .upvotes-text {
      color: $light-gray;
    }
  }
</style>
