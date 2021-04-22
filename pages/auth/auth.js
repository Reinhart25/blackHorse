import {
  request
} from "../../request/index.js";
import {
  getUserProfile,
  login
} from "../../utils/async.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo() {
    // 1. 获取用户信息
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = await getUserProfile({
      desc: "用作后台服务器生成用户token"
    })
    // 2. 获取小程序登录成功后的code
    const {
      code
    } = await login()
    console.log(code)

    const loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    // 3. 发送请求 获取用户的token
    const token = await request({
      url: "/users/wxlogin",
      method: "post",
      data: {
        loginParams
      }
    })
    console.log(token)
    const token1 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    wx.setStorageSync("token", token1);
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // /users/wxlogin

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