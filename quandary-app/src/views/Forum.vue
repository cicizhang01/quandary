<template>
  <div class="about">
    <div class="events container">
      <div>
          <button class="button is-primary" v-on:click="isHidden = !isHidden">Ask a question!</button>
      </div>

      <h1 v-if="!isHidden">
        <div class="comment">
          <div class="columns">

            <div class="column is-11">
              <div class="comment-label is-grouped">
                Ask as
                <div class="select" id="comment-username">
                  <select>
                    <option value=0> {{ this.$auth.user.nickname }} </option>
                    <option value=1>Anonymous</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="column is-1">
              <button class="button is-pulled-right is-primary" v-on:click="onSubmit()">Submit</button>
            </div>

          </div>

          <div class="question-box has-addons">
                  <textarea class="textarea has-fixed-size" placeholder="Ask your question"></textarea>
          </div>
        </div>
      </h1>

    </div>
    <QuestionsList />
  </div>
</template>

<script>
import QuestionsList from '../components/QuestionsList';

export default {
  name: 'home',

  components: {
    QuestionsList
  },

  data() {
    return {
      isHidden: true
    }
  },

  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
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
</style>
