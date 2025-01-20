<template>
    <section>         
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-12">
            <div class="login-card">
              <form class="theme-form login-form" @submit.prevent="login">
                <h4>Login</h4>
                <h6>Welcome back! Log in to your account.</h6>
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
                  <button class="btn btn-primary btn-block" type="submit">Login</button>
                </div>
                <p>Don't have account?<router-link class="ms-2" to="register">Create Account</router-link></p>
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
                const response = await axios.post(`${AUTH_ADDRESS}/api/users/login`, {
                    email: this.email,
                    password: this.password
                }, {
                    headers: { 
                        'Content-Type': 'application/json' 
                    }
                });

                localStorage.setItem('token', response.data.token);

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