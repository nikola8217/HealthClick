<template>
    <section>         
      <div class="container-fluid p-0"> 
        <div class="row m-0">
          <div class="col-12 p-0">    
            <div class="login-card">
              <form class="theme-form login-form" @submit.prevent="register">
                <h4>Create your account</h4>
                <h6>Enter your personal details to create account</h6>
                <div class="form-group">
                  <label>Name</label>
                  <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
                    <input class="form-control" type="text" v-model="name">
                  </div>
                </div>
                <div class="form-group">
                  <label>Email Address</label>
                  <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
                    <input class="form-control" type="email" v-model="email">
                  </div>
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
                    <input class="form-control" type="password" v-model="password">
                  </div>
                </div>
                <div class="form-group">
                  <label>Password confirmation</label>
                  <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
                    <input class="form-control" type="password" v-model="password_confirmation">
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">Create Account</button>
                </div>
                <p>Already have an account?<router-link class="ms-2" to="/">Sign in</router-link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
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