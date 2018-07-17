//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '优致工坊欢迎您!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isSysManger: false,
    isGuide: false,
    isReferee:false,
    isReferManger:false,
    isReferDicrector: false,
    isGeneral: true,
    groupCode:null,
    

    // orderItems
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: '../../images/icon/myhome/personal_pay.png',
      },
      {
        typeId: 1,
        name: '待发货',
        url: 'bill',
        imageurl: '../../images/icon/myhome/personal_shipped.png',
      },
      {
        typeId: 2,
        name: '待收货',
        url: 'bill',
        imageurl: '../../images/icon/myhome/personal_receipt.png'
      },
      {
        typeId: 3,
        name: '待评价',
        url: 'bill',
        imageurl: '../../images/icon/myhome/personal_comment.png'
      }
    ],
    
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    console.log("test1 onLoad");
    console.log('进去个人中心');
    var that = this;
    // var tokend = wx.getStorageSync('tokend')
    var openIp = app.globalData.openId;

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url:   app.globalData.serviceIp + '/YLXcxMallBack/getUserPowerList.do', //接口地址
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
        for (var i = 0; res.data.length; i++) {
          console.log(res.data[i].group_code);
          switch (res.data[i].group_code) {
            case "10001":
              console.log("系统管理员");
              that.setData({

                isSysManger: true


              })
              break;
            case "10002":
              console.log("家居顾问");
              that.setData({

                isGuide: true,
                isGeneral: false,
                groupCode: res.data[i].group_code
              })
              break;
            case "10003":
            case "10004":
            case "10005":
              console.log("分销人员");
              that.setData({
                isReferee: true,
                isGeneral: false
              })
              break;
           
            default:
              console.log("没有匹配的权限！");
          }
        }



      },
      fail: function (res) {
        console.log('用户权限数据' + ':' + res)
      }
    })
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    this.onShow();
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

    console.log("进入申请分销页面");
    wx.navigateTo({
      url: '/pages/refereeApply/refereeApply'
    })
  },
  onRefereeCenter:function(e)
  {
 
    console.log("进入分销中心");
    var groupCode = e.currentTarget.dataset.groupCode;
    wx.navigateTo({
      url: '../refereeCenter/refereeCenter?groupCode=' + groupCode
    })
  },
  onSaleManger: function () {

    console.log("进入销售管理中心");
    wx.navigateTo({
      url: '../saleManager/saleManager'
    })
  },
  onSysMangerChange:function(){
    console.log("进入系统管理");
    wx.navigateTo({
      url: '../sysManager/sysManager'
    })
  },



  //事件处理函数
  toOrder: function () {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onAddressManager:function(){
    wx.navigateTo({
      url: './addressManager/addressManager',
    })
  }


})
