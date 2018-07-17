const app = getApp();
var MD5Util = require('../../../utils/md5.js'); 
Page({
  data: {
    appid: 'wx3e71fb7bb3e423a3',
    mch_id: '1501941241',
    device_info: '1000',
    body: 'shafa',
    total_fee: null,
    spbill_create_ip: '203.195.200.199',
    notify_url: 'https://www.yuanlianjj.com/YLXcxMallBack/views/success.jsp',
    apiKey: 'kjjkhhjggghffg4384m1923279sdr352',
    ret_noce_str: null,
    prepay_id: null,//以上为支付相关


    swerposition:"07001",
    detailposition:"07002",
    curFormatPriceId:null,//被选中的规格编码
    curDiplayPrice:null,
    isLike: true,
    // banner
    // imgUrls: [
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
    //   "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
    // ],
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
    displayNum:0,
    isDisplayNum:true,
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
  //加入购物车
  addCar:function(event)
  {

  
    //显示加入购物车数量
    var displayNumTmp =this.data.displayNum+this.data.num;
    this.setData({
      isDisplayNum: false,
      displayNum: displayNumTmp

        });

    //获取购物车字段值
    
    //加入购物车
    wx.request({
      method: 'POST',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'addToShoppingCart.do', //接口地址
      data: {
        'openId': getApp().globalData.openId,
        "goodsId": this.data.goodsDetail[0].goods_id,
        'goodsPrice': this.data.curDiplayPrice,
        'goodsTitle': this.data.goodsDetail[0].goods_title,
        "goodsImageServer": this.data.goodsDetail[0].goodsImageList[0].goods_image_server,
        "goodsImageUrl": this.data.goodsDetail[0].goodsImageList[0].goods_image_url_sl,
        "formatCode": this.data.formatSelectId,
        "buyNumber":this.data.num,
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
          image: '../../images/suess.png',
          duration: 4000
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
   
  },
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
      data: that.curDiplayPrice
    });

    wx.setStorage({
      key: "goodsCode",
      data: that.data.goods_id
    });
   
    console.log("tesfftss");
    // wx.navigateTo({
    //   url: '../../pay/pay'
    // });
    this.onPrepay();
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
  /**选择规格尺寸 */
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


  },
  // 调用统一下单接口，获取预支付ID
  onPrepay: function (e) {

    var currtTotalFee = null;
    var currtGoodsCode = null;
    // currtTotalFee= wx.getStorageSync("totalFee");
    currtTotalFee = this.data.curDiplayPrice;
    // var currtGoodsCode = wx.getStorageSync("goodsCode");
    var currtGoodsCode = this.data.goodsDetail[0].goods_id;

    // console.log(currtTotalFee);
    // console.log(currtGoodsCode);
    //获取预支付金额
    // this.setData({
    //   total_fee: currtTotalFee,
    //   body: currtGoodsCode
    // });
    this.data.total_fee = currtTotalFee;
    this.data.body = currtGoodsCode;

    var nonceNum = Math.floor(Math.random() * 100000000000000 + 1);
    console.log("nonce_str随机数:" + "yljj" + nonceNum.toString());
    var currtNonce_str = "yljj" + nonceNum.toString();

    var orderNum = Math.floor(Math.random() * 1000000 + 1);
    var myDate = new Date();
    var mytime = myDate.toLocaleString();
    var currtYear = myDate.getFullYear().toString();
    var MonthTmp = myDate.getMonth() + 1;
    var currtMonth = MonthTmp > 9 ? MonthTmp.toString() : ("0" + MonthTmp.toString());
    var currtDate = myDate.getDate() > 9 ? myDate.getDate().toString() : ("0" + myDate.getDate().toString());
    var currtHours = myDate.getHours() > 9 ? myDate.getHours().toString() : ("0" + myDate.getHours());
    var currtMinutes = myDate.getMinutes() > 9 ? myDate.getMinutes().toString() : ("0" + myDate.getMinutes());

    console.log("商品订单号:" + currtYear + currtMonth + currtDate + currtHours + currtMinutes + orderNum.toString());
    var currtOutTradeNo = currtYear + currtMonth + currtDate + currtHours + currtMinutes + orderNum.toString();




    //参数签名
    var stringA = "appid=" + this.data.appid + "&body=test&device_info=" +
      this.data.device_info + "&mch_id=" + this.data.mch_id +
      "&nonce_str=" + currtNonce_str +
      "&notify_url=" + this.data.notify_url +
      "&openid=" + app.globalData.openId +
      "&out_trade_no=" + currtOutTradeNo +
      "&sign_type=MD5&spbill_create_ip=" + this.data.spbill_create_ip +
      "&total_fee=" + this.data.total_fee +
      "&trade_type=JSAPI"
      ;
    console.log("stringA:" + stringA);
    var stringSignTemp = stringA + "&key=" + this.data.apiKey + "";
    console.log("stringSignTemp:" + stringSignTemp);
    // MD5加密
    var sign = MD5Util.MD5(stringSignTemp).toUpperCase();
    console.log("sign:" + sign);
    //转为XML格式数据
    var dataXml = "<xml><appid>" + this.data.appid + "</appid>" +
      "<body>test</body><device_info>" + this.data.device_info + "</device_info>" +
      "<mch_id>" + this.data.mch_id + "</mch_id>" +
      "<nonce_str>" + currtNonce_str + "</nonce_str>" +
      "<out_trade_no>" + currtOutTradeNo + "</out_trade_no>" +
      "<total_fee>" + this.data.total_fee + "</total_fee>" +
      "<sign_type>MD5</sign_type>" +
      "<spbill_create_ip>" + this.data.spbill_create_ip + "</spbill_create_ip>" +
      "<notify_url>" + this.data.notify_url + "</notify_url>" +
      "<openid>" + app.globalData.openId + "</openid>" +
      "<trade_type>JSAPI</trade_type>" +
      "<sign>" + sign + "</sign></xml>";
    var that = this;
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url: app.globalData.serviceIp + 'getPrePayIdByOrderInfo.do', //接口地址
      data: {

        'dataXml': dataXml,

      },
      header:
      {
        //'content-type': "application/x-www-form-urlencoded" // 默认值
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        //'content-type': 'application/json'
      },
      success: function (res) {
        console.log("调用预支付接口，返回数据：");
        console.log(res.data);
        console.log(res.data.nonce_str);
        console.log(res.data.prepay_id)
        that.setData({
          ret_noce_str: res.data.nonce_str,
          prepay_id: res.data.prepay_id



        })

        //发起微信支付
        that.onPay();
        // console.log(res.data.return_msg);
        // wx.showToast({
        //   title: '申请分销成功',
        //   image: '../../images/suess.png',
        //   duration: 4000
        // })
        // setTimeout(function () {
        //   wx.switchTab({
        //     url: '../myhome/myhome',
        //   })
        // }, 2000)
        // //跳转至报备客户列表
        // wx.redirectTo({
        //   url: "../reportList/reportList"
        // })

      },
      fail: function (res) {
        console.log('fail-res' + ':' + res.data)
      }
    })
  },

  //小程序发起微信支付
  onPay: function () {

    var timestamp = Date.parse(new Date());
    console.info("timestamp:" + timestamp);
    var paySignTemp = "appId=" + this.data.appid + "&nonceStr=" + this.data.ret_noce_str + "&package=prepay_id=" + this.data.prepay_id + "&signType=MD5&timeStamp=" + timestamp + "&key=" + this.data.apiKey;

    // MD5加密
    var paySign = MD5Util.MD5(paySignTemp).toUpperCase();
    console.log("paySign :" + paySign);
    wx.requestPayment(
      {
        'timeStamp': timestamp.toString(),
        'nonceStr': this.data.ret_noce_str,
        'package': 'prepay_id=' + this.data.prepay_id,
        'signType': 'MD5',
        'paySign': paySign,
        'success': function (res) {
          console.log("requestPayment-success返回:" + res.data);
        },
        'fail': function (res) {
          console.log("requestPayment-fail返回:" + res.data);

        },
        'complete': function (res) {
          console.log("requestPayment-complete返回:" + res.data);

        }
      })
  }

})