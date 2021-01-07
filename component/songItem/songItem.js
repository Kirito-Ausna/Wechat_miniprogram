// component/songItem/songItem.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      item:{
        type:Object,
        value:{}
      },
      singer:{
        type:String,
        value:{}
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready:function(){
    // console.log(this.properties.item,this.properties.singer)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick: function( ){
      var musicPlayer = app.globalData.player;
      // console.log(musicPlayer.data);

      //更新全局播放器变量的数据
      app.globalData.playState = 1;
      app.globalData.musicPic = this.properties.item.poster;
      app.globalData.musicName = this.properties.item.name;
      app.globalData.musicUrl = this.properties.item.src;
      app.globalData.artistName = this.properties.singer;

      //同步当前页播放器的数据
      musicPlayer.setData({
        playState: app.globalData.playtate,
        musicPic: app.globalData.musicPic,
        musicName: app.globalData.musicName,
        musicUrl: app.globalData.musicUrl,
        artistName: app.globalData.artistName
      })

      // 数据更新完毕，切换歌曲
      musicPlayer.change( ) ;
    },
  }
})
