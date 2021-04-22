<template>
    <div class="form-window">
        <div class="step-header">
        <div class="step-progress">
            <div class="bar progressbar" :style="{ width: progress + '%' }">
            </div>
        </div>
        <ul class="step-pills">
            <li @click.prevent.stop="selectTab(index)" class="step-item" :class="{ 'active': tab.isActive, 'validated': tab.isValidated }" v-for="(tab, index) in tabs" v-bind:key="`tab-${index}`">
                <a class="step-link" href="#">
                  <span class="tabStatus">{{index + 1}} </span> 
                  <span class="tabLabel">{{tab.title}}</span>
                </a>
            </li>
        </ul>
        </div>
        <div class="step-body">
            <form>
                <slot></slot>
            </form>
        </div>
        <div class="step-footer">
            <div class="btn-group" role="group">
                <template v-if="!submitSuccess">
                  <button @click="previousTab" v-if="currentTab > 0" id="step-button" class="button is-dark is-rounded is-outlined">Previous</button>
                  <button @click="nextTab" v-if="currentTab < totalTabs - 1" id="step-button" class="button is-dark is-rounded">Next</button>
                  <button @click="onSubmit" v-if="currentTab === totalTabs - 1" id="step-button" class="button is-primary is-rounded">Submit</button>
                </template>
                <template v-else>
                  <button @click="reset" class="button is-dark is-rounded is-outlined">Reset</button>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { store } from "./store.js";
export default {
    name: 'form-wizard',
    data(){
        return{
            tabs: [],
            currentTab : 0,
            totalTabs : 0,
            storeState: store.state,
            submitSuccess : false,
            progress: 0,
            isValidationSupport: false
        }
    },
    mounted(){
      this.tabs = this.$children;
      this.totalTabs = this.tabs.length;
      this.currentTab = this.tabs.findIndex((tab) => tab.isActive === true);
      //Select first tab if none is marked selected
      if(this.currentTab === -1 && this.totalTabs > 0){  
          this.tabs[0].isActive = true;
          this.currentTab = 0;
      }
      
      //Setup Initial Progress
      this.progress = ((this.currentTab + 1) / this.totalTabs * 100);
    },
    updated(){
      /*
        Using this lifehook - since store variable gets updated after component is mounted
        isValidationSupport checks if user is looking to perform validation on each step
      */
      this.isValidationSupport = (Object.keys(this.storeState.v).length !== 0 && this.storeState.v.constructor === Object) ? true : false;
    },
    methods:{
      previousTab(){
        this._switchTab(this.currentTab - 1);
        this.$emit('onPreviousStep'); 
      },
      nextTab(){
        if(this._validateCurrentTab() === false)
            return;
        this._switchTab(this.currentTab + 1);    
        this.$emit('onNextStep');          
            
      },
      reset(){
        this.tabs.forEach(tab => {
          tab.isActive = false;
          tab.isValidated = false;
        });
        this._switchTab(0);
        this.submitSuccess = false;
        this.storeState.v.$reset();
        this.$emit('onReset');
      },
      changeStatus(){
        this.submitSuccess = true;
      },
      selectTab(index){
        //Only switch to filled previous tabs
        if(index < this.currentTab){
          this._switchTab(index);
          return;
        }
        if(this._validateCurrentTab() === false){
            return;
        }
        if(this.tabs[index - 1].isValidated === false){
            return;
        }
        this._switchTab(index);
      },
      onSubmit(){
        if(this._validateCurrentTab() === false)
            return;
        this.$emit('onComplete');
      },
      _switchTab(index){
        // Disable all tabs
        this.tabs.forEach(tab => {
          tab.isActive = false;
        });
        // Invalidate all tabs past current tab
        for (let i = index; i < this.totalTabs; i++) {
          this.tabs[i].isValidated = false;
        }
        this.currentTab = index;
        // Enable current tab
        this.tabs[index].isActive = true;
        this.progress = ((this.currentTab + 1) / this.totalTabs * 100);
      },
      _validateCurrentTab(){
        if(!this.isValidationSupport)  //Check if user wants to validate 
            return true;
        this.storeState.v.$touch();
        if (this.storeState.v.$invalid) {
            this.tabs[this.currentTab].isValidated = false;
            return false;
        }
        this.tabs[this.currentTab].isValidated = true;
        return true;
      }
    },
    watch:{
      currentTab(){
        store.setCurrentTab(this.currentTab);
      }
    }
    
}
</script>
<style lang="scss">
@import "../assets/colors";
  .progressbar {
    transition: width 1s ease;
  } 
  .form-window {
    background-color: $lighter-gray;
    border-radius: 25px;
    width: 900px;
    margin: auto;
    padding: 40px 40px 20px 40px;
  }
  .step-progress {
    height: 1rem;
    background: white;
    border-radius: 1rem;
    margin: 1rem 0rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }
  .step-progress .bar {
      content: '';
      height: 1rem;
      border-radius: 2rem;
      background-color: $primary;
  }
  .step-pills {
    display: flex;
    justify-content: center;
    background-color: white;
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 20px;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }
  .step-pills .step-item {
    margin: 0px 15px 0px 15px;
    background-color: $lightest-gray;
    border-radius: 10px;
    padding: 10px 14px 10px 10px;
    list-style-type: none;
  }
  .step-pills .step-item a {
    text-decoration: none;
    color: $dark;
  }
  .step-pills .step-item.active {
    background-color: $light-pink;
  }
  .step-pills .step-item.validated {
    background-color: $lighter-pink;
  }
  .step-body {
    background-color: white;
    // text-align: center;
    padding: 45px 20px 45px 20px;
    border-radius: 1rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }
  .step-footer {
    padding: 60px 0 40px 0;
    border-radius: 1rem;
    margin: 0rem 0rem;
    text-align: center;
  }
  /* Wizard Ends */
  .tabStatus {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: .5rem;
      line-height: 1.5rem;
      color: #fff;
      text-align: center;
      background: rgba(0,0,0,0.38);
      border-radius: 50%;
  }
  #step-button {
    margin: 0px 20px 0px 20px;
  }
</style>