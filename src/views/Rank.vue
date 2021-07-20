<template>
  <div class="rank">
    <ScrollView>
          <ul class="normal-group">
            <li v-for="obj in category" :key="obj.id" @click.stop="selectedItem(obj.id)">
              <div class="rank-top">
                <img v-lazy="obj.coverImgUrl" alt="">
                <p>{{obj.updateFrequency}}</p>
              </div>
              <div class="rank-bottom">
                  <p>{{obj.name}}</p>
              </div>
            </li>
          </ul>
    </ScrollView>
  <transition>
      <router-view></router-view>
  </transition>
  </div>

</template>

<script>
import {getTopListDetail} from '../api/index'
import ScrollView from '../components/ScrollView.vue'
export default {
  data() {
    return {
      category:{}
    }
  },
  methods: {
     selectedItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
  components:{
    ScrollView
  },
  created(){
    getTopListDetail()
    .then(data=>{
      this.category = data
    })
    .catch(err=>{
      console.log(err);
    })
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";
.rank{
  position: fixed;
  top: 184px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  @include bg_sub_color();
  .normal-group{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .rank-top{
          position: relative;
          img{
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p{
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-bottom{
          width: 200px;
          @include no-wrap();
          p{
            padding: 10px 0;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
  }
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