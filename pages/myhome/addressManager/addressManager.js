// pages/myhome/addressManager/addressManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ReceiGoodsAdressList:null,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log("分销商申请成功，返回数据：");
        console.log(res.data);
        wx.showToast({
          title: '申请分销成功',
          image: '../../images/suess.png',
          duration: 4000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../myhome/myhome',
          })
        }, 2000)
        // //跳转至报备客户列表
        // wx.redirectTo({
        //   url: "../reportList/reportList"
        // })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res)
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
  
  },
  onReceiveGoodsAddress: function () {
    wx.navigateTo({
      url: 'receiveGoodsAddress/receiveGoodsAddress',
    })
  }
})