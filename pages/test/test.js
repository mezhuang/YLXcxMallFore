// pages/Test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……' ,
    // input默认是1  
        num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'  
  
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
    })
    this.getData();
  },
  // 上拉加载更多
  loadMore: function () {
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '已经到顶'
      })
      return;
    }
    setTimeout(function () {
      console.log('上拉加载更多');
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false
      })
      self.getData();
    }, 300);
  },
  // 下拉刷新
  refresh: function (e) {
    var self = this;
    setTimeout(function () {
      console.log('下拉刷新');
      var date = new Date();
      self.setData({
        currentPage: 1,
        refreshTime: date.toLocaleTimeString(),
        hideHeader: false
      })
      self.getData();
    }, 300);
  },
  // 获取数据  pageIndex：页码参数
  getData: function () {
    var self = this;
    var pageIndex = self.data.currentPage;
    wx.request({
      url: 'https://route.showapi.com/582-2',
      data: {
        showapi_appid: '19297',
        showapi_sign: 'cf606a68a01f45d196b0061a1046b5b3',
        page: pageIndex
      },
      success: function (res) {
        var dataModel = res.data;
        if (dataModel.showapi_res_code == 0) {
          if (dataModel.showapi_res_body.ret_code == 0) {
            if (pageIndex == 1) { // 下拉刷新
              self.setData({
                allPages: dataModel.showapi_res_body.pagebean.allPages,
                contentlist: dataModel.showapi_res_body.pagebean.contentlist,
                hideHeader: true
              })
            } else { // 加载更多
              console.log('加载更多');
              var tempArray = self.data.contentlist;
              tempArray = tempArray.concat(dataModel.showapi_res_body.pagebean.contentlist);
              self.setData({
                allPages: dataModel.showapi_res_body.pagebean.allPages,
                contentlist: tempArray,
                hideBottom: true
              })
            }
          }
        }
      },
      fail: function () {

      }
    })
  }, /* 点击减号 */
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
  }
})