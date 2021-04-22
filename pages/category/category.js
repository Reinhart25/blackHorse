// pages/category/category.js
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0

  },
  // 接口的返回数据
  Cates: [],
  // 获取分类数据
  async getCates() {
    // request({
    //     url: "/categories"
    //   })
    //   .then(result => {
    //     // console.log(result)
    //     this.Cates = result.data.message
    //     // 把接口的数据存入到本地存储中
    //     wx.setStorageSync("cates", {
    //       time: Date.now(),
    //       data: this.Cates
    //     })


    //     // 构造左侧的大菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name)
    //     // 构造右侧的商品数据
    //     let rightContent = this.Cates[0].children
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })

    // 使用es7 的async await 来发送异步请求
    const res = await request({
      url: "/categories"
    })
    // console.log(res)
    this.Cates = res
    // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    })

    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    // 构造右侧的商品数据
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e) {
    // console.log(e)
    // 1. 获取被点击标题的索引 2. 给data 中的currentI ndex赋值
    const {
      index
    } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    // 重新设置scrollT
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates()
    /* 0. web: localStorage.setItem("key","value") localStorage.getItem("key")
    wx: wx.setStorageSync("key", "value");
    wx.getStorageSync("key");
        2: 存的时候 有没有做类型转换
        web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(), 把数据变成字符串再存入
        wx: 不存在类型转换这个操作，存什么类型进去，获取的时候就是什么类型
 
      1. 先判断一个本地存储中有没有旧的数据
    {time:Date.now(),data:[...]}
      2. 没有旧数据 直接发送新请求
      3. 有旧的数据 同时 旧数据没有过期 就使用 本地存储中的数据即可
    */
    const Cates = wx.getStorageSync("cates")
    if (!Cates) {
      // 不存在 发送请求获取数据
      this.getCates()
    } else {
      // 有旧的数据 定义过期时间 10s 变成 10分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates()
      } else {
        // 可以使用旧数据
        // console.log("可以使用旧数据")
        this.Cates = Cates.data
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

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