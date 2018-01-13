<template>
  <div class="columns add">
  <div class="column column is-half is-offset-one-quarter">
  <div class="card">
  <div class="card-image" v-show="image">
    <figure class="image is-4by3">
      <img :src="image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">Upload Photo</p>
        <p class="subtitle is-6">Make your own image</p>
      </div>
    </div>
    <div class="content">
      <div class="field">
        <div class="file is-centered is-warning is-boxed">
          <label class="file-label">
            <input class="file-input" type="file" name="image" :disabled="isprocess" @change="onFileChange">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fa fa-cloud-upload"></i>
              </span>
            <span class="file-label">
                Upload Photo
              </span>
            </span>
          </label>
        </div>
      </div>
      <div class="field">
        <label class="label">Effect</label>
        <div class="effect has-text-centered">
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('al_dente')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:al_dente,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">al_dente</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('audrey')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:audrey,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">audrey</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('aurora')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:aurora,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">aurora</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('daguerre')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:daguerre,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">daguerre</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('eucalyptus')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:eucalyptus,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">eucalyptus</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('fes')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:fes,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">fes</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('frost')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:frost,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">frost</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('hairspray')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:hairspray,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">hairspray</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('hokusai')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:hokusai,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">hokusai</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('incognito')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:incognito,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">incognito</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('linen')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:linen,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">linen</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('peacock')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:peacock,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">peacock</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('primavera')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:primavera,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">primavera</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('quartz')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:quartz,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">quartz</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('red_rock')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:red_rock,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">red_rock</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('refresh')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:refresh,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">refresh</a>
          </div>
          <div class="photoeffect">
           <a><img class="image" @click="chooseeffect('sizzle')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:sizzle,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">sizzle</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('sonnet')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:sonnet,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">sonnet</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('ukulele')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:ukulele,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">ukulele</a>
          </div>
          <div class="photoeffect">
            <a><img class="image" @click="chooseeffect('zorro')" src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:zorro,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">zorro</a>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Caption</label>
        <div class="control">
          <input class="input" type="text" placeholder="Caption" :disabled="isprocess" v-model="caption">
        </div>
      </div>
      <div class="control">
        <button class="button is-info is-rounded" :class="{ 'is-loading': isprocess }" @click="submit()">Add</button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'addphoto',

  data () {
    return {
      image: '',
      imagemetada : null,
      imageeffect: '',
      caption: '',
      isprocess: false
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.imagemetada = files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    chooseeffect: function(effect){
      this.imageeffect = effect
    },
    submit: function () {
      let _this = this;
      this.isprocess = true
      let formdata = new FormData()
      formdata.append('image', _this.imagemetada)
      formdata.append('effect', _this.imageeffect)
      formdata.append('caption', _this.caption)
      axios.post(`http://localhost:3000/photos/`, formdata, {headers: {
        'content-type': 'multipart/form-data',
        'token' : localStorage.getItem('token')
      }})
      .then(function (resp) {
        _this.image = ''
        _this.imagemetada = null
        _this.imageeffect = null
        _this.caption = ''
        _this.isprocess = false
      })
    },
  }
}
</script>

<style lang="css" scoped>
  .add{
    padding-top: 2em;
  }
  .effect{
    padding: 0;
    margin: 0;
    list-style: none;
    
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: space-around;
  }
  .photoeffect{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 20%;
    padding: 0.25em;
  }


</style>

<!-- 
<div class="effect">
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:al_dente,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">al_dente</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:audrey,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">audrey</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:aurora,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">aurora</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:daguerre,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">daguerre</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:eucalyptus,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">eucalyptus</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:fes,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">fes</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:frost,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">frost</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:hairspray,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">hairspray</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:hokusai,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">hokusai</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:incognito,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">incognito</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:linen,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">linen</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:peacock,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">peacock</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:primavera,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">primavera</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:quartz,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">quartz</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:red_rock,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">red_rock</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:refresh,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">refresh</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:sizzle,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">sizzle</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:sonnet,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">sonnet</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:ukulele,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">ukulele</div>
  <div class="photoeffect"><img src="https://res.cloudinary.com/david-wash-blog/image/upload/e_art:zorro,w_200,c_scale/v1482336611/yenaei3ibh7xkngv3teq.jpg">zorro</div>
</div>

 -->