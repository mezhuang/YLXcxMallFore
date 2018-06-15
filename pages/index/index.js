// pages/myhome/myhome.js
const app = getApp()
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      { id: "001", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1001_chuang.png', totalFee: '1', goodsCode:'shafa001'},
      { id: "002", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_1002_shaf.png', totalFee: '2', goodsCode: 'shafa002'},
      { id: "003", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_L09cantai.png', totalFee: '3', goodsCode: 'shafa003'},
      { id: "004", imUrl: 'https://lg-6tg1iw6e-1256440429.cos.ap-shanghai.myqcloud.com/index_zszp_chaji.png', totalFee: '4', goodsCode: 'shafa004'}
    ],
  
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
    return {
      title: '这里是机智life小程序',
      path: '/page/index/index?id=123',
      success: function (res) {
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }



  },
  /**
   *首页轮播详情 
   */
  onIndexSwiperDetail:function(e){
    console.log(e.detail.id);
    wx.setStorage({
      key: "totalFee",
      data: e.currentTarget.dataset.totalFee
    });

    wx.setStorage({
      key: "goodsCode",
      data: e.currentTarget.dataset.goodsCode
    });

wx.navigateTo({
  url: '../pay/pay'
});

    // wx.navigateTo({
    //   url: '',
    // })
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    // wx.showLoading({
    //   title:'现金优惠卷',
    //   mask:true
      
    // })
 
  },
  onIndexSearch:function(){
    wx.navigateTo({
      url: '../indexSearch/indexSearch',
    })
  },
  test:function(e)
  {
    console.log("testss");
    wx.setStorage({
      key: "totalFee",
      data: e.currentTarget.dataset.totalFee
    });

    wx.setStorage({
      key: "goodsCode",
      data: e.currentTarget.dataset.goodsCode
    });
    console.log("tesfftss");
    wx.navigateTo({
      url: '../pay/pay'
    });
  }

})