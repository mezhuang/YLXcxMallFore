// pages/refereeAgentList/refereeAgentList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refereeAgentListData:null
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {


      }
    })

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/getUserInfoByGroupCode.do', //接口地址
      data: {
        'groupCode':"10003",
        'startIndex': 0,
        'indexSize': 5
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          refereeAgentListData: res.data
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
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/getUserInfoByGroupCode.do', //接口地址
      data: {
        'groupCode':"10003",
        'startIndex': 0,
        'indexSize': 5
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          refereeAgentListData: res.data
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
  
  },
  onUpgrade:function(e){
    console.log("用户id:");
    console.log(e.currentTarget.dataset.userid);
    var userId = e.currentTarget.dataset.userid;
    var that = this;
  
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/setUserPosistionByUserIdAndGroupId.do', //接口地址
      data: {
        'userId': userId,
        'groupCode':"10004",
        'startIndex': 0,
        'indexSize': 5
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          refereeAgentListData: res.data
        });
        wx.showToast({
          title: '操作成功！',
          image: '../../images/suess.png',
          duration: 4000
        })
        //跳转至报备客户列表
        // wx.navigateTo({
        //   url: "../refereeManagerList/refereeManagerList"
        // })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res)
      }
    })
  },
  oncomeDownChange: function (e) {
    console.log("用户id:");
    console.log(e.currentTarget.dataset.userid);
    var userId = e.currentTarget.dataset.userid;
    var that = this;

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/setUserPosistionByUserIdAndGroupId.do', //接口地址
      data: {
        'userId': userId,
        'groupCode': "10003",
        'startIndex': 0,
        'indexSize': 5
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          refereeAgentListData: res.data
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
  onCannelChange: function (e) {
    console.log("用户id:");
    console.log(e.currentTarget.dataset.userid);
    var userId = e.currentTarget.dataset.userid;
    var that = this;

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/delUserPosistionByUserIdAndGroupId.do', //接口地址
      data: {
        'userId': userId,
        'groupCode': "10003",
        'startIndex': 0,
        'indexSize': 5
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          refereeAgentListData: res.data
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

  }

})