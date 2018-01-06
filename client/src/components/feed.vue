<template>
  <div>
      <div class="columns kartu" v-for="feed in feedList">
        <div class="column is-half is-offset-one-quarter">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <router-link :to="{'name': 'photo', params: {'username': feed.author[0].username, 'photo':feed._id}}">
                <img :src="feed.link">
              </router-link>
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4" @click="goUser(feed.author[0].username)">{{feed.author[0].username}}</p>
              </div>
            </div>

            <div class="content">
              {{feed.caption}}
            </div>
          </div>
          <footer class="card-footer">
            <router-link :to="{'name': 'photo', params: {'username': feed.author[0].username, 'photo':feed._id}}" class="card-footer-item">
              {{feed.comment.length}} Comment
            </router-link>
            <a class="card-footer-item">Share</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'feed',
  data () {
    return {
      feedList: []
    }
  },
  methods: {
    goUser: function (username) {
      this.$router.push({'name': 'user', params: {'username': username}})
    },
  },
  created: function () {
    let _this = this
    axios.get(`http://localhost:3000/users/`, {headers:{
      token: localStorage.getItem('token')
    }})
    .then( function (resp) {
      _this.feedList = resp.data.data
    })
  }
}
</script>

<style lang="css" scoped>
  .kartu{
    padding: 1em 0.25em;
  }
</style>