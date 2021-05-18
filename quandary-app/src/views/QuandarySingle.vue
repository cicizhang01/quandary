<template>
  <div class="quandary-single">
      <div class="question-body" >
        <div class="columns">
          <div class="column is-1" id="upvotes">
            <div>
              <button class="button is-white is-medium" v-if="user.question_upvotes.includes(question[0].question_id)" v-on:click="onUpdateQuestionCount(question[0])">
                <span class="icon is-small">
                  <i class="fas fa-heart" id="solid-heart"></i>
                </span>
              </button>
              <button class="button is-white is-medium" v-else v-on:click="onUpdateQuestionCount(question[0])">
                <span class="icon is-small">
                  <i class="far fa-heart" id="regular-heart"></i>
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
            <section v-show="displayName(question.first_name, question.last_name, 0) === displayName(user.first_name, user.last_name, 0)"> 
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
              <button class="button is-pulled-right is-primary is-outlined" v-on:click="onSubmitAnswer()">Submit</button>
            </div>
          </div>
          <div class="comment-box has-addons">
            <textarea class="textarea has-fixed-size" placeholder="Any thoughts?" v-model="comment.body"></textarea>
          </div>
        </div>

        <div class="sort">
          <div class="sort-label is-grouped">
            Sort by
            <div class="select" id="sort-selection">
              <select v-model="sortBy">
                <option> Newest </option>
                <option> Oldest </option>
                <option> Most Upvoted </option>
              </select>
            </div>
          </div>
        </div>

        <div class="is-divider"></div>

        <div v-for="answer in sortAnswers" v-bind:key="answer.answer_id">
          <div class="columns">
            <div class="column is-1" id="upvotes">
              <div>
                <button class="button is-white is-medium" v-if="user.answer_upvotes.includes(answer.answer_id)" v-on:click="onUpdateAnswerCount(answer)">
                  <span class="icon is-small">
                    <i class="fas fa-heart" id="solid-heart"></i>
                  </span>
                </button>
                <button class="button is-white is-medium" v-else v-on:click="onUpdateAnswerCount(answer)">
                  <span class="icon is-small">
                    <i class="far fa-heart" id="regular-heart"></i>
                  </span>
                </button>
                <div class="upvotes-text"> {{ answer.answer_upvotes }} </div>
              </div>
            </div>

            <div class="column is-10" id="answer">
              <div>
                <section class="answer-header">
                  {{ displayName(answer.first_name, answer.last_name, answer.is_anon) }} 
                  <span class="date">
                    | {{ displayDate(answer.date_modified) }}
                    <i v-if="answer.date_created != answer.date_modified"> (edited) </i>
                  </span>                
                  
                </section>

                <section class="answer-text" v-if="edit != answer.answer_id">
                  {{ answer.answer_body }}
                </section>
                
                <section class="answer-text" v-if="edit == answer.answer_id">
                  <div class="edit-comment">
                    <div class="columns">
                      <div class="column is-8">
                        <div class="edit-comment-label is-grouped">
                          Comment as
                          <div class="select" id="comment-username">
                            <select v-model="comment_edit.is_anon">
                              <option value=0>{{ displayName(user.first_name, user.last_name, 0) }}</option>
                              <option value=1>{{ displayName(user.first_name, user.last_name, 1) }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="column is-2">
                        <button class="button is-pulled-right is-primary is-outlined" v-on:click="onSubmitEdit(answer)">Submit</button>
                      </div>
                      <div class="column is-2">
                        <button class="button is-pulled-right is-dark is-outlined" v-on:click="onCancelEdit(answer)">Cancel</button>
                      </div>
                    </div>
                    <div class="edit-comment-box has-addons">
                      <textarea class="textarea has-fixed-size" placeholder="Any thoughts?" v-model="answer.answer_body"></textarea>
                    </div>
                  </div>
                </section>
                
              </div>
            </div>
            <div class="column is-1">
              <section v-show="displayName(answer.first_name, answer.last_name, 0) === displayName(user.first_name, user.last_name, 0)"> 
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
                        <button class="button is-white" v-on:click="onEditAnswer(answer)">
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
      edit: null, // Answer currently being edited
      sortBy: 'Newest',
      user: {
        first_name: this.$auth.user.nickname, // Replace with current user's first and last name
        last_name: '',
        question_upvotes: [],
        answer_upvotes: []
      },
      comment: {
        body: '',
        is_anon: 0
      },
      comment_edit: {
        body: '', // Used to store original comment
        is_anon: 0
      },
      question: {},
      answers: {},
      topics: ['Campus Info', 'Food']
    }
  },
  created() {
    this.getQuandaryData();
  },
  updated() {
    // Update data with query calls to API
    // this.getQuandaryData();
  },
  computed: {
    sortAnswers() {
      let sortedAnswers = this.answers;

      sortedAnswers = [].slice.call(sortedAnswers).sort((a, b) => {
        if (this.sortBy == 'Newest') {
          if (a.date_modified < b.date_modified)
            return 1;
          if (a.date_modified > b.date_modified) 
            return -1;
          return 0;
        }
        else if (this.sortBy == 'Oldest') {
          if (a.date_modified < b.date_modified)
            return -1;
          if (a.date_modified > b.date_modified) 
            return 1;
          return 0;
        }
        else if (this.sortBy == 'Most Upvoted') {
          if (a.answer_upvotes < b.answer_upvotes)
            return 1;
          if (a.answer_upvotes > b.answer_upvotes) 
            return -1;
          return 0;
        }
      });
      return sortedAnswers;
    }
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
      var hour = ('0' + time.getHours()).slice(-2);
      var minutes = ('0' + time.getMinutes()).slice(-2);
      var seconds = ('0' + time.getSeconds()).slice(-2);
      
      return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds;
    },
    onSubmitAnswer() {
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
          is_editable: 0
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
    onEditAnswer(answer) {
      if (this.edit == null) {
        this.edit = answer.answer_id;
        
        // Store original comment 
        this.comment_edit.body = answer.answer_body;
        // Edit answer
      }
    },
    onSubmitEdit(answer) {
      this.edit = null;
      answer.date_modified = this.getDateTime();
      answer.is_anon = this.comment_edit.is_anon;
      // Should also update answer in database
    },
    onCancelEdit(answer) {
      // Restore original comment
      answer.answer_body = this.comment_edit.body;
      this.edit = null;
    },
    onDeleteAnswer(answer) {
      const index = this.answers.indexOf(answer);
      if (index > -1) {
        this.answers.splice(index, 1);
      }
      // Should also delete answer from database
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
    .comment, .sort {
      padding: 1.25rem 0;
      padding-bottom: 0.2rem;
      .comment-label, .sort-label {
        color: $light-gray;
        display: flex;
        align-items: center;
        #comment-username, #sort-selection {
          margin-left: 0.75rem;
        }
      }
      .comment-box {
        margin-top: 1rem;
        margin-bottom: 0.4rem;
      }
    }
    .edit-comment {
      .edit-comment-label {
        color: $light-gray;
        display: flex;
        align-items: center;
        #comment-username {
          margin-left: 0.75rem;
        }
      }
      .edit-comment-box {
        margin: 0.4rem 0;
        width: 37.2rem;
      }
    }
    .filter {
      padding-top: 1.2rem;
    }
    .answer-header {
      font-size: 0.8rem;
      margin-bottom: 1.1rem;
      color: $light-gray;
    }
    #answer {
      margin-top: 1.1rem;
      display: flex;
      align-items: center;
      // justify-content: center;
    }
  }
  .date {
    color: $lighter-gray;
  }
  .icon {
    color: $gray;
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
  .dropdown-text {
    font-size: 1rem;
    color: $light-gray;
  }
</style>
