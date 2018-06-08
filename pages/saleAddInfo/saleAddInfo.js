// pages/saleAddInfo/saleAddInfo.js
const app = getApp()
var isCommited = false;
Page({

  /**
   * 页面的初始数据
   */

  data: {
    dates: '2018-6-18'
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
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log('选择的日期是' + e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },

  //提交销售信息
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (isCommited) {
      wx.showToast({
        title: '已提交',
        image: '../../images/suess.png',
        duration: 4000
      })
      //跳转至报备客户列表
      wx.navigateTo({
        url: "../saleInfoList/saleInfoList"
      })
    }
    var that = this;
    // var tokend = wx.getStorageSync('tokend')
    var customerName = e.detail.value.customerName;         //获取input初始值
    var customerPhone = e.detail.value.customerPhone;    //获取input初始值
    var isTask = e.detail.value.isTask;         //获取input初始值
    var productInfo = e.detail.value.productInfo;         //获取input初始值
    var transMoney = e.detail.value.transMoney;
    var transTime = e.detail.value.transTime
    var remark = e.detail.value.remark;    //获取input初始值
    // var name = that.data.name ? that.data.name : name2    //三元运算，如果用户没修改信息，直接提交原来的信息，如果用户修改了信息，就将修改了的信息和未修改过的信息一起提交
    // var ID_num = that.data.ID_num ? that.data.ID_num : ID_num2
    wx.request({
      method: 'POST',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/addSaleInfoAndCommi.do', //接口地址
      data: {
        'customerName': customerName,
        'customerPhone': customerPhone,
        'productInfo': productInfo,
        'isTask': isTask,
        'transMoney': transMoney,
        'transTime': transTime,
        'remark': remark,
        "openId": getApp().globalData.openId
      },
      header:
      {
        //'content-type': "application/x-www-form-urlencoded" // 默认值
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        //'content-type': 'application/json'
      },
      success: function (res) {
        console.log("新增报备返回数据：");
        console.log(res.data);
        wx.showToast({
          title: '客户报备成功',
          image: '../../images/suess.png',
          duration: 4000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../saleInfoList/saleInfoList',
          })
        }, 2000)
        //跳转至报备客户列表
        wx.navigateTo({
          url: "../saleInfoList/saleInfoList"
        })

        isCommited = true;
      },
      fail: function (res) {
        console.log('fail-res' + ':' + res)
      }
    })
  }
})