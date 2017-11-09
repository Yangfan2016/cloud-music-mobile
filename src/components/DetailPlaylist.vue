<template>
    <div class="details">
        <mu-appbar class="appbar" v-bind:zDepth="0" title="歌单">
            <mu-icon-button icon="chevron_left" slot="left" v-on:click="closeList" />
        </mu-appbar>
        <div class="coverbox">
            <div class="cover_user">
                <div class="user_pic"><img v-bind:src="playList.coverImgUrl" alt="" style="width:100%;height:auto;"></div>
                <div class="user_info">
                    <div v-text="playList.name"></div>
                    <div v-text="playList.creator && playList.creator.nickname"></div>
                </div>
            </div>
            <div class="cover_bg"><img v-bind:src="playList.coverImgUrl" alt="" style="width:100%;height:100%;"></div>
        </div>
        <div class="listbox">
            <div class="playbar">
                <mu-icon-button icon="play_circle_outline" size="24" class="l-no play_btn"></mu-icon-button>
                <div class="r-item play_text">
                    <p>播放全部<span class="text_count">（共{{songList.length}}首）</span></p>
                </div> 
            </div>
            <ul class="songlist">
                <li class="listitem" v-bind:class="{active:item.id==curSong.id}" v-for="(item,index) in songList" v-bind:key="index">
                    <div class="l-no" v-text="index+1"></div>
                    <div class="r-item" v-on:click="playSong(item)">
                        <span class="songname" v-text="item.name"></span>
                        <p class="songinfo"><span v-text="item.ar[0].name"></span>-<span v-text="item.al.name"></span></p>
                    </div> 
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"details",
    props:["playList","songList"],
    data:function () {
        return {
            curSong:{id:-1}
        };
    },
    methods:{
        closeList:function () {
            this.$emit("close-list");
        },
        playSong:function (item) {
            this.curSong={id:item.id};
            
            if (localStorage.getItem(item.id)==null) {
                localStorage.setItem("curSong",JSON.stringify(item));
            }
            this.$emit("play-song");
        }
    },
    mounted:function () {
        var that=this;
    }
}
</script>
<style scoped>
.details{
    position: absolute;
    top:-56px;
    width:100%;
    min-height: 100vh;
    padding:0 0 70px 0;
    z-index:10;
    background-color: #fff;
}
.mu-appbar{
    background-color: rgba(0,0,0,0.15);
}
.coverbox{
    position: relative;
    padding: 60px 0 20px 0;
    overflow: hidden;
}
.cover_user{
    display: -webkit-flex;
    display: flex;
    padding:30px 20px 0 20px;
}
.user_pic{
    flex-basis: 150px;
}
.user_info{
    flex-basis:220px;
    padding:10px 15px;
    text-align:left;
    font-size: 0.8rem;
    color:#fff;
}
.cover_bg{
    position: absolute;
    top:0;left: 0;
    width:100%;
    height:100%;
    overflow: hidden;
    -webkit-filter: blur(10px);
    filter: blur(10px);
    z-index: -1;
}
.listBox{
    background-color: #fff;
}
.listitem.active{
    color:#cc2005;
}
.listitem,
.playbar{
    position: relative;
    padding-left:48px;
    height:48px;
    overflow: hidden;
}
.play_btn{
    color:#900;
}
.play_text{
    font-size:0.8rem;
    line-height:48px;
}
.text_count{
    font-size:0.7rem;
    color:#999;
}
.l-no{
    position: absolute;
    top:0;
    left:0;
    width:48px;
    line-height:48px;
    font-size: 0.8rem;
    text-align:center;
}
.r-item{
    border-top:1px solid #ddd;
    text-align:left;
}
.r-item:first-of-type{
    border:none;
}
.songname{
    font-size: 0.9rem;
}
.songinfo{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
