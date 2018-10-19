import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isOpenMusicPage: false, // 打开播放页
        curPlayMode: 0,  // 播放模式 0:"list_repeat", 1:"sing_repeat", 2:"random"
        curPlaySong: { // 当前播放的歌曲信息
            sing: "网易云音乐",
            singer: [{ name: "" }],
            duration: 0
        },
    },
    mutations: {
        openOrCloseMusicBox(state, payload) {
            state.isOpenMusicPage = payload;
        },
        changePlayMode(state) {
            state.curPlayMode = (state.curPlayMode + 1) % 3;
        },
        refreshCurSongDetail(state, payload) {
            console.log(payload)
            state.curPlaySong = payload;
        }
    }
});