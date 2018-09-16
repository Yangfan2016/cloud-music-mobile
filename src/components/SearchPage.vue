<template>
    <div class="search">
        <div class="headbar">
            <mu-icon-button class="backbtn" icon="arrow_back" slot="left" v-on:click="closeThisPage" />
            <input type="text" class="searchbox" placeholder="歌曲、歌手" v-model="keywords" v-on:keyup="searchSome" />
            <mu-icon-button class="clearbtn" icon="clear" slot="left" v-show="keywords.length>0" v-on:click="clearAndReset" />            
        </div>  
        <ul class="searchlist" v-if="resultList.length>0">
            <mu-circular-progress class="center" :size="40" :strokeWidth="3" color="#f20" v-show="isLoading" />
            <li class="item" v-for="(song,index) in resultList" v-bind:key="index" v-on:click="playSong(song,index)">
                <div class="r-item">
                    <span class="songname" v-text="song.name"></span>
                    <p class="songinfo"><span class="singer">{{song.artists|combineName}}</span> - <span v-text="song.album.name"></span></p>
                </div> 
            </li>
        </ul>
        <div v-else class="yf--no-data">暂无数据</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: "",
      resultList: [],
      isLoading: false
    };
  },
  methods: {
    clearAndReset() {
      this.keywords = "";
      this.resultList = [];
    },
    // temp
    closeThisPage() {
      this.$emit("close-search");
    },
    searchSome() {
      if (this.keywords.trim() === "") {
        this.resultList = [];
        return;
      }
      // show loading
      this.isLoading = true;
      this.$http
        .get(this.$api.search(this.keywords))
        .then(res => {
          // hide loading
          this.isLoading = false;
          let data = res.data;
          if (data.code == 200 && data.result.songCount !== 0) {
            this.resultList = data.result.songs;
          } else {
            this.resultList = [];
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.error(err);
        });
    },
    playSong(item, index) {
      // get song detail
      this.$http(this.$api.getSongDetail(item.id))
        .then(res => {
          let data=res.data;
          if (data.code === 200 && data.songs) {
            let song=data.songs[0];
            // closeSearchPage
            this.closeThisPage();
            // openPlayPage
            this.$emit("open-play");
            // push song to curPlaylist
            this.$emit("push-list", song);

            this.curSong = { id: song.id };
            song._index = index;
            // save cursong data
            sessionStorage.setItem("curSong", JSON.stringify(song));
            // emit parent play current music
            bus.$emit("curmusicchange", index);
          } else {
            console.log("获取歌曲详情失败");
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style scoped>
.yf--no-data {
  font-size: 0.8rem;
  padding: 20px 0;
}
.search {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 10;
  padding: 56px 0;
  background-color: #fff;
}
.headbar {
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  background-color: #fff;
}
.headbar > .backbtn {
  color: #333;
}
.headbar > .clearbtn {
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translate(0, -50%);
}
.headbar > .searchbox {
  border: none;
  outline: none;
  width: 80%;
  padding: 5px 50px 5px 10px;
  border-bottom: 1px solid #ccc;
  font-size: 0.8rem;
  transition: all 0.5s ease;
}
.headbar > .searchbox:focus {
  border-color: rgb(150, 10, 10);
}
.searchlist {
  padding: 20px 10px;
}
.searchlist > .item {
  padding: 10px 15px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}
.item .songname {
  font-size: 0.8rem;
}
</style>

