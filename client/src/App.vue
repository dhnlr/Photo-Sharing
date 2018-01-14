<template>
  <div id="app">
    <nav class="navbar awal" role="navigation" aria-label="main navigation" v-if="token">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="./assets/logo.png" title="Photo Sharing" alt="Logo" width="auto" height="28">
          &nbsp&nbspPHOTO
        </router-link>

        <button class="button navbar-burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start" v-if="token">
          <div class="field navbar-item has-dropdown is-active">
            <div class="control has-icons-right">
              <input class="input" type="text" placeholder="Search username" v-model="search" @keyup.enter="findUsername">
              <span class="icon is-small is-right">
                <i class="fa fa-search" @click="findUsername"></i>
              </span>
            </div>
            <div class="navbar-dropdown" :class="[searchResult.length>5?'search':'']" v-if="searchResult.length>0" v-for="res in searchResult">
              <router-link :to="{ name: 'user', params: { 'username': res.username }}" class="navbar-item">
                <p @click="reset">{{res.username}}</p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end" v-if="token">
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
              <router-link :to="{ name: 'user', params: { 'username': username }}" class="navbar-item">
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
import * as axios from 'axios';
import Login from './components/login.vue'

export default {
  name: 'app',
  components: {
    Login,
  },
  data () {
    return {
      token: null,
      username: '',
      search: null,
      searchResult: []
    }
  },
  methods: {
    reset: function () {
      this.search = null
      this.searchResult = []
    },
    signout: function () {
      this.token = null
      this.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
    },
    findUsername: function () {
      let _this = this
      axios.get(`http://localhost:3000/users/search?q=${_this.search}`, {headers:{
        'token': localStorage.token
      }})
      .then(resp=>{
        _this.searchResult = resp.data.data
      })
    }
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
  .awal{
    padding: 0 0.75em;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }
  .navbar-item.has-dropdown{
    align-items: center;
  }
  .search{
    height: 80px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
