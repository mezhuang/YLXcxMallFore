// pages/index/selectedMeal/discountActivity/discountActivity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discountActivityList:null,
    goodsItems:null
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that =this;

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getGoodsClassListByClassType.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        'classType':2,
        'startIndex': 0,
        'indexSize': 5
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          discountActivityList: res.data
        });

        //跳转至报备客户列表
        //   wx.navigateTo({
        //     url: "../reportList/reportList"
        //   })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res.data)
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
  //活动详情页
  onActivityDetail:function(event){
    var twolevelCode = event.currentTarget.dataset.twolevelcode;
    var discounttitle = event.currentTarget.dataset.discounttitle;
    var subtitle = event.currentTarget.dataset.subtitle;

    console.log("twolevelcode:" + twolevelCode);
   
    //调整至活动详情页
    wx.navigateTo({
      url: './activityDetail/activityDetail?twolevelCode=' + twolevelCode+'&discounttitle=' + discounttitle + '&subtitle=' + subtitle
    })

  }
})