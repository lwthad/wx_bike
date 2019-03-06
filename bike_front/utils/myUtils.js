//status
function get(key){
  var status = wx.getStorageSync(key)
  if (!status) {
    status = getApp().globalData.status;
  }
  return status;
}

module.exports ={
  get
}