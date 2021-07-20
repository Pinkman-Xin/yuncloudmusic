<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.singer}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  methods: {
    ...mapActions(['setFullScreen','setMiniPlayer']),
    hiddenNormalPlayer(){
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  },
  computed:{
    ...mapGetters(['currentSong'])
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
.header {
  width: 100%;
  height: 100px;
  position: relative;
  z-index: 999;
  // background:#f00;
  // @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();
  }
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../../assets/images/down");
  }
  // .header-right {
  //   //@include bg_img('../../assets/images/more')
  // }
}
</style>