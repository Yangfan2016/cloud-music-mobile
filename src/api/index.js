import { serialize } from "../utils/tools.js";

const serverHost = 'http://localhost:3000';

export default {
  getPlayListByWhere(options) {
    return `${serverHost}/top/playlist?${serialize(options)}`;
  },
  getLrc(id) {
    return `${serverHost}'?type=lyric&id=' + id`;
  },
  getSong(id,options={
    br:999000
  }) {
    return `${serverHost}/song/url?id=${id}&${serialize(options)}`;
  },
  getSongDetail(id) {
    return `${serverHost}/song/detail?ids=${id}`;
  },
  getPlayListDetail(id) {
    return `${serverHost}/playlist/detail?id=${id}`;
  },
  getMv(id) {
    return serverHost + '?type=mv&id=' + id;
  },
  search(word, options = {
    limit: 10,
    offset: 0
  }) {
    return `${serverHost}/search?keywords=${word}&${serialize(options)}`;
  },
  getBannerImg() {
    return `${serverHost}/banner`;
  }
};


