const app = getApp();
var recentList = require("../../data/recentList.js");
var collectionList = require("../../data/collectionList.js");

Page({
  data: {
    recents: [],
    collections: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: '',
    obj: '',
    style: 'recent',
    styleother: 'collection',
    flag: 0,
    playcheck: true,
    popnow: false,
    rcount: '',
    lcount: '',
    "src" : "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=136295225,2820181088&fm=26&gp=0.jpg",
    // song:{
    //   poster:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3427474780,1396133226&fm=26&gp=0.jpg',
    //   name:'ふわふわ時間(#23『放課後!』Mix)',
    //   author:'放課後ティータイム',
    //   src:'http://wychandsome12138.xyz:81/Friend.mp3',
    //   } 
  },
  //事件处理函数
  recentSelected: function(event){
    this.setData({
      style: 'recent',
      styleother: 'collection',
      flag: 0
    })
    // this.style = 'recent';
    // this.styleother = 'collection';
  },
  collectionSelected: function(event){
    this.setData({
      style: 'recent2',
      styleother: 'collection2',
      flag: 1
    })
  },

  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        recents: recentList.recents,
        collections: collectionList.collections
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
