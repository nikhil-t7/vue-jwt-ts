<template>
<div class="submitForm">
    <h3>Sign Up</h3>
<form @submit.prevent="handleSubmit" novalidate>
    <div class="form-group">
        <p>
            <label for="">First Name</label>
            <input type="text" class="form-control" v-model="state.first_name" placeholder="First Name" />
            <span v-if="v$.first_name.$error" class="text-danger">
                {{ v$.first_name.$errors[0].$message }}
            </span>
        </p>
    </div>

    <div class="form-group">
        <p>
            <label for="">Last Name</label>
            <input type="text" class="form-control" v-model="state.last_name" placeholder="Last Name" />
            <span v-if="v$.last_name.$error" class="text-danger">
                {{ v$.last_name.$errors[0].$message }}
            </span>
        </p>
    </div>

    <div class="form-group">
        <p>
            <label for="">Email</label>
            <input type="email" class="form-control" v-model="state.email" placeholder="Email" />
            <span v-if="v$.email.$error" class="text-danger">
                {{ v$.email.$errors[0].$message }}
            </span>
        </p>
    </div>

    <div class="form-group">
        <p>
            <label for="">Password</label>
            <input :type="state.passwordFieldType" class="form-control" v-model="state.password" placeholder="Password" />

            <ul v-for="(err,index) of v$.password.$errors" :key="index">
                <li class="text-danger" >{{ err.$message }}</li>
            </ul>    
        </p>
    </div>

    <div class="form-group">
        <p>
            <label for="">Confirm Password</label>
            <input :type="state.passwordFieldType" class="form-control" v-model="state.password_confirm" placeholder="Confirm Password" />
            <span v-if="v$.password_confirm.$error" class="text-danger">
                {{ v$.password_confirm.$errors[0].$message }}
            </span>
        </p>
    </div>
    <div>
        <input type="checkbox" @click="showPassword">
        <span>Show Password</span>
    </div>
    <br />
    <button class="btn btn-primary btn-block">Sign Up</button>

</form>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useValidate from '@vuelidate/core'
import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
    helpers
} from '@vuelidate/validators'
import {
    reactive,
    computed
} from 'vue'

interface State {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirm: string;
    submitted: string;
    passwordFieldType: string;
}

export default defineComponent({
    setup() {
        const state = reactive<State>({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirm: '',
            submitted : '',
            passwordFieldType : 'password'
        })

        const containsUppercase = (value:string) => /[A-Z]/.test(value)
        const containsLowercase = (value:string) => /[a-z]/.test(value);
        const containsNumber = (value:string) => /[0-9]/.test(value);
        const containsSpecial = (value:string) => /[#?!@$%^&*-]/.test(value);

        const rules = computed(() => {
            return {
                first_name: {
                    required : helpers.withMessage(
                        'First Name is required',
                        required
                    )
                },
                last_name: {
                    required : helpers.withMessage(
                        'Last Name is required',
                        required
                    )
                },
                email: {
                    required : helpers.withMessage(
                        'Email is required',
                        required
                    ),
                    email
                },
                password: {
                    required : helpers.withMessage(
                        'Password is required',
                        required
                    ),
                    minLength: minLength(8),
                    maxLength: maxLength(50),
                    containsUppercase : helpers.withMessage(
                        'Password Must contain one Uppercase Character',
                        (value: string) => containsUppercase(value)
                    ),
                    containsLowercase : helpers.withMessage(
                        'Password Must contain one Lowercase Character',
                        (value: string) => containsLowercase(value)
                    ),
                    containsNumber : helpers.withMessage(
                        'Password Must contain one Number',
                        (value: string) => containsNumber(value)
                    ),
                    containsSpecial : helpers.withMessage(
                        'Password Must contain one Special Character',
                        (value: string) => containsSpecial(value)
                    )
                },
                password_confirm: {
                    required : helpers.withMessage(
                        'Confirm Password is required',
                        required
                    ),
                    sameAs: helpers.withMessage(
                        'Confirm Password must be same',
                        sameAs(state.password)
                    )
                }
            }
        })

        const v$ = useValidate(rules, state)
        return {
            state,
            v$
        }
    },
    name: 'RegisterCom',
    methods: {
        async handleSubmit() {
            this.v$.$validate()
            if (!this.v$.$error) {
                //alert(" Form submitted...")
                this.state.submitted = "submitted"
                this.$router.push('/login');
                
            }
        },
        showPassword(){
            this.state.passwordFieldType = this.state.passwordFieldType =='password'?'text':'password'
        }
    }
});
</script>
<style scoped>
</style>
