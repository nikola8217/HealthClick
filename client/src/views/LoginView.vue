<template>
    <div class="authincation h-100" style="margin-top: 50px">
        <div class="container h-100">
            <div class="row justify-content-center h-100 align-items-center">
                <div class="col-md-6">
                    <div class="authincation-content">
                        <div class="row no-gutters">
                            <div class="col-xl-12">
                                <div class="auth-form">
                                    <h2 class="text-center mb-4 text-white">Login in to your account</h2>
                                    <form @submit.prevent="login">
                                        <div class="form-group">
                                            <label class="mb-1 text-white"><strong>Email</strong></label>
                                            <input type="email" class="form-control" style="color: black" v-model="email">
                                        </div>
                                        <div class="form-group">
                                            <label class="mb-1 text-white"><strong>Password</strong></label>
                                            <input type="password" class="form-control" style="color: black" v-model="password">
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn bg-white text-primary btn-block">Login</button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p class="text-white">Don't have an account? <router-link class="text-white" to="register">Register here</router-link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import {AUTH_ADDRESS} from '../conf'

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },

    methods: {
        async login() {
            if (this.email === "" || this.password === "") {
                swal.fire({
                    title: "",
                    text: "Please fill in all fields!",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                return false;
            }

            try {
                await axios.post(`${AUTH_ADDRESS}/api/users/login`, {
                    email: this.email,
                    password: this.password
                }, {
                    headers: { 
                        'Content-Type': 'application/json' 
                    }
                });

                this.$router.push('/appointments');

            } catch (error) {
                swal.fire({
                    title: "",
                    text: error.response.data.errors[0].message,
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });
            }
        }
    },
    
}
</script>