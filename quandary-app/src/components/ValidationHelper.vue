<template>
    <div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { store } from "./store.js";
export default {
    name: 'ValidationHelper',
    mixins: [validationMixin],
    data(){
        return{
            storeState: store.state,
        }
    },
    mounted(){
        store.setValidation(this.$v);
    },
    computed:{
        rules() {
            if(this.validation_rules)
                return this.validation_rules[this.storeState.currentTab] ? this.validation_rules[this.storeState.currentTab] : {}
            else
                return {};
        },
    },
    methods:{
        hasError(fieldName){
            return (fieldName in this.$v.form_data) && (this.$v.form_data[fieldName].$error)
        }
    },
    validations() {
        return {
            form_data : this.rules
        };
    }
}
</script>