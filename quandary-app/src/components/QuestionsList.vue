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
                        
              <div class="column is-10">    
                <div class="question-date">
                  {{ displayDate(question.date_modified) }}
                  <i v-if="question.date_created != question.date_modified"> (edited) </i>
                </div>

                <section v-if="edit != question.question_id">
                  <router-link :to="`/${question.question_id}`">
                    <h1 class="title">{{ question.question_body }}</h1>
                  </router-link>
                </section>

                <section v-if="edit == question.question_id">
                  <div class="comment">
                    <div class="columns">

                      <div class="column is-10" id="ask-button">
                        <div class="comment-label is-grouped">
                          Ask as
                          <div class="select" id="comment-username">
                            <select v-model="is_anon">
                              <option value=0>{{ displayName(user.first_name, user.last_name, 0) }}</option>
                              <option value=1>{{ displayName(user.first_name, user.last_name, 1) }}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="column is-1">
                        <button class="button is-pulled-right is-primary is-outlined" v-on:click="onSubmitEdit(question)">Submit</button>
                      </div>

                      <div class="column is-1">
                        <button class="button is-pulled-right is-dark is-outlined" v-on:click="onCancelEdit()">Cancel</button>
                      </div>

                    </div>

                    <div class="question-box has-addons">
                            <textarea class="textarea has-fixed-size" placeholder="Ask your question" v-model="edited_text"></textarea>
                    </div>
                  </div>
                </section>

                <div :key="trigger">
                  <div class="tag is-primary is-medium" id="question-topic" v-for="topic in topics[question.question_id]" :topic="topic" :key="topic.topic_id">
                      <a :href="'/topic/' + topic.topic_id">{{ topic.topic_name }}</a>
                  </div>
                </div>
              </div>

              <div class="columns is-1">
                <section v-show="question.user_id == user.user_id"> 
                  <div class="dropdown is-right is-hoverable" id="user-options">
                    <div class="dropdown-trigger">
                      <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span class="icon is-small">
                          <i class="fas fa-ellipsis-v"></i>
                        </span>
                      </button>
                    </div>

                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <div class="dropdown-item">
                          <button class="button is-white" v-on:click="onEditQuestion(question)">
                            <span class="icon is-small">
                              <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span class="dropdown-text"> Edit </span>
                          </button>
                        </div>
                        <div class="dropdown-item">
                          <button class="button is-white" v-on:click="onDeleteQuestion(question)">
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
      filtering: {
        "topic_ids": [],
      },
      filtered: false,

      edit: null, // question_id of current question being edited
      edited_text: null,
      is_anon: 0,

      user_question_upvotes: [],

      user: {
        user_id: 4, // Replace with some method to find current user's user_id
        first_name: 'Sandy', // Replace with current user's first and last name
        last_name: 'Hamster',
      }
    };
  }, 
  created() {
    var currTop = this.$route.params.topic;
    if (!currTop){
      this.getData();
    }
    else {
      this.filtering.topic_ids.push(currTop);
      this.filtered = true
      this.getFilteredData();
    }
    this.getUpvotes();
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

      QuandaryService.getQuestionUpvotes(this.user.user_id)
        .then(
          (upvotes => {
            this.$set(this, "user_question_upvotes", upvotes);
          }).bind(this)
        );
    },

    getFilteredData() {
      QuandaryService.getQuestionsFilteredData(this.filtering)
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
          }).bind(this)
        );

      QuandaryService.getQuestionsFilteredData(this.filtering)
        .then(
          (questions => {
            questions.forEach(q => {
              QuandaryService.getQuestion(q.question_id)
                .then(
                  (full_q => {
                    this.questions.push(full_q[0])
                  }).bind(this)
                );
            });
          }).bind(this)
        );
    },

    getUpvotes() {
      QuandaryService.getQuestionUpvotes(this.user.user_id)
        .then(
          (upvotes => {
            this.$set(this, "user_question_upvotes", upvotes);
          }).bind(this)
        );
    },

    // Same as method found in QuandarySingle
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

    // Same as method found in QuandarySingle
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

    // Turns flag on to signal that question is being edited
    onEditQuestion(question) {
      this.edit = question.question_id;
      this.edited_text = question.question_body;
    },

    // Turns off editing flag
    onCancelEdit(){
      this.edit = null;
    },

    // Submitting edited question
    onSubmitEdit(question) {
      this.edit = null;

      var edit = {
        question_body: this.edited_text,
        date_modified: this.getDateTime(),
        is_anon: this.is_anon
      };

      var filter;
      if (this.filtered) {
        filter = this.filtering;
      }
      else {
        filter = null;
      }
      QuandaryService.updateQuestion(this.user.user_id, question.question_id, edit, filter)
      .then(
        questions => {
          this.questions = questions;
        }
      )
    },

    onDeleteQuestion(question) {
      var filter;
      if (this.filtered) {
        filter = this.filtering;
      }
      else {
        filter = null;
      }
      QuandaryService.deleteQuestion(this.user.user_id, question.question_id, filter)
      .then(
        questions => {
          this.$set(this, "questions", questions);
        }
      );
    },

    displayName(firstName, lastName, isAnon) {
      if (isAnon == 1) {
        return 'Anonymous';
      }
      return firstName + " " + lastName;
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
a {
  color: white;
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
  .question-box {
    margin-top: 1rem;
  }
}
#user-options {
  // margin: 100rem 100rem;
  // padding: 0 0;
  margin-top: 25px
}
</style>
