// pages/reportList/reportList.js
var reportListData = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerReportList:null
  
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;  
    wx.login({
      success: function (res) {
       
        
      }
      })

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://203.195.200.199/springmvc_demo/getCustomerReportList.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        'startIndex':0,
         'indexSize':5
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          customerReportList: res.data
        });
  
        //跳转至报备客户列表
      //   wx.navigateTo({
      //     url: "../reportList/reportList"
      //   })

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
  
  }
})