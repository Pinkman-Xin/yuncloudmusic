<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="'personalized'"
          ></Personalized>
          <Personalized
            :personalized="album"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="'album'"
          ></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,
} from "../api/index";
import Banner from "../components/Recommend/Banner.vue";
import Personalized from "../components/Recommend/Personalized.vue";
import SongList from "../components/Recommend/SongList.vue";
import ScrollView from "../components/ScrollView.vue";
export default {
  data() {
    return {
      banners: [],
      personalized: [],
      album: [],
      songs: [],
    };
  },
  methods: {
    fatherSelectItem(id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`,
      });
    },
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
  created() {
    getBanner()
      .then((data) => {
        this.banners = data.banners;
      })
      .catch(function (error) {
        console.log(error);
      });
    getPersonalized()
      .then((data) => {
        this.personalized = data.result;
      })
      .catch(function (error) {
        console.log(error);
      });
    getNewAlbum()
      .then((data) => {
        this.album = data.albums.splice(0, 6);
      })
      .catch(function (error) {
        console.log(error);
      });
    getNewSong()
      .then((data) => {
        // this.songs = data.result;
        let list = []
        data.result.forEach((value)=>{
          let obj = {}
          obj.name = value.name
          obj.id = value.id
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for(let i = 0; i<value.song['artists'].length;i++){
            if (i===0) {
              singer = value.song['artists'][i].name
            }else{
              singer += '-' + value.song['artists'][i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>


<style lang="scss" scoped>
.recommend {
  .recommend-warpper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.5s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.5s;
}
</style>