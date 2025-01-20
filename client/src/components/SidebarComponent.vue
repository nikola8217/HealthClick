<template>
    <header class="main-nav">
      <nav>
        <div class="main-navbar">
          <div class="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
          <div id="mainnav">           
            <ul class="nav-menu custom-scrollbar">
              <li class="back-btn">
                <div class="mobile-back text-end"><span>Back</span><i class="fa fa-angle-right ps-2" aria-hidden="true"></i></div>
              </li>
              
              <li>
                <router-link class="nav-link menu-title link-nav" to="appointments">
                  <i data-feather="file-text"></i>
                  <span>Appoinmtents</span>
                </router-link>
              </li>

              <li>
                <router-link class="nav-link menu-title link-nav" to="patients">
                  <i data-feather="file-text"></i>
                  <span>Patients</span>
                </router-link>
              </li>

              <li>
                <router-link class="nav-link menu-title link-nav" to="doctors">
                  <i data-feather="file-text"></i>
                  <span>Doctors</span>
                </router-link>
              </li>

              <li>
                <router-link class="nav-link menu-title link-nav" to="specializations">
                  <i data-feather="file-text"></i>
                  <span>Specialiations</span>
                </router-link>
              </li>
              
            </ul>
          </div>
          <div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
        </div>
      </nav>
    </header>
</template>

<script>
export default {
    
}
</script>