<template>
<div v-if="showSidebar">
  <div class="page-wrapper compact-wrapper" id="pageWrapper">
    <HeaderComponent />
    <div class="page-body-wrapper sidebar-icon">
      <SidebarComponent />
      <div class="page-body dashboard-2-main">
        <router-view/>
      </div>
    </div>
  </div>
</div>
<div v-else>
  <router-view/>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';

export default {
  components: {
    HeaderComponent,
    SidebarComponent
  },

  computed: {
    showSidebar() {
      return !['/', '/register'].includes(this.$route.path);
    },
  }
  
}
</script>
