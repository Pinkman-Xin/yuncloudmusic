<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <div class="detail-top">
      <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    </div>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getPlayList, getAlbum,getArtistsSongs ,getTopList} from '../api/index.js'
import DetailHeader from '../components/Detail/DetailHeader.vue'
import DetailTop from '../components/Detail/DetailTop.vue'
import DetailBottom from '../components/Detail/DetailBottom.vue'
import ScrollView from '../components/ScrollView.vue'

export default {
  components: {
    DetailHeader, DetailTop, DetailBottom, ScrollView
  },
  data () {
    return {
      playlist: {},
    }
  },
  created () {
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else if (this.$route.params.type === 'singer') {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else if (this.$route.params.type === 'rank') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted () {
    let defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        let scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
      } else {
        let scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}

</script>

<style scoped lang="scss">
@import "../assets/css/mixin.scss";
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .detail-top {
    height: 100%;
    overflow: hidden;
  }
  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>