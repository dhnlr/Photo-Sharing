<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation" v-show="token">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>

        <button class="button navbar-burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start">
          <!-- navbar items -->
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <router-link :to="{ name: 'add'}" class="navbar-item">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </router-link>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            </a>

            <div class="navbar-dropdown is-right">
              <router-link :to="{ name: 'user', params: { username: username }}" class="navbar-item">
                My Profile
              </router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="signout()">
                Signout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <Login @username="username = $event" @token="token = $event" v-show="!token"></Login>
    <router-view v-if="token"></router-view>
  </div>
</template>

<script>
import Login from './components/login.vue'

export default {
  name: 'app',
  components: {
    Login,
  },
  data () {
    return {
      token: null,
      username: null,
    }
  },
  methods: {
    signout: function () {
      this.token = null
      this.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
    },
  },
  created: function () {
    let _this = this
    _this.token = localStorage.getItem('token')
    _this.username = localStorage.getItem('username')
  },
  mounted: function () {
    let _this = this;
    document.addEventListener('DOMContentLoaded', function () {
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {
            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);
            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
          });
        });
      }
    })
  }
}
</script>

<style>
</style>
