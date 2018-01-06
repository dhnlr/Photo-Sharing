<template>
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
        <div class="card">
          <div class="card-image" v-show="photo">
            <figure class="image is-3by2">
              <img :src="photo.link">
            </figure>
          </div>
          <div class="card-content">
            <div class="field">
              <label class="label">Caption</label>
              <div class="control">
                <input class="input" type="text" placeholder="Caption" v-model="photo.caption">
              </div>
            </div>
            <div class="control">
              <button class="button is-warning is-rounded" @click="submit()">Edit</button>
            </div>
          </div>
        </div>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="goback()"></button>
</div>

</template>

<script>
import * as axios from 'axios';

export default {

  name: 'edit',

  data () {
    return {
      photo: {},
    }
  },
  methods: {
    submit: function () {
      let _this = this
      axios.put(`http://localhost:3000/photos/${_this.$route.params.photo}`, {
          caption: _this.photo.caption,
        }, {headers: {
        token: localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.photo = {}
        _this.$router.go(-1)
      })
    },
    goback: function () {
      this.$router.go(-1)
    },
  },
  created: function () {
    let _this = this
    axios.get(`http://localhost:3000/photos/${_this.$route.params.photo}/c`, {headers:{
      token: localStorage.getItem('token')
    }})
    .then( function (resp) {
      _this.photo = resp.data.data
    })
  }
}
</script>

<style lang="css" scoped>
</style>