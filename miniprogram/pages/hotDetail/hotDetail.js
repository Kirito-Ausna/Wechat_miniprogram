// const songList = require("../../data/songList.js");
// pages/hotDetail/hotDetail.js
// var songList = require("../../data/songList.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      singer:null,
      poster:null,
      dataSource:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var player = this.selectComponent("#player");
    // console.log(player);
    app.globalData.player = player;
    const {singer,poster} = options;
    console.log(singer, poster);
    this.setData ({
      singer: singer,
      poster: poster,
    })
    const db = wx.cloud.database()
    db.collection('song_list').doc('0a3f93956001a4e801f7abaa3fe86d16').get({
        success:res=>{
          console.log(res.data);
          console.log(res.data.liRongHao);
          // songList['liRongHao'] = res.data.liRongHao;
          // songList['xuSong'] = res.data.xuSong;
          // songList['zhouJieLun'] = res.data.zhoujieLun;
          switch (singer){
            case "吹响吧，上低音号":
              this.setData({
                dataSource: res.data.zhoujieLun
              });
              console.log(this.data.dataSource);
              break;
            case "三月的狮子":
              this.setData({
                dataSource: res.data.liRongHao
              });
              console.log(this.data.dataSource);
              break;
            case "许嵩":
              this.setData({
                dataSource: res.data.xuSong
              });
              console.log(this.data.dataSource);
              break;
          }
          console.log(songList['xuSong']);
        },
        fail: err=>{
          wx.showToast({
            icon:'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败: ', err)
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      // console.log(this.data.dataSource)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})