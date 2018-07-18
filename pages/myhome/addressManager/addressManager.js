// pages/myhome/addressManager/addressManager.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ReceiGoodsAdressList:null,
    isdiplayReceiveAdress:false,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    var openIp = app.globalData.openId;
    var that = this;

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getReceiGoodsAdressList.do', //接口地址
      data: {

        'openId': openIp
      },
      header:
        {
          //'content-type': "application/x-www-form-urlencoded" // 默认值
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          //'content-type': 'application/json'
        },
      success: function (res) {
        console.log("查询地址记录：");
        console.log(res.data);
        //判断是否有地址记录
        if (res.data.length >0)
        {
            that.setData({
              isdiplayReceiveAdress:true
            });
        }
        that.setData({
          ReceiGoodsAdressList: res.data
        });
        
      },
      fail: function (res) {
        console.log('fail-res' + ':' + res)
      }
    })
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
  
  },
  onReceiveGoodsAddress: function () {
    wx.navigateTo({
      url: 'receiveGoodsAddress/receiveGoodsAddress',
    })
  }
})