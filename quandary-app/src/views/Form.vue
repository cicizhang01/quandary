<template>
  <div>
    <section class="main">
      <div class="main-body">
        <div class="container">
          <h1 class="title">
            Welcome to Quandary
          </h1>
          <h2 class="subtitle">
            Fill out your profile details below
          </h2>
        </div>
      </div>
    </section>
    <form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
        <tab-content title="General Info" :selected="true">
            <div id="first-row" class="field is-horizontal is-grouped is-grouped-centered">
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
          <div class="field is-grouped is-grouped-centered">
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
            </div>
            
          <div class="field is-horizontal is-grouped is-grouped-centered">
              <div class="field">
                <label class="label is-medium">Incoming Year</label>
                <div class="control">
                  
                </div>
              </div>
              
              <div id="last-name" class="field">
                <label class="label is-medium">Graduation Year</label>
                <div class="control">
                  
                </div>
              </div>
            </div>
        </tab-content>
      
        <tab-content title="Topic Interests"> 
            <div class="field">
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
        },
        validationRules:[
          {firstName: {required}, lastName: {required}},
          {major: {}, minor: {}},
          {terms: {checked}}
        ]
      }
    },
    methods:{
        onComplete(){
            // alert("Submitting Form!");
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
  #required {
    margin-top: 20px;
    text-align: center;
  }
  #major {
    padding-right: 70px;
  }
  #last-name {
    padding: 0px 100px 0px 30px;
  }
  .next-button {
    margin-top: 90px;
  }
</style>