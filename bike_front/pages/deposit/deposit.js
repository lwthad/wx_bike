// pages/deposit/deposit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  deposit: function(){
    wx.showModal({
      title: '提示',
      content: '是否进行充值？',
      success: function(res){
        console.log(res)
        if(res.confirm){
            //获取用户手机号
            var phoneNum = wx.getStorageSync("phoneNum")
            if(!phoneNum){
              phoneNum = getApp().globalData.phoneNum
            }
            wx.showLoading({
              title: '充值中...',
              mask: true
            })
            wx.requestPayment({
              timeStamp: '',
              nonceStr: '',
              package: '',
              signType: '',
              paySign: '',
            })
        }
      }
    })
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

  }
})