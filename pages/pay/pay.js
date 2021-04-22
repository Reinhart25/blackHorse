/* 页面加载的时候
  1. 从缓存中获取购物车数据 渲染到页面中
    checked= true*/
import {
  chooseAddress,
  showModal,
  showToast
} from "../../utils/async.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1. 获取本地存储中的地址数据
    const address = wx.getStorageSync("address")
    //   2. 把数据 设置给data 中的一个变量
    // console.log(address)
    // 1.获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || []
    // 1. 从缓存中获取购物车数据 渲染到页面中
    // checked= true
    cart = cart.filter(v => v.checked)
    // 1. 都需要商品被选中 才计算
    // 2. 获取购物车数组 
    // 3. 遍历 判断商品是否被选中
    // 4. 总价格 += 商品的单价 * 商品数量
    // 5. 总数量 += 商品数量
    // 6. 设置回data
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.goods_price * v.num
      totalNum += v.num
    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
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