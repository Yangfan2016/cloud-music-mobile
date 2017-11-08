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
			<router-view class="view"></router-view>      
		</transition>
		<!-- 播放条 -->
		<div class="musicbar" v-on:click="openMusicBox">
			<div class="music_poster">
				<div class="poster_pic">
					<img src="" alt="Vue" style="width:100%;height:auto;" />
				</div>
				<div class="poster_info">
					<span class="text info_singname">网易云音乐</span>
					<span class="text info_singer">听见好时光</span>
				</div>
			</div>
			<div class="music_btn">
				<mu-icon-button icon="play_circle_outline" v-on:click.stop="t_play" />
				<mu-icon-button icon="playlist_play" v-on:click.stop="t_list" />
			</div>
		</div>
		<!-- 播放器 -->
		<transition name="slideVertical">
			<music-play v-show="isOpenMusicPage" v-on:close-box="closeMusicBox"></music-play>
		</transition>
	  </div>
</template>
<script>
import PlayPage from "./components/PlayPage.vue"
export default {
	name: 'app',
	data:function () {
		return {
			activeTab:'tab1',
			isOpenMusicPage:false
		};
	},
	methods:{
		handleTabChange:function (val) {
			this.activeTab=val;
		},
		t_play:function () {
			console.log("播放");
		},
		t_list:function () {
			console.log("播放列表");
		},
		openMusicBox:function () {
			var that=this;
			that.isOpenMusicPage=true;
			console.log("进入盒子");
		},
		closeMusicBox:function () {
			var that=this;
			that.isOpenMusicPage=false;
		}
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
#app {
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
}
.music_poster{
	display: flex;
}
.poster_pic{
	width:50px;
	height:100%;
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
