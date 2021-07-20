<template>
  <div class="list-player" v-show="isShowListPlayer">
    <div class="player-warpper">
      <div class="player-top">
        <div class="top-left">
          <div class="mode loop" @click="mode" ref="mode"></div>
          <p v-if="this.modeType == 0">顺序播放</p>
          <p v-else-if="this.modeType == 1">单曲播放</p>
          <p v-else>随机播放</p>
        </div>
        <div class="top-right"  @click="delAll">
          <div class="del"></div>
        </div>
      </div>
      <div class="player-middle">
        <ScrollView ref="scrollView">
          <ul ref="play">
            <li class="item" v-for="(value,index) in songs" :key="value.id" @click="selectMusic(index)">
              <div class="item-left">
                <div class="item-play" v-show="currentIndex === index"  @click.stop="play"></div>
                <p>{{value.name}}</p>
              </div>
              <div class="item-right">
                <div class="item-favorite" @click.stop="favorite(value)" :class="{active : isFavorite(value)}"></div>
                <div class="item-del" @click.stop="del(index)"></div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="player-bottom" @click="hidden">
        <p>关闭</p>
      </div>
    </div>
  </div>
</template>
 
<script>
import {mapActions ,mapGetters} from 'vuex'
import ScrollView from "../ScrollView.vue";
import modeType from '../../store/modeType'
export default {
  data: function () {
    return {
      isShow: false,
    };
  },
  components: {
    ScrollView,
  },
  methods: {   
    hidden() {
      this.setListPlayer(false)
    },
    ...mapActions(['setIsPlaying','setModeType','setListPlayer','setDelSong','setCurrentIndex','setFavoriteSong']),
    play(){
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    del(index){
      this.setDelSong(index)
    },
    delAll(){
      this.setDelSong()
    },
    selectMusic(index){
      this.setCurrentIndex(index)
    },
    favorite(value){
      this.setFavoriteSong(value)
    },
    isFavorite(song){
      let result = this.favoriteList.find(function(currentValue){
       return currentValue.id === song.id
      })
      return result !== undefined
    },
  },
  computed:{
    ...mapGetters(['isPlaying','modeType','isShowListPlayer','songs','currentIndex','favoriteList']),
  },
  watch:{
    isPlaying(newValue,oldValue){
      if(newValue){
        this.$refs.play.classList.add('active')
      }else{
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    isShowListPlayer(newValue, oldValue){
      if (newValue) {
        this.$refs.scrollView.refresh()       
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-warpper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;

          &.loop{
            @include bg_img('../../assets/images/small_loop');
          }
          &.one{
            @include bg_img('../../assets/images/small_one');
          }
          &.random{
            @include bg_img('../../assets/images/small_shuffle');
          }
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
      .top-right {
        width: 84px;
        height: 84px;
        @include bg_img("../../assets/images/small_del");
      }
    }
    .player-middle {
      border-top: 1px solid #ccc;
      height: 700px;
      overflow: hidden;
      ul{
         &.active{
           .item{
             .item-left{
               .item-play{
               @include bg_img('../../assets/images/small_pause');
             }
             }
           } 
      }
      .item {
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img("../../assets/images/small_play");
          }
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_un_favorite");
            &.active{
              @include bg_img('../../assets/images/small_favorite');
            }
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img("../../assets/images/small_close");
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        @include font_size($font_medium);
        color: #fff;
      }
    }
  }
}
</style>