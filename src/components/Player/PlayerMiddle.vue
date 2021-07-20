<template>
  <swiper :options="swiperOption" class="banner">
    <swiper-slide class="cd">
      <div class="cd-warpper" ref="cdWarpper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li v-for="(value,key) in currentLyric" :class="{'active' : currentLineNum === key}" :key="key">{{value}}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
 
<script>
import {mapGetters} from 'vuex'
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ScrollView from '../ScrollView.vue';
export default {
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data() {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      },
      currentLineNum:0
    };
  },
  methods: {
    getFirstLyric(){
      for(let key in this.currentLyric){
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      let result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  computed:{
    ...mapGetters(['isPlaying','currentSong','currentLyric']),
  },
  watch:{
    isPlaying(newValue,oldValue){
      if (newValue) {
        this.$refs.cdWarpper.classList.add('active')
      }else{
        this.$refs.cdWarpper.classList.remove('active')
      }
    },
    currentTime(newValue,oldValue){
      let lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 2.歌词滚动同步
      let currentLyricTop = document.querySelector('.lyric .active').offsetTop
      let lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric(newValue,oldValue){
      for(let key in newValue){
        this.currentLineNum = key
        return
      }
    }
  } ,
  props:{
    currentTime:{
      type:Number,
      default:0,
      required:true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
.banner{
  position: fixed;
  top: 150px;
  bottom:250px;
  left: 0;
  right: 0;
  .cd{
    .cd-warpper{ 
      display: block;
      width: 500px;
      height: 500px;
      border: 30px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      animation: sport 5s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric{
    li{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type{
        padding-bottom: 50%
      }
      &.active{
        color: #fff;
      }
    }
  }
}
@keyframes sport{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
  @import "../../assets/css/mixin";
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active{
  width: 60px;
  @include bg_color();
}
</style>