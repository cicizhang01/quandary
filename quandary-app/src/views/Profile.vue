<template>
  <div v-if="$auth.isAuthenticated" class="profile">
    <div>
      <div class="container">
        
      <div class="is-divider" data-content="GENERAL INFO" id="divider"></div>
      
      <div class="field is-grouped is-grouped-left-aligned" id="general-info">
        <figure class="image is-128x128">
          <img class="is-rounded" :src="$auth.user.picture">
        </figure>

        <div>
          Name
          <label class="label is-medium">{{ profile_info.first_name }} {{ profile_info.last_name }}</label>

          Pronouns
          <label class="label is-medium">{{ profile_info.pronouns }}</label>
        </div>

      </div>

      <div class="is-divider" data-content="CALTECH INFO" id="divider"></div>
      
      <div class="field is-grouped is-grouped-left-aligned" id="caltech-info">
        <div>
        Student Level
          <label class="label is-medium">{{ getStudentLevel()}}</label>

          <div class="field is-grouped is-grouped-left-aligned">
            <p class="multiple">
              Incoming Year
              <label class="label is-medium">{{ profile_info.incoming_year }}</label>
            </p>

            <p class="multiple">
              Graduating Year
              <label class="label is-medium">{{ profile_info.grad_year }}</label>
            </p>
          </div>

          Major
          <div class="field is-grouped is-grouped-multiline">
            <span class="tag is-medium" v-if="majors.length == 0" id="list">
              None
            </span>

            <span class="tag is-primary is-medium" v-else id="list" v-for="major in majors" v-bind:key="major">
              {{ major }}
            </span>
          </div>

          Minor
          <div class="field is-grouped is-grouped-multiline">
            <span class="tag is-medium" v-if="minors.length == 0" id="list">
              None
            </span>

            <span class="tag is-primary is-medium" v-else id="list" v-for="minor in minors" v-bind:key="minor">
              {{ minor }}
            </span>
          </div>
        </div>
      </div>

      <div class="is-divider" data-content="INTERESTS" id="divider"></div>

      <div id="interests">
        Topics you're interested in following:
        <div class="field is-grouped is-grouped-multiline">
          <span class="tag is-medium" v-if="topics.length == 0" id="list">
            None
          </span>

          <span class="tag is-primary is-medium" v-else id="list" v-for="topic in topics" v-bind:key="topic">
            {{ topic }}
          </span>
        </div>

        Faculty you're interested in following:
        <div class="field is-grouped is-grouped-multiline">
          <span class="tag is-medium" v-if="faculties.length == 0" id="list">
            None
          </span>

          <span class="tag is-primary is-medium" v-else id="list" v-for="faculty in faculties" v-bind:key="faculty">
            {{ faculty.faculty_name }}
          </span>
        </div>
        
        Courses you're interested in following:
        <div class="field is-grouped is-grouped-multiline">
          <span class="tag is-medium" v-if="courses.length == 0" id="list">
            None
          </span>

          <span class="tag is-primary is-medium" v-else id="list" v-for="course in courses" v-bind:key="course">
            {{ course }}
          </span>
        </div>
      </div>

      </div>
    </div>
  </div>
</template>
<script>
import QuandaryService from '@/services/QuandaryService.js';
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        user_id: 4, // Replace with some method to find current user's user_id
      },
      profile_info: [],
      options : {},
      topics: [],
      faculties: [],
      courses: []
    }
  },
  created() {
    this.getProfileData();
  },
  computed: {
    majors() {
      return this.options["Major(s)"];
    },
    minors() {
      return this.options["Minor(s)"];
    }
  },
  methods: {
    async getProfileData() {
      // Get user profile info
      QuandaryService.getUserInfo(this.user.user_id)
      .then(
        (profile_info => {
          this.$set(this, "profile_info", profile_info[0]);
        }).bind(this)
      );

      // Get options
      QuandaryService.getUserOptions(this.user.user_id)
      .then(
        (options => {
          this.$set(this, "options", options);
        }).bind(this)
      );

      // Get topics
      QuandaryService.getUserTopics(this.user.user_id)
      .then(
        (topics => {
          this.$set(this, "topics", topics);
        }).bind(this)
      );

      // Get faculty
      QuandaryService.getUserFaculty(this.user.user_id)
      .then(
        (faculties => {
          this.$set(this, "faculties", faculties);
        }).bind(this)
      );

      // Get courses
      QuandaryService.getUserCourses(this.user.user_id)
      .then(
        (courses => {
          this.$set(this, "courses", courses);
        }).bind(this)
      );
    },
    getStudentLevel() {
      var result = '';

      if (this.profile_info.is_alum == 1) {
        result = 'Alumni';
        var arr = [];

        if (this.profile_info.is_undergrad) {
          arr.push('Undergraduate');
        } 
        if (this.profile_info.is_grad) {
          arr.push('Graduate');
        } 
        if (this.profile_info.is_transfer) {
          arr.push('Transfer');
        } 

        return result + ' (' + arr.join('/') + ')';
      }
      else {
        if (this.profile_info.is_undergrad) {
          result = 'Undergraduate';
        } 
        else if (this.profile_info.is_grad) {
          result = 'Graduate';
        } 
        if (this.profile_info.is_transfer) {
          result += ' (Transfer)';
        } 
      }

      return result;
    }
  }
}
</script>

<style lang="scss" scoped>
  #divider {
    font: Muli;
  }
  #general-info {
    padding: 2rem 0 2rem 0;
    .image {
      margin-right: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  #caltech-info {
    padding: 2rem 0 2rem 0;
    .multiple {
      padding-right: 2rem;
    }
    #list {
      margin: 0.5rem 0 1rem 0;
      margin-right: 0.75rem;
    }
  }
  #interests {
    padding: 2rem 0 2rem 0;
    .field {
      padding-bottom: 1rem;
    }
    #list {
      margin: 0.5rem 0 0 0;
      margin-right: 0.75rem;
    }
  }
</style>
