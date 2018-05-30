// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '2016-11-08',
    guideInfoList:null,
    guideIndex: 0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取导购员信息
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://203.195.200.199/springmvc_demo/getGuideInfoList.do', //接口地址
      data: {
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        _this.setData({
          guideInfoList: res.data
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    // var tokend = wx.getStorageSync('tokend')
    var customerName  = e.detail.value.customerName;         //获取input初始值
    var customerPhone = e.detail.value.customerPhone;    //获取input初始值
    var isTask        = e.detail.value.isTask;         //获取input初始值
    var taskName      = e.detail.value.taskName;         //获取input初始值
    var taskPhone     = e.detail.value.taskPhone;    //获取input初始值
    var guidePhone    = e.detail.value.guidePhone;    //获取input初始值
    var visitTime     = e.detail.value.visitTime;         //获取input初始值
    var remark        = e.detail.value.remark;    //获取input初始值
    // var name = that.data.name ? that.data.name : name2    //三元运算，如果用户没修改信息，直接提交原来的信息，如果用户修改了信息，就将修改了的信息和未修改过的信息一起提交
    // var ID_num = that.data.ID_num ? that.data.ID_num : ID_num2
    wx.request({
      method: 'POST',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: 'http://203.195.200.199/springmvc_demo/addCustomerReport.do', //接口地址
      data: {
        'customerName':customerName,
        'customerPhone':customerPhone,
        'isTask': isTask,
        'taskName':taskName,
        'taskPhone':taskPhone,
        'guidePhone':guidePhone,
        'visitTime': visitTime,
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
            url: '../index/index',
          })
        }, 2000)
      //跳转至报备客户列表
        wx.navigateTo({
          url: "../reportList/reportList"
        })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res)
      }
    })
  },


    formReset: function () {
      console.log('form发生了reset事件')
    },
    //  点击日期组件确定事件  
  bindDateChange: function (e) {
      console.log('选择的日期是'+e.detail.value)
      this.setData({
        dates: e.detail.value
      })
    },
    //对接导购电话下拉框
    bindGuideInfoChange: function (e) {
      console.log('选择的导购电话是', e.detail.value )
    this.setData({
      guideIndex: e.detail.value
    })

  },


})