<template>
  <div>
    <div class="user-wrapper">
      <div class="user-bg"></div>
      <div class="user-message">
        <div class="user-icon" v-if="islogin">
          <img src="../assets/img/user.png" alt>
        </div>
        <div class="user-icon" v-else>
          <i class="icon-user"></i>
        </div>
        <div class="login-box" v-if="islogin === false">
          <button class="login-btn" @click="onClickLogin">登录</button>
          <button class="rej-btn" @click="onClickReg">注册</button>
        </div>
        <div class="login-box" v-else>
          <span>用户：{{userNum}}</span>
          <div class="backbox">
            <span class="nologin" @click="onBackLogin">退出登录</span>
            <span @click="onremoveLogin" class="nologin">注销</span>
          </div>
        </div>
      </div>
      <div class="user-music" v-if="islogin">
        <div class="music-content">
          <div class="music-list">
            <h3 class="list-title" @click="musicOn">本地音乐 ({{musicLength.length || 0}})</h3>
          </div>
          <div class="music-list">
            <h3 class="list-title" @click="musicHistoryOn">历史播放 ({{musicNewArr.length || 0}})</h3>
          </div>
          <div class="music-list">
            <h3 class="list-title">下载管理 (0)</h3>
          </div>
          <div class="music-list">
            <h3 class="list-title" @click="ongdBool">我的歌单 ({{newArr.length}})</h3>
          </div>
          <div class="music-list last">
            <h3 class="list-title">我的收藏 (0)</h3>
          </div>
        </div>
      </div>
      <div class="user-music" v-else>
        <div class="music-content">
          <div class="music-list">
            <h3 class="list-title">本地音乐 (0)</h3>
          </div>
          <div class="music-list">
            <h3 class="list-title">最近播放 (0)</h3>
          </div>
          <div class="music-list">
            <h3 class="list-title">下载管理 (0)</h3>
          </div>
          <div class="music-list">
            <h3 class="list-title">我的歌单 (0)</h3>
          </div>
          <div class="music-list last">
            <h3 class="list-title">我的收藏 (0)</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="login" v-show="isClickLogin">
      <div>
        <button class="back" @click="backBtnLogin">返回</button>
      </div>
      <input type="text" v-model="isuserNum" placeholder="请输入用户名">
      <input type="password" v-model="ispassword" placeholder="请输入密码">
      <button @click="onLoginBtn">登录</button>
      <div class="tick-wrapper" v-show="yesbtn"></div>
      <div class="tick-box" v-show="yesbtn">
        <p>账号密码不正确</p>
        <button class="yes" @click="onYesBtn">确定</button>
      </div>
    </div>
    <div class="reg" v-show="isClickReg">
      <div>
        <button class="back" @click="backBtnLogin">返回</button>
      </div>
      <input type="text" v-model="userNum" placeholder="请输入用户名">
      <input type="password" v-model="password" placeholder="请输入密码">
      <button @click="onRegBtn">立即注册</button>
    </div>

    <div class="Gedan-wrapper" v-show="gdBool">
      <div class="Gd-header">
        <i class="icon-arrow_lift icon-back" @click="ongdBoolBack"></i>
        <h3 class="gd-title">收藏的歌单 ({{newArr.length || 0}})</h3>
      </div>
      <div class="Gd-menu" ref="GdWrapper" v-if="newArr.length > 0">
        <div class="header-navlist">
          <ul class="tuijian-list">
            <li v-for="(t,i) in newArr" :key="i" class="tuijian-list-item">
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
                  <button class="addBtn" @click="onremoveGD(i)">删除歌单</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="Gd-menu" v-else>
        <h3 class="nullGD">您还没有收藏歌单哦</h3>
      </div>
    </div>

    <div class="music-wrapper" v-show="muBool">
      <div class="Gd-header">
        <i class="icon-arrow_lift icon-back" @click="musicBack"></i>
        <h3 class="gd-title">本地音乐 ({{musicLength.length || 0}})</h3>
      </div>
      <div class="music-menu" ref="musicWrapper">
        <div class="music-list ">
          <ul class="header-navlist">
            <li class="music-list-item" v-for="(s,i) in songCurrent.music" :key="i">
              <div class="d1">
                <p class="title">{{s.song}}</p>
                <p class="songer">{{s.songers}} - {{s.album}}</p>
              </div>
              <div class="d2">
                <span class="time">{{s.time}}</span>
                <i class="icon-play2 icon4" @click="musicPlay(i)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="music-wrapper" v-show="historymuBool">
      <div class="Gd-header">
        <i class="icon-arrow_lift icon-back" @click="musicHistoryBack"></i>
        <h3 class="gd-title">历史播放 ({{musicNewArr.length || 0}})</h3>
      </div>
      <div class="music-menu" ref="musicHWrapper">
        <div class="music-list ">
          <ul class="header-navlist">
            <li class="music-list-item" v-for="(s,i) in musicNewArr" :key="i">
              <div class="d1">
                <p class="title">{{s.song}}</p>
                <p class="songer">{{s.songers}} - {{s.album}}</p>
              </div>
              <div class="d2">
                <span class="time">{{s.time}}</span>
                <i class="icon-play2 icon4"></i>
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
      isClickLogin: false,
      isClickReg: false,
      userNum: "",
      password: "",
      isuserNum: "",
      ispassword: "",
      islogin: false,

      yesbtn: false,

      newArr:[],

      gdBool: false,
      muBool: false,
      historymuBool: false,
      musicLength: 0,

      songCurrent: [],

      musicNewArr:[]
    };
  },
  created() {
    let UserStr = JSON.parse(localStorage.getItem("loginStr"));
    this.userNum = UserStr;

    let PassStr = JSON.parse(localStorage.getItem("RegStr"));
    this.password = PassStr;

    let arr = JSON.parse(localStorage.getItem("newArr"));
    if(arr){
      this.newArr = arr
    }else{
      this.arr = []
    }
    
    let musicStr = JSON.parse(localStorage.getItem("musicNewArr"))
    // this.musicNewArr = musicStr
    if(musicStr){
      this.musicNewArr = musicStr
    }else{
      this.musicNewArr = []
    }
    // console.log(this.musicNewArr)
  },
  methods: {
    GDScroll() {
      if (!this.GdScroll) {
        this.GdScroll = new BScroll(this.$refs.GdWrapper, {
          scrollX: true,
          click: true,
          bounce: false
        });
      } else {
        this.GdScroll.refresh();
      }
    },
    MSScroll(){
      if (!this.MsScroll) {
        this.MsScroll = new BScroll(this.$refs.musicWrapper, {
          scrollX: true,
          click: true,
          bounce: false
        });
      } else {
        this.MsScroll.refresh();
      }
    },
    MSHscroll(){
      if (!this.MshScroll) {
        this.MshScroll = new BScroll(this.$refs.musicHWrapper, {
          scrollX: true,
          click: true,
          bounce: false
        });
      } else {
        this.MshScroll.refresh();
      }
    },
    musicPlay(index){
      let item = this.musicLength[index]
      console.log(item)
      let arr2 = JSON.parse(localStorage.getItem("musicNewArr") || "[]");
      console.log(arr2)
      if (arr2.length > 0) {
        if (arr2.indexOf(item) !== -1) {
          arr2.splice(arr2.indexOf(item), 1);
          arr2.unshift(item);
        } else {
          arr2.unshift(item);
        }
      }else{
        arr2.unshift(item);
      }

      localStorage.setItem("musicNewArr", JSON.stringify(arr2));
    },
    musicBack(){
      console.log(1)
      this.musicNewArr = JSON.parse(localStorage.getItem("musicNewArr") || "[]")
      localStorage.setItem("musicNewArr", JSON.stringify(this.musicNewArr));
      this.muBool = false
    },
    musicOn(){
      this.muBool = true
    },
    musicHistoryBack(){
      this.historymuBool = false
    },
    musicHistoryOn(){
      this.historymuBool = true
    },
    onYesBtn() {
      this.yesbtn = false;
    },
    ongdBool(){
      if(this.islogin){
        this.gdBool = true
      }
    },
    ongdBoolBack(){
      if(this.islogin){
        this.gdBool = false
      }
    },
    onClickLogin() {
      this.isClickLogin = true;
    },
    onClickReg() {
      this.isClickReg = true;
    },
    onremoveLogin() {
      localStorage.removeItem("loginStr");
      localStorage.removeItem("RegStr");
      this.islogin = false
    },
    onremoveGD(index){
      this.newArr = JSON.parse(localStorage.getItem("newArr"));
      this.newArr.splice(index,1)
      localStorage.setItem("newArr", JSON.stringify(this.newArr));
    },
    onBackLogin() {
      this.islogin = false;
    },
    backBtnLogin() {
      this.isClickReg = false;
      this.isClickLogin = false;
    },
    onLoginBtn() {
      if (
        this.isuserNum === this.userNum &&
        this.ispassword === this.password
      ) {
        console.log("登录成功");
        this.islogin = true;
        setTimeout(() => {
          this.isClickLogin = false;
        }, 1500);
      } else {
        setTimeout(() => {
          this.yesbtn = true;
        }, 1000);

        console.log("账号密码不正确");
      }
    },
    onRegBtn() {
      if (this.userNum && this.password) {
        this.islogin = true;

        setTimeout(() => {
          this.isClickReg = false;
        }, 1500);
      }
      let UserStr = localStorage.getItem("loginStr") || "";
      let str = this.userNum;
      str = str.trim();

      UserStr = str;

      localStorage.setItem("loginStr", JSON.stringify(UserStr));

      let PassStr = localStorage.getItem("RegStr") || "";
      let reg = this.password;
      reg = reg.trim();

      PassStr = reg;

      localStorage.setItem("RegStr", JSON.stringify(PassStr));
    }
  },
  mounted() {
    if (this.userNum && this.password) {
      this.islogin = true;
    }

    this.axios("/api/musicList").then(res => {
      this.songCurrent = res.data.data;
      this.musicLength = this.songCurrent.music
    });

    this.GDScroll();
    this.MSScroll();
    this.MSHscroll();
  }
};
</script>


