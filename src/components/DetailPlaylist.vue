<template>
    <div class="details">
        <mu-appbar class="appbar" v-bind:zDepth="0" title="歌单">
            <mu-icon-button icon="chevron_left" slot="left" to="/" />
        </mu-appbar>
        <div class="coverbox">
            <div class="cover_user">
                <div class="user_pic"><img v-bind:src="playList.coverImgUrl" alt="" style="width:100%;height:auto;"></div>
                <div class="user_info">
                    <div v-text="playList.name"></div>
                    <div v-text="playList.creator.nickname"></div>
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
                <li class="listitem" v-for="(item,index) in songList" v-bind:key="index">
                    <div class="l-no" v-text="index+1"></div>
                    <div class="r-item">
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
    data:function () {
        return {
            playList:{},
            songList:[]
        };
    },
    methods:{
        getDetailPlayList:function (id) {
            var that=this;
            that.$http.get(that.$api.getPlayListDetail(id))
            .then(res=>{
                console.log(res);
                let data=res.data;
                that.playList=data.playlist;
                that.songList=that.playList.tracks;
            })
            .catch(err=>{
                console.error('Error: '+err);
            });
        },
    },
    mounted:function () {
        var that=this;
        that.$nextTick(function () {
            var playListID=that.$router.currentRoute.query.id;
            that.getDetailPlayList(playListID);
        });
    }
}
</script>
<style scoped>
.coverbox{
    position: relative;
    padding: 10px 0;
    overflow: hidden;
}
.cover_user{
    display: flex;
    padding:30px 20px 0 20px;
}
.user_pic{
    flex-basis: 150px;
}
.user_info{
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
