<template>
  <div class="modal is-active">
    <div class="modal-background" @click="goback()"></div>
    <div class="modal-content">
    <div class="box is-radiusless">
      <div class="columns">
        <div class="column is-half has-text-centered">
            <img :src="photo.link" alt="Logo" class="gambar image"> 
        </div>
        <div class="column right">
            <section class="user has-text-centered">
              <h1 class="title">{{photo.author[0].username.toUpperCase()}}</h1>
            </section>
            <section class="caption">
              <p class="subtitle heading is-size-6">{{photo.caption}}</p>
            </section>
            <hr/>
            <section class="addcomment">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-warning" @click="like()" v-if="!ismine">
                    <i class="fa fa-heart" aria-hidden="true" v-if="islike"></i>
                    <i class="fa fa-heart" aria-hidden="true" style="color: red !important;" v-if="!islike"></i>
                  </a>
                  <a class="button" v-if="photo.like.length > 0" @click="isshowlike = true">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                  </a>
                  <like :liked="photo.like" @close="isshowlike = false" v-show="isshowlike"></like>
                </p>
                <div class="control is-expanded has-icons-right">
                  <input class="input" type="text" placeholder="Comment" :disabled="isprocess" v-model="comments" @keyup.enter="addComment()" v-if="isedit == false">
                  <input class="input" type="text" placeholder="Comment" :disabled="isprocess" v-model="comments" @keyup.enter="editedComment()" v-if="isedit">
                  <span class="icon is-small is-right">
                    <i class="fa fa-comment"></i>
                  </span>
                </div>
              </div>
            </section>
            <section class="comment">
              <p v-for="comment in photo.comment">
                <a v-show="comment.author.username == username" @click="editComment(comment.content, comment._id)">E |</a><a v-show="comment.author.username == username" @click="destroyComment(comment._id)"> X</a>
                <strong>{{comment.author.username}} :</strong> {{comment.content}}
              </p>
            </section>
        </div>
      </div>
    </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="goback()"></button>
  </div>
</template>

<script>
import * as axios from 'axios';
import like from './like'

export default {
  name: 'photo',
  components: {like},
  data () {
    return {
      photo: {
        __v: null,
        _id: null,
        author: [{
          username: ' '
        }],
        caption: null,
        comment: [],
        like: [],
        link: null
      },
      comments: null,
      username: null,
      isedit: false,
      commentsId : null,
      isprocess: false,
      userId: null,
      isshowlike: false
    }
  },
  methods:{
    goback: function () {
      this.$router.go(-1)
    },
    addComment: function () {
      let _this = this
      _this.isprocess = true
      axios.post(`http://localhost:3000/photos/${_this.$route.params.photo}/comments/`, {
        content: _this.comments,
        photoId: _this.photo._id,
      }, {headers:{
        'token': localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.isprocess = false
        location.reload()
      })
    },
    editComment: function (commentContent, id) {
      this.isedit = true
      this.comments = commentContent
      this.commentsId = id
    },
    editedComment: function () {
      let _this = this
      _this.isprocess = true
      axios.put(`http://localhost:3000/photos/${_this.$route.params.photo}/comments/${_this.commentsId}`, {
        content: _this.comments
      }, {headers:{
        'token': localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.isprocess = false
        location.reload()
      })
    },
    destroyComment: function (id) {
      let _this = this
      _this.commentsId = id
      _this.isprocess = true
      axios.delete(`http://localhost:3000/photos/${_this.$route.params.photo}/comments/${_this.commentsId}`, {headers:{
        'token': localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.isprocess = false
        location.reload()
      })
    },
    like: function (id) {
      let _this = this
      _this.isprocess = true
      axios.put(`http://localhost:3000/photos/${_this.$route.params.photo}/likes`, {}, {headers:{
        'token': localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.isprocess = false
        location.reload()
      })
    }
  },
  computed: {
    islike: function () {
      let _this = this
      if(_this.photo.like.indexOf(_this.userId) == -1){
        return true
      }
    },
    ismine: function () {
      return (this.photo.author[0].username == this.username) 
    }
  },
  created: function () {
    let _this = this
    this.username = localStorage.getItem('username')
    this.userId = localStorage.getItem('userId')
    axios.get(`http://localhost:3000/photos/${_this.$route.params.photo}/c`, {headers:
      {'token': localStorage.getItem('token')}
    })
    .then( function (resp) {
      _this.photo = resp.data.data
    })
  }
}
</script>

<style lang="css" scoped>
  .right {
    overflow-y: auto !important;
    width: 80%;
    padding: 2em !important;
    height: calc(100vh - 3.6em);
  }
  .modal-content {
    width: 100%;
    max-width: 80%;
  }
  .gambar{
    position: relative;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
  }
  .box {
    background-color: #fff;
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);
    padding: 0; 
    overflow: hidden;
  }
  .column{
    padding: 0px;
  }
  .comment{
    padding-top: 1em;
  }
  .caption{
    padding-top: 0.5em
  }
</style>