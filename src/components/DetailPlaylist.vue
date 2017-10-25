<template>
    <div class="details">
        <mu-appbar class="appbar" v-bind:zDepth="0" title="歌单">
            <mu-icon-button icon="arrow_back" slot="left" to="/" />
        </mu-appbar>
        <div class="playbar">
            <div class="l-no">img</div>
            <div class="r-item">
                <p>播放全部（共{{songList.length}}首）</p>
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
</template>
<script>
export default {
    name:"details",
    data:function () {
        return {
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
                that.songList=data.playlist.tracks;
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
.details{

}
.songlist{

}
.listitem,
.playbar{
    position: relative;
    padding-left:48px;
    height:48px;
    overflow: hidden;
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
.songname{
    font-size: 0.9rem;
}
.songinfo{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
