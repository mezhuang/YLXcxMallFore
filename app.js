//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var APP_ID ="wx3e71fb7bb3e423a3";
    var APP_SECRET ="f8f8772ffc502bbf72ac0fcf3521ce45";
    var dataBaseHostIp="www.yuanlianjj.com";
    // var OPEN_ID="";
    // var SESSION_KEY="";
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("come in app onLaunch");
    // 监听网络状态
    wx.onNetworkStatusChange(res => {

      this.globalData.isConnected = res.isConnected

    })
    console.log("this.globalData.isConnected:" + this.globalData.isConnected);
    if (!this.globalData.isConnected) {
      wx.showToast({
        title: '网络连接异常，请检查网络！',
        icon: 'none',
        duration: 4000
      })
      return;
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log("call login return");
            console.log(res.data)
            getApp().globalData.openId= res.data.openid;//获取到的openid
            getApp().globalData.sessionKey = res.data.session_key;//获取到session_key
            console.log(getApp().globalData.openId.length)
            console.log(getApp().globalData.sessionKey.length)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // wx.showModal({
    //   title: '新会员福利',
    //   showCancel: true,
    //   confirmText: '领取',
    //   cancelText: '跳过',
    //   content: '500元现金抵用卷',

    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //       //获取分享人的open_id

    //       //用户领取，则挂到分销人名下

          
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },

  onShow: function (options) {
    // Do something when show.
    // this.onLaunch();
    // console.log("Path: " + options.path)
    // console.log("Path: " + options.query)
    // console.log("Path: " + options.scene)
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,
    openId:null,
    sessionKey:null,
    // serviceIp:"https://www.yuanlianjj.com/YLXcxMallBack/",
    serviceIp: "https://192.168.1.103/YLXcxMallBack/",
    shareOpenid:null,
    isConnected:true
  }
  
})