<style lang="scss" scoped>
.user-wrapper {
  width: 100vw;
  height: 468px;
  background-image: url("../assets/img/user.jpg");
  background-size: 100%;
  position: relative;

  .header-navlist {
    width: 100vw;
  }

  .user-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 80px;
    background: #fff;
    opacity: 0.6;
    z-index: 0;
  }

  .user-message {
    width: 100vw;
    height: 80px;
    display: flex;
    overflow: hidden;
  }

  .user-icon {
    width: 60px;
    height: 60px;
    z-index: 100;
    background: #f0f0f0;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px 0 0 20px;

    .icon-user {
      font-size: 60px;
      color: #ccc;
    }

    img {
      width: 100%;
      height: 10%0;
    }
  }

  .login-box {
    z-index: 100;
    margin-top: 30px;
    margin-left: 20px;
    color: #fff;

    .backbox {
      margin-top: 5px;
    }

    .nologin {
      font-size: 14px;
      // margin-left: 20px;
      color: blue;
      font-weight: 700;
      margin-right: 20px;
    }

    .login-btn {
      width: 40px;
      height: 20px;
      font-size: 12px;
      border: 0;
      background: skyblue;
      color: #fff;
      margin-right: 10px;
      outline: none;
    }
    .rej-btn {
      width: 40px;
      height: 20px;
      font-size: 12px;
      border: 0;
      outline: none;
    }
  }

  .user-music {
    width: 100vw;

    .music-content {
      width: 100vw;
      height: 398px;
      margin-top: 10px;
    }

    .music-list {
      width: 100vw;
      height: 40px;
      border-top: 1px solid #c0c0c0;
    }

    .list-title {
      color: #fff;
      padding: 10px 0 0 20px;
      font-size: 14px;
    }

    .last {
      border-bottom: 1px solid #c0c0c0;
    }
  }
}

