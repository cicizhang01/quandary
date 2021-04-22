<template>
    <form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
        <tab-content title="General Info" :selected="true">
            <div class="field is-horizontal is-grouped is-grouped-centered">
              <div class="field">
                <label class="label is-medium">First Name</label>
                <div class="control">
                  <input class="input is-light" type="text" :class="hasError('firstName') ? 'is-invalid': ''" placeholder="e.g Jane" v-model="formData.firstName">
                  <div v-if="hasError('firstName')" class="invalid-feedback">
                      <div class="help is-danger" v-if="!$v.formData.firstName.required">Please provide a valid first name.</div>
                  </div>
                </div>
              </div>
              
              <div id="last-name" class="field">
                <label class="label is-medium">Last Name</label>
                <div class="control">
                  <input class="input is-light" type="text" :class="hasError('lastName') ? 'is-invalid': ''" placeholder="e.g Doe" v-model="formData.lastName">
                  <div v-if="hasError('lastName')" class="invalid-feedback">
                      <div class="help is-danger" v-if="!$v.formData.lastName.required">Please provide a valid last name.</div>
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
        </tab-content>
        <tab-content title="Topic Interests"> 
            <div class="field">
                <input type="checkbox" :class="hasError('terms') ? 'is-invalid' : ''" class="form-check-input" v-model="formData.terms">
                I agree to the <a href="#">terms and conditions</a>
                <div v-if="hasError('terms')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.terms.required">Please select terms and conditions.</div>
                </div>
            </div>
        </tab-content>
    </form-wizard>
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
            companyName: null,
        },
        validationRules:[
          {firstName: {required}, lastName: {required}},
          {terms: {checked}}
        ]
      }
    },
    methods:{
        onComplete(){
            alert("Submitting Form ! Rock On");
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
  .field {
    padding: 10px 30px 0px 30px;
  }
  #last-name {
    padding: 10px 70px 0px 0px;
  }
  .control {
    padding: 0px 0px 20px 0px;
  }
  .next-button {
    margin-top: 90px;
  }
</style>