
<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input type="text" placeholder="搜索歌曲 歌手 专辑" v-model="keywords" v-throttle="search">
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
        <ScrollView>
          <ul> 
          <li v-for="value in songs" :key="value.id" @click.stop="selectMusic(value.id)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
          </ul>
      </ScrollView>
    </div>
    <div class="search-hot" v-show="keywords === ''">
      <h3>热门搜索</h3>
        <ul>
          <li v-for="(value,index) in hots" :key="index"  @click.stop="selectHot(value.first)">{{value.first}}</li>
        </ul>
    </div>
    <div class="search-history" v-show="keywords === ''">
      <ul>
        <li v-for="(value,index) in searchHistory" :key="index" @click.stop="selectHot(value)">
          <div class="history-left">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView.vue'
import {getSearchList,getSearchHot} from '../api/index'
import toll from '../tools/tools'
import {mapActions} from 'vuex'
export default {
  name:'Search',
components:{
  ScrollView
},
data() {
  return {
    keywords:'',
    songs:[],
    hots:[],
    searchHistory:[]
  }
},
methods: {
  ...mapActions(['setFullScreen','setMiniPlayer','setSongDetail']),
  search(){
    getSearchList({keywords:this.keywords})
    .then(data=>{
      this.songs = data.result.songs
    })
    .catch(err=>{
      console.log(err);
    })
  },
  selectMusic(id){
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
      if (this.searchHistory.includes(this.keywords)) {
        return
      }else{
      this.searchHistory.push(this.keywords)
      toll.setLocalStorage('searchHistory', this.searchHistory)
      this.keywords = ''
      }
      
  },
  selectHot(name){
    this.keywords = name
    this.search(this.keywords)
  },
  delHistory (name) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== name
      })
      toll.setLocalStorage('searchHistory', this.searchHistory)
  }
},
directives: {
    throttle: {
      // 指令的定义
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  created(){
    getSearchHot()
    .then(data=>{
      this.hots = data.result.hots
    })
    .catch(err=>{
      console.log(err);
    })
  if(toll.getLocalStorage('searchHistory') === undefined || toll.getLocalStorage('searchHistory') === null) {
      return
    }else{
      this.searchHistory = toll.getLocalStorage('searchHistory')
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
.search{
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();
  .search-box{
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    img{
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input{
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }

  }
  .search-suggest{
    position: fixed;
    left: 0;
    right: 0;
    top: 320px;
    bottom: 0;
    overflow: hidden;
    color: #fff;
    li{
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    img{
      width: 40px;
      height: 40px;
    }
    p{
      margin-left:20px;
      @include font_color();
      @include font_size($font_medium)
    }
    }
  }
  .search-hot{
    h3{
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul{
      display: flex;
      flex-wrap:wrap;
      li{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        border-radius: 30px;
        padding: 0 20px;
        @include font_color();
        @include font_size($font_medium_s);
        margin: 20px;

      }
    }
  }
  .search-history{
      margin-top: 20px;
      li{
        padding: 20px 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .history-left{
          display: flex;
          align-items: center;
          img{
            width: 40px;
            height: 40px;
          }
          p{
            margin-left: 20px;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
        .history-right{
          img{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
}
</style>