<template>
  <div class="container is-fluid">
    <nav class="level navuser">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <div>
          <p class="title has-text-info">
            {{user.username}}
          </p>
          <p class="heading is-size-6" v-if="isme">
            <a class="button is-info" v-if="isfollow == 1" @click="follow(user._id)">Follow</a>
            <a class="button is-white" v-if="isfollow == 2"><em>Following</em></a>
          </p>
        </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{photos.length}}</p>
            <p class="heading">Post</p>
          </div>
      </div>
      <div class="level-item has-text-centered">
          <div>
            <p class="title">{{user.follower.length}}</p>
            <p class="heading">Follower</p>
          </div>
      </div>
      <div class="level-item has-text-centered">
          <div>
            <p class="title">{{user.following.length}}</p>
            <p class="heading">Following</p>
          </div>
      </div>
      </div>
    </nav>
    <div class="photos" v-if="isauthorize">
      <div class="card" v-for="photo in photos">
        <div class="card-image">
          <figure class="image is-4by3">
            <router-link :to="{'name': 'photo', params: {'username': user.username, 'photo':photo._id}}">
                <img :src="photo.link" alt="Placeholder image">
              </router-link>
          </figure>
        </div>
        <footer class="card-footer" v-if="photo.author[0].username == username">
          <a class="card-footer-item" @click="edit(photo._id)">Edit</a>
          <a class="card-footer-item" @click="destroy(photo._id)">Delete</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'user',

  data () {
    return {
      user: {
        __v: null,
        _id: null,
        follower: [],
        following: []
      },
      photos: [],
      username: null,
      userId: null
    }
  },
  computed: {
    isfollow: function () {
      if (this.user.follower.indexOf(this.userId) == -1) {
        return 1
      } else if (this.user.follower.indexOf(this.userId) != -1) {
        return 2
      }
    },
    isme: function () {
      return (this.$route.params.username != this.username)
    },
    isauthorize: function () {
      return (this.isfollow == 2 || !this.isme)
    }
  },
  methods: {
    edit: function (id) {
      this.$router.push({name: 'edit', params:{photo:id}})
    },
    destroy: function (id) {
      let _this = this
      axios.delete(`http://localhost:3000/photos/${id}`, {headers: {
        'token': localStorage.getItem('token')
      }})
      .then(function (resp) {
        location.reload()
      })
    },
    follow: function (id) {
      let _this = this
      axios.put(`http://localhost:3000/users/${id}/follow`, {}, {headers: {
        token: localStorage.getItem('token')
      }})
      .then( function (resp) {
        location.reload()
      })
    }
  },
  computed: {
    pusername () {
      return this.$route.params.username
    }
  },
  watch: {
    pusername () {
      let _this = this
      axios.get(`http://localhost:3000/users/${_this.$route.params.username}`, {headers: {
        token: localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.user = resp.data.data
        axios.get(`http://localhost:3000/photos/username/${_this.user._id}`, {headers: {
          token: localStorage.getItem('token')
        }})
        .then(function (resp) {
          _this.photos = resp.data.data
        })
      })
    }
  },
  created: function () {
    let _this = this
    this.username = localStorage.getItem('username')
    this.userId = localStorage.getItem('userId')
    axios.get(`http://localhost:3000/users/${_this.$route.params.username}`, {headers: {
      token: localStorage.getItem('token')
    }})
    .then(function (resp) {
      _this.user = resp.data.data
      axios.get(`http://localhost:3000/photos/username/${_this.user._id}`, {headers: {
        token: localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.photos = resp.data.data
      })
    })
  }
}
</script>

<style lang="css" scoped>
  .card{
    max-width: 30% !important;
    flex-grow: 1;
    margin: 0.4em;
  }
  .photos{
    display: flex;
    flex-wrap: wrap;
  }
  .navuser{
    padding: 2em 0;
  }
  @media only screen and (max-device-width: 400px){
    .card {
        max-width: 100% !important;
        flex-grow: 1;
      }
  }
</style>