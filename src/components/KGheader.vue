<template>
  <div class="header-wrapper">
    <div class="header-navlist" ref="navWrapper">
      <ul class="navlist-ul">
        <li v-for="(h,i) in header.nav" :key="i" class="list-item">
          <span>{{h.description}}</span>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <div class="header-search" @click="clickSearch">
        <i class="icon-search icon2"></i>
      </div>
      <div class="header-menu">
        <i class="icon-menu icon2"></i>
      </div>
    </div>
    <div class="header-search-wrapper" v-show="clickOn">
      <div class="search-header">
        <i class="icon-arrow_lift icon3" @click="clickBackSearch"></i>
        <input type="text" v-model="searchText" class="search" placeholder="请输入要搜索的内容">
        <button class="search-btn" @click="searchBtn(searchText)">搜索</button>
      </div>
      <div class="search-content">
        <div class="search-bg">
          <img src="../assets/img/searchbg.jpg" alt>
        </div>
        <div class="searchlist" v-if="searchlist.length > 0">
          <ul>
            <div class="search-item-title">
              <span class="t1">歌曲名</span>
              <span class="t1">专辑</span>
              <span class="t1">时长</span>
            </div>
            <li v-for="(s,i) in searchlist" :key="i" class="search-item">
              <div class="search-item-content">
                <span class="t2">{{s.singer}}-{{s.song}}</span>
                <span class="t2">{{s.songText}}</span>
                <span class="t2">{{s.time}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="oldlist" v-else>
          <div class="hot-search">
            <h3 class="hot-search-title">热门搜索</h3>
            <ul class="hot-search-ul">
              <li class="hot-search-item">汪峰 - 怒放的生命</li>
              <li class="hot-search-item">周深 - 启示</li>
              <li class="hot-search-item">杨小壮 - 微笑吧</li>
              <li class="hot-search-item">黑龙 - 人生里最重要的事</li>
              <li class="hot-search-item">半吨兄弟 - 披着羊皮的狼</li>
              <li class="hot-search-item">吉他的天空 - 一个人的路</li>
              <li class="hot-search-item">韩安旭 - 慢动作先生</li>
              <li class="hot-search-item">魏新雨 - 做个神仙</li>
            </ul>
            <h3 class="history-search-title">历史搜索</h3>
            <ul class="history-ul">
              <li v-for="(s,i) in historySearch" :key="i" class="history-item">{{s}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      clickOn: false,
      searchText: "",
      oldlist: [],
      searchlist: [],
      historySearch: [],
      NewHistorySearch: []
    };
  },
  props: {
    header: {
      type: Object,
      require: true
    }
  },
  created() {
    let arr = JSON.parse(localStorage.getItem("historySearch"));
    this.historySearch = arr
  },
  methods: {
    initalScroll() {
      if (!this.navScroll) {
        this.navScroll = new BScroll(this.$refs.navWrapper, {
          scrollX: true,
          click: true,
          bounce: false
        });
      } else {
        this.navScroll.refresh();
      }
    },
    clickSearch() {
      this.clickOn = true;
    },
    clickBackSearch() {
      this.clickOn = false;
    },
    searchBtn(str) {
      let searchText = this.searchText;
      if (searchText) {
        this.searchlist = this.oldlist.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return (
              String(product[key])
                .toLowerCase()
                .indexOf(searchText) > -1
            );
          });
        });
      }
      // console.log(str)
      let arr = JSON.parse(localStorage.getItem("historySearch") || "[]");
      str = str.trim()
      if (arr.length > 0) {
        if (arr.indexOf(str) !== -1) {
          arr.splice(arr.indexOf(str), 1);
          arr.unshift(str);
        } else {
          arr.unshift(str);
        }
      }else{
        arr.unshift(str);
      }

      if(arr.lenth > 8){
        arr.pop()
      }
      localStorage.setItem("historySearch", JSON.stringify(arr));
    }
  },

  computed: {},
  mounted() {
    // console.log(this.historySearch)

    this.initalScroll();

    this.axios("./api/searchMusic").then(res => {
      let arr = res.data.data;
      this.oldlist = arr.search;
      return this.oldlist;
      // console.log(this.oldlist)
    });
  },
  beforeDestroy() {
    if (this.navScroll) {
      this.navScroll.destroy();
      this.navScroll = null;
    }
  }
};
</script>


