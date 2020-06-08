<template>
  <div>
    <div class="tuijian-wrapper">
      <div class="tuijian-content" ref="tuijianWrapper">
        <div>
          <ul class="tuijian-list">
            <li v-for="(t,i) in songmenu.menu" :key="i" class="tuijian-list-item">
              <div class="item1">
                <img src="../assets/img/GD1.jpg" alt="加载错误" class="gd-img">
              </div>
              <div class="item2">
                <div class="item2-title">{{t.title}}</div>
                <div class="song-menu">{{t.songer}}{{t.song}}</div>
                <div class="song-user">
                  <i class="icon-user"></i>
                  {{t.playnum}}
                </div>
                <div class="addBtn-wrapper">
                  <button class="addBtn" @click="coverBtn(i)">添加收藏</button>
                </div>
              </div>
            </li>
          </ul>
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
      songmenu: [],
      newArr: [],

    };
  },
  methods: {
    TJScroll() {
      if (!this.GDScroll) {
        this.GDScroll = new BScroll(this.$refs.tuijianWrapper, {
          scrollX: true,
          click: true,
          bounce: false
        });
      } else {
        this.GDScroll.refresh();
      }
    },
    coverBtn(index){
      // this.newArr.push(this.songmenu.menu[index])
      // this.$emit('coverBtn',this.newArr)
      // console.log(this.newArr)
      let arr = JSON.parse(localStorage.getItem("newArr") || "[]");
      let item = this.songmenu.menu[index]

      if (arr.length > 0) {
        if (arr.indexOf(item) !== -1) {
          arr.splice(arr.indexOf(item), 1);
          arr.unshift(item);
        } else {
          arr.unshift(item);
        }
      }else{
        arr.unshift(item);
      }

      if(arr.lenth > 30){
        arr.pop()
      }
      localStorage.setItem("newArr", JSON.stringify(arr));
    }
  },
  mounted() {
    this.axios("/api/songmenu").then(res => {
      this.songmenu = res.data.data;
      console.log(this.songmenu.menu)
      this.$nextTick(() => {
        this.TJScroll();
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.tuijian-wrapper {
  width: 100vw;
  height: 100%;

  .tuijian-title {
    width: 100vw;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #b0b0b0;

    .bet-line {
      position: absolute;
      top: 5px;
      display: inline-block;
      width: 80px;
      height: 10px;
      border-bottom: 1px solid #b0b0b0;
    }

    .line-left {
      left: 40px;
    }
    .line-right {
      right: 40px;
    }
  }

  .tuijian-content {
    width: 100vw;
    height: 440px;
    margin-bottom: 40px;
    overflow: hidden;
  }

  .tuijian-list {
    width: 100vw;
    height: 100%;
    position: relative;

    .tuijian-list-item {
      width: 100vw;
      height: 80px;
      display: flex;
      overflow: hidden;
    }
  }

  .item1 {
    width: 70px;
    height: 70px;
    border-radius: 6px;
    overflow: hidden;
    margin: 5px 0 0 10px;

    .gd-img {
      width: 100%;
      height: 100%;
    }
  }
  .item2 {
    flex: 2;
    position: relative;

    .item2-title {
      width: 100%;
      margin: 10px 0 0 10px;
      font-weight: 700;
    }

    .addBtn-wrapper{
      width: 60px;
      height: 10px;
      position: absolute;
      bottom: 20px;
      right: 0;
    }

    .addBtn{
      font-size: 10px;
      border: 0;
      background: skyblue;
      color: #fff;
      outline: none;
    }
  }

  .song-menu {
    // display: inline-block;
    // height: 60px;
    width: 100%;
    font-size: 12px;
    padding: 10px 0 0 10px;
    color: #b0b0b0;
  }
  .song-user {
    color: #b0b0b0;
    font-size: 12px;
    padding: 10px 0 0 10px;
  }


}
</style>
