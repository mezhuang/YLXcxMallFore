var app = getApp();
var MD5Util = require('../utils/md5.js'); 
var that = this;
var appid = 'wx3e71fb7bb3e423a3';
var apiKey = 'kjjkhhjggghffg4384m1923279sdr352';
var globalNonceStr=null;
var globalRepayId=null;
var payStatus = false;//执行支付返回的状态

//生成订单号
function createOrderNo()
{
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
   return currtOutTradeNo;
}
// 调用统一下单接口，获取预支付ID
function onPrepay(total_fee, currtOutTradeNo) {
  // var payStatus = false;
  // var data = JSON.parse(paymodel);

  // var currtTotalFee = null;
  // var currtGoodsCode = null;

  // currtTotalFee = data.total_fee*100;
  total_fee =1;//测试使用，记得改回上一条代码。
  // var currtGoodsCode = data.payOrderId;

  // console.log(currtTotalFee);
  // console.log(currtGoodsCode);
  //获取预支付金额
  // this.setData({
  //   total_fee: currtTotalFee,
  //   body: currtGoodsCode
  // });
  // data.total_fee = currtTotalFee;
  // data.body = currtGoodsCode;

  var nonceNum = Math.floor(Math.random() * 100000000000000 + 1);
  console.log("nonce_str随机数:" + "yljj" + nonceNum.toString());
  var currtNonce_str = "yljj" + nonceNum.toString();

  // var orderNum = Math.floor(Math.random() * 1000000 + 1);
  // var myDate = new Date();
  // var mytime = myDate.toLocaleString();
  // var currtYear = myDate.getFullYear().toString();
  // var MonthTmp = myDate.getMonth() + 1;
  // var currtMonth = MonthTmp > 9 ? MonthTmp.toString() : ("0" + MonthTmp.toString());
  // var currtDate = myDate.getDate() > 9 ? myDate.getDate().toString() : ("0" + myDate.getDate().toString());
  // var currtHours = myDate.getHours() > 9 ? myDate.getHours().toString() : ("0" + myDate.getHours());
  // var currtMinutes = myDate.getMinutes() > 9 ? myDate.getMinutes().toString() : ("0" + myDate.getMinutes());

  // console.log("商品订单号:" + currtYear + currtMonth + currtDate + currtHours + currtMinutes + orderNum.toString());
  // var currtOutTradeNo = currtYear + currtMonth + currtDate + currtHours + currtMinutes + orderNum.toString();
  // var currtOutTradeNo = data.orderNo;

  var mch_id= '1501941241';
  var device_info= '1000';
  var body= 'shafa';

  var spbill_create_ip= '203.195.200.199';
  var notify_url= 'https://www.yuanlianjj.com/YLXcxMallBack/views/success.jsp';





  //参数签名
  var stringA = "appid=" + appid + "&body=yuanlianjj&device_info=" +
    device_info + "&mch_id=" + mch_id +
    "&nonce_str=" + currtNonce_str +
    "&notify_url=" +notify_url +
    "&openid=" + app.globalData.openId +
    "&out_trade_no=" + currtOutTradeNo +
    "&sign_type=MD5&spbill_create_ip=" + spbill_create_ip +
    "&total_fee=" + total_fee +
    "&trade_type=JSAPI"
    ;
  console.log("stringA:" + stringA);
  var stringSignTemp = stringA + "&key=" + apiKey + "";
  console.log("stringSignTemp:" + stringSignTemp);
  // MD5加密
  var sign = MD5Util.MD5(stringSignTemp).toUpperCase();
  console.log("sign:" + sign);
  //转为XML格式数据
  var dataXml = "<xml><appid>" + appid + "</appid>" +
    "<body>yuanlianjj</body><device_info>" + device_info + "</device_info>" +
    "<mch_id>" + mch_id + "</mch_id>" +
    "<nonce_str>" + currtNonce_str + "</nonce_str>" +
    "<out_trade_no>" + currtOutTradeNo + "</out_trade_no>" +
    "<total_fee>" + total_fee + "</total_fee>" +
    "<sign_type>MD5</sign_type>" +
    "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>" +
    "<notify_url>" + notify_url + "</notify_url>" +
    "<openid>" + app.globalData.openId + "</openid>" +
    "<trade_type>JSAPI</trade_type>" +
    "<sign>" + sign + "</sign></xml>";
 
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
      // console.log(res.data);
      console.log(res.data.nonce_str);
      console.log(res.data.prepay_id)
      // that.setData({
      //   ret_noce_str: res.data.nonce_str,
      //   prepay_id: res.data.prepay_id
      globalNonceStr = res.data.nonce_str;
       globalRepayId = res.data.prepay_id;



      // })
      //发起微信支付
      payStatus =   onPay();

    },
    fail: function (res) {
      console.log('fail-res' + ':' + res.data)
    }
  })

  return payStatus;
}

//小程序发起微信支付
function onPay() {

  var timestamp = Date.parse(new Date());
  console.info("timestamp:" + timestamp);
  var paySignTemp = "appId=" + appid + "&nonceStr=" + globalNonceStr + "&package=prepay_id=" + globalRepayId + "&signType=MD5&timeStamp=" + timestamp + "&key=" + apiKey;

  // MD5加密
  var paySign = MD5Util.MD5(paySignTemp).toUpperCase();
  console.log("paySign :" + paySign);
  wx.requestPayment(
    {
      'timeStamp': timestamp.toString(),
      'nonceStr': globalNonceStr,
      'package': 'prepay_id=' + globalRepayId,
      'signType': 'MD5',
      'paySign': paySign,
      'success': function (res) {
        console.log("requestPayment-success返回:" + res.data);
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1000
        })
        payStatus= true;
      },
      'fail': function (res) {
        console.log("requestPayment-fail返回:" + res.data);
        payStatus = false;

      },
      'complete': function (res) {
        console.log("requestPayment-complete返回:" + res.data);
        payStatus = false;

      }
    })
  return payStatus;
}

module.exports = {

  onPrepay:onPrepay,
  createOrderNo: createOrderNo
}