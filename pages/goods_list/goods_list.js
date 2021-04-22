// pages/goods_list/goods_list.js
/*
  1. 用户上滑页面 滚动条触底 开始加载下一页数据
    1. 找到滚动条触底事件 微信小程序官方开发文档寻找
    2. 判断还有没有下一页数据
      1 获取总页数
        总页数 = Math.ceil(总条数total / 页容量 pagesize)
      2 获取当前页数
      3 判断 当前页是否小于总页数 是就有下一页
    3. （1）假如有下一页 加载下一页 没有（2） 弹出提示我是有底线的

*/
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  handleItemTabsItemChange(e) {
    // console.log(e)
    // 获取被点击标题的索引
    const {
      index
    } = e.detail
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
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    // console.log(res)
    // 计算总页数
    const total = res.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    // console.log(this.totalPages)
    this.setData({
      // 拼接了数组
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新窗口 如果没有调用窗口，也没有影响
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()

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
    /* 1. 触发下拉刷新事件
      2. 重置 数据 数组
      3. 重置页码 设置为1
      4. 发送请求
      5. 数据回来了手动关闭效果
     */
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.QueryParams.pagenum >= this.totalPages) {
      // （1） 弹出提示我是有底线的
      console.log("我是有底线的！^_^")
    } else {
      // （2）假如有下一页 加载下一页
      // 1. 当前页码++
      // 2. 重新发送请求
      // 3. 数据请求回来  要对data 中的数组拼接 而不是被全部替换
      // console.log("还有下一页")
      this.QueryParams.pagenum++;
      this.getGoodsList()

    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})