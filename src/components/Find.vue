<template>
    <div class="find">
        <div class="find_index" ref="findIndex">
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
                <swiper-box v-if="bannerImgList.length>0" :banner-list="bannerImgList"></swiper-box>
                <!-- 推荐歌单 -->
                <div class="playlist clearfix">
                    <!-- loading -->
                    <mu-circular-progress class="center" :size="40" :strokeWidth="3" color="#f20" v-show="isLoading" />
                    <div class="playlist_item" v-if="playlistArr.length>0" v-for="playlist in playlistArr" v-bind:key="playlist.id" v-on:click="openSingList(playlist.id)">  
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
        
        <!-- 歌单详情页 -->
        <transition name="slide-left">
            <sing-list v-show="isOpenSingList" v-on:close-list="closeSingList"></sing-list>
        </transition>
	</div>
</template>
<script type="text/javascript">
import Swiper from "../plugins/Swiper";
import DetailPlaylist from "./DetailPlaylist.vue";
import { mapState, mapMutations } from "vuex";

export default {
  data(){
    return {
      activeTab: "tab1",
      bannerImgList: [],
      playlistArr: [],
      refreshing: false,
      trigger: null,
      isLoading: false,
      isOpen: false,
      isOpenSingList: false
    };
  },
  computed:{
    ...mapState(["curPlaylist"])
  },
  methods: {
    ...mapMutations(["refreshCurListDetail"]),
    handleTabChange(val) {
      this.activeTab = val;
    },
    getHotPlayList() {
      this.isLoading = true;
      this.$http
        .get(
          this.$api.getPlayListByWhere({
            cat: "全部",
            offset: 0,
            limit: 9
          })
        )
        .then(res => {
          this.playlistArr = res.data.playlists;
          this.refreshing = false;
          this.isLoading = false;
        })
        .catch(err => {
          console.error("Error: " + err);
          this.isOpen = true;
          this.refreshing = false;
          this.isLoading = false;
        });
    },
    getDetailPlayList(id) {

      if (sessionStorage.getItem("playlist-" + id) == null) {
        this.$http
          .get(this.$api.getPlayListDetail(id))
          .then(res => {
            let data = res.data;
            // save
            sessionStorage.setItem(
              "playlist-" + id,
              JSON.stringify(data.playlist)
            );
            // push data in musiclist
            this.refreshCurListDetail(data.playlist);
          })
          .catch(err => {
            console.error("Error: " + err);
          });
      } else {
        let list = JSON.parse(sessionStorage.getItem("playlist-" + id));
        // push data in musiclist
        this.refreshCurListDetail(list);
      }
    },
    openSingList(id) {
      this.isOpenSingList = true;
      this.getDetailPlayList(id);
    },
    closeSingList() {
      this.isOpenSingList = false;
    },
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.getHotPlayList();
      }, 300);
    },
    close() {
      this.isOpen = false;
    }
  },
  components: {
    "swiper-box": Swiper,
    "sing-list": DetailPlaylist
  },
  mounted() {
    this.$nextTick(() => {
      this.trigger=this.$refs["findIndex"];
      this.getHotPlayList();
    });

    this.$http(this.$api.getBannerImg())
      .then(res => {
        let data = res.data;
        if (data.code === 200) {
          this.bannerImgList = data.banners;
        } else {
          this.bannerImgList = [];
        }
      })
      .catch(err => {
        console.error(err);
        this.bannerImgList = [];
      });
  }
};
</script>
<style scoped>
.find {
  padding: 0 0 80px 0;
}
.demo-flat-button {
  padding: 12px 0;
}
.mu-tabs {
  background-color: #fff;
  z-index: 1;
}
.mu-tab-link {
  min-height: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  color: #666;
}
.mu-tab-active {
  color: #f00;
}
.playlist {
  display: flex;
  flex-wrap: wrap;
}
.playlist_item {
  float: left;
  flex-basis: 30%;
  margin: 5px 0 0 2.5%;
  overflow: hidden;
}
.playlist-title {
  max-height: 38px;
  /* mline overflow */
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