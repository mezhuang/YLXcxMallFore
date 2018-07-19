// pages/orderManager/orderConfirm/orderConfirm.js
//获取应用实例
const app = getApp()
// var addressManager = require('../../myhome/addressManager/addressManager.js');      //引用外部的js文件
var toPay = require('../../../utils/toPay.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHiddenAddAddressBn:false,
    ReceiGoodsAdressList:null,
    payConfirmBean: null,//从购物车传递过来的数组对象
    payOrderId:'123245555',
    // 支付信息
    appid: 'wx3e71fb7bb3e423a3',
    mch_id: '1501941241',
    device_info: '1000',
    body: 'shafa',
    total_fee: null,
    spbill_create_ip: '203.195.200.199',
    notify_url: 'https://www.yuanlianjj.com/YLXcxMallBack/views/success.jsp',
    apiKey: 'kjjkhhjggghffg4384m1923279sdr352',
    ret_noce_str: null,
    prepay_id: null,//以上为支付相关

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//var openIp = app.globalData.openId;
    var that = this;
    //获取用户收货地址
    this.onGetReveiceAddress();

  
    //获取总费用
    var countAllfeeTmp = options.countAllfee;
    this.setData({
      total_fee:countAllfeeTmp
    })
    //将商品字符串转换成对象
    var payConfirmBean = JSON.parse(options.payCartInfomodel);
    console.log("payConfirmBean");
    console.log(payConfirmBean);
    if (options.payCartInfomodel == null) {
      wx.showToast({
        title: '数据为空',
      })
      return;
    }
    this.setData({
      payConfirmBean: payConfirmBean
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
  // 调整至新增收货地址页面
  onReceiveAddress:function()
  {
    wx.navigateTo({
      url: '../../myhome/addressManager/receiveGoodsAddress/receiveGoodsAddress',
    })
  },
  //获取用户收货地址
  onGetReveiceAddress: function () {
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
        if (res.data.length > 0) {
          that.setData({
            isHiddenAddAddressBn: true
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
  // 提交订单

  immeBuy: function (event) {
    // console.log("e.currentTarget.dataset.totalFee:");
    // console.log(event.target.dataset.totalfee);
    // console.log("e.currentTarget.dataset.goodscode:");
    // console.log(event.target.dataset.goodscode);
    var payInfomodel = JSON.stringify(this.data);
    toPay.onPrepay(payInfomodel);
  }
})