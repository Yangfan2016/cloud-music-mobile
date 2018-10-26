import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isPlay: false, // 是否是播放状态
        isCanPlay: false, // 是否可以播放
        isOpenMusicPage: false, // 打开播放页
        isOpenPlayListBox: false, // 打开播放列表
        isPlayAll: false, // 播放全部歌曲
        nextSong:0, // -1:prev,1:next
        curPlayIndex: -1, // 当前歌曲的在列表中索引
        curPlayMode: 0,  // 播放模式 0:"list_repeat", 1:"sing_repeat", 2:"random"
        curPlaySong: { // 当前播放的歌曲信息
            sing: "网易云音乐",
            singer: [{ name: "" }],
            duration: 0
        },
        curPlaylist: {}, // 当前播放各歌单
        musicList: [], // 播放队列
    },
    mutations: {
        changePlayStatus(state, boo) {
            state.isPlay = boo;
        },
        changeCanPlayStatus(state, boo) {
            state.isCanPlay = boo;
        },
        changePlayMode(state) {
            state.curPlayMode = (state.curPlayMode + 1) % 3;
        },
        changePlayIndex(state, n) {
            state.curPlayIndex = n;
        },
        switchNextSong(state,flag) {
            state.nextSong=flag;
        },
        playAllMusic(state) {
            state.isPlayAll = true;
        },
        openOrCloseMusicBox(state, boo) {
            state.isOpenMusicPage = boo;
        },
        openOrClosePlayListBox(state, boo) {
            state.isOpenPlayListBox = boo;
        },
        refreshCurSongDetail(state, info) {
            state.curPlaySong = Object.assign({}, state.curPlaySong, info);
        },
        refreshCurListDetail(state, info) {
            state.curPlaylist = Object.assign({}, state.curPlaylist, info);
            state.musicList=info.tracks;
        },
        pushToMusicQueue(state,song) {
            state.musicList.push(song);
        },
        setToMusicQueue(state,list) {
            state.musicList=list;
        }
    }
});