<template>
  <div>
    <div class="gd-rt-wrapper">
      <router-link to="/tjcontent" tag="span" class="tj-btn">推荐歌单</router-link>
      <router-link to="/mpcontent" tag="span" class="mc-btn">音乐人频道</router-link>
    </div>

    <router-view :GdWell="GdWell" :NewGdWell="NewGdWell"></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      GdWell: {},
      musicpor: [],
      NewGdWell: []
    }
  },
  mounted(){
    // this.axios("/gd/musicBroadcasting").then(res => {
    //   let gdarr = res.data.result;
    //   this.GdWell = gdarr[1]
    //   let arr1 = this.GdWell.channellist
    //   let arr2 = this.musicpor.songer
    //   let arr3 = arr1.map((o, i) => {
    //     return { ...o, ...arr2[i] };
    //   });
    //   this.NewGdWell = arr3
      
    // });
    // this.axios("/api/musicpor").then(res => {
    //   this.musicpor = res.data.data;
    // });
  },
};
</script>


<style lang="scss" scoped>
.gd-rt-wrapper {
  width: 100vw;
  display: flex;
  // text-align: center;
  justify-content: space-around;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 12px;

  .tj-btn {
    text-align: center;
    padding: 2px 5px 5px 5px;
  }

  .mc-btn {
    text-align: center;
    padding: 2px 5px 5px 5px;
  }

  .router-link-exact-active{
      color: skyblue;
      border-bottom: 2px solid skyblue;
  }
}
</style>
