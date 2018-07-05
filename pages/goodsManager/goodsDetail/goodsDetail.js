const app = getApp()

Page({
  data: {
    swerposition:"07001",
    detailposition:"07002",
    curFormatPriceId:null,//被选中的规格编码
    curDiplayPrice:null,
    isLike: true,
    // banner
    imgUrls: [
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    goodsDetail:null,
    // detailImg: [
    //   "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
    //   "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
    //   "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
    //   "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
    //   "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
    //   "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg",
    // ],

    //购买数量
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/payCart/payCart'
    })
  },
  
  // immeBuy() {

  //   wx.showToast({
  //     title: '购买成功',
  //     icon: 'success',
  //     duration: 2000
  //   });
  // },
// 立即购买
  immeBuy: function (event) {
    // console.log("e.currentTarget.dataset.totalFee:");
    // console.log(event.target.dataset.totalfee);
    // console.log("e.currentTarget.dataset.goodscode:");
    // console.log(event.target.dataset.goodscode);
    var that =this;
    wx.setStorage({
      key: "totalFee",
      // data: event.target.dataset.totalfee
      data: curDiplayPrice
    });

    wx.setStorage({
      key: "goodsCode",
      data: that.data.goods_id
    });
    console.log("tesfftss");
    wx.navigateTo({
      url: '../pay/pay'
    });
  },



  /*数量加减*/
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取商品编码

    var goodsId = options.id;



    var that = this;
    wx.login({
      success: function (res) {


      }
    })

    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getGoodsRecordDetail.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        'startIndex': 0,
        'indexSize': 5,
        "id": goodsId
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          goodsDetail: res.data,
          curDiplayPrice: res.data[0].goodsFormatList[0].curr_price

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
    this.onLoad();
  },
  /**选择花色 */
  chooseGoodsFormat: function (data) {
    var that = this;
    var formatpriceid = data.currentTarget.dataset.formatpriceid;
    var currPrice = data.currentTarget.dataset.currprice;

    that.setData({//把选中值，放入判断值中
      formatSelectId: formatpriceid,
      curDiplayPrice: currPrice
    })
    // var str = flower_id + ',' + flower_name;
    // var chooseFlowers = that.data.chooseFlowers;
    // chooseFlowers = [];
    // chooseFlowers.push(str);
    // that.setData({
    //   chooseFlowers: chooseFlowers,
    //   flowerImgSelect: data.currentTarget.dataset.img
    // })


  }

})