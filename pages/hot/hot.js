// pages/hot/hot.js

var musicList = require("../../data/musics.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // "id":1,
      // "name":"周杰伦",
      // "src": "http://cdnmusic.migu.cn/picture/2019/1031/0254/ASd6c2d9697d2a4f5f96508c8a7ec8b1a8.jpg",
      // "songs":[
      //   {"id":1,"title":"七里香"},
      //   {"id":2,"title":"说好不哭"},
      //   {"id":3,"title":"梯田"}
      // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        musics:musicList.musics
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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