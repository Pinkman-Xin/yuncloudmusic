// 管理各种接口
import Network from './network'
export const getBanner = ()=>Network.get('banner?type=2')
export const getPersonalized = ()=>Network.get('personalized?limit=6')
export const getNewAlbum = ()=>Network.get('album/newest')
export const getNewSong = ()=>Network.get('personalized/newsong')
export const getPlayList = (data)=>Network.get('playlist/detail',data)
export const getAlbum = (data)=>Network.get('album',data)
export const getSongDetail = (data)=>Network.get('song/detail',data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)
export const getArtistsSongs = (data) => Network.get('artists', data)
// export const getHotArtists = (data) => Network.get('top/artists?offset=0&limit=5', data)
export const getHotArtists = () =>{
  return new Promise(function(resolve,reject){
    Network.get('top/artists?offset=0&limit=5')
    .then(function(result){
      resolve(result.artists)
    })
    .catch(function(err){
      reject(err)
    })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function(resolve,reject){
    let letterArtists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=8&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=16&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=0&initial=${letter}`)
    ])
    .then(result=>{
      result.forEach(function(item){
        letterArtists.push(...item.artists)
      })
      resolve(letterArtists)
    })
    .catch(err=>{
      console.log(err);
    })
  })
}
export const getAllArtists=(letter)=>{
  return new Promise(function(resolve,reject){
    let keys = ['热']
    let list = [getHotArtists()]
    for(let i = 65;i<91;i++){
      let char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
    .then(function(result){
      let obj = {}
      obj.keys = keys
      obj.list = result
      resolve(obj)
    })
    .catch(function(err){
      reject(err)
    })
  })
  
}
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    Network.get('toplist/detail')
    .then(function (data) {
      let category = data.list
      resolve(category)
    })
    .catch(function (err) {
      reject(err)
    })
  })
}
export const getSearchList = (data) => Network.get('search?type=1', data)
export const getSearchHot = () => Network.get('search/hot')