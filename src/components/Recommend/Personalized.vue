<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
        <img v-lazy="value.picUrl" alt="">
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    personalized:{
      type:Array,
      default:()=>[],
      required:true
    },
    title:{
      type:String,
      default:'',
      required:true
    },
    type:{
      type:String,
      default:'',
      required:true
    }
  },
  methods: {
    selectItem(id){
      this.$emit("select",id,this.type)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
@import "../../assets/css/mixin.scss";
.personalized{
  @include bg_sub_color();
  .personalized-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom:1px solid #ccc;
    padding:0 20px;
    h3{
    @include font_size($font_large);
    font-weight:bold;
    @include font_color();
    }
  }
  .personalized-list{
    padding: 20px 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      padding-bottom: 20px ;
      width: 200px;
      img{
        width:100%;
        height: 200px;
        border-radius: 20px;
      }
      p{
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium-s);
        text-align: center;
      }
    }
  }
  
}
</style>