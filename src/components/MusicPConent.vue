<template>
    <div>
        <div class="yinyueren-wrapper">
            <div class="yinyueren-content">
                <div>
                    <ul class="yinyueren-list">
                        <li v-for="(s,i) in songerArr.songer" :key="i" class="yinyueren-list-item">
                            <div class="yinyueren-content">
                                <div class="content-left">
                                    <img :src="s.avatar" alt="">
                                </div>
                                <div class="content-right">
                                    <div class="js">{{s.js}}</div>
                                    <div class="time">出道时间：{{s.time}}年</div>
                                    <div class="textsong">代表作品：{{s.textsong}}</div>
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
export default {
    props:{
        GdWell:{
            type: Object,
            required: true
        },
        NewGdWell:{
            type: Array,
            required: true
        }
    },
    data(){
        return {
            songerArr: []
        }
    },
    mounted(){
        this.axios("/api/musicpor").then(res => {
            this.songerArr = res.data.data;
            console.log(this.songerArr)
        });
    }
}
</script>

<style lang="scss" scoped>
.yinyueren-wrapper{
    width: 100vw;
    height: 100%;

    .yinyueren-title{
        width: 100vw;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        color: #b0b0b0;

        .bet-line{
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

    .yinyueren-list{
        width: 100vw;
        height: 100%;
        position: relative;
        margin-bottom: 40px;
    }

    .yinyueren-list-item{
        width: 100vw;


        .yinyueren-content{
            width: 100vw;
            display: flex;
            margin-bottom: 10px;
        }
    }
    .content-left{
        flex: 0 0 100px;
        height: 100px;
        margin-left: 10px;
        border-radius: 6px;
        overflow: hidden;

        img{
            width: 100%;
            height: 100%;
        }
    }   
    .content-right{
        flex: 1;

        .js{
            font-size: 12px;
            color: #000;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 13px;
            padding: 5px 5px 0 5px;
        }

        .time{
            font-size: 12px;
            color: #b0b0b0;
            padding: 10px 5px 0 5px;
        }

        .textsong{
            font-size: 10px;
            color: #b0b0b0;
            padding: 10px 5px 0 5px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 13px;
        }
    }
}
</style>
