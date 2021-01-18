// miniprogram/pages/broadcastDetail/broadcastDetai.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:null,
      url:null,
      dataSource:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var player = this.selectComponent("#player");
    // console.log(player);
    app.globalData.player = player;
    // console.log(app.globalData.player);
    const {name,url} = options;
    console.log(options);
    this.setData ({
      name: name,
      url: url,
    })
    const db = wx.cloud.database()
    db.collection('song_list').doc('0a3f93956001a4e801f7abaa3fe86d16').get({
        success:res=>{
          console.log(res.data);
          console.log(res.data.liRongHao);
          // songList['liRongHao'] = res.data.liRongHao;
          // songList['xuSong'] = res.data.xuSong;
          // songList['zhouJieLun'] = res.data.zhoujieLun;
          switch (name){
            case "ACG经典":
              this.setData({
                dataSource: res.data.zhoujieLun
              });
              console.log(this.data.dataSource);
              break;
            case "日韩经典":
              this.setData({
                dataSource: res.data.zhoujieLun
              });
              console.log(this.data.dataSource);
              break;
            case "温暖冬日":
              this.setData({
                dataSource: res.data.liRongHao
              });
              console.log(this.data.dataSource);
              break;
            case "热歌":
              this.setData({
                dataSource: res.data.liRongHao
              });
              console.log(this.data.dataSource);
              break;
            case "KTV金曲":
              this.setData({
                dataSource: res.data.xuSong
              });
              console.log(this.data.dataSource);
              break;
            case "成名曲":
              this.setData({
                dataSource: res.data.xuSong
              });
              console.log(this.data.dataSource);
              break;
          }
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