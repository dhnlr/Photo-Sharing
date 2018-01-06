<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container is-fluid">
        <div class="box is-radiusless">
        <div class="columns" v-show="!showSignup">
          <div class="column is-two-fifths has-text-centered is-hidden-mobile">
              <img src="https://cdn.dribbble.com/users/310943/screenshots/2422843/save-for-later-loop.gif" alt="Logo" class="gambar"> 
          </div>
          <div class="column has-text-centered">
              <!-- Login -->
              <h1 class="title">Welcome back</h1>
              <h2 class="subtitle">Glad to see you here again</h2>
              <div class="field">
                <label class="label">Username</label>
                <p class="control has-icons-left">
                  <input class="input" type="text" v-model="username">
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <p class="control has-icons-left">
                  <input class="input" type="password" v-model="password">
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </p>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <a class="button is-info is-rounded" @click="login()">
                    Signin
                  </a>
                </p>
              </div>
              <!-- Login -->
              <p>Don't have an account yet? <a @click="switchsignup()">Sign Up</a></p>
          </div>
        </div>
        <div class="columns" v-show="showSignup">
          <div class="column is-three-fifths has-text-centered">
            <h1 class="title">Join us</h1>
          <h2 class="subtitle">Be social. Be popular.</h2>
          <div class="field">
            <label class="label">Username</label>
            <p class="control has-icons-left">
              <input class="input is-rounded" type="text" v-model="username">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left">
              <input class="input is-rounded" :class="[samepassword ? '' : 'is-danger']" type="password" v-model="password">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label">Verification Password</label>
            <p class="control has-icons-left">
              <input class="input is-rounded" :class="[samepassword ? '' : 'is-danger']" type="password" v-model="verifpassword">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </p>
            <p class="help is-danger" v-if="!samepassword">Password not confirmed</p>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <p class="control">
              <a class="button is-info is-rounded" @click="signup()">
                Signup
              </a>
            </p>
          </div>
          <!-- Login -->
          <p>Already have an account? <a @click="switchsignup()">Sign In</a></p>
          </div>
          <div class="column has-text-centered is-hidden-mobile">
              <img src="https://cdn.dribbble.com/users/310943/screenshots/2665863/bring-your-friends.gif" alt="Logo" class="gambar"> 
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'login',

  data () {
    return {
      showSignup: true,
      username: '',
      password: null,
      verifpassword: null,
      samepassword: true,
    }
  },
  methods : {
    switchsignup: function () {
      this.showSignup = !this.showSignup
    },
    login: function () {
      let _this = this
      axios.post(`http://localhost:3000/signin`, {
        username : _this.username,
        password : _this.password
      })
      .then( function (resp) {
        _this.username = ''
        _this.password = null
        localStorage.token = resp.data.data
        localStorage.username = resp.data.username
        localStorage.userId = resp.data.userId
        _this.$emit('username', resp.data.username)
        _this.$emit('token', resp.data.data)        
      })
    },
    signup: function () {
      let _this = this
      if (_this.password == _this.verifpassword) {
        axios.post(`http://localhost:3000/signup`, {
          username: _this.username,
          password: _this.password
        })
        .then(function () {
          _this.password = null
          _this.verifpassword = null
          _this.username = ''
        })
      } else {
        _this.samepassword = false
        _this.password = null
        _this.verifpassword = null
      }
    }
  },
  watch: {
    verifpassword: function () {
      if(this.verifpassword != this.password){
        this.samepassword = false
      } else {
        this.samepassword = true
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .box {
    background-color: white;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    display: block;
    padding: 1.25rem;
  }
  @media only screen and (max-device-width: 400px){
    .box {
        max-width: 100% !important;
      }
  }
  .gambar {
    position: relative;
    height: auto;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>