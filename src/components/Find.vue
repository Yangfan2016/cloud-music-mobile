<template>
    <div class="find">
        <mu-dialog :open="isOpen" title="Dialog" @close="close">
            <p>加载失败！</p>
            <mu-flat-button slot="actions" primary @click="close" label="确定"/>
        </mu-dialog>
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-tabs v-bind:value="activeTab" v-on:change="handleTabChange">
            <mu-tab value="tab1" title="个性推荐"/>
            <mu-tab value="tab2" title="歌单"/>
            <mu-tab value="tab3" title="主播电台"/>
            <mu-tab value="tab4" title="排行榜"/>
        </mu-tabs>
        <div v-if="activeTab === 'tab1'">
    		<!-- 轮播图 -->
    		<swiper-box></swiper-box>
            <!-- 推荐歌单 -->
            <div class="playlist clearfix">
                <!-- loading -->
                <mu-circular-progress class="center" :size="40" :strokeWidth="3" color="#f20" v-show="isLoading" />
                <div class="playlist_item" v-for="playlist in playlistArr" v-bind:key="playlist.id" v-on:click="linkToDetail(playlist.id)">  
                    <img v-bind:src="playlist.coverImgUrl" alt="" style="width:100%;height:auto;" />
                    <div class="playlist-title" v-text="playlist.name"></div>
                </div>
            </div>
        </div>
        <div v-if="activeTab === 'tab2'">
            <h2>Tab One</h2>
            <p>这是第二个 tab</p>
        </div>
        <div v-if="activeTab === 'tab3'">
            <h2>Tab One</h2>
            <p>这是第三个 tab</p>
        </div>
        <div v-if="activeTab === 'tab4'">
            <h2>Tab One</h2>
            <p>这是第四个 tab</p>
        </div>
	</div>
</template>
<script type="text/javascript">
import Swiper from '../plugins/Swiper'
export default {
	name:"home",
	data:function () {
		return {
			activeTab:"tab1",
            playlistArr:[],
            refreshing:false,
            trigger:null,
            isLoading:false,
            isOpen:false
		};
	},
	methods:{
		handleTabChange:function (val) {
            this.activeTab=val;
        },
        getHotPlayList:function () {
            this.isLoading=true;
            this.$http.get(this.$api.getPlayListByWhere("全部",0,9))
            .then(res=>{
                this.playlistArr=res.data.playlists;
                this.refreshing = false;
                this.isLoading=false;
            })
            .catch(err=>{
                console.error('Error: '+err);
                this.isOpen=true;
                this.refreshing = false;
                this.isLoading=false;
            });
        },
        linkToDetail:function (id) {
            this.$router.push({
                name:"DetailPlaylist",
                query:{
                    id,
                }
            });
        },
        refresh:function () {
            this.refreshing = true;
            setTimeout(() => {
                this.getHotPlayList();
            }, 300);
        },
        close:function () {
            this.isOpen=false;
        }
	},
	components:{
        'swiper-box':Swiper,
	},
    mounted:function () {
        var _vm=this;
        _vm.$nextTick(function () {
            _vm.trigger=_vm.$el;
            _vm.getHotPlayList();
        });
    }
}


</script>
<style scoped>
.find{
    position:relative;
}
.demo-flat-button{
  padding:12px 0;
}
.mu-tabs{
  background-color:#fff;
}
.mu-tab-link{
  min-height:0;
  padding-top:8px;
  padding-bottom:8px;
  color:#666;
}
.mu-tab-active{
  color:#f00;
}
.playlist_item{
    float:left;
    width:30%;
    margin:0 0 2.5% 2.5%;
}
.playlist-title{
    height: 38px;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 12px;
    color: #333;
    line-height: 1.5;
    letter-spacing: 1px;
}
</style>