//app.js
import {DEFAULT_MUSIC} from './config/index.js';

App({
  onLaunch: function () {
    if (!wx.cloud){
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    }else{
      wx.cloud.init({
        /**
         * env 参数说明
         * env参数决定接下来小程序发起的云开发调用（wx.cloud.xxx)会默认请求到那个云环境的资源
         * 此处请填入环境ID， 环境ID可打开云控制台查看
         * 如不填则使用默认环境（第一个创建的环境）
         */

        env : 'song-miniprogram-3fsl5jefd2239b5',
        traceUser:true,
      })
    }
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.globalData.audio.src = DEFAULT_MUSIC.musicUrl
    this.getFavorMusics()
  },
  getFavorMusics: function () {
    console.log("getFavorMusics")
    const db = wx.cloud.database()
    //查询当前用户所有的 counters
    db.collection('music_favor').field({
      _id: true,
      sid: true,
      singer: true,
      name:true,
    }).get({
      success: res => {
        var favors = {}, favor_idx, favor
        for (favor_idx in res.data){
          favor = res.data[favor_idx] //一条数据
          console.log(favor)
          if(typeof(favors[favor.singer]) == "undefined"){
            favors[favor.singer] = {} //这时为这个歌手新建一个value 为一个空字典
          }
          favors[favor.singer][favor.sid] = favor._id //将数据库中_id存进去
          favors[favor.singer][favor.name] = true
        }
        this.globalData.favorMusics = favors
        // console.log(this.globalData.favorMusics)
        console.log("favor music 数据", favors)
      },
      fail: err => {
        wx.showToast({
          icon: 'none' ,
          title: '查询记录失败'
        })
        console.error('[数据库]「查询记录]失败:', err)
      }
    })
  },
  globalData: {
    userInfo: null,
    audio: wx.createInnerAudioContext(),
    playState: DEFAULT_MUSIC.playState,
    musicPic: DEFAULT_MUSIC.musicPic,
    musicName: DEFAULT_MUSIC.musicName,
    musicUrl: DEFAULT_MUSIC.musicUrl,
    artistName: DEFAULT_MUSIC.artistName,
    musicPlayer:null,
    favorMusics:{}
  }
})