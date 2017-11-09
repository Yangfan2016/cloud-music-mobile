<template>
  	<div id="app">
		<mu-appbar class="appbar" v-bind:zDepth="0">
			<mu-icon-button icon="menu" slot="left"/>
			<mu-flat-button label="我的" class="demo-flat-button" to="/me"></mu-flat-button>
			<mu-flat-button label="发现" class="demo-flat-button" to="/"></mu-flat-button>
			<mu-flat-button label="动态" class="demo-flat-button" to="/dynamic"></mu-flat-button>
			<mu-icon-button icon="search" slot="right"/>
		</mu-appbar>
		<transition name="slide-left" mode="out-in">
			<router-view class="view" v-on:play-song="playThisSong"></router-view>      
		</transition>
		<!-- 播放条 -->
		<div class="musicbar" v-on:click="openMusicBox">
			<div class="music_poster">
				<div class="poster_pic">
					<img v-bind:src="curMusic.posterUrl" alt="Vue" style="width:100%;height:100%;" />
				</div>
				<div class="poster_info">
					<span class="text info_singname" v-text="curMusic.sing"></span>
					<span class="text info_singer" v-text="curMusic.singer"></span>
				</div>
			</div>
			<div class="music_btn">
				<mu-icon-button icon="play_circle_outline" v-if="!isPlay" v-on:click.stop="startPlay" />
				<mu-icon-button icon="paused_circle_outline" v-if="isPlay" v-on:click.stop="stopPlay" />
				<mu-icon-button icon="playlist_play" />
			</div>
		</div>
		<!-- 播放器 -->
		<transition name="slideVertical">
			<music-play v-show="isOpenMusicPage" v-bind="{
				curSong:curMusic,
				isCanPlaySong:isCanPlay,
				isPlaySong:isPlay
			}" v-on:close-box="closeMusicBox" v-on:change-status="changePlayStatus"></music-play>
		</transition>
		<!-- Audio -->
        <audio id="audio" v-bind:src="curMusic.src" ref="audiobox" v-show="false"></audio>
	  </div>
</template>
<script>
import PlayPage from "./components/PlayPage.vue"
export default {
	name: 'app',
	data:function () {
		return {
			activeTab:'tab1',
			isOpenMusicPage:false,
			isLoad:false,
			isCanPlay:false,
			isPlay:false,
			audioBox:null,
			curMusic:{
                src:null,
                posterUrl:"../static/1.png",
                sing:"网易云音乐",
                singer:"听见好时光"
            },
			musicList:[],
		};
	},
	watch:{
		isPlay:function (val,oldVal) {
			val?this.startPlay():this.stopPlay();
		}
	},
	methods:{
		handleTabChange:function (val) {
			this.activeTab=val;
		},
		openMusicBox:function () {
			var that=this;
			that.isOpenMusicPage=true;
		},
		closeMusicBox:function () {
			var that=this;
			that.isOpenMusicPage=false;
		},
		getSongById:function (id,succ,fail) {
			var that=this;

			that.$http({
				url:that.$api.getSong(id),
				method:"GET",
			}).then(res=>{
				succ && succ(res.data);
			}).catch(err=>{
				console.error(err);
				fail && fail(err);
			});
		},
		playThisSong:function () {
			var that=this;
			var curSong=JSON.parse(localStorage.getItem("curSong"));

			// Don't repeat play music
			if (curSong.id==that.curMusic.id) {
				// if playstatus is paused let it play
				if (!that.isPlay) {
					that.startPlay();
				}
				return false;
			}
            // save cur music data
			that.curMusic={
				id:curSong.id,
                posterUrl:curSong.al.picUrl,
                sing:curSong.name,
                singer:curSong.ar[0].name // TODO 多作者
			};
			
			if (localStorage.getItem("curSongExData-"+curSong.id)==null) {
				that.getSongById(curSong.id,function (song) {
					// load music data
					that.loadedSong(song.data[0]);
					// playmusic
					that.isPlay=true;
					// save
					localStorage.setItem("curSongExData-"+curSong.id,JSON.stringify(song.data[0]));
				},function (err) {
					that.isCanPlay=false;
					that.isPlay=false;
					console.log("加载失败 ",err);
				});
			} else {
				let exData=JSON.parse(localStorage.getItem("curSongExData-"+curSong.id));
				// load music data
				that.loadedSong(exData);
				// playmusic
				that.isPlay=true;
			}
		},
		loadedSong:function (data) {
			var that=this;
			that.curMusic.src=data.url; // TODO 多歌曲
			that.curMusic.size=data.size;
			that.audioBox.src=data.url;
			that.audioBox.load();
			that.isLoad = true;
		},
		startPlay:function () {
			var that=this;
			if (that.isLoad) return;
			if (that.isCanPlay) {
				that.audioBox.pause();
				let p1=that.audioBox.play();
				p1.then(res=>{
					that.isPlay=true;
				}).catch(err=>{
					that.isPlay=false; //BUG  DOMExcept:The play() request was interrupted by a new load request
					console.error(err);
				});
			}
		},
		stopPlay:function () {
			var that=this;

			that.isPlay=false;
			that.audioBox.pause();
		},
		changePlayStatus:function (boo) {
			this.isPlay=boo;
		}
	},
	mounted:function () {
		var that=this;
		that.audioBox=that.$refs["audiobox"];

		var audio=that.audioBox;

		// Event canplay
		audio.addEventListener("canplay",function () {
			console.log(666);
			that.isCanPlay=true;
			that.isLoad= false;
			if (that.isPlay) {
				that.startPlay();
			} else {
				that.stopPlay();
			}
		},false);
	},
	components:{
		"music-play":PlayPage
	}
}
</script>
<style>
*{padding:0;margin:0;}
ul{list-style-type:none;}
.clearfix{zoom:1;}
.clearfix:after{content:".";display:block;height:0;clear:both;}
.center{
	position:fixed;
	top:50%;left:50%;
	-webkit-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
}
html,body{
	width:100%;
	height:100%;
}
html{
	font-size:20px;
}
body{
	font-size:0.6rem;
}
#app{
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	/*  margin-top: 60px;*/
	padding:56px 0 56px 0;
}
.appbar{
	position:fixed;
	top:0;
	display:flex;
	z-index:5;  
}
.musicbar{
	display: flex;
	justify-content: space-between;
	position: fixed;
	bottom:0;
	left: 0;
	right:0;
	padding:10px 10px;
	background-color: #fff;
	z-index:10;
}
.music_poster{
	display: flex;
}
.poster_pic{
	width:50px;
	height:48px;
	background-color: #9c3;
}
.poster_info{
	margin:0 10px;
	line-height:24px;
	text-align:left;
}
.poster_info>.text{
	width:100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.info_singname{
	display:block;
}
.info_singer{
	display:block;
}
.music_btn .mu-icon{
	font-size: 1.5rem;
}
/* animation */
.slide-left-enter{
  transform:translateX(100%);
}
.slide-left-enter-active{
  transition:transform 0.6s ease;
}
.slide-left-leave-active{
  transition: transform 0.3s ease;
}
.slide-left-leave-to{
  transform:translateX(100%);
}

.slideVertical-enter{
  transform:translateY(100%);
}
.slideVertical-enter-active{
  transition:transform 0.5s ease;
}
.slideVertical-leave-active{
  transition: transform 0.3s ease;
}
.slideVertical-leave-to{
  transform:translateY(100%);
}
</style>
