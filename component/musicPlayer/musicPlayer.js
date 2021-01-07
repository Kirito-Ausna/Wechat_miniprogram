// component/musicPlayer/musicPlayer.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    song:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playState: app.globalData.playState,
    musicPic: app.globalData.musicPic,
    musicName: app.globalData.musicName,
    musicUrl: app.globalData.musicUrl,
    artistName: app.globalData.artistName
  },
  pageLifetimes:{
    show: function(){
      this.updateData();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClick: function (e) {
      // console.log(app.globalData.playState);
      // console.log(app.globalData.audio.src);
      switch (this.data.playState) {
        case 0:
          // this.setData({ playState: 1 });
          this.play();
          break;
        case 1:
          // this.setData({ playState: 0 });
          this.pause();
          break;
      }
    },
    /**
     * 播放音乐函数
     */
    play: function(){
      // console.log("play");
      // console.log(app.globalData.audio);
      app.globalData.audio.play();
      app.globalData.playState = 1;
      this.setData({
        playState: 1
      });
    },
    /**
     * 暂停音乐函数
     */
    pause: function(){
      // console.log("pause");
      // console.log(app.globalData.audio);
      app.globalData.audio.pause();
      app.globalData.playState = 0;
      this.setData({
        playState: 0
      });
    },
    /**
     * 切换歌曲
     */
    change: function(){
      app.globalData.audio.src = app.globalData.musicUrl
      app.globalData.playState = 1;
      this.setData({
        playState: 1
      });
      app.globalData.audio.play();
    },
    updateData(){
      this.setData({
        musicPic: app.globalData.musicPic,
        musicName: app.globalData.musicName,
        musicUrl: app.globalData.musicUrl,
        artistName: app.globalData.artistName,
        playState: app.globalData.playState
      })
      console.log(this.data.musicName);
    }
  }
})
