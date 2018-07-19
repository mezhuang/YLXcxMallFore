// pages/pay/pay.js
var MD5Util = require('../../../utils/md5.js'); 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid:'wx3e71fb7bb3e423a3',
    mch_id:'1501941241' ,
    device_info:'1000',
    body:'shafa' ,
    total_fee:null,
    spbill_create_ip:'203.195.200.199',
    notify_url:'http://203.195.200.199/YLXcxMallBack/index.jsp',
    apiKey:'kjjkhhjggghffg4384m1923279sdr352',
    ret_noce_str:null,
    prepay_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onPrepay();
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
  
  // 调用统一下单接口，获取预支付ID
  onPrepay:function(e){

    var currtTotalFee =null; 
    var currtGoodsCode =null;
    // currtTotalFee= wx.getStorageSync("totalFee");
    currtTotalFee=1;
    var currtGoodsCode = wx.getStorageSync("goodsCode");

    console.log(currtTotalFee);
    console.log(currtGoodsCode);
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
        this.data.device_info +  "&mch_id=" + this.data.mch_id + 
       "&nonce_str=" + currtNonce_str+ 
       "&notify_url=" + this.data.notify_url +
       "&openid=" + app.globalData.openId+
       "&out_trade_no=" + currtOutTradeNo +
       "&sign_type=MD5&spbill_create_ip=" + this.data.spbill_create_ip + 
       "&total_fee=" +  this.data.total_fee + 
       "&trade_type=JSAPI"
       ; 
    console.log("stringA:" + stringA);
    var stringSignTemp = stringA + "&key="+this.data.apiKey+"";
    console.log("stringSignTemp:" + stringSignTemp);
    // MD5加密
    var sign = MD5Util.MD5(stringSignTemp).toUpperCase(); 
    console.log("sign:"+sign);
    //转为XML格式数据
    var dataXml = "<xml><appid>"+this.data.appid+"</appid>"+
      "<body>test</body><device_info>"+this.data.device_info+"</device_info>"+
      "<mch_id>" + this.data.mch_id+"</mch_id>"+
      "<nonce_str>" + currtNonce_str + "</nonce_str>" +
      "<out_trade_no>" + currtOutTradeNo+ "</out_trade_no>" +
      "<total_fee>"+this.data.total_fee+"</total_fee>" +
      "<sign_type>MD5</sign_type>"+
      "<spbill_create_ip>" + this.data.spbill_create_ip+"</spbill_create_ip>" +
      "<notify_url>" + this.data.notify_url+"</notify_url>"+
      "<openid>" + app.globalData.openId+"</openid>"+
      "<trade_type>JSAPI</trade_type>" +
      "<sign>" + sign+"</sign></xml>";
    var that =this;
    wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
      url:  app.globalData.serviceIp + 'getPrePayIdByOrderInfo.do', //接口地址
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
          ret_noce_str :res.data.nonce_str,
          prepay_id :res.data.prepay_id



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
    var paySignTemp = "appId=" + this.data.appid + "&nonceStr=" + this.data.ret_noce_str + "&package=prepay_id=" + this.data.prepay_id+"&signType=MD5&timeStamp=" + timestamp + "&key=" + this.data.apiKey;

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
  },
  onYLTest:function(){
    var orderNum = Math.floor(Math.random() * 1000000 + 1);
    var myDate = new Date();
    var mytime = myDate.toLocaleString();
    var currtYear=myDate.getFullYear().toString() ;
    var MonthTmp = myDate.getMonth()+ 1;
    var currtMonth=MonthTmp > 9 ? MonthTmp.toString() : ("0" + MonthTmp.toString());
    var currtDate = myDate.getDate() > 9 ? myDate.getDate().toString() : ("0" + myDate.getDate().toString());
    var currtHours = myDate.getHours() > 9 ? myDate.getHours().toString() : ("0" + myDate.getHours());
    var currtMinutes = myDate.getMinutes() > 9 ? myDate.getMinutes().toString() : ("0" + myDate.getMinutes());

    console.log("商品订单号:" + currtYear + currtMonth + currtDate + currtHours + currtMinutes + orderNum.toString() );
    var nonceNum = Math.floor(Math.random() * 100000000000000 + 1); 
    console.log("nonceNum随机数:" + "yljj"+nonceNum.toString());

  }


})
  

