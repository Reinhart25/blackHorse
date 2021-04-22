/* 1. 输入框绑定 值改变事件 input 事件
      1. 获取到输入框的值
      2. 合法性判断
      3. 检验通过 把输入框的值 发送到后台
      4. 返回的数据打印到页面上
    2. 防抖 (防止抖动) 定时器
      1.定义一个全局的定时器
      2. 防抖 一般 输入框中 防止重复输入 重复发送请求
      3. 节流 一般 页面下拉上拉
     */
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 查询请求返回的数组
    goods: [],
    // 取消按钮 是否显示
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },
  TimeId: -1,
  // 输入框的值改变就会触发的事件
  handleInput(e) {
    // console.log(e)
    const {
      value
    } = e.detail
    if (!value.trim()) {
      // 值不合法
      // 当输入框没有值重置和隐藏
      this.setData({
        goods: [],
        isFocus: false
      })
    }
    // 防抖定时器
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.querySeach(value)
    }, 1000)
    // 显示取消按钮
    this.setData({
      isFocus: true
    })


  },
  async querySeach(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })
    console.log(res)
    this.setData({
      goods: res
    })
  },
  // 点击取消按钮
  handleCancel() {
    // 1. 清空输入框的值,取消按钮隐藏，搜索内容清除
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
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