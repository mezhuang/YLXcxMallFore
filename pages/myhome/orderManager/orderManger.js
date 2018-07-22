// pages/myhome/orderManager/orderManger.js
const app = getApp()
var toPay = require('../../../utils/toPay.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 横向滚动
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    orderInfoList:null,
    // expertList: [{ //假数据
    //   img: "avatar.png",
    //   name: "欢顔",
    //   tag: "知名情感博主",
    //   answer: 134,
    //   listen: 2234
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    //获取用户订单信息
    var that =this;
    wx.request({
      method: 'POST',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getGoodsOrderListByOpenId.do', //接口地址
      data: {

        'openId': app.globalData.openId,
      },
      header:
        {
          //'content-type': "application/x-www-form-urlencoded" // 默认值
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          //'content-type': 'application/json'
        },
      success: function (res) {
        console.log("查询到的全部订单数据:");
        console.log(res.data);
        that.setData({
          orderInfoList: res.data,

        });


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
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onPayNow:function(){
    var payInfomodel=null;
    var payStatus = toPay.onPrepay(payInfomodel);
  },
  footerTap: app.footerTap
})