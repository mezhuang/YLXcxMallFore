Page({
  data: {
    //商品信息，假装请求到的信息
    orinGoodMsg: { "good": { "visible": "101", "tourist_dis_price": 510, "good_identity": "00204", "good_sell": "100", "good_brand": "", "last_modify_time": "2017-08-08 20:10:05", "good_place": "101", "good_type": "2", "good_display_img": "../../image/swiper.jpg", "dealer_price": 0, "last_modify_id": "1", "good_id": "17", "good_fill": "", "good_number": 35, "good_status": "9001", "good_unit": "套", "good_format": "", "good_column": "100902", "wholesaler_dis_price": 255, "dealer_dis_price": 265, "tourist_price": 0, "good_name": "绚彩活性棉提花四件套", "wholesaler_price": 0, "good_mark": "床单270x270cm被套200x230cm枕套48x74+6cm" }, "goodflowers": [{ "flower_name": "朝花夕拾", "flower_id": "11d75c6a560a4345b232706f7642de22", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "美丽相约", "flower_id": "3994afdb0427425d93bbba6e881601c3", "flower_image": "../../image/flower.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "清水佳人", "flower_id": "3ebc1032eb5d477b9e2bf508918f3d2b", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "意境幽蓝", "flower_id": "425cc030c0574344a62be9674c854ee6", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "出水芙蓉", "flower_id": "4ea02d08e2464ba681e4861451a7a2f7", "flower_image": "../../image/flower.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "国色天香", "flower_id": "5501ed259aa6476eafff940e9cf16e5a", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "春日畅想", "flower_id": "85d540c79c244e40bb88744cdd1aa5ce", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "花叶细雨", "flower_id": "877e01699f30449ebf99bfe689711159", "flower_image": "../../image/flower.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "琪花摇曳", "flower_id": "979e579413ea467fb363a1c85f36f092", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "絮语飘香", "flower_id": "ba7ef47a8fec4ec192d958d3c400bf7b", "flower_image": "../../image/flower.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "凝香雨露", "flower_id": "d24fa5772f754cfbb6650df587167c2f", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "花开柔情", "flower_id": "dbd7f42a97c04c0aa1bc24b27d2546d3", "flower_image": "../../image/swiper.jpg", "good_id": "17", "flower_identity": "" }, { "flower_name": "幻彩花园", "flower_id": "eff884ebeb7c42008f38a58785818031", "flower_image": "../../image/flower.jpg", "good_id": "17", "flower_identity": "" }], "roleType": "2", "isAdmin": true },

    good: {//商品

    },
    mainImg: '',//主图
    goodPrice: 99.99,//商品价格
    goodOrinPrice: 999.99,
    goodflowers: [


    ],
    imgUrls: [//轮播图

    ],
    chooseFlowers: [//选中的花色

    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    flowerImgSelect: '',//选中的花色图片
    flowerNameSelect: "",//
    flowerSelect: 0,//判断是否选中
    isHidden: 0,
    animationData: {},//选择动画
    showModalStatus: false,//显示遮罩
    goodNum: 1,//商品数量
    select: 0,//商品详情、参数切换
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中',
      })
    }

    var data = that.data.orinGoodMsg;//写死的商品信息





    var goodBaseMsg = data.good;//商品基本信息
    var goodflowersMsg = data.goodflowers;//商品花色信息
    var swiperAy = [];//伦比途

    var goodPrice = 999.99;//显示价格
    var goodOrinPrice = 999.99;//划线价格


    for (var i = 0; i < goodflowersMsg.length; i++) {
      var jo = {
        flower_image: goodflowersMsg[i].flower_image,
        flower_id: goodflowersMsg[i].flower_id,
      }

      swiperAy.push(jo);
    };
    that.setData({//商品
      mainImg: goodBaseMsg.good_display_img,
      flowerImgSelect: goodBaseMsg.good_display_img,
      good: goodBaseMsg,
      goodflowers: goodflowersMsg,
      imgUrls: swiperAy,
      goodPrice: goodPrice,
      goodOrinPrice: goodOrinPrice,

    });
    if (wx.hideLoading()) {
      wx.hideLoading()
    }





  },
  /**选择花色 */
  chooseFlower: function (data) {
    var that = this;
    var flower_id = data.currentTarget.dataset.select;
    var flower_name = data.currentTarget.dataset.flowerName;

    that.setData({//把选中值，放入判断值中
      flowerNameSelect: flower_name,
      flowerSelect: flower_id
    })
    var str = flower_id + ',' + flower_name;
    var chooseFlowers = that.data.chooseFlowers;
    chooseFlowers = [];
    chooseFlowers.push(str);
    that.setData({
      chooseFlowers: chooseFlowers,
      flowerImgSelect: data.currentTarget.dataset.img
    })


  },
  /**点击选择花色按钮、显示页面 */
  viewFlowerArea: function (data) {
    var that = this;
    var animation = wx.createAnimation({//动画
      duration: 500,//动画持续时间
      timingFunction: 'linear',//动画的效果 动画从头到尾的速度是相同的
    })
    animation.translateY(0).step()//在Y轴偏移tx，单位px

    this.animation = animation
    that.setData({
      showModalStatus: true,//显示遮罩       
      animationData: animation.export()
    })
    that.setData({//把选中值，放入判断值中
      isHidden: 1,
    })
  },
  /**隐藏选择花色区块 */
  hideModal: function (data) {

    var that = this;
    that.setData({//把选中值，放入判断值中
      showModalStatus: false,//显示遮罩       
      isHidden: 0,
    })

  },
  goodAdd: function (data) {

    var that = this;
    var goodCount = that.data.goodNum + 1;
    that.setData({//商品数量+1
      goodNum: goodCount
    })

  },
  goodReduce: function (data) {

    var that = this;
    var goodCount = that.data.goodNum - 1;
    that.setData({//商品数量+1
      goodNum: goodCount
    })

  },
  /**商品详情、参数切换 */
  changeArea: function (data) {
    var that = this;
    var area = data.currentTarget.dataset.area;
    that.setData({ "select": area });

  },
  /**
 * 加入购物车
 */
  addCart: function (data) {
    var that = this;
    var thatData = that.data;
    var ja = thatData.chooseFlowers;//选中的花色id
    var good_id = thatData.good.good_id;//good_id
    var good_name = thatData.good.good_name;//good_name
    var gn = thatData.goodNum;//数量
    var good_price = thatData.goodPrice;//价格



    if (ja.length > 0) {
      wx.showToast({
        title: '成功！',
        duration: 2000,
      })

    } else {
      wx.showToast({
        title: '您还没有选择花色哦~',
        duration: 2000,
      })
    }



  },
  /**
   * 生成订单
   */
  saveOrder: function (data) {
    var that = this;
    var thatData = that.data;
    var ja = thatData.chooseFlowers;//选中的花色
    var good_id = thatData.good.good_id;//good_id
    var good_name = thatData.good.good_name;//good_name
    var gn = thatData.goodNum;//数量
    var good_price = thatData.goodPrice;//价格v
    var goodDisplayImg = thatData.mainImg;//主图

    if (ja.length > 0) {

      wx.showToast({
        title: '成功！',
        duration: 2000,
      })
    } else {
      wx.showToast({
        title: '您还没有选择花色哦~',
        duration: 2000,

      })

    }




  },
  /**
   * 查看轮播图片
   */
  seeSwiperAll: function (e) {
    this.seePreviewImg(0, e.currentTarget.dataset.img)
  },
  /**
* 查看花色图片 
* */
  seeFlowersAll: function (e) {
    this.seePreviewImg(1, e.currentTarget.dataset.img)
  },
  /**
   * 预览图片
   * 
   * 无法显示本地图片！！！！！！！
   * 无法显示本地图片！！！！！！！
   * 无法显示本地图片！！！！！！！
   * 
   * @pd 0表示轮播图 、 1表示花色
   */
  seePreviewImg: function (pd, showImg) {
    var array = [];
    var that = this;
    if (pd == 0) {
      var imgArray = that.data.imgUrls;
      for (var i = 0; i < imgArray.length; i++) {
        array.push(imgArray[i].flower_image)
      }
    } else if (pd == 1) {
      var imgArray = that.data.imgArray;
      for (var i = 0; i < imgArray.length; i++) {
        array.push(imgArray[i].url)
      }
    }

    wx.previewImage({
      current: showImg, // 当前显示图片的http链接
      urls: array // 需要预览的图片http链接列表
    })
  },
})