var broadcastList = require("../../data/broadcastList")

// pages/broadcast/broadcast.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      broadcasts : [],
      // song:{
      //   poster:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3427474780,1396133226&fm=26&gp=0.jpg',
      //   name:'ふわふわ時間(#23『放課後!』Mix)',
      //   author:'放課後ティータイム',
      //   src:'http://m10.music.126.net/20201230215804/f344c468ba89015f7db5d76dbd1e0f8b/ymusic/a9c1/47f7/e72a/eeca0e403e1aa21dc60ca590be3db3f0.mp3',            
      //   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        broadcasts:broadcastList.broadcasts
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