<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe";
export default {
  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      probeType:1,
//preventDefault为false这行就是解决onclick失效问题
//为true就是阻止事件冒泡,所以onclick没用
　　preventDefault:false,
　　onClick:true,
　　pullUpLoad: {
　　　　threshold: 50
　　}
      // mouseWheel: true,
      // click: true,
      // tap: true 
    });
    let observer = new MutationObserver((mutationList, observer) => {
      // console.log(mutationList)
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh();
      // console.log(this.iscroll.maxScrollY)
    });
    // 2.告诉观察者对象我们需要观察什么内容
    let config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ["height", "offsetHeight"], // 观察特定属性
    };
    // 3.告诉观察者对象, 我们需要观察谁, 需要观察什么内容
    /*
    第一个参数: 告诉观察者对象我们需要观察谁
    第二个参数: 告诉观察者对象我们需要观察什么内容
    * */
    observer.observe(this.$refs.wrapper, config);
  },
  methods: {
    //提供一个监听滚动距离的方法给外界使用
    scrolling(fn) {
      this.iscroll.on("scroll", function () {
        fn(this.y);
      });
    },
    refresh(){
      setTimeout(()=>{
        this.iscroll.refresh()
      },100)
    },
    scrollTo(x,y,time){
      this.iscroll.scrollTo(x,y,time)
    }
  },
};
</script>
<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>