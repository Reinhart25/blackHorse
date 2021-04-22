/*  1. 页面被打开的时候 onShow
      0. onShow 不同于onload 无法在形参上接收 optinons 参数
      0.5 判断缓存中有没有token 
      0.6 没有 直接跳转到授权页面
      1.获取 url 上的参数 type
      2. 根据type 去发送请求
      3. 渲染页面
    2. 点击不同的标题 重新发送请求来获取和渲染数据

 */
import {
  request
} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [{
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  // 处理tab切换 根据标题索引来激活选中 标题数组
  handleItemTabsItemChange(e) {
    // console.log(e)
    //1. 获取被点击标题的索引
    const {
      index
    } = e.detail
    this.changeTitleByIndex(index)
    // 2. 重新发送请求
    this.getOrders(index + 1)
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const token = wx.getStorageSync("token")

    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      },
      header: {
        Authorization: token
      }
    })
    this.setData({
      orders: res.orders.map(v => ({
        ...v,
        create_time_cn: (new Date(v.create_time * 1000).toLocaleString())
      }))
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    const token = wx.getStorageSync("token")
    // 没有appId 没有token
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
      return
    }

    // 1. 获取当前的小程序的页面栈-数组 长度最大是10个页面 浏览网页一个道理
    let pages = getCurrentPages()
    // console.log(pages)
    //  2. 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1]
    console.log(currentPage.options.type)
    // 3. 获取url上的type
    const {
      type
    } = currentPage.options
    // 3.5 激活选中的页面标题
    this.changeTitleByIndex(type - 1)
    // 4. 获取订单列表
    this.getOrders(type)

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