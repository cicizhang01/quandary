<template>
  <div class="question-card">
    <div class="card">
      <div class="columns">
          <div class="column is-1" id="upvotes">
              {{event.question_upvotes}}
          </div>
          <div class= "column is-11">
                <h2 class="event-date">{{ event.date_modified }}</h2>
                <h1 class="title">{{ event.question_body }}</h1>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["event"]
};
</script>
<style lang="scss" scoped>
.card {
  height: 150px;
  text-align: left;
  background-color: rgba(128, 128, 128, 0.021);
  padding: 50px 50px 50px 50px;
  border-radius: 1rem;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  .event-date {
      font-size: 1rem;
      color: gray;
  }
}
// .card-content {
//   color: rgb(0, 0, 0);
//   background-color: rgba(110, 90, 90, 0.096);
//   top: 0;
//   width: 100%;
// }
.event-date {
  color: rgb(0, 0, 0);
  font-size: 0.75em;
  top: 0;
  right: 0;
}
.upvotes {
  color: rgb(0, 0, 0);
  background-color: rgba(110, 90, 90, 0.24);
  padding: 54px;
  height: 50px;
  width: 100%;
}
</style>





