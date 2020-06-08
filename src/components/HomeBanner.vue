<template>
    <div>
        <div class="banner-wrapper">
           <transition-group name="ban" tag="ul" class="banner-ul">
                    <li v-for="(s,i) in imgArr" :key="i" class="banner-list" v-show="i === currentIndex">
                        <img :src="s.imgUrl">
                    </li>
            </transition-group>
            <div class="mmp">
                <span class="s1">酷狗LIVE</span>
                <span class="s1">音乐人</span>
                <span class="s1">供应商入住</span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            imgArr: [
                {
                    id: 0,
                    imgUrl: require("../assets/img/p1.jpg")
                },
                {
                    id: 1,
                    imgUrl: require("../assets/img/p2.jpg")
                },
                {
                    id: 2,
                    imgUrl: require("../assets/img/p3.jpg")
                },
                {
                    id: 3,
                    imgUrl: require("../assets/img/p4.jpg")
                },
                {
                    id: 4,
                    imgUrl: require("../assets/img/p5.jpg")
                },
            ],
            currentIndex: 0
        }
    },
    methods:{
        autoPlay(){
            this.currentIndex ++
            if(this.currentIndex > this.imgArr.length - 1){
                this.currentIndex = 0
            }
        }
    },
    created(){
        this.$nextTick(() => {
            this.timer = setInterval(() => {
                this.autoPlay()
            },2000)
        })
    }
}
</script>


<style lang="scss" scoped>
.banner-wrapper{
    position: relative;
    width: 100vw;

    .mmp{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 30px;
        display: flex;
        background: rgba(0,0,0,0.2);
        text-align: center;

        .s1{
            color: #fff;
            flex: 1;
            line-height: 30px;
            font-size: 12px;
        }
    }
}

.banner-ul{
    position: relative;
    overflow: hidden;
    height: 140px;
    width: 100%;
}


.banner-list{
    display: inline-block;
    width: 100vw;
    height: 140px;
    position: absolute;

    img{
        width: 100%;
        height: 100%;
    }
}
// .ban-enter,.ban-leave-to {
//   transform: translateX(-100%)
// }
// .ban-enter-active,.ban-leave-active {
//   transition: all 1s linear;
// }
// .ban-enter-to,.ban-leave {
//   transform: translateX(100%);
// }


.ban-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.ban-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%)
}

.ban-enter {
  transform: translateX(100%)
}

.ban-leave {
  transform: translateX(0)
}
</style>
