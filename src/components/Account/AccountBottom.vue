<template>
  <div class="like">
    <div class="warpper">
      <div class="bottom">
        <div class="bottom-left"></div>
        <div class="bottom-right" @click="selectAllMusic">播放全部</div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
      <SongListItem :songs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
      </ScrollView>
    </div>
    
  </div>
</template>
 
<script>
import ScrollView from '../ScrollView.vue'
import SongListItem from '../SongListItem.vue'
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  components:{
    SongListItem,ScrollView
  },
  props:{
    switchNum:{
      type:Number,
      default:0,
      required:true
    }
  },
  computed:{
    ...mapGetters(['favoriteList','historyList'])
  },
  methods: {
    ...mapMutations(['SET_SONG_DETAIL']),
    ...mapActions(['setFullScreen','setSongDetail']),
    selectAllMusic(){
      this.setFullScreen(true)
      // let ids = []
      if (this.switchNum === 0) {
      // ids =  this.favoriteList.map(function(item){
      //   return item.id
      // })
      this.SET_SONG_DETAIL(this.favoriteList)
      }else{
      // ids =  this.historyList.map(function(item){
      //   return item.id
      // })
      this.SET_SONG_DETAIL(this.historyList)
      }      
      // this.setSongDetail(ids)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.like{
  display: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .warpper{
    height: 100px;
    width: 100%;
    position: relative;
    .bottom{
    position: absolute;;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
      display: flex;
      justify-content: center;
      align-items:center;
      width: 250px;
      height: 50px;
      border: 1px solid red;
      border-radius: 50px;
      .bottom-left{
       width: 46px;
      height: 46px;
      @include bg_img("../../assets/images/small_play");
      }
      .bottom-right{
        @include font_size($font_medium)
      }
    }
  }
  .bottom-wrapper{
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

  }
}
</style>