//导包
var myUtils = require("../../utils/myUtils.js")

//index.js
Page({
  data:{
    /*map 组件的中心纬度*/
    latitude: 0,
    /*map 组件的中心经度 */
    longitude: 0,
    /*地图上显示控件，控件不随着地图移动，是一个数组对象*/
    controls: [],
    markers: [
      {
        iconPath: "/images/bike.png",
        width: 25,
        height: 25,
        longitude: 117.18142,
        latitude: 31.83163
      },
      {
        iconPath: "/images/bike.png",
        width: 25,
        height: 25,
        longitude: 117.179,
        latitude: 31.83163
      },
      {
        iconPath: "/images/bike.png",
        width: 25,
        height: 25,
        longitude: 117.185669,
        latitude: 31.832339
      },
      {
        iconPath: "/images/bike.png",
        width: 25,
        height: 25,
        longitude: 117.186319,
        latitude: 31.833676
      }
    ]
  },

  //首次加载页面时调用
  onLoad: function () {
    var _this = this;
    //获取终端位置
    wx.getLocation({
      success: function(res) {
        // console.log(res)
        var log = res.longitude
        var lat = res.latitude
        //设置坐标
        _this.setData({
          longitude: log,
          latitude: lat
        })
      },
    })
    //获取终端手机信息
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight

        //设置控件基本信息
        _this.setData({
          //控件列表
          controls: [
            //扫码图片
            {
              id: 1,
              iconPath: '/images/scan.png',
              position: {
                width: 120,
                height: 60,
                left: windowWidth / 2 - 55,
                top: windowHeight - 80
              }, 
              clickable: true
            },
            //定位
            {
              id: 2,
              iconPath: '/images/serchlocation.png',
              position: {
                width: 40,
                height: 40,
                left: 20,
                top: windowHeight - 50
              }, 
              clickable: true
            },
            //报修
            {
              id: 3,
              iconPath: '/images/set.png',
              position: {
                width: 40,
                height: 40,
                left: windowWidth - 50,
                top: windowHeight - 50
              },
              clickable: true
            },
            //充值
            {
              id: 4,
              iconPath: '/images/addmoney.png',
              position: {
                width: 40,
                height: 40,
                left: windowWidth - 50,
                top: windowHeight - 120
              },
              clickable: true
            },
            //添加车辆
            {
              id: 5,
              iconPath: '/images/add.png',
              position: {
                width: 50,
                height: 50,
                left: 10,
                top: 10
              },
              clickable: true
            },
            //定位图标
            {
              id: 6,
              iconPath: '/images/location.png',
              position: {
                width: 30,
                height: 55,
                left: windowWidth / 2 - 15,
                top: windowHeight / 2 - 57
              },
              clickable: true
            }
          ]
        })
        
      }
    })
  },

  //拖动地图触发
  regionchange: function(e) {
    // var _this = this
    // var etype = e.type
    // if(etype == 'end'){
    //   this.mapCtx.getCenterLocation({
    //     success: function(res){
    //       _this.setData({
    //         longitude: res.longitude,
    //         latitude: res.latitude
    //       })
    //     }
    //   })
    // }
  },
  //点击 marker 标记点时触发
  markertap(e) {
   // console.log(e.markerId)
  },
  //地图中控件单击事件
  controltap: function(e) {
    var _this = this
    // console.log(e)
    var cid = e.controlId
    switch(cid){
      case 1:{
        //先从磁盘中获取用户状态
        var status = myUtils.get("status")
        // var status = wx.getStorageSync("status")
        // if(!status){
        //   status = getApp().globalData.status;
        // }
        if(status == 0){
          wx.navigateTo({
            url: '../register/register',
          })
        }else if(status == 1){
          wx.navigateTo({
            url: '../deposit/deposit',
          })
        }
      }
      //重定位
      case 2:{
        _this.mapCtx.moveToLocation()
        break
      }
      //新增车辆
      case 5: {
        var bikes = _this.data.markers
        _this.mapCtx.getCenterLocation({
          success: function(res){
            var longitude = res.longitude
            var latitude = res.latitude
            wx.request({
              url: 'http://localhost:8080/addBike', 
              data: {
                longitude: longitude,
                latitude: latitude,
                bikeNo:10010
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'POST'
              ,
              success(res) {
                console.log(res)
              }
            })
            // bikes.push(
            //   {
            //   iconPath: "/images/bike.png",
            //   width: 25,
            //   height: 25,
            //   longitude: longitude,
            //   latitude: latitude
            //  }
            // )
            // //重新赋值
            // _this.setData({
            //   markers: bikes
            // })
          }
        })
        break;
      }
      default:{
        console.log('功能未开发')
      }
    }
  },
  /* 生命周期函数--监听页面初次渲染完成 */
  onReady: function(){
    //创建map上下文
    this.mapCtx = wx.createMapContext('MyMap')
  }


})