.login {
  background: #fff;
  height: 100vh;
  width: 100vw;
  z-index: 500;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("../assets/img/user.jpg");
  background-size: 100%;
  text-align: center;

  .tick-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    opacity: 0.4;
    z-index: 500;
  }

  .tick-box {
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -130px;
    width: 260px;
    height: 160px;
    background: skyblue;
    color: #f0f0f0;
    line-height: 100px;
    border-radius: 10px;
  }
  .yes {
    margin: 0;
    background: #c0c0c0;
    width: 100px;
    margin-left: 80px;
    color: #333;
  }

  input {
    width: 260px;
    height: 30px;
    border: none;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    margin-bottom: 20px;

    &:nth-of-type(1) {
      margin-top: 80px;
    }
  }

  .back {
    width: 60px;
    height: 20px;
    margin: 0;
    background: #c0c0c0;
  }

  button {
    display: block;
    border: 0;
    width: 260px;
    height: 30px;
    margin-top: 50px;
    background: skyblue;
    margin-left: 30px;
    color: #fff;
  }
}

.reg {
  background: #fff;
  height: 100vh;
  width: 100vw;
  z-index: 500;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("../assets/img/user.jpg");
  background-size: 100%;
  text-align: center;

  input {
    width: 260px;
    height: 30px;
    border: none;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    margin-bottom: 20px;

    &:nth-of-type(1) {
      margin-top: 80px;
    }
  }

  .back {
    width: 60px;
    height: 20px;
    margin: 0;
    background: #c0c0c0;
  }

  button {
    display: block;
    border: 0;
    width: 260px;
    height: 30px;
    margin-top: 50px;
    outline: none;
    background: skyblue;
    margin-left: 30px;
    color: #fff;
  }
}

