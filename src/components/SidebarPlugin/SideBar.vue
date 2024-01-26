<template>
  <div
    class="sidebar"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
  >
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="imgLogo" alt="" />
        </div>
      </a>

      <a
        href="https://intuitiveanalytica.com"
        target="_blank"
        class="simple-text logo-normal"
      >
        {{ title }}
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
      <md-button class="md-raised md-warn" @click="logoutUser">Logout</md-button>
    </div>
    
  </div>
  
</template>
<script>
import SidebarLink from "./SidebarLink.vue";
import { auth, signOut } from '@/components/Cards/firebaseConfig.js';

export default {
  components: {
    SidebarLink,
  },

  methods: {
    // ... (existing methods) ...

    logoutUser() {
      
      signOut(auth)
        .then(() => {
          // Redirect to the logout page or login page if needed
          this.$router.push('login');


        })
        .catch((error) => {
          
        });
    },
  },

  props: {
    title: {
      type: String,
      default: "HOOKED",
    },
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg"),
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/HOOKED.png"),
    },
    sidebarItemColor: {
      type: String,
      default: "green",
      validator: (value) => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    },
  },
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}

@media screen and (min-width: 1px) {
  .nav-mobile-menu {
    display: none;
  }
}
</style>
