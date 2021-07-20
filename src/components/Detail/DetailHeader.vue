<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <p class="header-title">{{ title }}</p>
    <div class="header-right"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 0,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    // playlist:{
    //   type:Array,
    //   default:()=>[],
    //   required:true
    // },
  },
  methods: {
    changeTheme() {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.themes[this.index]
      );
    },
    back() {
      window.history.back();
    },
  },
  
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
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img("../../assets/images/back");
  }
  .header-right {
    @include bg_img("../../assets/images/more");
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>