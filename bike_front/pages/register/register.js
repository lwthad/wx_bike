// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["86","80","84","87"],
    countryCodeIndex: 0,
    phoneNum: ""
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
  //绑定国家代码
  bindCountryCodeChange: function(e){
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  //获取电话号码
  inputPhoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  //生成验证码
  genVerifyCode: function(){
    var index = this.data.countryCodeIndex
    var countryCode = this.data.countryCodes[index]
    var phoneNum = this.data.phoneNum
    //向后台发送数据
    wx.request({
      url: 'http://localhost:8080/user/genCode',
      data:{
        "phoneNum": phoneNum,
        "countryCode": countryCode
      },
      method: 'GET',
      success: function(res){ 
        wx.showToast({
          title: '验证码已发送',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //提交验证码
  formSubmit: function(e){
    var phoneNum = e.detail.value.phoneNum
    var verifyCode = e.detail.value.verifyCode
    wx.request({
      url: 'http://localhost:8080/user/verify',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        phoneNum: phoneNum,
        verifyCode: verifyCode
      },
      method: 'POST',
      success: function(res){
        console.log(res)
        if(res.data){
          // wx.showToast({
          //   title: '验证码校验成功，即将跳转到下一界面',
          //   icon: 'success',
          //   duration: 3000
          // })
          wx.request({
            url: 'http://localhost:8080/user/register',
            header: {},
            data: {
              // e.detail.value,
              phoneNum: phoneNum,
              regDate: new Date()
            },
            method: 'POST', //默认发送json数据
            success: function(res){
              console.log("注册结果： ")
              console.log(res)
              if(res.data){
                  //信息保存到磁盘中
                  wx.setStorageSync('phoneNum', phoneNum)
                  wx.setStorageSync('status', 1)
                  //保存到内存中
                  var globalData = getApp().globalData
                  globalData.phoneNum = phoneNum
                  globalData.status = 1
                  wx.navigateTo({
                    url: '../deposit/deposit',
                  })
              }else{
                wx.showToast({
                  title: '后台出错，注册失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
        else{
          wx.showToast({
            title: '验证码校验失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})