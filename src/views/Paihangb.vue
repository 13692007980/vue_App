<template>
  <div>
    <div class="phb-wrapper" ref="PHBwrapper">
      <div>
        <div class="phb-content-1">
          <div class="content-1-title">
            <h3 class="con1-title">{{phbArr1.name}}</h3>
            <img :src="phbArr1.bg_pic" class="con1-bgimg" alt>
          </div>
          <div class="con1">
            <div class="con1-hotbox">
              <img :src="phbArr1.pic_s444" class="con1-hotimg">
            </div>
            <p class="con1-hottext">{{phbArr1.comment}}</p>
          </div>
          <div class="bg-line"></div>
          <div class="phb-content-list">
            <ul>
              <li v-for="(s,i) in phbArr1.content" :key="i" class="phb-content-item">
                <div class="itembox">
                  <img :src="s.pic_small" alt class="song-img">
                </div>
                <div class="itembox">
                  <i class="icon-play2"></i>
                </div>
                <div class="itembox">
                  <p class="song-title">{{s.album_title}}</p>
                </div>
                <div class="itembox">
                  <p class="song-singer">{{s.author}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="phb-content-1">
          <div class="content-1-title">
            <h3 class="con1-title">{{phbArr2.name}}</h3>
            <img :src="phbArr2.bg_pic" class="con1-bgimg" alt>
          </div>
          <div class="con1">
            <div class="con1-hotbox">
              <img :src="phbArr2.pic_s444" class="con1-hotimg">
            </div>
            <p class="con1-hottext">{{phbArr2.comment}}</p>
          </div>
          <div class="bg-line"></div>
          <div class="phb-content-list">
            <ul>
              <li v-for="(s,i) in phbArr2.content" :key="i" class="phb-content-item">
                <div class="itembox">
                  <img :src="s.pic_small" alt class="song-img">
                </div>
                <div class="itembox">
                  <i class="icon-play2"></i>
                </div>
                <div class="itembox">
                  <p class="song-title">{{s.album_title}}</p>
                </div>
                <div class="itembox">
                  <p class="song-singer">{{s.author}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="phb-content-1">
          <div class="content-1-title">
            <h3 class="con1-title">{{phbArr3.name}}</h3>
            <img :src="phbArr3.bg_pic" class="con1-bgimg" alt>
          </div>
          <div class="con1">
            <div class="con1-hotbox">
              <img :src="phbArr3.pic_s444" class="con1-hotimg">
            </div>
            <p class="con1-hottext">{{phbArr3.comment}}</p>
          </div>
          <div class="bg-line"></div>
          <div class="phb-content-list">
            <ul>
              <li v-for="(s,i) in phbArr3.content" :key="i" class="phb-content-item">
                <div class="itembox">
                  <img :src="s.pic_small" alt class="song-img">
                </div>
                <div class="itembox">
                  <i class="icon-play2"></i>
                </div>
                <div class="itembox">
                  <p class="song-title">{{s.album_title}}</p>
                </div>
                <div class="itembox">
                  <p class="song-singer">{{s.author}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="phb-content-1">
          <div class="content-1-title">
            <h3 class="con1-title">{{phbArr4.name}}</h3>
            <img :src="phbArr4.bg_pic" class="con1-bgimg" alt>
          </div>
          <div class="con1">
            <div class="con1-hotbox">
              <img :src="phbArr4.pic_s444" class="con1-hotimg">
            </div>
            <p class="con1-hottext">{{phbArr4.comment}}</p>
          </div>
          <div class="bg-line"></div>
          <div class="phb-content-list">
            <ul>
              <li v-for="(s,i) in phbArr4.content" :key="i" class="phb-content-item">
                <div class="itembox">
                  <img :src="s.pic_small" alt class="song-img">
                </div>
                <div class="itembox">
                  <i class="icon-play2"></i>
                </div>
                <div class="itembox">
                  <p class="song-title">{{s.album_title}}</p>
                </div>
                <div class="itembox">
                  <p class="song-singer">{{s.author}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="phb-content-1">
          <div class="content-1-title">
            <h3 class="con1-title">{{phbArr5.name}}</h3>
            <img :src="phbArr5.bg_pic" class="con1-bgimg" alt>
          </div>
          <div class="con1">
            <div class="con1-hotbox">
              <img :src="phbArr5.pic_s444" class="con1-hotimg">
            </div>
            <p class="con1-hottext">{{phbArr5.comment}}</p>
          </div>
          <div class="bg-line"></div>
          <div class="phb-content-list">
            <ul>
              <li v-for="(s,i) in phbArr5.content" :key="i" class="phb-content-item">
                <div class="itembox">
                  <img :src="s.pic_small" alt class="song-img">
                </div>
                <div class="itembox">
                  <i class="icon-play2"></i>
                </div>
                <div class="itembox">
                  <p class="song-title">{{s.album_title}}</p>
                </div>
                <div class="itembox">
                  <p class="song-singer">{{s.author}}</p>
                </div>
              </li>
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
      phbArr: [],
      phbArr1: [],
      phbArr2: [],
      phbArr3: [],
      phbArr4: [],
      phbArr5: [],
    };
  },
  methods: {
    PHBScroll() {
      if (!this.phbScroll) {
        this.phbScroll = new BScroll(this.$refs.PHBwrapper, {
          scrollX: true,
          click: true,
          bounce: false
        });
      } else {
        this.phbScroll.refresh();
      }
    }
  },
  mounted() {
    this.axios("/gd/musicRankings").then(res => {
      this.phbArr = res.data.result;
      this.phbArr1 = this.phbArr[0];
      this.phbArr2 = this.phbArr[1];
      this.phbArr3 = this.phbArr[2];
      this.phbArr4 = this.phbArr[3];
      this.phbArr5 = this.phbArr[4];
      console.log(this.phbArr)

      this.PHBScroll();
    });
  }
};
</script>


<style lang="scss" scoped>
.phb-wrapper {
  width: 100vw;
  height: 468px;
  overflow: hidden;

  .phb-content-1 {
    width: 100vw;

    .content-1-title {
      width: 100vw;
      height: 40px;
      position: relative;
      background: #f0f0f0;
    }

    .con1-title {
      display: inline-block;
      height: 20px;
      padding: 10px 0 0 20px;
      font-size: 14px;
      font-weight: 700;
    }

    .con1-bgimg {
      position: absolute;
      top: 13px;
      left: 68px;
      width: 50px;
      height: 10px;
    }

    .con1 {
      display: flex;
    }

    .con1-hotbox {
      flex: 0 0 100px;
      height: 80px;
      margin: 10px 0 0 10px;
    }

    .con1-hotimg {
      width: 100%;
      height: 100%;
    }

    .con1-hottext {
      font-size: 12px;
      color: #c0c0c0;
      padding: 20px 5px 0 10px;
    }

    .bg-line {
      width: 90%;
      margin-left: 5%;
      border-bottom: 2px solid #e4393c;
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 0 10px 0 10px;
    }

    .phb-content-list {
      width: 90%;
      margin-left: 5%;
    }

    .phb-content-item {
      display: flex;
      margin-bottom: 10px;
      width: 100vw;
      height: 56px;
    }

    .itembox {
      margin-right: 10px;
    }

    .song-img {
      width: 50px;
      height: 50px;
    }

    .icon-play2 {
      line-height: 50px;
      color: #c0c0c0;
    }

    .song-title {
      font-size: 12px;
      color: #333;
      line-height: 50px;
      display: -webkit-box;
        -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            line-height: 49px;
    }

    .song-singer {
      font-size: 12px;
      color: #333;
      line-height: 50px;
      display: -webkit-box;
        -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            line-height: 49px;
    }
  }
}
</style>
