<template>
    <div class="playpage">
        <mu-appbar class="appbar" v-bind:zDepth="0" title="网易云音乐-听见好时光">
            <mu-icon-button icon="chevron_left" slot="left" v-on:click="closeBox" />
        </mu-appbar>
        <div class="page_bg"></div>
        <div class="discbox">
            <div class="disc_circle_outter"></div>
            <div class="disc_circle_inner" style="background-image:url(../static/1.png)"></div>
        </div>
        <div class="btngroup">
            <mu-icon-button icon="shuffle" />
            <mu-icon-button icon="skip_previous" />
            <mu-icon-button icon="play_circle_outline" v-if="!isPlay" />
            <mu-icon-button icon="pause_circle_outline" v-if="isPlay" />
            <mu-icon-button icon="skip_next" />
            <mu-icon-button icon="list" />                        
        </div>
    </div>
</template>
<script>
export default {
    name:"playpage",
    data:function () {
        return {
            isPlay:false
        };
    },
    methods:{
        closeBox:function () {
            var that=this;
            that.$emit("close-box");
        },
    }
}
</script>
<style scoped>
.playpage{
    position: absolute;
    top:0;
    width:100%;
    min-height: 100vh;
    padding:56px 0 0 0;
    z-index:5;
    background-color: #fff;
}
.appbar{
    background-color: rgba(0,0,0,0.25);
}
.page_bg{
    position: absolute;
    top:0;
    width:100%;
    height: 100%;
    background-color: #999;
    filter: blur(20px);
    z-index: -1;
}
.btngroup{
    display: flex;
    justify-content:space-between;
    position: absolute;
    width:100%;
    bottom:10%;
    padding:10px 10px;
    color:#fff;
}
.btngroup .mu-icon{
    font-size: 1.5rem;  /* BUG */
}
.disc_circle_outter{
    position: absolute;
    top:25%;
    left:50%;
    transform: translate(-50%,0);
    width:calc(50vw + 80px);
    height:calc(50vw + 80px);
    border-radius: 50%;
    background-image:repeating-radial-gradient(#333,#222 2%);
    background-repeat: repeat;
    box-sizing: content-box;
}
.disc_circle_inner{
    position: absolute;
    top:25%;
    left:50%;
    transform: translate(-50%,40px);
    width:50vw;
    height:50vw;
    border-radius: 50%;
    box-sizing: content-box;
    background-position:center;
    background-size: 100% 100%;
}
</style>


