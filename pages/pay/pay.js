// pages/pay/pay.js
var MD5Util = require('../../utils/md5.js'); 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid:'wx3e71fb7bb3e423a3',
    mch_id:'1501941241' ,
    device_info:'1000',
    body:'test' ,
    nonce_str:'ibuaiVcKdpRxkhJA' ,
    out_trade_no:'sdfsdgdfgdg',
    total_fee:'1',
    spbill_create_ip:'203.195.200.199',
    notify_url:'http://203.195.200.199/YLXcxMallBack/index.jsp',
    apiKey:'kjjkhhjggghffg4384m1923279sdr352'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onPay:function()
  {
    
    var timestamp = Date.parse(new Date());
    console.info("timestamp:" + timestamp);
    var paySignTemp = "appId=" + this.data.appid + "&nonceStr=LZdkMTXlSnb7F7AT&package=prepay_id=wx15180537240310a16ac4bb640728698939&signType=MD5&timeStamp=" + timestamp + "&key=" + this.data.apiKey;

    // MD5加密
    var paySign  = MD5Util.MD5(paySignTemp).toUpperCase();
    console.log("paySign :" + paySign);
    wx.requestPayment(
      {
        'timeStamp': timestamp.toString(),
        'nonceStr': 'LZdkMTXlSnb7F7AT',
        'package': 'prepay_id=wx15180537240310a16ac4bb640728698939',
        'signType': 'MD5',
        'paySign': paySign,
        'success': function (res) { 
          console.log("requestPayment-success返回:"+res.data);
        },
        'fail': function (res) { 
          console.log("requestPayment-fail返回:" + res.data);

        },
        'complete': function (res) { 
          console.log("requestPayment-complete返回:" + res.data);

        }
      })
  },
  // 预支付接口
  onPrepay:function(){
    var stringA = "appid=" + this.data.appid + "&body=test&device_info=" +  
        this.data.device_info +  "&mch_id=" + this.data.mch_id + 
        "&nonce_str=" + this.data.nonce_str+ 
         "&notify_url=" + this.data.notify_url +
        "&openid=" + app.globalData.openId+
       "&out_trade_no=" + this.data.out_trade_no +
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
      "<nonce_str>" + this.data.nonce_str + "</nonce_str>" +
      "<out_trade_no>" + this.data.out_trade_no+ "</out_trade_no>" +
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
      url: 'http://' + app.globalData.serviceIp + '/YLXcxMallBack/getPrePayIdByOrderInfo.do', //接口地址
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
        console.log(res.data.return_code);
        console.log(res.data.return_msg);
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
        console.log('fail-res' + ':' + res)
      }
    })

   

    
  }



})