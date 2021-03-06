import {SET_FULL_SCREEN} from './mutations.type'
import {SET_MINI_PLAYER} from './mutations.type'
import {SET_LIST_PLAYER} from './mutations.type'
import {SET_IS_PLAYING} from './mutations.type'
import {SET_MODE_TYPE} from './mutations.type'
import {SET_SONG_DETAIL} from './mutations.type'
import {SET_SONG_LYRIC} from './mutations.type'
import {SET_DEL_SONG} from './mutations.type'
import {SET_CURRENT_INDEX} from './mutations.type'
import {SET_CURRENT_TIME} from './mutations.type'
import {SET_FAVORITE_SONG} from './mutations.type'
import {SET_FAVORITE_LIST} from './mutations.type'
import {SET_HISTORY_LIST} from './mutations.type'
import {SET_HISTORY_SONG} from './mutations.type'
import { getSongDetail,getSongLyric,getSongURL} from '../api/index'
export default{
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  async setSongDetail({ commit }, ids) {
    let result = await getSongDetail({ids: ids.join(',')})
    let urls = await getSongURL({id:ids.join(',')})
    let list = []
    result.songs.forEach(function(value,i){
      let obj = {}
      // obj.url = urls.data[i].url
      for(let j = 0;j<urls.data.length;j++){
        let item = urls.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      let singer = ''
      value['ar'].forEach(function(item,index){
        if (index === 0) {
          singer = item.name
        }else{
          singer += '-' +item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, list)
  },
  async getSongLyric({ commit }, id) {
    let result = await getSongLyric({id:id})
    if (result.lrc) {
    let obj = parseLyric(result.lrc.lyric)
    commit(SET_SONG_LYRIC, obj)
    }else{
    let obj = {0:'???????????????'}
      commit(SET_SONG_LYRIC, obj)
    }
  },
  setDelSong({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  }, 
  setCurrentTime({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  }, 
  setFavoriteSong({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  }, 
  setFavoriteList({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  }, 
  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  }, 
  setHistoryList({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }, 
}
// ?????????????????????
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] ?????? : ?????????
  // 1.???????????????????????????[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.??????????????????????????? [00
  let reg2 = /\[\d*/i
  // 3.??????????????????????????? :00
  let reg3 = /\:\d*/i
  // 4.????????????????????????????????????
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.????????????
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.????????????
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.????????????
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.????????????, ????????????????????????????????????
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.????????????
    let text = lyric.replace(reg1, '').trim()
    // 6.????????????
    lyricObj[time] = text
  })
  return lyricObj
}
