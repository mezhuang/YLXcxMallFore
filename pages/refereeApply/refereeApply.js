// pages/applyReferee/applyReferee.js
const app = getApp()
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 180,
    retCode:null,
    inputUserPhone:null
  
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    // var tokend = wx.getStorageSync('tokend')
    var userName  = e.detail.value.applyUserName;         //获取input初始值
    var userPhone = e.detail.value.applyUserPhone;    //获取input初始值
    var ManagerPhone = e.detail.value.ManagerPhone;//获取input初始值
    var openIp    = app.globalData.openId;
   
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url:  app.globalData.serviceIp + '/YLXcxMallBack/applyToReferee.do', //接口地址
      data: {
        'userName': userName,
        'userPhone': userPhone, 
        'ManagerPhone':ManagerPhone,
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
  onGetUserPhone:function(e){
    console.log(e.detail.value);
    this.setData(
      {
        inputUserPhone: e.detail.value
      }
    )
    console.log(this.data.inputUserPhone);
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 180,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode:function()
  {
      this.getCode();
      var that = this
      that.setData({
        disabled: true
      })


      wx.request({
        method: 'GET',
        // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
        url:  app.globalData.serviceIp + '/YLXcxMallBack/getUserPhoneVerification.do', //接口地址
        data: {
          'userPhone': this.data.inputUserPhone
        },
        header:
        {
          //'content-type': "application/x-www-form-urlencoded" // 默认值
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          //'content-type': 'application/json'
        },
        success: function (res) {
          console.log("success产生的验证码：");
          console.log(res.data);
          var successRetData = res.data;
          var that = this
          that.setData({
            retCode: successRetData
          })


        }  ,
        fail: function (res) {
          console.log('fail产生的验证码：' + res.data)
        }
      })

  },
  
  inputIdentiCode:function(e)
  {
    console.log("比对验证码");
    console.log("this.data.retCode:"+this.data.retCode);
    console.log("e.detail.value:" + e.detail.value);
    if (this.data.retCode = e.detail.value)
    {
      console.log("验证码正确");
    }
  }


})