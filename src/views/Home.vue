<template>
    <div>
        <HomeBanner/>
        <div class="home-wrapper" ref="homewrapper">
            <div class="home-content-gd">
                <h2 class="home-title">歌单精选</h2>
                <div>
                    <ul class="home-gd-ul">
                        <li v-for="(s,i) in HomeContentArr.gd" :key="i" class="home-gd-list">
                            <div class="home-gd-box">
                                <img :src="s.avimg" />
                                <div class="bg-top"></div>
                                <div class="play-num">
                                    <i class="icon-play2"></i>
                                    {{s.playnum}}万
                                </div>

                                <div class="bg-bottom">
                                    <p class="p1">{{s.title}}</p>
                                    <p class="p2">{{s.singer}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <h2 class="home-title">热门榜单</h2>
                <div>
                    <ul class="home-phb-ul">
                        <li v-for="(p,i) in HomePHBArr.phb" :key="i" class="home-phb-list">
                            <div class="content-left">
                                <img :src="p.img">
                            </div>
                            <div class="content-right">
                                <h2>{{p.title}}</h2>
                                <p>{{p.d1}}</p>
                                <p>{{p.d2}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import HomeBanner from '../components/HomeBanner'
import BScroll from "better-scroll"

export default {
    data(){
        return{
            HomeContentArr: [],
            HomePHBArr:[]
        }
    },
    components:{
        HomeBanner
    },
    methods:{
        HScroll(){
            if (!this.HmScroll) {
                this.HmScroll = new BScroll(this.$refs.homewrapper, {
                    scrollX: true,
                    click: true,
                    bounce: false
                });
            } else {
                this.HmScroll.refresh();
            }
        }
    },
    mounted(){
        this.axios("/api/gdcontent").then(res => {
            this.HomeContentArr = res.data.data;
        });
        this.axios("/api/phbcontent").then(res => {
            this.HomePHBArr = res.data.data;
        });

        this.$nextTick(() => {
            this.HScroll()
        })
    }
}
</script>


<style lang="scss" scoped>
.home-wrapper{
    width: 100vw;
    height: 328px;
    overflow: hidden;

    .home-content-gd{
        width: 100vw;
        
        .home-title{
            font-size: 16px;
            font-weight: 700;
            padding: 10px 0 10px 12px;
        }

        .home-gd-ul{
            width: 100vw;
            height: 100%;
        }
    }

    .home-gd-list{
        width: 140px;
        height: 140px;
        display: inline-block;
        margin-left: 12px;
        margin-bottom: 10px;

        img{
            width: 100%;
            height: 100%;
        }
    }

    .home-gd-box{
        position: relative;
    }

    .bg-top{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 20px;
        background-image: linear-gradient(to right, #fff, #333);
        opacity: 0.2;
    }

    .play-num{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 20px;
        text-align: right;
        font-size: 12px;
        color: #fff;
        line-height: 20px;
        padding-right: 5px;
    }

    .bg-bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background: rgba(0, 0, 0, 0.2);

        .p1{
            font-size: 14px;
            color: #fff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            line-height: 20px;
            padding: 0 0 0 5px;
        }
        .p2{
            font-size: 13px;
            color: #e4d9d9;
            padding: 0 0 0 5px;
        }
    }

    .home-phb-ul{
        width: 100vw;
        height: 100%;
    }

    .home-phb-list{
        width: 100vw;
        height: 100px;
        display: flex;
        margin-bottom: 10px;
    }

    .content-left{
        flex: 0 0 100px;
        height: 100px;
        margin-left: 10px;

        img{
            width: 100%;
            height: 100%;
        }
    }

    .content-right{
        flex: 1;
        background: #f0f0f0;

        h2{
            font-weight: 700;
            padding: 10px 0 0 10px;
        }

        p{
            color: #555;
            font-size: 14px;
            padding: 8px 5px 0 10px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            line-height: 20px;
        }
    }
}
</style>