.Gedan-wrapper{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: skyblue;
  z-index: 1000;

  .Gd-header{
    width: 100vw;
    height: 30px;
    color: #fff;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;

    .icon-back{
      display: inline-block;
      padding: 10px 0 0 10px;
    }

    .gd-title{
      display: inline-block;
      padding: 10px 0 0 10px;
    }
  }

  .Gd-menu{
    width: 100vw;
    margin-top: 40px;
    height: 528px;
    // padding: 20px 0 0 0;
    overflow: hidden;
  }

  .nullGD{
    width: 100vw;
    color: #333;
    font-size: 12px;
    padding: 10px 0 0 110px;
  }
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
    color: #f0f0f0;

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
      background: #c0c0c0;
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
    color: #f0f0f0;
  }
  .song-user {
    color: #f0f0f0;
    font-size: 12px;
    padding: 10px 0 0 10px;
  }

.music-wrapper{
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  background: CornflowerBlue;


  .Gd-header{
    width: 100vw;
    height: 30px;
    color: #fff;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;

    .icon-back{
      display: inline-block;
      padding: 10px 0 0 10px;
    }

    .gd-title{
      display: inline-block;
      padding: 10px 0 0 10px;
    }
  }

  .music-menu{
    width: 100vw;
    margin-top: 40px;
    height: 528px;
    overflow: hidden;
  }

  .music-list{
    width: 100vw;
  }

  .header-navlist{
    width: 100vw;
    height: 100%;
    position: relative;

    .music-list-item{
      width: 100vw;
      display: flex;
      margin-bottom: 10px;
    }

    .title{
      font-size: 14px;
      color: #fff;
      padding-left: 10px;
    }

    .songer{
      font-size: 10px;
      color: #c0c0c0;
      padding: 5px 0 0 10px;
    }

    .d1{
      width: 240px;
    }

    .d2{
      flex: 1;
      position: relative;
    }

    .icon4{
      color: #c0c0c0;
      font-size: 14px;
      position: absolute;
      bottom: 0;
      right: 20px;
    }

    .time{
      color: #c0c0c0;
      font-size: 12px;
      display: inline-block;
      position: absolute;
      bottom: 0;
      right: 40px;
    }
  }
}


</style>
