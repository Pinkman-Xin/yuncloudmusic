<template>
  <div id="app">
    <Header>     
    </Header>
    <Tabbar>
    </Tabbar>
    <keep-alive include="Search,Singer">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Tabbar from './components/Tabbar.vue'
import Player from './views/Player.vue'
export default {
  name:'App',
  components:{
    Header,
    Tabbar,
    Player
  },
  methods:{
    
  }
}
</script>

<style scoped lang="scss">
</style>
