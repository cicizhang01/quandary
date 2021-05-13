<template>
  <div class="quandary-single">
      <div class="question-body" >
        <div class="columns">
          <div class="column is-1" id="upvotes">
            <div>
              <button class="button is-white" v-on:click="onUpdateQuestionCount(question[0])">
                <span class="icon is-small">
                  <i class="fas fa-heart"></i>
                </span>
              </button>
              <div class="upvotes-text"> {{ question[0].question_upvotes }} </div>
            </div>
          </div>

          <div class="column is-10">
            <h1 class="title">
            {{ question[0].question_body }}
            </h1>
            <h2 class="subtitle">
              {{ displayName(question[0].first_name, question[0].last_name, question[0].is_anon) }} <span class="date">| {{ displayDate(question[0].date_modified) }}</span>
            </h2>
            <span class="tag is-primary is-medium" id="question-topic" v-for="topic in topics" v-bind:key="topic">
              {{ topic }}
            </span>
          </div>

          <div class="column is-1">
            <section v-if="displayName(question.first_name, question.last_name, 0) === displayName(user.first_name, user.last_name, 0)"> 
              <div class="dropdown is-right is-hoverable">
                <div class="dropdown-trigger">
                  <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span class="icon is-small">
                      <i class="fas fa-ellipsis-v" ></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <button class="button is-white">
                        <span class="icon is-small">
                          <i class="fas fa-pencil-alt"></i>
                        </span>
                        <span class="dropdown-text"> Edit </span>
                      </button>
                    </div>
                    <div class="dropdown-item">
                      <button class="button is-white">
                        <span class="icon is-small">
                          <i class="far fa-trash-alt"></i>
                        </span>
                        <span class="dropdown-text"> Delete </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
                    <option value=0>{{ displayName(user.first_name, user.last_name, 0) }}</option>
                    <option value=1>{{ displayName(user.first_name, user.last_name, 1) }}</option>
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

        <div class="filter"> 
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">

                <span> Filter </span>
                <span class="icon is-small">
                  <i class="fas fa-sort" ></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <button class="button is-white" v-on:click="sortRecent()">
                    <span class="icon is-small">
                      <i class="fas fa-history"></i>
                    </span>
                    <span class="dropdown-text"> Most Recent </span>
                  </button>
                </div>
                <div class="dropdown-item">
                  <button class="button is-white" v-on:click="sortUpvotes()">
                    <span class="icon is-small">
                      <i class="fas fa-heart"></i>
                    </span>
                    <span class="dropdown-text"> Most Upvoted </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="is-divider"></div>
        <div v-for="answer in answers" v-bind:key="answer">
          <div class="columns">
            <div class="column is-1" id="upvotes">
              <div>
                <button class="button is-white" v-on:click="onUpdateAnswerCount(answer)">
                  <span class="icon is-small">
                    <i class="fas fa-heart"></i>
                  </span>
                </button>
                <div class="upvotes-text"> {{ answer.answer_upvotes }} </div>
              </div>
            </div>

            <div class="column is-10" id="answer">
              <div>
                <section class="answer-header">
                  {{ displayName(answer.first_name, answer.last_name, answer.is_anon) }} <span class="date">| {{ displayDate(answer.date_modified) }}</span>                
                </section>

                <section class="answer-text">
                  {{ answer.answer_body }}
                </section>
                
              </div>
            </div>
            <div class="column is-1">
              <section v-if="displayName(answer.first_name, answer.last_name, 0) === displayName(user.first_name, user.last_name, 0)"> 
                <div class="dropdown is-right is-hoverable">
                  <div class="dropdown-trigger">
                    <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span class="icon is-small">
                        <i class="fas fa-ellipsis-v" ></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <button class="button is-white">
                          <span class="icon is-small">
                            <i class="fas fa-pencil-alt"></i>
                          </span>
                          <span class="dropdown-text"> Edit </span>
                        </button>
                      </div>
                      <div class="dropdown-item">
                        <button class="button is-white" v-on:click="onDeleteAnswer(answer)">
                          <span class="icon is-small">
                            <i class="far fa-trash-alt"></i>
                          </span>
                          <span class="dropdown-text"> Delete </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
      user: {
        first_name: this.$auth.user.nickname, // Replace with current user's first and last name
        last_name: '',
        question_upvotes: [],
        answer_upvotes: []
      },
      comment: {
        body: "",
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
    onSubmit() {
      if (this.comment.body.length != 0) {
        var comment = {
        answer_id: 3,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
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
    onUpdateQuestionCount(question) {
      const index = this.user.question_upvotes.indexOf(question.question_id);
      if (index > -1) {
        this.user.question_upvotes.splice(index, 1);
        question.question_upvotes -= 1;
      }
      else {
        this.user.question_upvotes.push(question.question_id)
        question.question_upvotes += 1;
      }
    },
    onUpdateAnswerCount(answer) {
      const index = this.user.answer_upvotes.indexOf(answer.answer_id);
      if (index > -1) {
        this.user.answer_upvotes.splice(index, 1);
        answer.answer_upvotes -= 1;
      }
      else {
        this.user.answer_upvotes.push(answer.answer_id)
        answer.answer_upvotes += 1;
      }
    },
    onDeleteAnswer(answer) {
      const index = this.answers.indexOf(answer);
      if (index > -1) {
        this.answers.splice(index, 1);
      }
      // Should also delete answer from database
    },
    sortRecent() {
      this.answers.sort(function(a, b) {
        return a.answer_id < b.answer_id;
      });

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
    .filter {
      padding-top: 1.2rem;
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
  .dropdown-text {
    font-size: 1rem;
    color: $light-gray;
  }
</style>
