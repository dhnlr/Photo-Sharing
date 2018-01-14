<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-content">
      <header class="modal-card-head">
        <p class="modal-card-title is-size-5">Liked by:</p>
        <button class="delete" aria-label="close" @click="close()"></button>
      </header>
      <section class="modal-card-body">
        <ul class="fa-ul">
          <li v-for="l in liked" class="fa-li fa fa-heart">&nbsp;{{l.username}}</li>
        </ul>
      </section>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>
  </div>
</template>

<script>
export default {

  name: 'like',
  props: ['liked'],
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$emit('close')
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
  .modal-card-head{
    padding: 15px 20px;
  }
  .modal-card-body{
    padding: 2.5em;
  }
</style>