<style lang="scss" scoped>
.header-wrapper {
  width: 100vw;
  height: 60px;
  background: #0c8ed9;
  display: flex;
  position: relative;

  .header-navlist {
    max-width: 224px;
    height: 40px;
    // padding: 20px 0 0 0;
    overflow: hidden;
    margin-top: 20px;
  }

  .navlist-ul {
    white-space: nowrap;
    height: 100%;
    width: 455px;

    .list-item {
      display: inline-block;
      height: 100%;
      text-align: center;
      line-height: 40px;
      padding: 0 5px 0 5px;
      color: #fff;
      font-size: 14px;

      &:first-child {
        font-size: 20px;
      }
    }
  }

  .header-right {
    flex: 1;
    height: 40px;
    margin-top: 20px;
    display: flex;

    .header-search {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
    .icon2 {
      display: inline-block;
      color: #fff;
    }

    .header-menu {
      height: 40px;
      line-height: 40px;
      flex: 1;
      text-align: center;
    }
  }

  .header-search-wrapper {
    background: rgba(255, 255, 255, 1);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
  }

  .search-content {
    width: 100vw;
    height: 528px;
    position: relative;

    .search-bg {
      width: 100vw;
      height: 528px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.8;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .oldlist {
      z-index: 20;
    }

    .hot-search {
      width: 100vw;
    }

    .hot-search-title {
      color: #fff;
      font-size: 16px;
      padding: 10px 0 10px 10px;
      border-bottom: 1px solid #c0c0c0;
    }

    .hot-search-ul {
      width: 100vw;
      overflow: hidden;
    }

    .hot-search-item {
      width: 160px;
      height: 20px;
      font-size: 12px;
      color: #c0c0c0;
      float: left;
      padding: 10px 0 20px 10px;
    }

    .history-search-title {
      color: #fff;
      font-size: 16px;
      padding: 20px 0 10px 10px;
      border-bottom: 1px solid #c0c0c0;
    }
  }

  .search-header {
    width: 100vw;
    height: 40px;
    line-height: 40px;
    background: #0c8ed9;

    .icon3 {
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      margin: 10px 10px 0 10px;
      font-size: 12px;
      color: #fff;
    }

    .search {
      width: 200px;
      height: 20px;
      border: 1px solid #444;
      border-radius: 10px;
      outline: none;
      padding-left: 10px;
      margin-right: 10px;
      font-size: 12px;
    }

    .search-btn {
      border: 0;
      width: 50px;
      height: 24px;
      background: #169af3;
      color: #fff;
      outline: none;
    }
  }

  .search-item-title {
    width: 100vw;
    height: 30px;
    background: #fff;
    opacity: 0.4;
    display: flex;

    .t1 {
      display: inline-block;
      color: #333;
      width: 160px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      font-size: 14px;

      // &:nth-child(3){
      //   text-align: center;
      // }
    }
  }

  .search-item {
    width: 100vw;

    .search-item-content {
      width: 100vw;
      display: flex;
    }

    .t2 {
      color: #fff;
      width: 160px;
      height: 30px;
      font-size: 12px;
      display: inline-block;
      padding: 10px 0 10px 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      line-height: 30px;
    }
  }

  .history-ul {
    width: 100vw;
    overflow: hidden;

    .history-item {
      width: 160px;
      height: 20px;
      font-size: 12px;
      color: #c0c0c0;
      float: left;
      padding: 10px 0 20px 10px;
    }
  }
}
</style>

