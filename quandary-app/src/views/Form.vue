<template>
  <div>
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
                  <input class="input is-light" type="text" :class="hasError('firstName') ? 'is-invalid': ''" placeholder="e.g Jane" v-model="formData.firstName">
                  <div v-if="hasError('firstName')" class="invalid-feedback">
                      <p class="help is-danger" v-if="!$v.formData.firstName.required">Please provide a valid first name.</p>
                  </div>
                </div>
              </div>
              
              <div id="last-name" class="field">
                <label class="label is-medium">Last Name *</label>
                <div class="control">
                  <input class="input is-light" type="text" :class="hasError('lastName') ? 'is-invalid': ''" placeholder="e.g Doe" v-model="formData.lastName">
                  <div v-if="hasError('lastName')" class="invalid-feedback">
                      <p class="help is-danger" v-if="!$v.formData.lastName.required">Please provide a valid last name.</p>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label is-medium">Pronouns *</label>
                <span class="select is-light">
                  <select :class="hasError('pronouns') ? 'is-invalid': ''" v-model="formData.pronouns">
                    <option selected></option>
                    <option>she/her/hers</option>
                    <option>he/him/his</option>
                    <option>they/them</option>
                  </select>
                  <div v-if="hasError('pronouns')" class="invalid-feedback">
                      <p class="help is-danger" v-if="!$v.formData.pronouns.required">Please choose a pronoun.</p>
                  </div>
                </span>
              </div>
            </div>

            
          <div id="required"> (*) Required </div>
        </tab-content>

        <tab-content title="Caltech Info"> 
          <div class="field is-grouped is-grouped-left-aligned">
              <div id="major" class="field">
                <label class="label is-medium">Major</label>
                <span class="select is-multiple is-light">
                  <select multiple v-model="formData.major">
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

              <div id="minor" class="field">
                <label class="label is-medium">Minor</label>
                <span class="select is-multiple is-light">
                  <select multiple v-model="formData.minor">
                    <option selected></option>
                    <option>ACM</option>
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
            
          <div class="field is-horizontal is-grouped is-grouped-left-aligned">
              <div id="incoming-year" class="field">
                <label class="label is-medium">Incoming Year *</label>
                <span class="select is-light">
                  <select id="year" :class="hasError('incomingYear') ? 'is-invalid': ''" v-model="formData.incomingYear">
                    <option selected></option>
                    <option v-for="n in 61" :key="n"> {{ n + 1979 }} </option>
                  </select>
                  <div v-if="hasError('incomingYear')" class="invalid-feedback">
                    <p class="help is-danger" v-if="!$v.formData.incomingYear.required">Required</p>
                  </div>
                </span>
              </div>
              
              <div id="grad-year" class="field">
                <label class="label is-medium">Graduation Year *</label>
                <span class="select is-light">
                  <select id="year" :class="hasError('gradYear') ? 'is-invalid': ''" v-model="formData.gradYear">
                    <option selected></option>
                    <option v-for="n in 61" :key="n"> {{ n + 1979 }} </option>
                  </select>
                  <div v-if="hasError('gradYear')" class="invalid-feedback">
                    <p class="help is-danger" v-if="!$v.formData.gradYear.required">Required</p>
                  </div>
                </span>
              </div>
            </div>

            <div class="field is-horizontal is-grouped is-grouped-left-aligned">
              <div id="student-status" class="field">
                <label class="label is-medium">Are you a current student? *</label>
                <div class="field" :class="hasError('currStudent') ? 'is-invalid': ''">
                  <div class="checkbox">
                    <input class="is-checkradio" id="curr-student-yes" type="radio" name="curr-student" value="1" v-model="formData.currStudent">
                    <label for="curr-student-yes" id="radio-text">Yes</label>
                    <input class="is-checkradio" id="curr-student-no" type="radio" name="curr-student" value="0" v-model="formData.currStudent">
                    <label for="curr-student-no" id="radio-text">No</label>
                  </div>
                  <div v-if="hasError('currStudent')" class="invalid-feedback">
                    <p class="help is-danger" v-if="!$v.formData.currStudent.required">Required</p>
                  </div>
                </div>
              </div>

              <div id="student-status" class="field">
                <label class="label is-medium">Are / were you a transfer student? *</label>
                <div class="control" :class="hasError('isTransfer') ? 'is-invalid': ''">
                  <div class="checkbox">
                    <input class="is-checkradio" id="transfer-yes" type="radio" name="transfer" value="1" v-model="formData.isTransfer">
                    <label for="transfer-yes" id="radio-text">Yes</label>
                    <input class="is-checkradio" id="transfer-no" type="radio" name="transfer" value="0" v-model="formData.isTransfer">
                    <label for="transfer-no" id="radio-text">No</label>
                  </div>
                  <div v-if="hasError('isTransfer')" class="invalid-feedback">
                    <p class="help is-danger" v-if="!$v.formData.isTransfer.required">Required</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="student-status" class="field" v-if="formData.currStudent === '1'">
              <label class="label is-medium">Are you an undergraduate or graduate student? *</label>
              <div class="control" :class="hasError('studentLevel') ? 'is-invalid': ''">
                <div class="checkbox">
                  <input class="is-checkradio" id="level-undergrad" type="radio" name="level" value="0" v-model="formData.studentLevel">
                  <label for="level-undergrad" id="radio-text">Undergraduate</label>
                  <input class="is-checkradio" id="level-grad" type="radio" name="level" value="1" v-model="formData.studentLevel">
                  <label for="level-grad" id="radio-text">Graduate</label>
                </div>
                <div v-if="hasError('studentLevel')" class="invalid-feedback">
                  <p id="radio-error" class="help is-danger" v-if="!$v.formData.studentLevel.required">Required</p>
                </div>
              </div>
            </div>

            <div id="student-status" class="field" v-if="formData.currStudent === '0'">
              <label class="label is-medium">Were you an undergraduate student, graduate student, or both? *</label>
              <div class="control" :class="hasError('studentLevel') ? 'is-invalid': ''">
                <div class="checkbox">
                  <input class="is-checkradio" id="level-undergrad" type="radio" name="level" value="0" v-model="formData.studentLevel">
                  <label for="level-undergrad" id="radio-text">Undergraduate</label>
                  <input class="is-checkradio" id="level-grad" type="radio" name="level" value="1" v-model="formData.studentLevel">
                  <label for="level-grad" id="radio-text">Graduate</label>
                  <input class="is-checkradio" id="level-both" type="radio" name="level" value="2" v-model="formData.studentLevel">
                  <label for="level-both" id="radio-text">Both</label>
                </div>
                <div v-if="hasError('studentLevel')" class="invalid-feedback">
                  <p id="radio-error" class="help is-danger" v-if="!$v.formData.studentLevel.required">Required</p>
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
                <input class="is-checkradio" :id="topic.topic_name" type="checkbox" name="checkbox" v-on:click="onClickTopic(topic.topic_id)">
                <label :for="topic.topic_name" id="header-text"><b>{{ topic.topic_name }}</b></label>
              </div>

              <div class="column" v-if="interests.includes(topic.topic_id)">
                <div v-for="subtopic in subtopics[topic.topic_id]" :key="subtopic.topic_id" class="subtopics">
                  {{ getSubTopics(subsubtopics, subtopic.topic_id) }}
                  <div class="subheader">
                    <input class="is-checkradio is-circle" :id="subtopic.topic_name" type="checkbox" name="checkbox" v-on:click="onClickTopic(subtopic.topic_id)">
                    <label :for="subtopic.topic_name" id="subheader-text">{{ subtopic.topic_name }}</label>
                  </div>


                  <div class="column" v-if="interests.includes(subtopic.topic_id)">
                    <div v-for="subsubtopic in subsubtopics[subtopic.topic_id]" :key="subsubtopic.topic_id" class="subtopics">
                      <div class="subsubheader">
                        <input class="is-checkradio is-circle" :id="subsubtopic.topic_name" type="checkbox" name="checkbox" v-on:click="onClickTopic(subsubtopic.topic_id)">
                        <label :for="subsubtopic.topic_name" id="subsubheader-text">{{ subsubtopic.topic_name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-content>

        <tab-content title="Finishing Up"> 
            <div id="terms" class="field">
                <input class="is-checkradio" id="terms-checkbox" type="checkbox" :class="hasError('terms') ? 'is-invalid' : ''" v-model="formData.terms">
                <label for="terms-checkbox" id="radio-text">
                  I agree to the <a href="#">terms and conditions</a>
                </label>
                <div v-if="hasError('terms')" class="invalid-feedback">
                  <p class="help is-danger" v-if="!$v.formData.terms.required">Please select the terms and conditions.</p>
                </div>
            </div>
        </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import FormWizard from '../components/FormWizard.vue';
import TabContent from '../components/TabContent.vue';
import ValidationHelper from '../components/ValidationHelper.vue';
import { required } from 'vuelidate/lib/validators';
import QuandaryService from '../services/QuandaryService.js';

const checked = (value) => value === true;

export default {
    name: 'form',
    components: {
        FormWizard, TabContent
    },
    mixins: [ValidationHelper],
    data() {
      return {
        interests: [],
        subtopics: [],
        subsubtopics: [],
        topics: {},
        formData: {
            firstName: '',
            lastName: '',
            pronouns: null,
            major: null,
            minor: null,
            incomingYear: null,
            gradYear: null,
            currStudent: null,
            isTransfer: null,
            studentLevel: null, // undergrad, grad, or both
        },
        validationRules:[
          {firstName: {required}, lastName: {required}, pronouns: {required}},
          {major: {}, minor: {}, incomingYear: {required}, gradYear: {required}, currStudent: {required}, isTransfer: {required}, studentLevel: {required}},
          {},
          {terms: {checked}}
        ]
      }
    },
    created() {
      this.getTopicsData();
    },
    methods: {
      async getTopicsData() {
        QuandaryService.getAllHeaderTopics()
        .then(
          (topics => {
            this.$set(this, "topics", topics);
          }).bind(this)
        );
      },
      onClickTopic: function (topicId) {
        if (this.interests.includes(topicId)) {
          const index = this.interests.indexOf(topicId);
          if (index > -1) {
            this.interests.splice(index, 1);
          }
        }
        else {
          this.interests.push(topicId);
        }
      },
      getSubTopics(arr, topicId) {
        if (!(topicId in arr)) {
          QuandaryService.getSubTopics(topicId).then(
            (response => arr[topicId] = response)
          );
        }
      },
      onComplete() {
          alert("Form submitted!");
          this.$refs.formwizard.changeStatus();
      },
      reset() {
          for(let field in this.formData) {
              this.formData[field] = null;
          }
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
    margin: 40px 0 40px 0;
  }
  .form {
    margin-bottom: 4rem;
  }
  .subtitle {
    padding-left: 30px;
  }
  #first-row {
    padding-left: 30px;
  }
  #last-name {
    padding: 0px 100px 0px 30px;
  }
  #major {
    padding-left: 30px;
    padding-right: 58px;
  }
  #required {
    margin-top: 20px;
    text-align: center;
  }
  #terms {
    padding-left: 30px;
  }
  #incoming-year {
    padding: 0 70px 10px 30px;
  }
  #year {
    width: 150px;
  }
  #student-status {
    padding: 0px 30px 0 30px;
  }
  #radio-text {
    padding: 0 0 0 2.2rem;
    font-size: 1.1rem;
  }
  #radio-error {
    padding-top: 4px;
  }
  .columns {
    padding: 0px 0px 0 30px;
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