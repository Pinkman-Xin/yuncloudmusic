<template>
  <ul class="song-list">
      <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
        <img v-lazy="value.picUrl" alt="">
        <div>
          <h3>{{value.name}}</h3>
          <p>{{value.singer}}</p>
        </div>
      </li>     
    </ul>
</template>
 
<script>
import {mapActions} from 'vuex'
export default {
  props:{
    songs:{
      type:Array,
      default:()=>[],
      required:true
    },  
  },
  methods: {
    ...mapActions(['setFullScreen','setMiniPlayer','setSongDetail']),
    selectMusic(id){
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
.song-list{
    width: 100%;
    overflow: hidden;
    .item{
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    img{
      width: 150px;
      height: 150px;
      border-radius: 20px;
      margin-right: 20px;
    }
    div{
      @include font_color();
      h3{
        @include font_size($font_large);
        
      }
      p{
        @include font_size($font_medium_s);
        margin-top:20px;
        opacity: 0.6;
      }
    }
    }
  }
</style>