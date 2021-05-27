<template>
  <div v-if="!$auth.loading">
    <div v-if="$auth.isAuthenticated">
      <section class="main">
        <div class="main-body">
          <div class="container">
            <h1 class="title">
              Welcome to Quandary!
            </h1>
            <h2 class="subtitle">
              Fill out your profile details below.
            </h2>
          </div>
        </div>
      </section>
      <form-wizard ref="formwizard" class="form" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
        <tab-content title="General Info" :selected="true">
            <div id="first-row" class="field is-horizontal is-grouped is-left-aligned">
              <div class="field">
                <label class="label is-medium">First Name *</label>
                <div class="control">
                  <input class="input is-light" type="text" :class="hasError('first_name') ? 'is-invalid': ''" placeholder="e.g Jane" v-model="form_data.first_name">
                  <div v-if="hasError('first_name')" class="invalid-feedback">
                      <p class="help is-danger" v-if="!$v.form_data.first_name.required">Please provide a valid first name.</p>
                  </div>
                </div>
              </div>
              
              <div id="last-name" class="field">
                <label class="label is-medium">Last Name *</label>
                <div class="control">
                  <input class="input is-light" type="text" :class="hasError('last_name') ? 'is-invalid': ''" placeholder="e.g Doe" v-model="form_data.last_name">
                  <div v-if="hasError('last_name')" class="invalid-feedback">
                      <p class="help is-danger" v-if="!$v.form_data.last_name.required">Please provide a valid last name.</p>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label is-medium">Pronouns *</label>
                <span class="select is-light">
                  <select :class="hasError('pronouns') ? 'is-invalid': ''" v-model="form_data.pronouns">
                    <option selected></option>
                    <option>she/her</option>
                    <option>he/him</option>
                    <option>they/them</option>
                  </select>
                  <div v-if="hasError('pronouns')" class="invalid-feedback">
                      <p class="help is-danger" v-if="!$v.form_data.pronouns.required">Please choose a pronoun.</p>
                  </div>
                </span>
              </div>
            </div>

            
          <div id="required"> (*) Required </div>
        </tab-content>

        <tab-content title="Caltech Info"> 
          <div class="field is-grouped is-grouped-left-aligned" id="majors-minors">
            <div id="multiple-select" class="field">
              <label class="label is-medium">Major</label>
              <span class="select is-multiple is-light">
                <select multiple v-model="form_data.major">
                  <option selected></option>
                  <option>ACM</option>
                  <option>Applied Physics</option>
                  <option>Astrophysics</option>
                  <option>Bioengineering</option>
                  <option>Biology</option>
                  <option>Business, Economics & Management</option>
                  <option>Chemical Engineering</option>
                  <option>Chemistry</option>
                  <option>Computational and Neural Systems</option>
                  <option>Computer Science</option>
                  <option>Economics</option>
                  <option>Electrical Engineering</option>
                  <option>Engineering and Applied Science</option>
                  <option>English</option>
                  <option>Geobiology</option>
                  <option>Geochemistry</option>
                  <option>Geology</option>
                  <option>Geophysics</option>
                  <option>History</option>
                  <option>History and Philosophy of Science</option>
                  <option>Information and Data Sciences</option>
                  <option>Materials Science</option>
                  <option>Mathematics</option>
                  <option>Mechanical Engineering</option>
                  <option>Philosophy</option>
                  <option>Physics</option>
                  <option>Planetary Science</option>
                  <option>Political Science</option>
                </select>
              </span>
            </div>

            <div class="field">
              <label class="label is-medium">Minor</label>
              <span class="select is-multiple is-light">
                <select multiple v-model="form_data.minor">
                  <option selected></option>
                  <option>Aerospace</option>
                  <option>Chemistry</option>
                  <option>Computer Science</option>
                  <option>Control and Dynamical Systems</option>
                  <option>English</option>
                  <option>Environmental Science and Engineering</option>
                  <option>Geological and Planetary Systems</option>
                  <option>History</option>
                  <option>History and Philosophy of Science</option>
                  <option>Information and Data Sciences</option>
                  <option>Philosophy</option>
                  <option>Structural Mechanics</option>
                </select>
              </span>
            </div>
          </div>

          <div class="field is-grouped is-grouped-left-aligned" id="majors-minors">
            <div id="multiple-select">
              <label class="label is-medium">House (Full Membership)</label>
              <span class="select is-multiple is-light">
                <select multiple class="house" v-model="form_data.house_full">
                  <option selected></option>
                  <option>Avery</option>
                  <option>Blacker</option>
                  <option>Dabney</option>
                  <option>Fleming</option>
                  <option>Lloyd</option>
                  <option>Page</option>
                  <option>Ricketts</option>
                  <option>Ruddock</option>
                </select>
              </span>
            </div>

            <div id="multiple-select">
              <label class="label is-medium">House (Social Membership)</label>
              <span class="select is-multiple is-light">
                <select multiple class="house" v-model="form_data.house_social">
                  <option selected></option>
                  <option>Avery</option>
                  <option>Blacker</option>
                  <option>Dabney</option>
                  <option>Fleming</option>
                  <option>Lloyd</option>
                  <option>Page</option>
                  <option>Ricketts</option>
                  <option>Ruddock</option>
                </select>
              </span>
            </div>
          </div>
            
          <div class="field is-horizontal is-grouped is-grouped-left-aligned">
            <div id="incoming-year" class="field">
              <label class="label is-medium">Incoming Year *</label>
              <span class="select is-light">
                <select id="year" :class="hasError('incoming_year') ? 'is-invalid': ''" v-model="form_data.incoming_year">
                  <option selected></option>
                  <option v-for="n in 61" :key="n"> {{ n + 1979 }} </option>
                </select>
                <div v-if="hasError('incoming_year')" class="invalid-feedback">
                  <p class="help is-danger" v-if="!$v.form_data.incoming_year.required">Required</p>
                </div>
              </span>
            </div>
            
            <div id="grad-year" class="field">
              <label class="label is-medium">Graduation Year *</label>
              <span class="select is-light">
                <select id="year" :class="hasError('grad_year') ? 'is-invalid': ''" v-model="form_data.grad_year">
                  <option selected></option>
                  <option v-for="n in 61" :key="n"> {{ n + 1979 }} </option>
                </select>
                <div v-if="hasError('grad_year')" class="invalid-feedback">
                  <p class="help is-danger" v-if="!$v.form_data.grad_year.required">Required</p>
                </div>
              </span>
            </div>
          </div>

          <div class="field is-horizontal is-grouped is-grouped-left-aligned">
            <div id="student-status" class="field">
              <label class="label is-medium">Are you a current student? *</label>
              <div class="field" :class="hasError('is_alum') ? 'is-invalid': ''">
                <div class="checkbox">
                  <input class="is-checkradio" id="curr-student-yes" type="radio" name="curr-student" value="0" v-model="form_data.is_alum" v-on:click="resetStudentLevel(form_data.is_alum, 0)">
                  <label for="curr-student-yes" id="radio-text">Yes</label>
                  <input class="is-checkradio" id="curr-student-no" type="radio" name="curr-student" value="1" v-model="form_data.is_alum" v-on:click="resetStudentLevel(form_data.is_alum, 1)">
                  <label for="curr-student-no" id="radio-text">No</label>
                </div>
                <div v-if="hasError('is_alum')" class="invalid-feedback">
                  <p class="help is-danger" v-if="!$v.form_data.is_alum.required">Required</p>
                </div>
              </div>
            </div>

            <div id="student-status" class="field">
              <label class="label is-medium">Are / were you a transfer student? *</label>
              <div class="control" :class="hasError('is_transfer') ? 'is-invalid': ''">
                <div class="checkbox">
                  <input class="is-checkradio" id="transfer-yes" type="radio" name="transfer" value="1" v-model="form_data.is_transfer">
                  <label for="transfer-yes" id="radio-text">Yes</label>
                  <input class="is-checkradio" id="transfer-no" type="radio" name="transfer" value="0" v-model="form_data.is_transfer">
                  <label for="transfer-no" id="radio-text">No</label>
                </div>
                <div v-if="hasError('is_transfer')" class="invalid-feedback">
                  <p class="help is-danger" v-if="!$v.form_data.is_transfer.required">Required</p>
                </div>
              </div>
            </div>
          </div>

          <div id="student-status" class="field" v-if="form_data.is_alum === '0'">
            <label class="label is-medium">Are you an undergraduate or graduate student? *</label>
            <div class="control" :class="hasError('student_level') ? 'is-invalid': ''">
              <div class="checkbox">
                <input class="is-checkradio" id="level-undergrad" type="radio" name="level" value="0" v-model="form_data.student_level">
                <label for="level-undergrad" id="radio-text">Undergraduate</label>
                <input class="is-checkradio" id="level-grad" type="radio" name="level" value="1" v-model="form_data.student_level">
                <label for="level-grad" id="radio-text">Graduate</label>
              </div>
              <div v-if="hasError('student_level')" class="invalid-feedback">
                <p id="radio-error" class="help is-danger" v-if="!$v.form_data.student_level.required">Required</p>
              </div>
            </div>
          </div>

          <div id="student-status" class="field" v-if="form_data.is_alum === '1'">
            <label class="label is-medium">Were you an undergraduate student, graduate student, or both? *</label>
            <div class="control" :class="hasError('student_level') ? 'is-invalid': ''">
              <div class="checkbox">
                <input class="is-checkradio" id="level-undergrad" type="radio" name="level" value="0" v-model="form_data.student_level">
                <label for="level-undergrad" id="radio-text">Undergraduate</label>
                <input class="is-checkradio" id="level-grad" type="radio" name="level" value="1" v-model="form_data.student_level">
                <label for="level-grad" id="radio-text">Graduate</label>
                <input class="is-checkradio" id="level-both" type="radio" name="level" value="2" v-model="form_data.student_level">
                <label for="level-both" id="radio-text">Both</label>
              </div>
              <div v-if="hasError('student_level')" class="invalid-feedback">
                <p id="radio-error" class="help is-danger" v-if="!$v.form_data.student_level.required">Required</p>
              </div>
            </div>
          </div>

          <div id="required"> (*) Required </div>
        </tab-content>

        <tab-content title="Topic Interests">
          <h1 class="subtitle">
            Select any topics you're interested in following.
          </h1>
          <div class="columns is-multiline">
            <div v-for="topic in topics" :key="topic.topic_id" class="column is-half">
              {{ getSubTopics(subtopics, topic.topic_id) }}
              <div class="header">
                <input class="is-checkradio" :id="topic.topic_name" type="checkbox" name="checkbox" :checked="topic_interests.includes(topic.topic_id)" v-on:click="onClickTopicInterests(topic_interests, subtopic_interests, subtopics, topic.topic_id)">
                <label :for="topic.topic_name" id="header-text"><b>{{ topic.topic_name }}</b></label>
              </div>

              <div class="column" v-show="topic_interests.includes(topic.topic_id)">
                <div v-for="subtopic in subtopics[topic.topic_id]" :key="subtopic.topic_id" class="subtopics">
                  {{ getSubTopics(subsubtopics, subtopic.topic_id) }}
                  <div class="subheader">
                    <input class="is-checkradio is-circle" :id="subtopic.topic_name" type="checkbox" name="checkbox" :checked="subtopic_interests.includes(subtopic.topic_id)" v-on:click="onClickSubtopicInterests(subtopic_interests, subsubtopic_interests, subsubtopics, subtopic.topic_id)">
                    <label :for="subtopic.topic_name" id="subheader-text">{{ subtopic.topic_name }}</label>
                  </div>

                  <div class="column" v-show="subtopic_interests.includes(subtopic.topic_id) && subsubtopics[subtopic.topic_id].length != 0">
                    <div v-for="subsubtopic in subsubtopics[subtopic.topic_id]" :key="subsubtopic.topic_id" class="subtopics">
                      <div class="subsubheader">
                        <input class="is-checkradio is-circle" :id="subsubtopic.topic_name" type="checkbox" name="checkbox" :checked="subsubtopic_interests.includes(subsubtopic.topic_id)" v-on:click="onClickInterest(subsubtopic_interests, subsubtopic.topic_id)">
                        <label :for="subsubtopic.topic_name" id="subsubheader-text">{{ subsubtopic.topic_name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-content>

        <tab-content title="Other Interests"> 
          <h1 class="subtitle">
            Select any faculty you're interested in following.
          </h1>
          <div class="columns is-multiline">
            <div v-for="division in divisions" :key="division.division_id" class="column is-half">
              {{ getFaculty(faculties, division.division_id) }}
              <div class="header">
                <input class="is-checkradio" :id="division.division_name" type="checkbox" name="checkbox" :checked="division_interests.includes(division.division_id)" v-on:click="onClickFacultyInterests(division_interests, faculty_interests, faculties, division.division_id)">
                <label :for="division.division_name" id="header-text"><b>{{ getDivisionName(division.division_name) }}</b></label>
              </div>

              <div class="column" v-show="division_interests.includes(division.division_id)">
                <div v-for="faculty in faculties[division.division_id]" :key="faculty.faculty_name" class="subtopics">
                  <div class="subheader">
                    <input class="is-checkradio is-circle" :id="faculty.faculty_name" type="checkbox" name="checkbox" :checked="faculty_interests.includes(faculty.faculty_name)" v-on:click="onClickInterest(faculty_interests, faculty.faculty_name)">
                    <label :for="faculty.faculty_name" id="subheader-text">{{ faculty.faculty_name }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 class="subtitle" id="courses">
            Select any courses you're interested in following.
          </h1>
          <div class="columns is-multiline">
            <div v-for="department in departments" :key="department" class="column is-half">
              {{ getCourses(courses, department) }}
              <div class="header">
                <input class="is-checkradio" :id="department" type="checkbox" name="checkbox" :checked="department_interests.includes(department)" v-on:click="onClickCourseInterests(department_interests, course_interests, courses, department)">
                <label :for="department" id="header-text"><b>{{ department }}</b></label>
              </div>

              <div class="column" v-show="department_interests.includes(department)">
                <div v-for="course in courses[department]" :key="course.course_id" class="subtopics">
                  <div class="subheader">
                    <input class="is-checkradio is-circle" :id="course.course_id" type="checkbox" name="checkbox" :checked="course_interests.includes(course.course_id)" v-on:click="onClickInterest(course_interests, course.course_id)">
                    <label :for="course.course_id" id="subheader-text">{{ getCourseName(course) }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </tab-content>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import FormWizard from '../components/FormWizard.vue';
import TabContent from '../components/TabContent.vue';
import ValidationHelper from '../components/ValidationHelper.vue';
import { required } from 'vuelidate/lib/validators';
import QuandaryService from '../services/QuandaryService.js';

export default {
    name: 'form',
    components: {
        FormWizard, TabContent
    },
    mixins: [ValidationHelper],
    data() {
      return {
        topic_interests: [], // List of topic topic_id's that the user is interested in
        subtopic_interests: [], // List of subtopic topic_id's that the user is interested in 
        subsubtopic_interests: [], // List of subsubtopic topic_id's that the user is interested in
        
        division_interests: [], // List of division_id's that the user is interested in 
        faculty_interests: [], // List of faculty_name's that the user is interested in (related to divisions)
        
        department_interests: [], // List of dept's that the user is interested in (related to divisions)
        course_interests: [], // List of course_id's that the user is interested in

        // Topics/Subtopics/Subsubtopics
        topics: {}, // Used to store all topic objects (topic_id, topic_name) from the database
        subtopics: {}, // Dictionary of topic topic_id to subtopic object (topic_id, topic_name)
        subsubtopics: {}, // Dictionary of subtopic topic_id to subsubtopic object (topic_id, topic_name)

        // Divisions/Faculties
        divisions: {}, // Used to store all division objects (division_id, division_name) from the database
        faculties: {}, // Dictionary of division_id to faculty object (division_id, division_name, faculty_name) 

        // Departments/Courses
        departments: {}, // Used to store all departments from the database
        courses: {}, // Dictionary of department to course object (course_id, course_name, course_no, dept) 

        // Form Data
        form_data: {
            first_name: '',
            last_name: '',
            incoming_year: null,
            grad_year: null,
            
            // Used to distinguish if a user was an undergrad, grad, or both
            student_level: null,

            is_alum: null,
            is_transfer: null,
            pronouns: null,
            major: [],
            minor: [],

            house_full: [],
            house_social: [],

            labs: null,
            courses: null
        },

        // Validation rules
        validation_rules: [
          {first_name: {required}, last_name: {required}, pronouns: {required}},
          {major: {}, minor: {}, incoming_year: {required}, grad_year: {required}, is_alum: {required}, is_transfer: {required}, student_level: {required}},
          {},
          {}
        ]
      }
    },
    created() {
      this.getFormData();
    },
    methods: {
      async getFormData() {
        QuandaryService.getTopics()
        .then(
          (topics => {
            this.$set(this, "topics", topics);
          }).bind(this)
        );

        QuandaryService.getDivisions()
        .then(
          (divisions => {
            this.$set(this, "divisions", divisions);
          }).bind(this)
        );

        QuandaryService.getDepartments()
        .then(
          (departments => {
            this.$set(this, "departments", departments);
          }).bind(this)
        );
      },
      onClickInterest: function (arr, id) {
        if (arr.includes(id)) {
          const index = arr.indexOf(id);
          if (index > -1) {
            arr.splice(index, 1);
          }
        }
        else {
          arr.push(id);
        }
      },
      onClickTopicInterests: function (parent, child, child_dict, id) {
        if (parent.includes(id)) {
          const index = parent.indexOf(id);
          if (index > -1) {
            parent.splice(index, 1);
            
            const vm = this;
            child_dict[id].forEach(function(item) {
              const idx = child.indexOf(item.topic_id);
              if (idx > -1) {
                vm.onClickSubtopicInterests(child, vm.subsubtopic_interests, vm.subsubtopics, item.topic_id)
              }
            })
          }
        }
        else {
          parent.push(id);
        }
      },
      onClickSubtopicInterests: function (parent, child, child_dict, id) {
        if (parent.includes(id)) {
          const index = parent.indexOf(id);
          if (index > -1) {
            parent.splice(index, 1);

            child_dict[id].forEach(function(item) {
              const idx = child.indexOf(item.topic_id);
              if (idx > -1) {
                child.splice(idx, 1);
              }
            })
          }
        }
        else {
          parent.push(id);
        }
      },
      onClickFacultyInterests: function (parent, child, child_dict, id) {
        if (parent.includes(id)) {
          const index = parent.indexOf(id);
          if (index > -1) {
            parent.splice(index, 1);

            child_dict[id].forEach(function(item) {
              const idx = child.indexOf(item.faculty_name);
              if (idx > -1) {
                child.splice(idx, 1);
              }
            })
          }
        }
        else {
          parent.push(id);
        }
      },
      onClickCourseInterests: function (parent, child, child_dict, id) {
        if (parent.includes(id)) {
          const index = parent.indexOf(id);
          if (index > -1) {
            parent.splice(index, 1);

            child_dict[id].forEach(function(item) {
              const idx = child.indexOf(item.course_id);
              if (idx > -1) {
                child.splice(idx, 1);
              }
            })
          }
        }
        else {
          parent.push(id);
        }
      },
      getSubTopics(arr, topicId) {
        if (!(topicId in arr)) {
          QuandaryService.getSubTopics(topicId).then(
            (response => arr[topicId] = response)
          );
        }
      },
      getFaculty(arr, divisionId) {
        if (!(divisionId in arr)) {
          QuandaryService.getFaculty(divisionId).then(
            (response => arr[divisionId] = response)
          );
        }
      },
      getDivisionName(division) {
        if (division == 'Biology and Biological Engineering') {
          return 'Biology and BE'
        }
        else if (division == 'Chemistry and Chemical Engineering') {
          return 'Chemistry and ChE'
        }
        else if (division == 'Physics, Mathematics, and Astronomy') {
          return 'PMA'
        }
        return division
      },
      getCourseName(course) {
        return course.dept + " " + course.course_no + " " + course.course_name;
      },
      getCourses(arr, dept) {
        if (!(dept in arr)) {
          QuandaryService.getCourses(dept).then(
            (response => arr[dept] = response)
          );
        }
      },
      resetStudentLevel(prev, curr) {
        if (prev != null && curr != null) {
          if (prev != curr) {
            this.form_data.student_level = null;
          }
        }
      },
      setStudentLevel(student_level, data) {
        if (student_level == 0) {
          data.is_undergrad = 1;
          data.is_grad = 0;
        }
        else if (student_level == 1) {
          data.is_undergrad = 0;
          data.is_grad = 1;
        }
        else {
          data.is_undergrad = 1;
          data.is_grad = 1;
        }
      },
      onComplete() {
        var user_data = {
          first_name: this.form_data.first_name,
          last_name: this.form_data.last_name,
          incoming_year: this.form_data.incoming_year,
          grad_year: this.form_data.grad_year,
          is_undergrad: null,
          is_grad: null,
          is_alum: this.form_data.is_alum,
          is_transfer: this.form_data.is_transfer,
          pronouns: this.form_data.pronouns,

          // user_topics table
          topic_ids: this.topic_interests.concat(this.subtopic_interests, this.subsubtopic_interests),

          // student_to_faculty table
          division_ids: this.division_interests,
          faculty_names: this.faculty_interests,

          // house_memberships table
          houses: [],
          is_fulls: [],

          // user_option table
          options: [],
          is_majors: [],

          // student_course table
          course_ids: this.course_interests
        }

        // Set is_undergrad and is_grad
        if (this.form_data.is_alum == 0) {
          this.setStudentLevel(this.form_data.student_level, user_data);
        }
        else if (this.form_data.is_alum == 1) {
          this.setStudentLevel(this.form_data.student_level, user_data);
        }


        // Check for empty values in major or minor arrays
        if (this.form_data.major.length != 0 && this.form_data.major[0] == "") {
          this.form_data.major.shift();
        }
        if (this.form_data.minor.length != 0 && this.form_data.minor[0] == "") {
          this.form_data.minor.shift();
        }

        // Set options and is_majors
        user_data.options = this.form_data.major.concat(this.form_data.minor)
        for (let i = 0; i < user_data.options.length; i++) {
          if (i < this.form_data.major.length) {
            user_data.is_majors.push(1)
          }
          else {
            user_data.is_majors.push(0)
          }
        } 

        // Check for empty values in house_full or house_social arrays
        if (this.form_data.house_full.length != 0 && this.form_data.house_full[0] == "") {
          this.form_data.house_full.shift();
        }
        if (this.form_data.house_social.length != 0 && this.form_data.house_social[0] == "") {
          this.form_data.house_social.shift();
        }

        // Set houses and is_fulls
        user_data.houses = this.form_data.house_full.concat(this.form_data.house_social)
        for (let i = 0; i < user_data.houses.length; i++) {
          if (i < this.form_data.house_full.length) {
            user_data.is_fulls.push(1)
          }
          else {
            user_data.is_fulls.push(0)
          }
        } 

        // Add new user to database
        QuandaryService.addFullUser(user_data);

        this.$router.push({ name: 'quandary' });
        this.$refs.formwizard.changeStatus();
      },
      reset() {
        for(let field in this.form_data) {
            this.form_data[field] = null;
        }

        this.topic_interests = [];
        this.division_interests = [];
        this.faculty_interests = [];
        
        this.department_interests = [];
        this.course_interests = [];
      },
      nextStep() {
        //alert("On Next Step");
      },
      previousStep() {
        //alert("On Previous Step");
      }
    }
}
</script>

<style lang="scss">
@import "../assets/colors";
  .main {
    text-align: center;
    margin: 2.5rem 0 2.5rem 0;
  }
  .form {
    margin-bottom: 4rem;
  }
  .subtitle {
    padding-left: 1.9rem;  
    padding-top: 0.75rem;
  }
  #courses {
    padding: 1.5rem 0 0 1.9rem;
  }
  #first-row {
    padding-left: 1.9rem;
    padding-top: 0.75rem;
  }
  #last-name {
    padding: 0 6.25rem 0 1.9rem;
  }
  #majors-minors {
    padding-top: 0.6rem
  }
  #multiple-select {
    padding: 0 3.5rem 0.3rem 1.9rem; 
    .house {
      width: 15rem;
    }
  }
  #required {
    margin-top: 1.25rem;
    text-align: center;
  }
  #incoming-year {
    padding: 0.9rem 4.4rem 0.5rem 1.9rem;
  }
  #grad-year {
    padding-top: 0.9rem;
  }
  #year {
    width: 9.4rem;
  }
  #student-status {
    padding: 0 1.9rem 0 1.9rem;
  }
  #radio-text {
    padding: 0 0 0 2.2rem;
    font-size: 1.1rem;
  }
  #radio-error {
    padding-top: .3rem;
  }
  .columns {
    padding: 0 0 0 1.9rem;
  }
  #header-text {
    padding: 0 0 0 2.4rem;
    font-size: 1.2rem;
  }
  .subheader {
    margin: 0.5rem 0 1rem 0;
  }
  #subheader-text {
    padding: 0 0 0 2.4rem;
    font-size: 1.1rem;
  }
  .subsubheader {
    margin: 0rem 0 1.4rem 0;
  }

</style>