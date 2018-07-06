// pages/myhome/myhome.js
const app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {

    swiperGoodsList: null,
    hotSaleGoodsList: null,


    // imgUrls: [
    //   { id: "001", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1001_chuang.png', totalFee: '1', goodsCode:'shafa001'},
    //   { id: "002", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1002_shaf.png', totalFee: '2', goodsCode: 'shafa002'},
    //   { id: "003", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_L09cantai.png', totalFee: '3', goodsCode: 'shafa003'},
    //   { id: "004", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_chaji.png', totalFee: '4', goodsCode: 'shafa004'}
    // ],
    isHideLoadMore: false,
    items: null//推荐列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("转发人员信息zfopenid:");
    console.log(options.shareOpenid);

    //获取首页轮播图片及产品信息
    var swiperTwolevelCode = "06001";
    var that = this;

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getGoodsInfoBytwolevelCode.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        'startIndex': 0,
        'indexSize': 5,
        "twolevelCode": swiperTwolevelCode
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          swiperGoodsList: res.data
        });

        //跳转至报备客户列表
        //   wx.navigateTo({
        //     url: "../reportList/reportList"
        //   })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res.data)
      }
    })


    //获取热销爆品商品信息
    var hotgoodsTwoLevelCode = "06002";
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getGoodsInfoBytwolevelCode.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        'startIndex': 0,
        'indexSize': 5,
        "twolevelCode": hotgoodsTwoLevelCode
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          hotSaleGoodsList: res.data
        });

        //跳转至报备客户列表
        //   wx.navigateTo({
        //     url: "../reportList/reportList"
        //   })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res.data)
      }
    })

    //获取精品推荐

    var recommendsTwolevelCode = "06003";

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getGoodsInfoBytwolevelCode.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        'startIndex': 0,
        'indexSize': 5,
        "twolevelCode": recommendsTwolevelCode
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          items: res.data
        });

        //跳转至报备客户列表
        //   wx.navigateTo({
        //     url: "../reportList/reportList"
        //   })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res.data)
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
   * 用户点击右上角分享或者自定义按钮转发功能
   */
  onShareAppMessage: function () {
    // return {
    //   title: '远联家居商城',
    //   path: '/pages/index/index?id=123',
    //   success: function (res) {
    //     console.log(res.shareTickets[0])
    //     // console.log
    //     wx.getShareInfo({
    //       shareTicket: res.shareTickets[0],
    //       success: function (res) { console.log(res) },
    //       fail: function (res) { console.log(res) },
    //       complete: function (res) { console.log(res) }
    //     })
    //   },
    //   fail: function (res) {
    //     // 分享失败
    //     console.log(res)
    //   }
    // }
    return {

      title: '转发',// 转发标题（默认：当前小程序名称）

      path: '/pages/index/index?shareOpenid=' + app.globalData.openId,// 转发路径（当前页面 path ），必须是以 / 开头的完整路径

      success(e) {

        // shareAppMessage: ok,

        // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象

        // 需要在页面onLoad()事件中实现接口

        wx.showShareMenu({

          // 要求小程序返回分享目标信息

          withShareTicket: true

        });

      },

      fail(e) {

        // shareAppMessage:fail cancel

        // shareAppMessage:fail(detail message)

      },

      complete() { }

    }


  },
  onIndexSwiperItem: function (event) {
    console.log("e.currentTarget.dataset.totalFee:");
    console.log(event.target.dataset.totalfee);
    console.log("e.currentTarget.dataset.goodscode:");
    console.log(event.target.dataset.goodsid);

    wx.navigateTo({
      url: '../goodsManager/goodsDetail/goodsDetail'
    });
  },
  /**
   *首页搜索功能
   */
  onIndexSearch: function () {
    wx.navigateTo({
      url: '../indexSearch/indexSearch',
    })
  },
  // 上拉加载更多
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
        recommends: [
          {
            goodId: 7,
            name: 'OLAY玉兰油精油沐浴露玫瑰滋养二合一450ml',
            url: 'bill',
            imageurl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1001_chuang.png',
            newprice: "￥36.60",
            oldprice: "￥40.00",
          },
          {
            goodId: 10,
            name: '兰蔻玫瑰清滢保湿柔肤水嫩肤水化妆水400ml补水保湿温和不刺激',
            url: 'bill',
            imageurl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1001_chuang.png',
            newprice: "￥30.00",
            oldprice: "￥80.00",
          }, {
            goodId: 11,
            name: 'Lancome/兰蔻清莹柔肤爽肤水/粉水400ml补水保湿玫瑰水化妆水',
            url: 'bill',
            imageurl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1001_chuang.png',
            newprice: "￥30.00",
            oldprice: "￥80.00",
          },
          {
            goodId: 12,
            name: '美国CLINIQUE倩碧黄油无油/特效润肤露125ml',
            url: 'bill',
            imageurl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1001_chuang.png',
            newprice: "￥239.00",
            oldprice: "￥320.00",
          },
          {
            goodId: 13,
            name: '法国LANCOME兰蔻柔皙轻透隔离防晒乳霜50ML2017年3月到期',
            url: 'bill',
            imageurl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1001_chuang.png',
            newprice: "￥130.00",
            oldprice: "￥180.00",
          },
        ],
      })
    }, 2000)
  }
})