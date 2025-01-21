<template>
    <div class="page-main-header">
        <div class="main-header-right row m-0">
          <div class="main-header-left">
            <div class="logo-wrapper"><h5>HealthClick</h5></div>
          </div>
          <div class="left-menu-header col">
            
          </div>
          <div class="nav-right col pull-right right-menu p-0 box-col-6">
            <ul class="nav-menus">
              <li><a class="text-dark" href="#!" onclick="javascript:toggleFullScreen()"><i data-feather="maximize"></i></a></li>
              
              <li class="onhover-dropdown p-0">
                <button class="btn btn-primary-light" type="button" @click="logout">Log out</button>
              </li>
            </ul>
          </div>
          <div class="d-lg-none mobile-toggle pull-right w-auto"><i data-feather="more-horizontal"></i></div>
        </div>
      </div>
</template>

<script>
import axios from 'axios';
import {AUTH_ADDRESS} from '../conf'

export default {
  methods: {
    async logout() {
      await axios.post(`${AUTH_ADDRESS}/api/users/logout`, {
          headers: { 
              'Content-Type': 'application/json' 
          }
      });

      localStorage.clear();

      this.$router.push('/');
    }
  },
    
}
</script>