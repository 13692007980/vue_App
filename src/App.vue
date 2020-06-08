<template>
  <div id="app">
    <KGheader :header="header"/>
    <div class="tabber">
      <router-link to="/" tag="span"><i class="icon-pie-chart icon"></i>首页</router-link>
      <router-link to="/gedan" tag="span"><i class="icon-play icon"></i>歌单</router-link>
      <router-link to="/phb" tag="span"><i class="icon-mic icon"></i>排行榜</router-link>
      <router-link to="/mine" tag="span"><i class="icon-user icon"></i>我的</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import KGheader from './components/KGheader'

export default {
  name: 'App',
  data(){
    return{
      header:{},
    }
  },
  mounted(){
    this.axios('./api/header').then(res => {
      this.header = res.data.data
    })
  },
  components: {
    KGheader
  }
}
</script>

<style>
.tabber{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 40px;
  display: flex;
  background: #fff;
  z-index: 100
}
.tabber span{
  display: inline-block;
  flex: 1;
  text-align: center;
  padding-top: 25px;
  font-size: 12px;
  color: #333;
  position: relative;
}
.icon{
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -9px;
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 18px;
  color: #c0c0c0;
  margin-top: 5px;
}

.tabber span.router-link-exact-active{
  color: skyblue;
}
.tabber span.router-link-exact-active .icon{
  color: skyblue;
}
</style>
