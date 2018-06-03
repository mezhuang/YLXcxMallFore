//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '优致工坊欢迎您!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {

    console.log('进去个人中心');
    var that = this;
    // var tokend = wx.getStorageSync('tokend')
    var openIp = app.globalData.openId;

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/getUserPowerList.do', //接口地址
      data: {
        'openId': openIp
      },
      header:
      {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      success: function (res) {
        console.log("用户权限接口数据：");
        console.log(res.data);
       

      },
      fail: function (res) {
        console.log('用户权限数据' + ':' + res)
      }
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  sysMangerChange:function(e)
  {
    wx.navigateTo({
      url: '',
    })
  },
  applyRefereeChange:function(e)
  {
    console.log(e.query)
    console.log("进入申请分销页面");
    wx.navigateTo({
      url: '/pages/applyReferee/applyReferee',
    })
  }




})
