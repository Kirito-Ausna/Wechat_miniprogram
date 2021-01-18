// component/songItem/songItem.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      item:{
        type:Object,
        value:{},
        observer: function(val){
          if(val){
            this.Listen_item_property();
          }
        }
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
      favor:false,
      counterId:null
  },
  
  pageLifetimes:{
    // show:function(){
    //   console.log(pageLifetimes);
    //   let states = app.globalData.favorMusics;
    //   console.log(states)
    //   console.log(this.properties.singer)
    //   let ASinger = this.properties.singer;
    //   let index = this.properties.item.sid;
    //   let Songname = this.properties.item.name;
    //   console.log(index)
    //   if(typeof(states[ASinger])!='undefined'){
    //     if(typeof(states[ASinger][Songname]!='undefined')&&typeof(states[ASinger][index]!='undefined')){
    //   this.setData({
    //     favor:states[this.properties.singer][this.properties.item.name],
    //     counterId:states[this.properties.singer][index]
    //   })
    // }
    // }
    // }
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
    handleFavor:function(){
      this.setData({
        favor:!this.data.favor
      })
      console.log(this.data.favor)
      if(this.data.favor){
        this.favorMusic();
      }else{
        this.disfavorMusic();
      }
    },
    favorMusic: function() {
      // console.log("favorMusic: function")
      const db = wx.cloud.database()
      db.collection( 'music_favor' ).add({
        data: {
          sid: this.properties.item.sid,
          singer: this.properties.singer,
          favor: true,
          name: this.properties.item.name,
          poster: this.properties.item.poster,
          src: this.properties.item.src
        },
        success: res => {
        // 在返回结果中会包含新创建的记录的 _id
          this.setData({
          counterId: res._id,
          count: 1
          })
          wx.showToast({
            title:'已收藏',
            })
          console.log('[数据库][新增记录]成功，记录_id: ', res._id)
          //更新全局变量
          console.log(typeof(app.globalData.favorMusics[this.data.singer]))
          if(typeof(app.globalData.favorMusics[this.data.singer])=='undefined'){
              app.globalData.favorMusics[this.data.singer] = {}
          }
          console.log(app.globalData.favorMusics[this.data.singer])
          app.globalData.favorMusics[this.data.singer][this.data.item.sid] = res._id
          app.globalData.favorMusics[this.data.singer][this.data.item.name] = true
          console.log ("globalData after favor", app.globalData.favorMusics)
        },
        fail: err => {
          wx.showToast({
          icon: 'none',
          title:'新增记录失败'
          })
        console.error( '[数据库]「新增记录]失败:', err)
        }
      })
    },
    //取消收藏音乐，从云数据库删除
    disfavorMusic: function() {
      if(this.data.counterId){
        console.log("disfavorMusic: function")
        // 从云数据库中删除
        const db = wx.cloud.database()
        console.log( db.collection( 'music_favor' ).doc(this.data.counterId))
        db.collection( 'music_favor' ).doc(this.data.counterId).remove({
          success: res => {
            this.setData({
              counterId: '',
              count: null
            })
            wx.showToast({
              title:'已取消收藏',
              })
            console.log('[数据库][删除记录]成功')

            //更新全局变量            
            app.globalData.favorMusics[this.data.singer][this.properties.item.name] = false
            app.globalData.favorMusics[this.data.singer][this.properties.item.id] = undefined
            // 删除这一条favor数据
            console.log ("globalData after delete", app.globalData.favorMusics)
            
          },
          fail: err => {
            wx.showToast({
            icon: 'none',
            title:'删除失败'
            })
          console.error( '[数据库]「删除记录]失败:', err)
          }
        })
      } else {
        wx.showToast({
          title: '出错啦！该歌曲还未收藏',
        })
      }
    },
    Listen_item_property: function(){
      var _this = this
      console.log('pageLifetimes');
      let states = app.globalData.favorMusics;
      console.log(states)
      console.log(_this.properties.singer)
      let ASinger = _this.properties.singer;
      let index = _this.properties.item.sid;
      let Songname = _this.properties.item.name;
      console.log(index)
      if(typeof(states[ASinger])!='undefined'){
        if(typeof(states[ASinger][Songname]!='undefined')&&typeof(states[ASinger][index]!='undefined')){
      this.setData({
        favor:states[_this.properties.singer][_this.properties.item.name],
        counterId:states[_this.properties.singer][index]
      })
    }
    }
    }
  }
})
