// pages/payCart/payCart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelect: false,
    totalMoney: 0,
    carts:null,//购物车数据
    selectedCarts:null,//被选中商品数组
    //购买数量
    // input默认是1  
    
    // 使用data数据对象设置样式名  
   
    // 商品详情介绍
    // carts: [
    //   {
    //     pic: "http://mz.djmall.xmisp.cn/files/product/20161201/148058328876.jpg",
    //     name: "日本资生堂洗颜",
    //     price: 200,
    //     isSelect: false,
    //     // 数据设定
    //     num: 1,
    //     minusStatus: 'disabled',
    //     count: {
    //       quantity: 2,
    //       min: 1,
    //       max: 20
    //     },
    //   },
    //   {
    //     pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058301941.jpg',
    //     name: "倩碧焕妍活力精华露",
    //     price: 340,
    //     isSelect: false,
    //     // 数据设定
    //     num: 1,
    //     minusStatus: 'disabled',
    //     count: {
    //       quantity: 1,
    //       min: 1,
    //       max: 20
    //     },
    //   },
    //   {
    //     pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
    //     name: "特效润肤露",
    //     price: 390,
    //     isSelect: false,
    //     // 数据设定
    //     num: 1,
    //     minusStatus: 'disabled',
    //     count: {
    //       quantity: 3,
    //       min: 1,
    //       max: 20
    //     },
    //   },
    //   {
    //     pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058228431.jpg',
    //     name: "倩碧水嫩保湿精华面霜",
    //     price: 490,
    //     isSelect: false,
    //     // 数据设定
    //     num: 1,
    //     minusStatus: 'disabled',
    //     count: {
    //       quantity: 1,
    //       min: 1,
    //       max: 20
    //     },
    //   },
    //   {
    //     pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
    //     name: "兰蔻清莹柔肤爽肤水",
    //     price: 289,
    //     isSelect: false,
    //     // 数据设定
    //     num: 1,
    //     minusStatus: 'disabled',
    //     count: {
    //       quantity: 10,
    //       min: 1,
    //       max: 20
    //     },
    //   },
    //   {
    //     pic: "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
    //     name: "LANCOME兰蔻小黑瓶精华",
    //     price: 230,
    //     isSelect: false,
    //     // 数据设定
    //     num: 1,
    //     minusStatus: 'disabled',
    //     count: {
    //       quantity: 1,
    //       min: 1,
    //       max: 20
    //     },
    //   },
    // ]
  
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  wx.request({
      method: 'GET',
      // url: 'www.yuanlianjj.com?token=' + tokend, //接口地址
    url: app.globalData.serviceIp + 'getShoppingCartListByOpenId.do', //接口地址
      data: {
        'openId': getApp().globalData.openId
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log('success-res' + ':' + res.data)
        that.setData({
          carts: res.data
        });
    },

    fail: function (res) {
      console.log('fail-res' + ':' + res)
      that.setData({
        carts: res.data
      });
      }
  });

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
  //价钱统计
  countPrice: function (index)
  {
     var Allprice = 0, i = 0;
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price;
    }
    else {
      this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price;
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + this.data.carts[i].price;
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price;
      }
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })       
  },

  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    // var Allprice = 0, i = 0;
    let id = e.target.dataset.id,

      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    //价钱统计
    this.countPrice(index);
  //   if (this.data.carts[index].isSelect) {
  //     this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price;
  //   }
  //   else {
  //     this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price;
  //   }
  //   //是否全选判断
  //   for (i = 0; i < this.data.carts.length; i++) {
  //     Allprice = Allprice + this.data.carts[i].price;
  //   }
  //   if (Allprice == this.data.totalMoney) {
  //     this.data.isAllSelect = true;
  //   }
  //   else {
  //     this.data.isAllSelect = false;
  //   }
  //   this.setData({
  //     carts: this.data.carts,
  //     totalMoney: this.data.totalMoney,
  //     isAllSelect: this.data.isAllSelect,
  //   })
  // },
  // //全选
  // allSelect: function (e) {
  //   //处理全选逻辑
  //   let i = 0;
  //   if (!this.data.isAllSelect) {
  //     for (i = 0; i < this.data.carts.length; i++) {
  //       this.data.carts[i].isSelect = true;
  //       this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price;
  //     }
  //   }
  //   else {
  //     for (i = 0; i < this.data.carts.length; i++) {
  //       this.data.carts[i].isSelect = false;
  //     }
  //     this.data.totalMoney = 0;
  //   }
  //   this.setData({
  //     carts: this.data.carts,
  //     isAllSelect: !this.data.isAllSelect,
  //     totalMoney: this.data.totalMoney,
  //   })
  },
  //数量变化处理
  handleQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
    });
  },

  /*数量加减*/
  /* 点击减号 */
  bindMinus: function (e) {
    var index = parseInt(e.target.dataset.index);
    var num = this.data.carts[index].num;
    var numTmp = num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    else{
      return
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.data.carts[index].num = num;
    this.data.carts[index].minusStatus = minusStatus;
    var unitPrice = (this.data.carts[index].price) / numTmp;
    var currentPrice = this.data.carts[index].price - unitPrice;
    this.data.carts[index].price = currentPrice;

    this.setData({
      carts: this.data.carts,
    });
    //价钱统计
    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney - unitPrice;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney
    });


  },
  /* 点击加号 */
  bindPlus: function (e) {
    var index = parseInt(e.target.dataset.index);
    var num = this.data.carts[index].num;
    var numTmp = num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回 
    this.data.carts[index].num = num;
    // this.setData({
    //   carts[index]: num,
    //   minusStatus: minusStatus
    // });

    //对应修改价钱
 
    console.log("index:"+index);
    console.log("cart:" + this.data.carts[index].price);
    //单价
    var unitPrice =this.data.carts[index].price / numTmp; 
    var currentPrice = this.data.carts[index].price + unitPrice;
     this.data.carts[index].price = currentPrice;

  
     //价钱统计
     //价钱统计
    if (this.data.carts[index].isSelect)
     {
      this.data.totalMoney = this.data.totalMoney + unitPrice;
     }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney
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
  // 去结算
  onPayConfirm: function (event) {
    //获取被选中的数据
    var selectedData = new Array();
    var index=0;
    for (var i = 0; i < this.data.carts.length;i++)
    {
      if (this.data.carts[i].isSelect)
      {
        
        selectedData[index] = this.data.carts[i];
        index++;
      } 
    }

    var payCartInfomodel = JSON.stringify(selectedData);
    wx.navigateTo({
      url: '../payConfirm/payConfirm?payCartInfomodel=' + payCartInfomodel,
    })
    // wx.showToast({
    //   title: '去结算',
    //   icon: 'success',
    //   duration: 3000
    // });
    // this.setData({
    //   showDialog: !this.data.showDialog
    // });
  }

})