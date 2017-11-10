<template>
    <div class="playpage">
        <mu-appbar class="appbar" v-bind:zDepth="0" v-bind:title="curMusic.sing+' - '+curMusic.singer">
            <mu-icon-button icon="chevron_left" slot="left" v-on:click="closeBox" />
        </mu-appbar>
        <div class="page_bg" v-bind:style="{'background-image':'url('+curMusic.posterUrl+')'}"></div>
        <div class="discbox" ref="musicDisc">
            <div class="disc_circle_outter"></div>
            <div class="disc_circle_inner" v-bind:style="{'background-image':'url('+curMusic.posterUrl+')'}"></div>
        </div>
        <div class="btngroup">
            <span style="display:inline-block;" v-on:click.stop="changePlaySongMode">
                <mu-icon-button v-if="playSongMode=='list_repeat'" class="" icon="repeat" />
                <mu-icon-button v-if="playSongMode=='sing_repeat'" class="" icon="repeat_one" />
                <mu-icon-button v-if="playSongMode=='random'"  class="" icon="shuffle" />
            </span>
            <mu-icon-button iconClass="btn" icon="skip_previous" v-on:click.stop="playNextOrPrev(-1)" />
            <mu-icon-button iconClass="btn" icon="play_circle_outline" v-if="!isPlaySong" v-on:click.stop="playMusic(true)" />
            <mu-icon-button iconClass="btn" icon="pause_circle_outline" v-if="isPlaySong" v-on:click.stop="playMusic(false)" />
            <mu-icon-button iconClass="btn" icon="skip_next" v-on:click.stop="playNextOrPrev(1)" />
            <mu-icon-button iconClass="btn" icon="list" v-on:click.stop="$emit('open-popbox')" />                        
        </div>
    </div>
</template>
<script>
export default {
    name:"playpage",
    props:["curSong","isPlaySong","isCanPlaySong","playSongMode"],
    data:function () {
        return {
            musicDisc:null,
            curMusic:this.curSong || {
                src:"",
                posterUrl:"../static/1.png",
                sing:"网易云音乐",
                singer:"听见好时光"
            },
        };
    },
    watch:{
        curSong:function (val,oldVal) {
            this.curMusic=val;
        },
        isPlaySong:function (val,oldVal) {
            this.rotateDisc(val);
        }
    },
    methods:{
        closeBox:function () {
            var that=this;
            that.$emit("close-box");
        },
        playMusic:function (boo) {
            if (this.isCanPlaySong) {
                this.$emit("change-status",boo);
            }
        },
        rotateDisc:function (boo) {
            var that=this;
            that.musicDisc.style.webkitAnimationPlayState=boo?"running":"paused";
        },
        playNextOrPrev:function (flag) {
            bus.$emit("play-next-music",flag);
        },
        changePlaySongMode:function () {
            bus.$emit("change-play-mode");
        }
    },
    mounted:function () {
        var that=this;
        that.musicDisc=that.$refs["musicDisc"];
        that.rotateDisc(that.isPlaySong);
    }
}
</script>
<style>
.playpage{
    position: absolute;
    top:0;
    width:100%;
    min-height: 100vh;
    padding:56px 0 0 0;
    z-index:11;
    background-color: #fff;
}
.playpage .appbar{
    background-color: rgba(0,0,0,0.15);
    background-image: linear-gradient(rgba(0,0,0,0.1) 80%,rgba(255,255,255,0.56));
}
.playpage .page_bg{
    position: absolute;
    top:0;
    width:100%;
    height: 100%;
    background-color:rgba(0,0,0,0.15);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0 50%;
    filter: blur(20px);
    z-index: -1;
}
.playpage .btngroup{
    display: flex;
    justify-content:space-between;
    position: absolute;
    width:100%;
    bottom:10%;
    padding:10px 10px;
    color:#fff;
}
.playpage .btngroup .btn{
    font-size: 1.5rem;
}
.playpage .discbox{
    position: relative;
    top:30vh;
    left:50%;
    width:calc(50vw + 80px);
    height:calc(50vw + 80px);
    transform: translate(-50%,-50%);
    animation: rotateA 3s linear infinite;
    animation-play-state: paused;
}
.playpage .disc_circle_outter{
    position: absolute;
    top:0;left:0;
    width:100%;
    height:100%;
    border-radius: 50%;
    background-image:repeating-radial-gradient(#333,#222 2%);
    background-repeat: repeat;
    box-sizing: content-box;
}
.playpage .disc_circle_inner{
    position: absolute;
    top:40px;left:40px;
    width:50vw;
    height:50vw;
    border-radius: 50%;
    box-sizing: content-box;
    background-position:center;
    background-size: 100% 100%;
}
@keyframes rotateA{
    0%{
        transform: translate(-50%,-50%) rotate(0);
    }
    100%{
        transform: translate(-50%,-50%) rotate(360deg);
    }
}
</style>


