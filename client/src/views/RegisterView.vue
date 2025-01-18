<template>
    <div class="authincation h-100" style="margin-top: 20px">
        <div class="container h-100">
            <div class="row justify-content-center h-100 align-items-center">
                <div class="col-md-6">	
					<div class="authincation-content">
                        <div class="row no-gutters">
                            <div class="col-xl-12">
                                <div class="auth-form">
                                    <h4 class="text-center mb-4 text-white">Register account</h4>
                                    <form @submit.prevent="register">
                                        <div class="form-group">
                                            <label class="mb-1 text-white"><strong>Name</strong></label>
                                            <input type="text" class="form-control" style="color: black" v-model="name">
                                        </div>
                                        <div class="form-group">
                                            <label class="mb-1 text-white"><strong>Email</strong></label>
                                            <input type="email" class="form-control" style="color: black" v-model="email">
                                        </div>
                                        <div class="form-group">
                                            <label class="mb-1 text-white"><strong>Password</strong></label>
                                            <input type="password" class="form-control" style="color: black" v-model="password">
                                        </div>
                                        <div class="form-group">
                                            <label class="mb-1 text-white"><strong>Password confirmation</strong></label>
                                            <input type="password" class="form-control" style="color: black" v-model="password_confirmation">
                                        </div>
                                        <div class="text-center mt-4">
                                            <button type="submit" class="btn bg-white text-primary btn-block">Register</button>
                                        </div>
                                    </form>
                                    <div class="new-account mt-3">
                                        <p class="text-white">Already have an account? <router-link class="text-white" to="/">Login</router-link></p>
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
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    },

    methods: {
        async register() {
            if (this.name === "" || this.email === "" || this.password === "" || this.password_confirmation === "") {
                swal.fire({
                    title: "",
                    text: "Please fill in all fields!",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                return false;
            }

            if (this.password.length < 5) {
                swal.fire({
                    title: "",
                    text: "Password must have at least 5 characters!",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                return false;
            }

            if (this.password !== this.password_confirmation) {
                swal.fire({
                    title: "",
                    text: "Passwords does not match!",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                return false;
            }

            try {
                await axios.post(`${AUTH_ADDRESS}/api/users/register`, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }, {
                    headers: { 
                        'Content-Type': 'application/json' 
                    }
                });

                swal.fire({
                    title: "",
                    text: "You succesfully created account!",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                this.$router.push('/');

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