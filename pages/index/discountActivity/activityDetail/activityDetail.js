// pages/index/discountActivity/activityDetail/activityDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:null,
    discounttitle:null,
    subtitle:null,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var discounttitle =options.discounttitle;
    var subtitle = options.subtitle;
    var twolevelCode = options.twolevelCode;
    var that =this;

    this.setData({
      discounttitle: discounttitle,
      subtitle: subtitle


    });


    //获取商品id
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getGoodsInfoBytwolevelCode.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        'startIndex': 0,
        'indexSize': 5,
        "twolevelCode": twolevelCode,
        'imagePositionCode':'07003'
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data[0].goods_image_server + res.data[0].goods_image_server)
        that.setData({
          activityList: res.data
        });

        //跳转至报备客户列表
        //   wx.navigateTo({
        //     url: "../reportList/reportList"
        //   })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res.data[0].goods_image_server)
       
        that.setData({
          activityList: res.data
          
        });
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
  //加入购物车
  onAddPartCart: function (event) {
    //校验字段
    // if (this.data.formatSelectId == null) {
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '请选择规格尺寸',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })


    //   return;
    // }

    // //显示加入购物车数量
    // var displayNumTmp = this.data.displayNum + this.data.num;
    // this.setData({
    //   isDisplayNum: false,
    //   displayNum: displayNumTmp

    // });

    //获取购物车字段值

    //加入购物车
    wx.request({
      method: 'POST',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'addToShoppingCart.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        "goodsId": this.data.activityList[0].goods_id,
        'goodsPrice': this.data.activityList[0].remark3,
        'goodsUnitPrice': this.data.activityList[0].remark3,
        'goodsTitle': this.data.activityList[0].goods_title,
        "goodsImageServer": this.data.activityList[0].goods_image_server,
        "goodsImageUrl": this.data.activityList[0].goods_image_url,
        "formatCode": "与客服确认",
        "buyNumber":'1',
        "isSelect": "0"
      },

      header:
        {
          //'content-type': "application/x-www-form-urlencoded" // 默认值
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          //'content-type': 'application/json'
        },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 1000
        })

        // that.setData({
        //   goodsDetail: res.data,


        // });

        //跳转至报备客户列表
        //   wx.navigateTo({
        //     url: "../reportList/reportList"
        //   })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res.data)
      }
    })

  }
})