<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer.vue'
import MiniPlayer from '../components/Player/MiniPlayer.vue'
import ListPlayer from '../components/Player/ListPlayer.vue'
import {mapGetters,mapActions} from 'vuex'
import mode from '../store/modeType'
import tool from '../tools/tools'
export default {
  components:{
    NormalPlayer,MiniPlayer,ListPlayer
  },
  methods: {
    ...mapActions(['setCurrentIndex','setFavoriteList','setHistorySong','setHistoryList']),
    timeupdate(e){
      this.currentTime = e.target.currentTime
    },
    end(){
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex+1)
      }else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      }else if (this.modeType === mode.random) {
        let index = tool.getRandomIntInclusive(0,this.songs.length-1)
         this.setCurrentIndex(index)
      }
    },
    
  },
  computed:{
    ...mapGetters(['currentSong','isPlaying','currentIndex','curTime','modeType','songs','favoriteList','historyList','currentSongName'])
  },
  watch:{
    currentSong(newValue,oldValue){
      this.$refs.audio.oncanplay = () =>{
       if (this.isPlaying) {
         this.totalTime = this.$refs.audio.duration
         this.setHistorySong(this.currentSong)
         this.$refs.audio.play()
       }else{
         this.$refs.audio.pause()
       }
     }
    },
    isPlaying(newValue,oldValue){
      if(newValue){
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      }else{
        this.$refs.audio.pause()
      }
    },
    currentIndex(newValue,oldValue){
      this.totalTime = this.$refs.audio.duration
      this.$refs.audio.oncanplay = () =>{
       if (this.isPlaying) {
         this.setHistorySong(this.currentSong)
         this.$refs.audio.play()
       }else{
         this.$refs.audio.pause()
       }
     }
  },
    curTime(newValue,oldValue){
      this.$refs.audio.currentTime = newValue
    },
    favoriteList(newValue,oldValue){
      tool.setLocalStorage('favoriteList',newValue)
    },
    historyList(newValue,oldValue){
      tool.setLocalStorage('historyList',newValue)
    }
  },
  created(){
    let list1 = tool.getLocalStorage('favoriteList')
    if (list1 === null) {
      return
    }
    this.setFavoriteList(list1)
    let list2 = tool.getLocalStorage('historyList')
    if (list2 === null) {
      return
    }
    this.setHistoryList(list2) 
  },
  mounted() {
    this.$refs.audio.oncanplay=()=>{
    this.totalTime = this.$refs.audio.duration
    }
  },
  data() {
    return {
      totalTime:0,
      currentTime:0
    }
  },
  
}

</script>

<style lang="scss" scoped>

</style>