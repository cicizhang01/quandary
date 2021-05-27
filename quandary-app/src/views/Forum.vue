<template>
  <div class="about">
    <div class="events container">
      <div>
          <button class="button is-outlined is-light" v-if= "isHidden" v-on:click="isHidden = !isHidden">Ask a question!</button>
      </div>
      <div>
          <button class="button is-primary" v-if= "!isHidden" v-on:click="isHidden = !isHidden">Ask a question!</button>
      </div>
      <h1 v-if="!isHidden">
        <div class="comment">
          <div class="columns">

            <div class="column is-11" id="ask-button">
              <div class="comment-label is-grouped">
                Ask as
                <div class="select" id="comment-username">
                  <select v-model="comment.is_anon">
                    <option value=0>{{ displayName(user.first_name, user.last_name, 0) }}</option>
                    <option value=1>{{ displayName(user.first_name, user.last_name, 1) }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="column is-1">
              <button class="button is-pulled-right is-primary" v-on:click="onSubmit()">Submit</button>
            </div>

          </div>

          <div class="question-box has-addons">
                  <textarea class="textarea has-fixed-size" placeholder="Ask your question" v-model="comment.body"></textarea>
          </div>
        </div>
      </h1>
    </div>

    <div class = "listing">
      <QuestionsList :key="addedKey" />
    </div>
  </div>
</template>

<script>
import QuestionsList from '../components/QuestionsList';
import QuandaryService from '../services/QuandaryService';

export default {
  name: 'Forum',

  components: {
    QuestionsList
  },

  data() {
    return {
      isHidden: true,
      addedKey: 0,
      user: {
        user_id: 4, // Replace with some method to find current user's user_id
        first_name: 'Sandy', // Replace with current user's first and last name
        last_name: 'Hamster',
      },
      comment: {
        body: '',
        is_anon: "0"
      },
      comment_edit: {
        is_anon: 0
      },
    }
  },

  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    
    displayName(firstName, lastName, isAnon) {
      if (isAnon == 1) {
        return 'Anonymous';
      }
      return firstName + " " + lastName;
    },

    onSubmit() {
      if (this.comment.body.length != 0) {
        var comment = {
          question_body: this.comment.body,
          is_anon: this.comment.is_anon
        };

        QuandaryService.addQuestion(this.user.user_id, comment)
      }
      this.comment.body = "";
      this.addedKey += 1;
    }
  }

}

</script>
<style lang="scss" scoped>
@import "../assets/colors";
  .org-description {
    margin-top: 50px;
  }
  #question-box {
    margin-top: 1rem;
  }
  .ask-button {
    margin: 0.5rem 0.5rem 1rem 0.5rem;

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
  .listing {
    margin: 1rem;
  }
</style>
