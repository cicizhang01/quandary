<template>
  <div class="question-card">
    <div class="card">
      <div class="columns">
          <div class="column is-1" id="upvotes">
              <div>
                <button class="button is-white">
                    <span class="icon is-small">
                        <i class="fas fa-heart"></i>
                    </span>
                </button>
                <div class="upvotes-text">{{question.question_upvotes}}</div>
              </div>
          </div>
          
          <div class= "column is-11">
                <h2 class="question-date">{{ displayDate(question.date_modified) }}</h2>
                <h1 class="title">{{ question.question_body }}</h1>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ["question"],
    name: 'QuestionCard',
    data() {
        return {
            topics: ['Topic 1', 'Topic 2']
        }
    },
    methods: {
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
            }
        }

};
</script>
<style lang="scss" scoped>
@import "../assets/colors";
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
}
.question-date {
  color: rgb(0, 0, 0);
  font-size: 0.75em;
  top: 0;
  right: 0;
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





