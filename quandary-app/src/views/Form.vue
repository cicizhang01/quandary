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
    <form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
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
                <label class="label is-medium">Pronouns</label>
                <span class="select is-light">
                  <select v-model="formData.pronouns">
                    <option selected></option>
                    <option>she/her/hers</option>
                    <option>he/him/his</option>
                    <option>they/them</option>
                  </select>
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
                <label class="label is-medium">Incoming Year</label>
                <span class="select is-light">
                  <select id="year" v-model="formData.incomingYear">
                    <option selected></option>
                    <option v-for="n in 61" :key="n"> {{ n + 1979 }} </option>
                  </select>
                </span>
              </div>
              
              <div id="grad-year" class="field">
                <label class="label is-medium">Graduation Year</label>
                <span class="select is-light">
                  <select id="year" v-model="formData.gradYear">
                    <option selected></option>
                    <option v-for="n in 61" :key="n"> {{ n + 1979 }} </option>
                  </select>
                </span>
              </div>
            </div>

            <div id="student-status" class="field">
              <label class="label is-medium">Are you a current student?</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="curr-student" value="1" v-model="formData.currStudent">
                  Yes
                </label>
                <label class="radio">
                  <input type="radio" name="curr-student" value="0" v-model="formData.currStudent">
                  No
                </label>
              </div>
            </div>
 
            <div id="student-status" class="field" v-if="formData.currStudent === '1'">
              <label class="label is-medium">Are you an undergraduate or graduate student?</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" value="0" name="student">
                  Undergraduate
                </label>
                <label class="radio">
                  <input type="radio" value="1" name="student">
                  Graduate
                </label>
              </div>
            </div>

            <div id="student-status" class="field" v-if="formData.currStudent === '0'">
              <label class="label is-medium">Were you an undergraduate student, graduate student, or both?</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" value="0" name="alumni-student">
                  Undergraduate
                </label>
                <label class="radio">
                  <input type="radio" value="1" name="alumni-student">
                  Graduate
                </label>
                <label class="radio">
                  <input type="radio" value="2" name="alumni-student">
                  Both
                </label>
              </div>
            </div>
        </tab-content>

        <tab-content title="Topic Interests"> 
        </tab-content>

        <tab-content title="Finishing Up"> 
            <div id="terms" class="field">
                <input type="checkbox" :class="hasError('terms') ? 'is-invalid' : ''" class="form-check-input" v-model="formData.terms">
                I agree to the <a href="#">terms and conditions</a>
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

const checked = (value) => value === true;

export default {
    name: 'form',
    components: {
        FormWizard, TabContent
    },
    mixins: [ValidationHelper],
    data(){
      return {
        formData:{
            firstName: '',
            lastName: '',
            pronouns: null,
            major: null,
            minor: null,
            incomingYear: null,
            gradYear: null,
            currStudent: null,
            studentLevel: null, // undergrad, grad, or both
        },
        validationRules:[
          {firstName: {required}, lastName: {required}},
          {major: {}, minor: {}},
          {},
          {terms: {checked}}
        ]
      }
    },
    methods:{
        onComplete(){
            alert("Form submitted!");
            this.$refs.formwizard.changeStatus();
        },
        reset(){
            for(let field in this.formData){
                this.formData[field] = null;
            }
        },
        nextStep(){
            //alert("On Next Step");
        },
        previousStep(){
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
    padding-left: 30px;
    padding-right: 70px;
  }
  #year {
    width: 150px;
  }
  #student-status {
    padding: 10px 0 0 30px;
  }
  .radio {
    padding-right: 30px;
    font-size: 18px;
  }
</style>