<template>
  <transition :css="false" @enter="enter" @leave="leave">
     <div class="mini-player" v-show="this.isShowMiniPlayer">
    <div class="player-warpper">
      <div class="player-left" @click="showNormalPlayer">
      <img :src="currentSong.picUrl" alt="" ref="cd">
      <div class="player-title">
        <h3>{{currentSong.name}}</h3>
        <p>{{currentSong.singer}}</p>
      </div>
    </div>
    <div class="player-right">
      <div class="play" @click="play" ref="play"></div>
      <div class="list" @click.stop="showList"></div>
    </div>
    </div>
  </div>
  </transition>
  
  
 
</template>
 
<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import {mapActions ,mapGetters} from 'vuex'
export default {
  methods: {
    showList(){
     this.setListPlayer(true) 
    },
    ...mapActions(['setFullScreen','setMiniPlayer','setIsPlaying','setListPlayer']),
    showNormalPlayer(){
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    enter(el,done){
      Velocity(el, "transition.bounceDownIn", { duration: 500 },function(){
        done()
      })
    },
    leave(el,done){
      Velocity(el, "transition.bounceDownOut", { duration: 500 },function(){
        done()
      })
    },
    play(){
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed:{
    ...mapGetters(['isShowMiniPlayer','isPlaying','currentSong'])
  },
  watch:{
    isPlaying(newValue,oldValue){
      if(newValue){
        this.$refs.play.classList.add('active')
        this.$refs.cd.classList.add('active')
      }else{
        this.$refs.play.classList.remove('active')
        this.$refs.cd.classList.remove('active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.mini-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-warpper{
  width: 100%;
  height: 100%;
  @include bg_color();
  align-items: center;
  display: flex;
  justify-content: space-between;
  .player-left{
    display: flex;
    padding-left: 30px;
    img{
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin-right: 20px;
      animation: sport 5s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running
      }
    }
    .player-title{
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        h3{
          @include font_size($font_medium);
          @include font_color();
        }
        p{
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
  }
  .player-right{
    display: flex;
    align-items: center;
    .play{
      height: 120px;
      width: 120px;
      @include bg_img('../../assets/images/play');
      &.active{
        @include bg_img('../../assets/images/pause');
      }
    }
    .list{
      height: 120px;
      width: 120px;
      @include bg_img('../../assets/images/list')
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